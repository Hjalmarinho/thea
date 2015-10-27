"use strict";

var event_id = sessionStorage.getItem("event_id");

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

  var getSportsRequest = apiGetSports(getSports, errorHandler, event_id);
  var getTeamsRequest =  apiGetAllTeams(getTeams, errorHandler, event_id);
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

<<<<<<< 8edb65797e29be723fd5cab4cb1e970040a7b868
function getSports(sports_array)
{
  sports = sports_array;
}

function getTeams(teams_array)
{
  teams = teams_array;
}
=======
//Global variables, updated in displayParticipant
var local_entry_id = GetURLParameter('entry_id');
var local_status
var local_birthdate
var local_time_registrated
var local_ticket_id
var local_person_id
var local_user_id
var global_participant
var id_participantname
var id_cancel_participant

>>>>>>> muh

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
    id_comment.text(escapeHtml(participant.comment))

  // Receipt
  $('#recieptParticipant').unbind('click');
  $('#recieptParticipant').click(function() { getReceipt(local_entry_id); });


  // ******** PAYMENT INFORMATION ********
  if (participant.orders)
    printOrders(participant.orders);

  // Canceled participant
  is_canceled = (participant.status == "CANCELLED");
  setCanceled();
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
    <div class="field four wide"><button class="ui disabled red button">Fjern</button></div> \
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

/*
function dropdownlist(name, className, id){
  return('\
    <div class="inline fields">\
      <label class="field four wide">' + name + '</label>\
      <div class="field nine wide">\
        <select class="ui fluid dropdown selection ' + className + '" id="'+ id +'"><option value="">Velg lag</option></select>\
      </div>  \
    </div>\
  ')
}
*/
/*function updateParticipant(){

  monthToNumber($('#birthmonth').val())
  var local_birthdate = $('#birthyear').val() + '-' + monthToNumber($('#birthmonth').val()) + '-' + $('#birthday').val()
  var comment = $('#update-comment').val()
  
  var putObject = {}
  putObject['accreditated'] = $('#accreditatedCheckbox').is(':checked')
  putObject['comment'] = $('#comment').val()
  putObject['entry_id'] = local_entry_id
  putObject['is_clubmember'] = $('#clubmemberCheckbox').is(':checked')
  putObject['is_student'] = $('#studentCheckbox').is(':checked')
  putObject['status'] = local_status
  putObject['time_registrated'] = local_time_registrated
  putObject['travel_information'] = $('#travel_information').val()

  putObject['ticket'] = {}
  putObject.ticket['ticket_id'] = local_ticket_id

  putObject['club'] = {}
  putObject.club['club_id'] = $('#clubs').val()
  putObject.club['club_name'] = $('#clubs option[value="' + $('#clubs').val() + '"').text()

  putObject['person'] = {}
  putObject.person['first_name'] = $('#first_name').val()
  putObject.person['last_name'] = $('#last_name').val()
  putObject.person['gender'] = $('#selectgender').val()
  putObject.person['birthdate'] = local_birthdate
  putObject.person['email'] = $('#email').val()
  putObject.person['phone'] = $('#phone').val()
  putObject.person['allergies'] = $('#allergies').val()
  putObject.person['person_id'] = local_person_id
  putObject.person['portrait_id'] = 'null'
  putObject.person['user_id'] = local_user_id

  apiPutParticipant(local_entry_id, putObject, function(){} , comment)
  console.log(putObject)
}*/

var currentCreditTransactionId = null;
function showCreditParticipant(sender, transactionId)
{
  currentCreditTransactionId = transactionId;
  $('#credit-update').modal('show');
}
<<<<<<< 8edb65797e29be723fd5cab4cb1e970040a7b868

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
=======
*/
function cancelParticipant(){
	if (participant.status != "CANCELLED"){
		var comment = $('#cancel-comment').val()
		apiCancelParticipant(local_entry_id, participantIsCanceled, participantNotCanceled, comment)
	}else{
		console.log('ukanseller')
	}
}

function participantIsCanceled(){
	console.log('hei')
	$('.participantname').append(' <span style="color:#d01919;">(kansellert)</span>')
	id_cancel_participant.text('Meld på igjen')
	id_cancel_participant.removeClass("red").addClass("green");
	$('#cancelOrNo').text('melde på igjen ')
}

function participantNotCanceled(){
	console.log("Her skjedde det noe feil")
}


>>>>>>> muh

var is_canceled = false;
function cancelParticipant()
{
  $('#cancelParticipant').addClass('loading');

  var request = null;
  if (is_canceled)
    request = apiUncancelParticipant(local_entry_id, function(data) {}, function(data) {}, '');
  else
    request = apiCancelParticipant(local_entry_id, function(data) {}, function(data) {}, '');

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
