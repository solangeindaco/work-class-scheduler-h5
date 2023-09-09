
$(function () {
  // css time block classes
  const timeClasses = ['past', 'present', 'future'];
  $('#save-message').hide();

  //Replace the time css class in the time block
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

  //Display the current date in the header of the page using Dayjs library and AdvancedFormat plugin.
  var currentDate = dayjs();
  $('#currentDay').text(currentDate.format('dddd, MMMM Do, YYYY'));
  //get the current hour in 24-hour time
  var currentHour = currentDate.hour();

  //Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  var $timeBlocks = $('#container').children('.time-block');
  $.each($timeBlocks, function () {
    // Get the time block hour from the id
    let timeBlockId = $(this).attr("id");
    let timeBlockHour = return24DayHour(parseInt(timeBlockId.split('-')[1]));
    
    // Apply the past, present, or future class to each time
    // block by comparing the time block hour to the current hour.
    if (timeBlockHour == currentHour){
      replaceClass($(this),'present');
    }else if (timeBlockHour < currentHour){ // Past
      replaceClass($(this),'past');
    }else {// hour > currentHour Future
      replaceClass($(this),'future');
    }

   // Get any user input that was saved in localStorage and set
   // the values of the corresponding textarea elements.
    let eventText = localStorage.getItem(timeBlockId);
    let textArea = $(this).children('textarea').eq(0);
    textArea.val(eventText);
    
    textArea.on('click', function (){
      $('#save-message').hide();
    });


    //Save an event in the local storage binding it with the timeblock id
    let $saveBtn = $(this).children('button').eq(0);
    $saveBtn.on('click', function (){
      let eventApp = $(this).siblings('textarea').eq(0).val()
      localStorage.setItem(timeBlockId, eventApp);
      $('#save-message').show();
    });

  });
});
