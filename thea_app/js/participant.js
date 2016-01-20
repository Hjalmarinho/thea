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

  $('#creditParticipant').click(function()
  {
    $('#credit-update').modal('show');
  });

  // Display image-modal for portrait-upload
  $('#uploadPortraitButton').click(function()
  {
    $('#image_modal').modal('show');
    $("#portrait_crop").cropper('replace', $("#portrait_crop").attr("src"));
  });

  var getSportsRequest = apiGetSports(getSports, errorHandler, event_id);
  var getTeamsRequest = apiGetAllTeams(getTeams, errorHandler, event_id);
  var getAdditionsRequest = apiGetAdditions(getAdditions, errorHandler, event_id);
  $.when(getSportsRequest, getTeamsRequest).done(function()
  {
    loadParticipant();
  });
});

function loadParticipant()
{
  $("#participantLoader").show();
  var req1 = apiGetClubs(displayClubs, errorHandler);
  var req2 = apiGetParticipant(displayParticipant, errorHandler, event_id, local_entry_id);
  var req3 = apiGetPortrait(displayPortrait, errorHandler, event_id, local_entry_id);

  $.when(req1, req2, req3).always(function()
  {
    $("#participantLoader").hide();
  });
}


// Global variables, updated in displayParticipant
var sports = null;
var teams = null;
var local_entry_id = GetURLParameter('entry_id');
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

function displayClubs(clubs)
{
  if (clubs)
  {
    $.each(clubs, function(i, club)
    {
      $('#clubs').append('<option value=' + club.club_id + '>' + escapeHtml(club.club_name) + '</option>');
    });
  }
}


function getAdditions(additions)
{
  // Sort additions by name
  sortArrayByString(additions, "addition_description");

  $.each(additions, function(i, addition)
  {
    // Skip additions with parent.
    if (addition.parent_addition_id != null)
      return true;

    if (addition.has_children)
    {
      // Array.slice() ensures that we pass a copy of the array,
      // and not 
      var html = '<div class="ui inline fields"> \
          <label class="field four wide">' + addition.addition_description + '</label>';
      html = html + displayAdditionWithChildren(addition, additions.slice());
      html = html + '</div>';
      $('#additions').append(html);
    }
    else
    {
      var html =
        '<div class="ui inline fields"> \
          <label class="field four wide">' + addition.addition_description + '</label> \
          <div class="ui checkbox"> \
            <input type="checkbox" addition-id="' + addition.addition_id + '" onchange="additionChecked(this);" tabindex="0"> \
          </div> \
        </div>';

      $('#additions').append(html);
    }
  });

  // "Activate" any radiobuttons.
  $('.ui.radio.checkbox').checkbox();
  $('.ui.checkbox').checkbox();
}

/*
  This function will print out additions as radiobuttons, such as...

              * Small
  T-skjorte   * Medium
              * Large

  T-skjorte is the parentAdditions, and Small, Medium and Large exists
  in the array "additions".
*/
function displayAdditionWithChildren(parentAddition, additions)
{
  var html = '';
  sortArrayByNumber(additions, 'addition_id');
  for (var i = 0; i < additions.length; ++i)
  {
    var children = additions[i];
    if (children.parent_addition_id == parentAddition.addition_id)
    {
      // Print the addition.
      html = html + 
        '<div class="field"> \
          <div class="ui radio checkbox"> \
            <input type="radio" addition-id="' + children.addition_id + '" name="' + parentAddition.addition_id + '" class="hidden" tabindex="0" onchange="additionChecked(this);"> \
            <label>' + children.addition_description + '</label>\
          </div> \
        </div>';
    }
  };

  return html;
}


