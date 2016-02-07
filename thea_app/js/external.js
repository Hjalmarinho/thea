"use strict";

var event_id = sessionStorage.getItem("event_id");
var changes_to_save = {};

$(document).ready(function()
{
  $("#participantLoader").show();
  $('.special.card .image').dimmer(
  {
    on: 'hover'
  });

  $('#updateParticipant').click(function()
  {
    $('#approve-update').modal('show');
  });

  // Display image-modal for portrait-upload
  $('#uploadPortraitButton').click(function()
  {
    $('#image_modal').modal('show');
    $("#portrait_crop").cropper('replace', $("#portrait_crop").attr("src"));
  });

  loadExternalPerson();
});

function loadExternalPerson()
{
  $("#participantLoader").show();
  var req1 = apiGetExternalPerson(displayParticipant, errorHandler, event_id, externalPersonId);
  var req2 = apiGetExternalPersonPortrait(displayPortrait, errorHandler, event_id, externalPersonId);

  $.when(req1, req2).always(function()
  {
    $("#participantLoader").hide();
  });
}


// Global variables, updated in displayParticipant
var externalPersonId = GetURLParameter('external_person_id');
var id_cancel_participant;

function errorHandler(errorMessage)
{
  $('#error-msg').text(errorMessage);
  $('#error-modal').modal('show');
}

function displayPortrait(image)
{
  $('#portrait').attr('src', 'data:image/jpeg;base64,' + image.image_data);
}

function displayParticipant(participant)
{
  // Caching div id's
  var id_first_name = $('#first_name');
  var id_last_name = $('#last_name');
  var id_gender = $('#selectgender');
  var id_clubs = $('#clubs');
  var id_accreditated = $('#accreditatedCheckbox');
  var id_participantname = $('.participantname');
  var id_allergies = $('#allergies');
  var id_email = $('#email');
  var id_phone = $('#phone');
  var id_birthday = $('#birthday');
  var id_birthmonth = $('#birthmonth');
  var id_birthyear = $('#birthyear');
  id_cancel_participant = $('#cancelParticipant');

  //******** PERSONAL INFORMATION ********

  // First name
  id_first_name.val(escapeHtml(participant.person.first_name));

  // Last name
  id_last_name.val(escapeHtml(participant.person.last_name));

  // Date of birth
  var birthdate = participant.person.birthdate.split('-');
  id_birthday.val(birthdate[2]);
  id_birthmonth.dropdown('set selected', birthdate[1]);
  id_birthyear.val(birthdate[0]);

  // Gender
  id_gender.dropdown('set selected', participant.person.gender);

  // Email
  id_email.val(escapeHtml(participant.person.email));

  // Phone number
  id_phone.val(escapeHtml(participant.person.phone));

  // Allergies
  id_allergies.val(escapeHtml(participant.person.allergies));
  
  //******** PARTICIPANT INFORMATION ********

  // Name and time registrated
  id_participantname.text(participant.person.first_name + ' ' + participant.person.last_name);

  $('#organization').val(participant.organization);
  $('#role').val(participant.description);

  // Canceled participant
  is_canceled = (participant.status == REGISTRATION_CANCELLED);
  setCanceled();
  changes_to_save = {};
}//End of displayParticipant


var is_canceled = false;
function cancelParticipant()
{
  $('#cancelParticipant').addClass('loading');

  var data = null;
  if (is_canceled)
    data = {'status': REGISTRATION_CONFIRMED};
  else
    data = {'status': REGISTRATION_CANCELLED};

  var request = apiPutParticipant(function(data) {}, function(data) {}, event_id, externalPersonId, data, '');
  $.when(request).done(function()
  {
    $('#cancelParticipant').removeClass('loading');
    loadExternalPerson();
  });
}


function setCanceled()
{
  if (is_canceled)
  {
    id_cancel_participant.text('Meld på igjen');
    id_cancel_participant.removeClass("red").addClass("green");;
    $('.participantname').append(' <span style="color:#d01919;">(kansellert)</span>');
  }
  else
  {
    id_cancel_participant.text('Kanseller deltaker');
    id_cancel_participant.removeClass("green").addClass("red");;
  }
}

function updateParticipant()
{
  $('#updateParticipant').addClass('loading');

  var request = apiPutParticipant(function(data) {}, errorHandler, event_id, externalPersonId, changes_to_save, '');
  $.when(request).done(function()
  {
    $('#updateParticipant').removeClass('loading');
    loadExternalPerson();
  });
}


function addPersonObjectToChangesToSave()
{
  if (!('person' in changes_to_save))
    changes_to_save['person'] = {};
}

// Change-listeners
function firstNameChanged(sender)
{
  addPersonObjectToChangesToSave();
  changes_to_save.person['first_name'] = $(sender).val();
}

function lastNameChanged(sender)
{
  addPersonObjectToChangesToSave();
  changes_to_save.person['last_name'] = $(sender).val();
}

function birthdateChanged(sender)
{
  addPersonObjectToChangesToSave();
  changes_to_save.person['birthdate'] = $('#birthyear').val() + '-' + $('#birthmonth').val() + '-' + $('#birthday').val()
}

function genderChanged(sender)
{
  addPersonObjectToChangesToSave();
  changes_to_save.person['gender'] = $(sender).val();
}

function emailChanged(sender)
{
  addPersonObjectToChangesToSave();
  changes_to_save.person['email'] = $(sender).val();
}

function phoneNumberChanged(sender)
{
  addPersonObjectToChangesToSave();
  changes_to_save.person['phone'] = $(sender).val();
}

function organizationChanged(sender)
{
  changes_to_save['organization'] = $(sender).val();
}

function roleChanged(sender)
{
  changes_to_save['description'] = $(sender).val();
}

function allergiesChanged(sender)
{
  addPersonObjectToChangesToSave();
  changes_to_save.person['allergies'] = $(sender).val();
}

function confirmPortrait()
{
  var canvas = $("#portrait_crop").cropper("getCroppedCanvas");
  var base64 = canvas.toDataURL("image/jpeg");

  // Trim away any 'data:image/jpeg;base64,' at the beginning.
  base64 = base64.replace('data:image/jpeg;base64,', '');
  var json_data = {'portrait_data': base64};
  var request = apiPutPortrait(function(data) { loadExternalPerson(); }, errorHandler, event_id, externalPersonId, json_data, '');
  $.when(request).done(function()
  {
    $('#image_modal').modal('hide');
  });
}
