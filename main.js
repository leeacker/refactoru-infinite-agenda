$(document).on('ready', function() {

var dateBlock = $('<div class="day"><div class="day-info"><h2>Monday</h2><h3></h3></div><div class="day-text"></div></div>');
var today = moment();
var addDay = function(dayPlus){

	var newDay = moment().add(dayPlus, 'days');
	var newDate = newDay.format("dddd, MMMM Do YYYY, h:mm:ss a")
	newDate = newDate.split(',');
	newDayWeek = newDate[0];
	newDayDate = newDate[1];
	var dateBlock = $('<div class="day"><div class="day-info"><h2>'+ newDayWeek+ '</h2><h3>'+ newDayDate+ '</h3></div><div class="day-text"></div></div>');

	$('.container').append(dateBlock);

	console.log(newDay.format("dddd, MMMM Do YYYY, h:mm:ss a"));
	console.log(newDay.date());
	console.log(newDay.month());
}

addDay(0);
addDay(1);
addDay(2);
addDay(3);
addDay(4);
addDay(5);
  
});