// function displayAdditionWithChildren(parentAddition, additions)
// {
//   var first = true;
//    var html =
//         '<div class="ui inline fields"> \
//           <label class="field four wide">' + parentAddition.addition_description + '</label>';
//   $('#additions').append(html);
// 
//   sortArrayByNumber(additions, 'addition_id');
//   $.each(additions, function(i, children)
//   {
//     if (children.parent_addition_id == parentAddition.addition_id)
//     {
//       // Print the addition.
//       var html =
//         '<div class="ui inline fields"> \
//           <label class="field four wide">' + addition.addition_description + '</label> \
//           <div class="ui checkbox"> \
//             <input type="checkbox" addition-id="' + addition.addition_id + '" onchange="additionChecked(this);" tabindex="0"> \
//           </div> \
//         </div>';
// 
//       $('#additions').append(
//         '<div class="field"> \
//             <div class="ui radio checkbox"> \
//                 <input type="radio" addition-id="' + children.addition_id + '" name="' + parentAddition.addition_id + '" tabindex="0" class="hidden" onchange="additionChecked(this);"> \
//                 <label>' + children.addition_description + '</label> \
//             </div> \
//          </div>'
//         );
// 
//       first = false;
//     }
//   });
//   $('#additions').append('<br>');
// }


function getSports(sports_array)
{
  sports = sports_array;

  // Load all sports into the needed dropdowns
  $('#select-exercise-dropdown').empty();
  $('#select-exercise-dropdown').append('<option value="">Velg idrett</option>');

  var firstId = null;
  sortArrayByString(sports, 'sport_description');
  $.each(sports, function(i, sport)
  {
    if (sport.exercises.length == 1)
    {
      var text = sport.exercises[0].exercise_description;
      var id = sport.exercises[0].exercise_id;

      $('#select-exercise-dropdown').append('<option value="' + id + '">' + text + '</option>');
      if (firstId == null)
        firstId = id;
    }
    else
    {
      $.each(sport.exercises, function(j, exercise)
      {
        var text = sport.sport_description + ', ' + exercise.exercise_description;
        var id = exercise.exercise_id;

        $('#select-exercise-dropdown').append('<option value="' + id + '">' + text + '</option>');
        if (firstId == null)
          firstId = id;
      });
    }
  });

  $('#select-exercise-dropdown').dropdown();
}


function getTeams(teams_array)
{
  teams = teams_array;
}

