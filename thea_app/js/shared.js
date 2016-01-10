$(document).ready(function() {
  $('.fade-in').hide().transition('fade up', '750ms');

  $("#menubutton").click(function() {
    $('.ui.sidebar').sidebar('toggle');
  });

  // $('.ui.dropdown').dropdown()

  var maincontent = $('#context');
  $(window).resize(function() {
    if ($(window).width() < 992) {
      $(maincontent).removeClass('thirteen wide column margin-top-30').addClass('sixteen wide column margin-top-30');
    } else if ($(window).width() > 977) {
      if ($(maincontent).hasClass('sixteen wide column margin-top-30')) {
        $(maincontent).removeClass('sixteen wide column margin-top-30').addClass('thirteen wide column margin-top-30');
      }
    }
  });


  $('.ui.checkbox').checkbox();

  //Initialize tablesort
  if (typeof $('table').tablesort === "function") {
      $('table').tablesort();
  }

  $('.ui.sticky').sticky({
    context: '#context'
  });

  $('.ui.small.modal').modal('show');
});

function getReceipt(entryId)
{
  apiGetReceipt(function (data)
    {
      window.open('data:application/pdf;base64,' + data);
      console.log('yee');
    }, function (data) { console.log('buhuuu'); }, event_id, entryId);
}