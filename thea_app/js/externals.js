'use strict';

var event_id = sessionStorage.getItem('event_id');

$(document).ready(function(){
  var request = apiGetExternalPersons(displayExternalPersons, handleError, event_id);
  $.when(request).always(function() { removeLoader(); });
})

function displayExternalPersons(externalPersons){
  $.each(externalPersons, function (i, externalPerson) {
    var cssClass = '';
    switch (externalPerson.status) {
      case REGISTRATION_CONFIRMED:
        break;
      case REGISTRATION_CANCELLED:
        cssClass = ' class="error" ';
        break;
      default:
        return true;
    }

    var first_name = externalPerson.person.first_name;
    var last_name = externalPerson.person.last_name;
    var phone = externalPerson.person.phone;
    var email = externalPerson.person.email;
    var organization = externalPerson.organization;
    var role = externalPerson.description;
    var external_person_id = externalPerson.external_person_id;

    var tablerow = '<tr ' + cssClass + '> \
      <td><a href="./external.php?external_person_id=' + external_person_id +'">' + first_name + '</a></td> \
      <td>' + last_name + '</td> \
      <td>' + phone + '</td> \
      <td><a href="mailto:' + email + '">' + email + '</a></td> \
      <td>' + organization + '</td> \
      <td>' + role + '</td> \
    </tr>';

    $('#externalPersons').append(tablerow);
  });
}

function removeLoader() {
  $("#participantsLoader").remove();
}

function handleError(errorMsg) {
}