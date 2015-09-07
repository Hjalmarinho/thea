$(document).ready(function() {
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
        })
      ;
    })
  ;
