// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const timeClasses = ['past', 'present', 'future'];

//Replace the time class in the time block
function replaceClass(timeBlock, className){
  if (!timeBlock.hasClass(className)){
    timeClasses.forEach((timeClass) => {
      if (timeBlock.hasClass(timeClass)){
        timeBlock.removeClass(timeClass);
      }
    });
    timeBlock.addClass(className);
  }
}
//Convert the time block 12-clock-hour to a 24-clock hour
function return24DayHour(twelveClockHour){
  return ((9 <= twelveClockHour) && (twelveClockHour<= 12))? twelveClockHour : (twelveClockHour + 12);
}

$(function () {
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  //var advancedFormat = require('dayjs/plugin/advancedFormat');
  //dayjs.extend(advancedFormat); 

  //Use the Dayjs to return the current day 
  //var advancedFormat = require('dayjs/plugin/advancedFormat');
  //dayjs.extend(advancedFormat);

  var currentDate = dayjs();
  $('#currentDay').text(currentDate.format('dddd, MMMM D'));
  var currentHour = currentDate.hour()

  //Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  var $timeBlocks = $('#container').children('.time-block');
  $.each($timeBlocks, function () {
    let timeBlockId = $(this).attr("id");
    let timeBlockHour = return24DayHour(parseInt(timeBlockId.split('-')[1]));
  
    if (timeBlockHour == currentHour){
      replaceClass($(this),'present');
    }else if (timeBlockHour < currentHour){ // Past
      replaceClass($(this),'past');
    }else {// hour > currentHour Future
      replaceClass($(this),'future');
    }

    //Display any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements
    let eventText = localStorage.getItem(timeBlockId);
    $(this).children('textarea').eq( 0 ).val(eventText);

    //Save an event in the localstorage binding it with the timeblock id
    $(this).on('click', function () {
      let event = $(this).children('textarea').eq( 0 ).val()
      localStorage.setItem(timeBlockId, event);
    });


  });
});
