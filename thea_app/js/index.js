$(document).ready(function()
{
  $(window).keydown(function(event)
  {
    if (event.keyCode == 13)
    {
      doLogin();
      return false;
    }
  });

  apiGetEvents(getEventsCallback, errorHandler);
});

function errorHandler(errorMsg)
{

}


function getEventsCallback(events_array)
{
  sortArrayByNumberDesc(events_array, 'event_id');
  for (var i = 0; i < events_array.length; ++i)
  {
    var event_obj = events_array[i];
    $('#events').append('<option value="' + event_obj.event_id + '">' + event_obj.event_description + '</option>');
  }
}