function displayParticipant(participant)
{
  // Caching div id's
  var id_first_name = $('#first_name');
  var id_last_name = $('#last_name');
  var id_gender = $('#selectgender');
  var id_clubs = $('#clubs');
  var id_student = $('#studentCheckbox');
  var id_clubmember = $('#clubmemberCheckbox');
  var id_accreditated = $('#accreditatedCheckbox');
  var id_participantname = $('.participantname');
  var id_travel_information = $('#travel_information');
  var id_allergies = $('#allergies');
  var id_email = $('#email');
  var id_phone = $('#phone');
  var id_comment = $('#comment');
  var id_birthday = $('#birthday');
  var id_birthmonth = $('#birthmonth');
  var id_birthyear = $('#birthyear');
  var id_time_registrated = $('#time_registrated');
  var id_exercise = $('#exercises');
  var id_payed = $('#payed');
  var id_payments = $('#payments');
  var id_refunded = $('#refunded');
  id_cancel_participant = $('#cancelParticipant');
  var time_registrated = parseDateString(participant.time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#");

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

  // Student
  id_student.val(id_student.prop('checked', participant.is_student));

  // Email
  id_email.val(escapeHtml(participant.person.email));

  // Phone number
  id_phone.val(escapeHtml(participant.person.phone));

  // Travel information
  id_travel_information.val(escapeHtml(participant.travel_information));

  // Allergies
  id_allergies.val(escapeHtml(participant.person.allergies));
  
  //******** PARTICIPANT INFORMATION ********

  // Club
  id_clubs.dropdown('set selected', participant.club.club_id);

  // Member of club
  id_clubmember.val(id_clubmember.prop('checked', participant.is_clubmember));

  // Sport
  // id_exercise.dropdown('set selected', participant.exercises[0].exercise_id);
  appendExercises(participant.exercises);

  // Accreditated
  id_accreditated.val(id_accreditated.prop('checked', participant.accreditated));

  // Name and time registrated
  id_participantname.text(participant.person.first_name + ' ' + participant.person.last_name);
  id_time_registrated.text('Påmeldt: ' + time_registrated);

  // Comment
  if (participant.comment != null)
    id_comment.val(escapeHtml(participant.comment))
  else
    id_comment.val('');

  // Receipt
  $('#recieptParticipant').unbind('click');
  $('#recieptParticipant').click(function() { getReceipt(local_entry_id); });

  // Additions
  $.each(participant.additions, function(i, addition)
  {
    var addition_txt_id = '[addition-id=' + addition.addition_id + ']';
    $(addition_txt_id).attr('checked', '');
    $(addition_txt_id).attr('entry-addition-id', addition.entry_addition_id);
  });

  // ******** PAYMENT INFORMATION ********
  if (participant.orders)
    printOrders(participant.orders);

  // Canceled participant
  is_canceled = (participant.status == "CANCELLED");
  setCanceled();
  changes_to_save = {};
}//End of displayParticipant


function printOrders(orders_array)
{
  $('#orders').empty();
  for (var i = 0; i < orders_array.length; ++i)
  {
    var order = orders_array[i];
    var order_date = parseDateString(order.time_registered);
    var html = '<div class="card"> \
      <div class="content"> \
        <div class="header">Ordrenr ' + order.order_number + '</div> \
        <div class="meta">' + order_date.customFormat("#DD# #MMM# #YYYY# #hhh#.#mm#.#ss#") + '</div> \
        <div class="description"> \
          Ordresum: ' + order.order_amount + ',- <br> \
          Refundert: ' + order.amount_refunded + ',- \
        </div> \
      </div> \
      <div class="extra content"> \
        <div class="ui two buttons"> \
          <div onclick="showCreditParticipant(this, \'' + order.transaction_id + '\')" class="ui button">Refunder</div> \
          <div onclick="showPaymentLog(this, \'' + order.transaction_id + '\')" class="ui blue button">Betalingslogg</div> \
        </div> \
      </div> \
    </div>';

    $('#orders').append(html);
  }
}


function showPaymentLog(sender, transactionId)
{
  $(sender).addClass('loading');

  var request = apiGetTransaction(
    function(data)
    {
      $('#payment-log-content').text(data.rawData);
      $('#payment-log').modal('show');
    },
    function(data) { },
    event_id,
    transactionId);

  $.when(request).always(function()
  {
    $(sender).removeClass('loading');
  });
}


function appendExercises(exercises_array)
{
  $('#exercises').empty();

  for (var i = 0; i < exercises_array.length; ++i)
  {
    var exercise = exercises_array[i];
    appendExercise(exercise, i + 1);
  }
}


function appendExercise(exercise_object, exercise_counter)
{
  var html = '<div id="entry_exercise_' + exercise_object.entry_exercise_id + '">';
  html = html + '<div class="inline fields"> \
    <label class="field four wide">Idrett ' + exercise_counter + '</label> \
    <div class="field seven wide"> \
    <input type="text" disabled="" value="' + createExerciseText(exercise_object) + '"> \
    </div> \
    <div class="field four wide" onclick="deleteEntryExercise(this, ' + exercise_object.entry_exercise_id + ');"><button class="ui red button">Fjern</button></div> \
  </div>';

  if (exercise_object.exercise.is_teamexercise)
  {
    // Print all teams for this exercise.
    html = html + '<div class="inline fields"> \
      <label class="field four wide"></label> \
      <div class="field seven wide"> \
      ' + createTeamsSelectHTML(exercise_object.exercise_id) + ' \
      </div> \
    </div>';
  }

  html = html + '</div>';

  $('#exercises').append(html);

  if (exercise_object.exercise.is_teamexercise)
    $('#exercises select').last().val(exercise_object.team_id).dropdown();
}

// Format a readable exercise text.
function createExerciseText(exercise_object)
{
  var multiple_exercises = false;
  for (var i = 0; i < sports.length; ++i)
  {
    if (sports[i].sport_id == exercise_object.exercise.sport_id)
    {
      multiple_exercises = (sports[i].exercises.length > 1);
      break;
    }
  }

  if (multiple_exercises)
    return exercise_object.exercise.sport.sport_description + ' - ' + exercise_object.exercise.exercise_description;
  else
    return exercise_object.exercise.sport.sport_description;
}


function createTeamsSelectHTML(exercise_id)
{
  var html = '<select class="ui dropdown">';

  for (var i = 0; i < teams.length; ++i)
  {
    var team = teams[i];

    if (team.exercise_id != exercise_id)
      continue;

    html = html + '<option value="' + team.team_id + '">';
    html = html + escapeHtml(team.team_name) + ' (' + genderToString(team.team_gender) + ')';
    html = html + '</option>';
  }
  html = html + '</select>';

  return html;
}

var currentCreditTransactionId = null;
function showCreditParticipant(sender, transactionId)
{
  currentCreditTransactionId = transactionId;
  $('#credit-update').modal('show');
}

function creditParticipant()
{
  $('#credit-error').hide();
  var amountText = $('#credit-amount').val();
  var amount = parseFloat(amountText.replace(',', '.'));

  if (isNaN(amount))
  {
    // Invalid number...
    $('#credit-error').show();
    $('#credit-error-msg').text('\'' + amountText + '\' er ikke et gyldig beløp.');
  }
  else
  {
    $('#credit-button').addClass('loading');

    var json = { 'amount': amount };
    var request = apiPostCreditTransaction(
      function(message)
      {
        $('#credit-update').modal('hide');
        loadParticipant();
      },
      function(message)
      {
        $('#credit-error').show();
        $('#credit-error-msg').text(message);
      },
      json,
      event_id,
      currentCreditTransactionId);

    $.when(request).always(function()
    {
      $('#credit-button').removeClass('loading');
    });
  }
}

var is_canceled = false;
function cancelParticipant()
{
  $('#cancelParticipant').addClass('loading');

  var data = null;
  if (is_canceled)
    data = {'status': REGISTRATION_CONFIRMED};
  else
    data = {'status': REGISTRATION_CANCELLED};

  var request = apiPutParticipant(function(data) {}, function(data) {}, event_id, local_entry_id, data, '');
  $.when(request).done(function()
  {
    $('#cancelParticipant').removeClass('loading');
    loadParticipant();
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

  var request = apiPutParticipant(function(data) {}, errorHandler, event_id, local_entry_id, changes_to_save, '');
  $.when(request).done(function()
  {
    $('#updateParticipant').removeClass('loading');
    loadParticipant();
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

function isStudentChanged(sender)
{
  changes_to_save['is_student'] = $(sender).is(':checked');
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

function travelInformationChanged(sender)
{
  changes_to_save['travel_information'] = $(sender).val();
}


function commentChanged(sender)
{
  changes_to_save['comment'] = $(sender).val();
}


function allergiesChanged(sender)
{
  addPersonObjectToChangesToSave();
  changes_to_save.person['allergies'] = $(sender).val();
}

function isAccreditatedChanged(sender)
{
  changes_to_save['accreditated'] = $(sender).is(':checked');
}

function clubChanged(sender)
{
  changes_to_save['club_id'] = $(sender).val();
}

function isClubMemberChanged(sender)
{
  changes_to_save['is_clubmember'] = $(sender).is(':checked');
}

function resendReceipt(sender)
{
  $(sender).addClass('loading');
  var request = apiResendReceipt(function(data) {
    $('#receipt-sent').modal('show');
  }, errorHandler, event_id, local_entry_id);

  $.when(request).done(function()
  {
    $(sender).removeClass('loading');
  });
}

function confirmPortrait()
{
  var canvas = $("#portrait_crop").cropper("getCroppedCanvas");
  var base64 = canvas.toDataURL("image/jpeg");

  // Trim away any 'data:image/jpeg;base64,' at the beginning.
  base64 = base64.replace('data:image/jpeg;base64,', '');
  var json_data = {'portrait_data': base64};
  var request = apiPutPortrait(function(data) { loadParticipant(); }, errorHandler, event_id, local_entry_id, json_data, '');
  $.when(request).done(function()
  {
    $('#image_modal').modal('hide');
  });
}

function deleteEntryExercise(sender, entryExerciseId)
{
  $(sender).addClass('loading');
  var request = apiDeleteEntryExercise(function(data) { loadParticipant(); }, errorHandler, event_id, local_entry_id, entryExerciseId);

  $.when(request).done(function()
  {
    $(sender).removeClass('loading');
  });
}


function beginAddExercise(sender)
{
  selectedExerciseForEntry = null;
  $('#select-exercise-modal').modal('show');
}


var selectedExerciseForEntry = null;
function nextAfterSelectExercise(sender)
{
  // Find/get selected exercise.
  var exerciseId = parseInt($('#select-exercise-dropdown').val());
  if (isNaN(exerciseId))
  {
    $('#select-exercise-modal').modal('hide');
    return;
  }

  $.each(sports, function(i, sport)
  {
    $.each(sport.exercises, function(j, exercise)
    {
      if (exercise.exercise_id == exerciseId)
      {
        selectedExerciseForEntry = exercise;
        return false;
      }
    });

    if (selectedExerciseForEntry != null)
      return false;
  });

  $(sender).addClass('loading');
  if (selectedExerciseForEntry.is_teamexercise)
  {
    // Print teams for this exercise.
    $('#select-exercise-team-dropdown').empty();
    $('#select-exercise-team-dropdown').append('<option value="">Velg lag</option>');
    sortArrayByString(teams, 'team_name');
    $.each(teams, function(i, team)
    {
      if (team.exercise_id == selectedExerciseForEntry.exercise_id)
      {
        var text = team.team_name + ' (' + genderToString(team.team_gender) + ')';
        var id = team.team_id;

        $('#select-exercise-team-dropdown').append('<option value="' + id + '">' + text + '</option>');
      }
    });
    $('#select-exercise-team-dropdown').dropdown();
    $('#select-exercise-team-modal').modal('show');

    $(sender).removeClass('loading');
    $('#select-exercise-modal').modal('hide');

    return;
  }
  else
  {
    var data = {'exercise_id': selectedExerciseForEntry.exercise_id};
    var request = apiPostEntryExercise(function() { loadParticipant(); }, errorHandler, event_id, local_entry_id, data);

    $.when(request).done(function()
    {
      $(sender).removeClass('loading');
      $('#select-exercise-modal').modal('hide');
    });
    return;
  }
}

function doTeamEntry(sender)
{
  $(sender).addClass('loading');
  var teamId = parseInt($('#select-exercise-team-dropdown').val());
  if (isNaN(teamId))
  {
    $('#select-exercise-team-modal').modal('hide');
    return;
  }

  var data = {'exercise_id': selectedExerciseForEntry.exercise_id, 'team_id': teamId};
  var request = apiPostEntryExercise(function() { loadParticipant(); }, errorHandler, event_id, local_entry_id, data);

  $.when(request).done(function()
  {
    $(sender).removeClass('loading');
    $('#select-exercise-team-modal').modal('hide');
  });
}

function additionChecked(sender)
{
  // Find out if the value was checked or not
  $("#participantLoader").show();
  var checked = $(sender).is(':checked');
  var request = null;
  if (checked)
  {
    var additionId = parseInt($(sender).attr('addition-id'));
    var data = {'addition_id': additionId, 'num_items': 1 };
    request = apiPostEntryAddition(function(data) { }, errorHandler, event_id, local_entry_id, data);
  }
  else
  {
    var entryAdditionId = parseInt($(sender).attr('entry-addition-id'));
    request = apiDeleteEntryAddition(function(data) { }, errorHandler, event_id, local_entry_id, entryAdditionId);
  }

  $.when(request).always(function()
  {
    loadParticipant();
  });
}