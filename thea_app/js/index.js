$(document).ready(function()
{
  $('.ui.form').form({
    fields: {
      email: {
        identifier  : 'email',
        rules: [
          {
            type   : 'empty',
            prompt : 'Skriv inn e-posten din'
          },
          {
            type   : 'email',
            prompt : 'Skriv inn en gyldig e-post'
          }
        ]
      },
      password: {
        identifier  : 'password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Skriv inn passordet ditt'
          },
          {
            type   : 'length[6]',
            prompt : 'Skriv inn et passord på minst 6 tegn'
          }
        ]
      }
    }
  });

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
  for (var i = 0; i < events_array.length; ++i)
  {
    var event_obj = events_array[i];
    $('#events').append('<option value="' + event_obj.event_id + '">' + event_obj.event_description + '</option>');
  }
}