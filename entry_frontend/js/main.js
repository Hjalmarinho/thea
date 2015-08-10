$( document ).ready(function() {
    console.log( "ready!" );

    // Initialize dropdown
    $('.ui.dropdown')
    .dropdown()
    ;

$('.ui.form')
  .form({
    fields: {
      name: {
        identifier  : 'name',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your name'
          }
        ]
      }
    }
  })
;


});