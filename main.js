$(document).on('ready', function() {
	// create variable for a new day block
	var dateBlock = $('<div class="day"><div class="day-info"><h2>Monday</h2><h3></h3><button>Add Agenda Item</button></div><div class="day-text"></div></div>');
	// create a starting variable for keeping track of days as they are added
	var daysPast = 0
	// create a variable for the current day on page load
	var today = moment();
	// create a variable for the furthest day created
	var furthest = moment();
	// create a function for creating a new day on the calendar using the daysPast parameter
	var removeTime = function(moment){
		var tempArray = moment.format("dddd, MMMM Do YYYY, h:mm:ss a");
		tempArray = tempArray.split(',');
		tempArray = tempArray[0]+','+ tempArray[1];
		return tempArray
	};
	
	var addDay = function(dayPlus){

		var newDay = moment().add(dayPlus, 'days');
		var newDate = newDay.format("dddd, MMMM Do YYYY, h:mm:ss a")
		newDate = newDate.split(',');
		newDayWeek = newDate[0];
		newDayDate = newDate[1];
		var dateBlock = $('<div class="day"><div class="day-info"><h2>'+ newDayWeek+ '</h2><h3>'+ newDayDate+ '</h3><button>Add Agenda Item</button></div><div class="day-text"></div></div>');

		$('.container').append(dateBlock);
		// add ID for navigation buttons if the values match 
		if(removeTime(newDay) === removeTime(today)){
		 	dateBlock.attr('ID', 'today');	
		} else if(removeTime(newDay) === removeTime(moment().add(1, 'days'))){
			dateBlock.attr('ID', 'tomorrow');
		} else if(removeTime(newDay) === removeTime(moment().add(1, 'weeks'))){
			dateBlock.attr('ID', 'nextWeek');
		} else if(removeTime(newDay) === removeTime(moment().add(1, 'months'))){
			dateBlock.attr('ID', 'nextMonth');
		}

		furthest = removeTime(newDay);
		daysPast++;
		return newDay;
	}
	
	// create a week on pageload
	addDay(0);
	addDay(1);
	addDay(2);
	addDay(3);
	addDay(4);
	addDay(5);
	addDay(6);
	
	// add event handler for reaching the bottom of the page - add a new day everytime the bottom is reached.
	$(window).scroll(function() {
	    if($(window).scrollTop() == $(document).height() - $(window).height()) {
	           addDay(daysPast)
	    }
	});
	// event handler for functionality to add new tasks to each day by clicking on a particular date. 
	$('.day-info').on('click', 'button', function(){
		var textBox = $('<textarea class=\'\'></textarea>');
		$(this).closest('.day-info').siblings('.day-text').append(textBox);
	})
	// create a variable so that each agenda item has a unique id
	var newestItem = 0

	// when enter key is pressed - blur textarea
	$('.day-text').on('keydown', 'textarea', function(e){
		if (e.keyCode === 13) {
			e.preventDefault;
            $(this).blur();
        }
	});
	// on blur - add info from text area to the agenda
	$('.day-text').on('blur', 'textarea', function(){
		var currentClass = $(this).attr('class');
		var agendaItem = $(this).val();
		var newItem = $('<p class= \''+newestItem+'\'></p>');

		if ($(this).attr('class') === ''){
		$(this).closest('.day-text').append(newItem);
		$(this).siblings('.'+newestItem).text(agendaItem);
		newestItem++;
		$(this).remove();
		}	else  {
			$(this).siblings('.'+currentClass).text(agendaItem).show();
			$(this).remove();
		}
	})
	// click on an agenda item to edit it:
	$('.day-text').on('click', 'p', function(){
		var agendaItem = $(this).text();
		var newestItem = $(this).attr('class');
		var newItem = $('<textarea class= \''+newestItem+'\'></textarea>');
		$(this).after(newItem);
		$(this).siblings('.'+newestItem).val(agendaItem);
		$(this).hide();
	})
	// offset the location on anchor tag clicks to account for the header
	$('.nav a').on('click', function(e){

		e.preventDefault();
		var selector = $(this).attr('href');
		// check if next week and next month have been created
		if (selector === '#nextWeek' && daysPast < 8){
			while(furthest !== removeTime(moment().add(1, 'weeks'))){
				addDay(daysPast);
			}
		} else if (selector === '#nextMonth' && daysPast < 28){
			while(furthest !== removeTime(moment().add(1, 'months'))){
				addDay(daysPast);
			}
		}
		// find offset of given ID
		var top = $(selector).offset().top;
		
		$(window).scrollTop(top-204);
	})

  
});