"use strict";

// **********************************************************************
//  [Main JavaScript]

//  Project:        Thea
//  Version:        2.0
//  Last change:    11/08/2015
//  Author:         Øystein Molnes
//  Primary use:    Main functions used by the entry GUI
// ***********************************************************************

//This function is run when the document/page is finsihed loading
var event_obj = null;
$( document ).ready(function() {
  // Initialize dropdown
  // $('.ui.dropdown').dropdown();

  //API-calls on page load, parameter is the callback-function
  var req1 = apiGetClubs(displayClubs, showError);
  var req2 = apiGetSports(saveSports, showError, eventId);
  var req3 = apiGetAdditions(displayAdditions, showError, eventId);
  var req4 = apiGetEvent(displayEventInfo, showError, eventId);

  $.when(req1, req2, req3).always(function()
  {
    $("#mainLoader").remove();
  });

  // Display confirm-modal if the form is valid
  $('#entry_button').click(function()
  {
    if ($('#entry_form').form('is valid'))
    {
      // See if portrait is added
      if ($('#portrait').attr('src') === undefined)
      {
        showError("Du må laste opp et portrettbilde først.");
        return;
      }

      createConfirmModal();
      $('#confirm_modal').modal('show');
    }
  });

  // Display image-modal for portrait-upload
  $('#image_button').click(function()
  {
    $('#image_modal').modal('show');
    $("#portrait_crop").cropper('replace', $("#portrait_crop").attr("src"));
  });

  // Prevent entry_form from submitting when clicking "Meld på"
  $("#entry_form").submit(function(event)
  {
      event.preventDefault();
  });
});

// Constants
var TICKET_TYPE_PARTICIPANT = 1;
var TICKET_TYPE_TEAM = 2;
var TICKET_TYPE_SUPPORTER = 3;
var TICKET_TYPE_EXTRA = 4;
var sports = null;
var allSports = null;

//      UPDATE GUI FUNCTIONS
// ***********************************************************************


function displayEventInfo(event_obj)
{
  if (event_obj.terms_url === null)
  {
    $('#terms').hide();
    $('#terms input').prop('checked', true);
  }
  else
  {
    $('#terms_url').attr('href', event_obj.terms_url);
  }
}


// Populate dropdown with clubs received from API
function displayClubs(clubs){
    if (clubs) {
    // Sort clubs by their name
    sortArrayByString(clubs, "club_name");

        $.each(clubs, function(i, club){
           $('#clubs').append('<option value="'+club.club_id+'">' + escapeHtml(club.club_name) + '</option>');
       });
    }
}

function saveSports(sports_local)
{
  sports = sports_local;
  allSports = [];
  for (var i = 0; i < sports_local.length; ++i) {
    // sports_local[i].sub_id = Math.random();
    allSports.push(sports_local[i]);
  }

  var ticket_type = $('#ticket_type').data('value');
  if (ticket_type == TICKET_TYPE_TEAM)
  {
    var removeIndexes = [];

    for (var i = 0; i < sports.length; ++i)
    {
      if (!hasTeamExercise(sports[i]))
        removeIndexes.push(i);
    }

    for (var i = removeIndexes.length - 1; i >= 0; --i)
      sports.splice(removeIndexes[i], 1);

    var sports_temp = []
    for (var i = 0; i < sports.length; ++i)
    {
      var newSport = jQuery.extend(true, {}, sports[i]);

      var totalTeamExercises = 0;
      for (var j = 0; j < sports[i].exercises.length; ++j)
      {
        if (sports[i].exercises[j].is_teamexercise)
          totalTeamExercises++;
      }
      newSport.total_teamexercises = totalTeamExercises;
      sports_temp.push(newSport);
    }
    sports = [];

    for (var i = 0; i < sports_temp.length; ++i)
    {
      for (var j = 0; j < sports_temp[i].exercises.length; ++j)
      {
        if (sports_temp[i].exercises[j].is_teamexercise)
        {
          var sportDescription = sports_temp[i].sport_description;
          if (sports_temp[i].total_teamexercises > 1)
            sportDescription = sportDescription + ' - ' + sports_temp[i].exercises[j].exercise_description;

          var newSport = {'sub_id': Math.random(), 'sport_id': sports_temp[i].sport_id, 'sport_description': sportDescription, 'exercises': [] };
          newSport.exercises.push(jQuery.extend(true, {}, sports_temp[i].exercises[j]));

          sports.push(newSport);
        }
      }
    }
  }

  if (sports.length == 1 && sports[0].exercises.length == 1)
  {
    $('#add-sport-button').hide();
  }
  displaySports(0);
  displaySports(1);
}

function isExtraSportInTeamEntry(ticket_type, sport_box_id) {
  return ticket_type == TICKET_TYPE_TEAM && sport_box_id >= 1;
}


// Populate dropdown with sports received from API
function displaySports(sport_box_id)
{
  var sportsArray = sports;
  var ticket_type = $('#ticket_type').data('value');
  if (isExtraSportInTeamEntry(ticket_type, sport_box_id)) {
    sportsArray = allSports;
  }

  if (sportsArray)
  {
    // First, sort sports by their description.
    sortArrayByString(sportsArray, "sport_description");

    $.each(sportsArray, function(i, sport)
    {
      var ticket_type = $('#ticket_type').data('value');
      // Display only sports having a team_exercise if user is adding a team
      if (sport_box_id < 1 && hasTeamExercise(sport))
      {
        $('#sports_' + sport_box_id).append('<option data-exercise-id="' + sport.exercises[0].exercise_id + '" data-sport-id="' + sport.sport_id + '" data-sub-id="' + sport.sub_id + '">' + escapeHtml(sport.sport_description) + '</option>');
      }
      // Display all sports for a participant
      else
      {
        $('#sports_' + sport_box_id).append('<option data-sport-id="' + sport.sport_id + '">' + escapeHtml(sport.sport_description) + '</option>');
      }
    });

    $('.dropdown').dropdown('refresh');

    // Get and display exercises when a sport is selected, for the correct sports_box
    $('#sports_' + sport_box_id).change(function(event)
    {
      var sport_box_id = parseInt(event.target.id.substr(event.target.id.indexOf("_") + 1));
      var dropdown = $('#sports_' + sport_box_id);
      var subId = null;
      var sportId = null;

      var ticket_type = $('#ticket_type').data('value');
      if (sport_box_id < 1)
      {
        subId = parseFloat($(this).find('option:selected').attr('data-sub-id'));
        sportId = parseFloat($(this).find('option:selected').attr('data-sport-id'));
      }
      else
      {
        sportId = parseFloat($(this).find('option:selected').attr('data-sport-id'));
      }

      var sportObject = getSportObject(sportId, subId);
      displayExercises(sportObject.exercises, sport_box_id);
    });
  }
}


/*
  The subId-parameter is for new team entries. Erik should fill out more
  info here...
*/
function getSportObject(sportId, subId)
{
  if (subId == null)
  {
    for (var i = 0; i < allSports.length; ++i)
    {
      if (allSports[i].sport_id == sportId)
        return allSports[i];
    }
  }
  else
  {
    for (var i = 0; i < sports.length; ++i)
    {
      if (sports[i].sport_id == sportId && sports[i].sub_id == subId)
        return sports[i];
    }
  }

  return null;
}


function exerciseChecked(sender) {
    // TODO: Implement
  var isChecked = $(sender).is(':checked');
  var exerciseId = parseInt($(sender).val());
  var isTeamExercise = $(sender).parent().parent().parent().attr('data-is-teamexercise') === 'true';

  if (isChecked)
    $('#extra_field_exercise_' + exerciseId).show();
  else
    $('#extra_field_exercise_' + exerciseId).hide();

  if (!isTeamExercise)
    return;

  if (isChecked)
  {
    // Get teams for this exercise and populate teams dropdown
    apiGetTeams(function(teams) { displayTeams(teams, exerciseId); },
                showError, eventId, exerciseId);
    $('#teams_container_' + exerciseId).show();
  }
  else
  {
    $('#teams_container_' + exerciseId).hide();
  }
}


// Generate checkboxes for exercises received from API
function displayExercises(exercises, sport_box_id)
{
  var curr_id = sport_box_id;
  $('#exercises_' + curr_id).empty();
  $('#teams_container_' + curr_id).hide();
  if (exercises)
  {
    // Sort exercises by name
    sortArrayByString(exercises, 'exercise_description');

    //Display checkboxes for each available exercise if there are many
    $.each(exercises, function(i, exercise)
    {
      var checkbox = generateExerciseCheckbox(exercise, sport_box_id);
      $('#exercises_' + curr_id).append(checkbox);
      // Print any extra fields (such as EmiTag-number for orienteering,
      // estimated time for swimming etc...)
      printExerciseExtraFields(exercise.exercise_extra_fields, '#exercise_' + exercise.exercise_id, exercise);
    });

    // If sport has only one exercise, check and hide it
    if (exercises.length == 1)
    {
      $('#exercises_' + curr_id + ' input:checkbox').each(function()
      {
        $(this).attr('checked', true);
        $(this).parent().css('display', 'none');
        exerciseChecked($(this));
      });
    }

    $('.dropdown').dropdown('refresh');
  }
}


function generateExerciseCheckbox(exercise, sport_box_id)
{
  var ticket_type = parseInt($('#ticket_type').data('value'));
  var html = '<div id="exercise_' + exercise.exercise_id + '" data-is-teamexercise="' + exercise.is_teamexercise + '">';
  var checkbox = generateCheckbox(exercise.exercise_description, exercise.exercise_id,
                                  false, 'exerciseChecked(this)');

  html = html + checkbox;
  if (exercise.is_teamexercise && sport_box_id > 0)
  {
    html = html + '<div class="ui field" id="teams_container_' + exercise.exercise_id + '" style="display:none;"> \
                      <select class="ui search dropdown"> \
                        <option value="">Hvilket lag skal du delta med?</option> \
                        <!-- Teams are populated here from api_handler when a team sport is selected --> \
                      </select> \
                </div>';
  }

  html = html + '</div>';

  return html;
}


function printExerciseExtraFields(exerciseExtraFields, htmlContainerId, exercise)
{
  var html = '<div id="extra_field_exercise_' + exercise.exercise_id + '" class="ui field"  style="display:none;">';
  $.each(exerciseExtraFields, function(i, exerciseExtraField)
  {
    html = html + '<i>' + exerciseExtraField.exercise_extra_field_description + '</i>';
    html = html + '<input type="text" data-exercise-extra-field-id="' + exerciseExtraField.exercise_extra_field_id + '" style="width:100%;">';
  });

  html = html + '</div>';
  $(htmlContainerId).append(html);
}


// Generate checkboxes for teams received from API
function displayTeams(teams, exerciseId)
{
  var teamsSelector = $('#teams_container_' + exerciseId + ' select');
  $(teamsSelector).empty();
  if (teams)
  {
    // Sort teams by name
    sortArrayByString(teams, "team_name");
    $.each(teams, function(i, team)
    {
      var team_text = '';
      if (team.team_gender == 'Mix')
        team_text = team_text + '(Mix) ';
      else if (team.team_gender == 'Male')
        team_text = team_text + '(H) ';
      else if (team.team_gender == 'Female')
        team_text = team_text + '(D) ';

      team_text = team_text + team.team_name;
      $(teamsSelector).append('<option value="' + team.team_id + '">' + escapeHtml(team_text) + '</option>');
    });
  }
}

// Generate checkboxes for exercises received from API
var flippedBanquetId = null;
var allAdditions = null;
function displayAdditions(additions)
{
  allAdditions = additions;
    if (additions)
    {
        if (additions.length == 0)
            $('#additions-container').hide();
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
                displayAdditionWithChildren(addition, additions.slice());
            }
            else
            {
                var addition_label = addition.addition_description + ' (' + addition.addition_fee + ' ,-)';

                // Special handling of 'bankett'. We want to write "skal ikke delta på bankett".
                if (addition.addition_description == "Bankett" && addition.addition_fee == 0)
                {
                    flippedBanquetId = addition.addition_id;
                    addition_label = "Skal IKKE delta på bankett";
                    $('#additions').append(generateCheckbox(addition_label, addition.addition_id, false, ''));
                }
                else
                {
                    $('#additions').append(generateCheckbox(addition_label, addition.addition_id, (addition.addition_fee == 0), ''));
                }
            }
        });
   }

   // "Activate" any radiobuttons.
   $('.ui.radio.checkbox').checkbox();
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
  var first = true;
  $('#additions').append('<h2 class="ui sub header">' + parentAddition.addition_description + '</h2>');

  // This is a VERY ugly hack.
  if (eventId == 3)
    $('#additions').append('<div class="sub header"><i>Jenter anbefales å velge en størrelse lavere enn vanlig</i></div>');

  sortArrayByNumber(additions, 'addition_id');
  $.each(additions, function(i, children)
  {
    if (children.parent_addition_id == parentAddition.addition_id)
    {
      // Print the addition.
      $('#additions').append(
        '<div class="field"> \
            <div class="ui radio checkbox"> \
                <input type="radio" id="' + parentAddition.addition_description + ', ' + children.addition_description + '" value="' + children.addition_id + '" name="fruit" tabindex="0" ' + (first ? ' checked ' : '') + ' class="hidden"> \
                <label>' + children.addition_description + ' ' + ' (' + children.addition_fee + ' ,-)' + '</label> \
            </div> \
         </div>'
        );

      first = false;
    }
  });
  $('#additions').append('<br>');
}

var next_sport_box_id = 2;
// Create GUI to allow user to sign up for several sports
function addSport() {
    // We create and add a new sports_box and set the correct IDs for its input-fields
    next_sport_box_id++;
    var $sports_box = $("#sports_box_1").clone();
    $sports_box.show();
    $sports_box.attr("id", "sports_box_" + next_sport_box_id);
    var $remove_btn =  '<div class="inline fields">'+
                            '<label class="field four wide"></label>'+
                            '<div class="ui button" onclick="removeSport(this)"> Fjern</div>'+
                        '</div>';

    $sports_box.prepend('<div class="ui divider"> </div>');
    $sports_box.append($remove_btn);
    $("#sports_container").append($sports_box);

    var $sports = $sports_box.find("[name='sports']");
    $sports.attr("id", "sports_" + next_sport_box_id)

    var $exercises = $sports_box.find("[data-name='exercises']");
    $exercises.attr("id", "exercises_" + next_sport_box_id)

    displaySports(next_sport_box_id);
}

//Remove sport_box from GUI
function removeSport(removeButton){
    $(removeButton).closest('[data-name="sports_box"]').remove();
}

function formatGender(input) {
  if (input == "MALE") {
    return "Mann";
  } else if (input == "FEMALE") {
    return "Dame";
  }

  return input;
}

function formatTeamGender(input) {
  if (input == "MALE") {
    return "Herrer";
  } else if (input == "FEMALE") {
    return "Damer";
  } else if (input == "MIX") {
    return "Mix";
  }

  return input;
}

function formatBool(input) {
  if (input === true) {
    return "Ja";
  }

  return "Nei";
}

function formatSport(sport_id) {
  var sportObject = getSportObject(sport_id, null);
  return sportObject.sport_description;
}

function formatExercise(exercise_id) {
  for (var i = 0; i < allSports.length; ++i) {
    var sport = allSports[i];
    for (var j = 0; j < sport.exercises.length; ++j) {
      var exercise = sport.exercises[j];
      if (exercise.exercise_id == exercise_id) {
        return exercise.exercise_description;
      }
    }
  }
  return null;
}

function formatAddition(addition_id) {
  for (var i = 0; i < allAdditions.length; ++i) {
    var addition = allAdditions[i];
    if (addition.addition_id == addition_id) {
      return addition.addition_description;
    }
  }
  return null; 
}

//When user clicks "Meld på" a confirm-modal is populated with the data that the user has entered
function createConfirmModal(){
  var ticket_type = parseInt($('#ticket_type').data('value'));
  var entryData = createJSON();

  //Create personal info
  $('#confirm_personal_container').empty();
  var personal_html = '';
  personal_html += generateLabelPair('Fornavn', entryData.entry.person.first_name);
  personal_html += generateLabelPair('Etternavn', entryData.entry.person.last_name);
  personal_html += generateLabelPair('Fødselsdato', moment(entryData.entry.person.birthdate).format("Do MMMM YYYY"));
  personal_html += generateLabelPair('Kjønn', formatGender(entryData.entry.person.gender));

  if (ticket_type != TICKET_TYPE_EXTRA)
    personal_html += generateLabelPair('Student', formatBool(entryData.entry.is_student));
  personal_html += generateLabelPair('Epost', entryData.entry.person.email);
  personal_html += generateLabelPair('Mobil', entryData.entry.person.phone);

  if (ticket_type != TICKET_TYPE_EXTRA)
    personal_html += generateLabelPair('Reiseinfo', entryData.entry.travel_information);

  if (ticket_type == TICKET_TYPE_EXTRA)
  {
    personal_html += generateLabelPair('Funksjon/rolle', entryData.entry.role);
    personal_html += generateLabelPair('Organisasjon', entryData.entry.organization);
  }

  $('#confirm_personal_container').append(personal_html);

  //Create participant info
  $('#confirm_participant_container').empty();
  var participant_html = '';

  if (ticket_type != TICKET_TYPE_EXTRA)
    participant_html += generateLabelPair('Klubb', $('#clubs  option:selected').text() );

  if (ticket_type != TICKET_TYPE_SUPPORTER && ticket_type != TICKET_TYPE_EXTRA)
  {
    participant_html += generateLabelPair('Medlem', formatBool(entryData.entry.is_clubmember));
    var counter = 1;

    for (var i = 0; i < entryData.entry.sports.length; ++i) {
      var sport = entryData.entry.sports[i];

      for (var j = 0; j < sport.exercises.length; ++j) {
        var exercise = sport.exercises[j];

        participant_html += generateLabelPair('Øvelse ' + counter, formatSport(sport.sport_id) + ' - ' + formatExercise(exercise.exercise_id));

        if (('team' in exercise)) {
          var team = exercise.team;
          participant_html += generateLabelPair('- Lagnavn', team.team_name);
          participant_html += generateLabelPair('- Spillende', formatBool(exercise.is_player));

          if (('team_gender' in team)) {
            participant_html += generateLabelPair('- Klasse', formatTeamGender(team.team_gender));
          }
        }
        counter++;
      }
    }
  }

  $('#confirm_participant_container').append(participant_html);


  //Create additional info
  $('#confirm_additions_container').empty();
  var additions_html = '';

  additions_html += '<img src="' + $('#portrait').attr('src') + '" style="width:75px; height:100px;"/>';

  for (var i = 0; i < entryData.entry.additions.length; ++i) {
    var addition = entryData.entry.additions[i];
    additions_html += generateLabelPair('Tillegg', formatAddition(addition.addition_id));    
  }

  additions_html += generateLabelPair('Allergier', entryData.entry.person.allergies);
  $('#confirm_additions_container').append(additions_html);
}

//Redirect user to payment-page
function redirectToPayment(data){
    window.location.replace(data.payment_url);
}



//      PORTRAIT CROPPING
// ***********************************************************************
// Most of it is included in head.php now.

// Confirm the cropped portrait and close modal.
function confirmPortrait()
{
  var canvas = $("#portrait_crop").cropper("getCroppedCanvas");
  $('#portrait_container').html('<img id="portrait" style="display:none; width:150px; height:200px;" alt="Portrettbilde" src="' + canvas.toDataURL() + '" />');
  $('#image_modal').modal('hide');
  $('#portrait').show();
}


//      POST TO API FUNCTIONS
// ***********************************************************************

//Called when a participant clicks the submit-button
function submitParticipantForm(){
    var ticket_type = parseInt($('#ticket_type').data('value'));
    $("#paymentButton").addClass("loading");
    //Serialize the form into a json-object in order to post the participant to the API
    var jsonForm = createJSON();

    // Check that there is a team selected in all sport exercises.
    for (var i = 0; i < jsonForm.entry.sports.length; ++i)
    {
      var sport = jsonForm.entry.sports[i];
      for (var j = 0; j < sport.exercises.length; ++j)
      {
        var exercise = sport.exercises[j];
        if (('team' in exercise) && exercise.team.team_id === null)
        {
          showError('Du må velge hvilket lag du ønsker å delta på. Vil du registrere et nytt lag, må du gå ett steg tilbake og velge "Meld på lag".');
          return;
        }
      }
    }

    //Post the participant using the API
    var request = null;
    if (ticket_type == TICKET_TYPE_EXTRA)
    {
      request = apiPostExternalPerson(externalPersonPosted, showError, jsonForm, eventId);
    }
    else
    {
      request = apiPostParticipant(redirectToPayment, showError, jsonForm, eventId);
    }

    $.when(request).always(function() {
      $("#paymentButton").removeClass("loading");
    });

}


function externalPersonPosted(data)
{
  $('#confirm_modal').modal('hide');
  $('#confirm-extra-modal').modal('show');
}


//Called when a user has completed payment
function completeEntry(orderNumber, eventId, callback, errorCallback){
    apiPutTransaction(callback, errorCallback, orderNumber, eventId);
}


//Called when a user cancelled the payment
function terminateEntry(orderNumber) {
    apiPutTerminateEntry(function(data) { return true; }, function(data) { return true; }, orderNumber, eventId);
}


function showError(error_msg) {
    $("#error_message").text(error_msg);
    $("#error_modal").modal("show");
}

//      HELP FUNCTIONS
// ***********************************************************************
//Constructs a JSON-object from the data that has been entered in the GUI
function createJSON(){
    var ticket_type = parseInt($('#ticket_type').data('value'));

    var jsonForm = {};
    var entry = {};
    jsonForm["redirect_url"] = redirectURL;
    jsonForm["entry"] = entry;

    if (ticket_type == TICKET_TYPE_EXTRA) {
      jsonForm["key"] = key;
      entry["role"] = $('#role').val();
      entry["organization"] = $('#organization').val();
    }

    //Personal information
    entry["is_clubmember"] = (($('#is_clubmember').val()  == 1) ? true : false);
    entry["is_student"] = (($('#is_student').val()  == 1) ? true : false);
    entry["travel_information"] = $('#travel_information  option:selected').text();

    var person = {};
    person["first_name"] = $('#first_name').val();
    person["last_name"]  = $('#last_name').val();
    person["phone"]      = $('#phone').val();
    person["email"]      = $('#email').val();
    person["gender"]     = $('#gender').val();
    person["birthdate"]  = $('#birthyear').val()+ '-' + $('#birthmonth').val() + '-' + lpad($('#birthday').val(), 2, '0');
    person["allergies"]  = $('#allergies').val();
    var portrait   = {};
    portrait["portrait_data"] = $('#portrait').attr('src');
    person["portrait"] = portrait;
    entry["person"]   = person;

    //Participant information
    var club_id = parseInt($('#clubs').val());
    entry["club"] = {"club_id": club_id};

    var ticket_id = parseInt(GetURLParameter('ticket_id'));
    entry["ticket"] = {"ticket_id": ticket_id};

    entry["sports"] = uiGetSports(ticket_type);

    //Additions
    entry["additions"] = [];

    //Add all checked additions
    entry["additions"] = uiGetAdditions();

    return jsonForm;
}

//Iterate the additions-checkboxes and see which have been checked
function uiGetAdditions(){
    var additions = [];
    $('#additions input:checked').each(function()
    {
        var addition_id = parseInt($(this).attr('value'));
        if (addition_id != flippedBanquetId)
        {
            // Do NOT add flipped banquet ID (makes no sense... I know).
            var num_items = parseInt('1');
            additions.push({"addition_id": addition_id, "num_items": num_items});
        }
    });

    // Check if we have any flipped banquet (...like "skal IKKE delta på bankett").
    if (flippedBanquetId != null)
    {
        $('#additions input:checkbox:not(:checked)').each(function()
        {
            var addition_id = parseInt($(this).attr('value'));
            if (addition_id == flippedBanquetId)
            {
                // Add flipped banquet ID (makes no sense... I know).
                var num_items = parseInt('1');
                additions.push({"addition_id": addition_id, "num_items": num_items});
            }
        });
    }
    return additions;
}

//Iterate the exercise-checkboxes and see which have been checked, or if a team is to be added
function uiGetSports(ticket_type)
{
  var sports = [];
  // Iterate through sports_boxes and get exercises
  $('#sports_container [data-name="sports_box"]:visible').each(function()
  {
    var sportBoxId = $(this).attr('id').substr($(this).attr('id').indexOf('_') + 5);
    var sport = {};
    var sportId =  parseInt($('#sports_' + sportBoxId).find(':selected').attr('data-sport-id'));
    sport['sport_id'] = sportId;
    var exercises = [];

    if (sportBoxId == 0)
    {
      var exerciseId = parseInt($('#sports_' + sportBoxId).find(':selected').attr('data-exercise-id'));
      var is_player = (($('#is_playing').val() == '1') ? true : false);
      var team_name = $('#team_name').val();
      var team_gender = $('#team_gender').val();
      var team_number = 0;
      var team = {'team_name': team_name, 'team_gender': team_gender, 'team_number': team_number};
      exercises.push({'exercise_id': exerciseId , 'is_player': is_player, 'team': team });
    } else {
      // Find and add checked exercises for a participant
      $(this).find('div[id^=exercise_]:visible').each(function()
      {
        var exerciseId = parseInt($(this).attr('id').substr($(this).attr('id').indexOf('_') + 1));
        var isTeamexercise = $(this).attr('data-is-teamexercise') === 'true';

        if ($(this).find('input').is(':checked'))
        {
          // The exercise is checked.
          var exercise = {'exercise_id': exerciseId , 'exercise_extra_fields': [] };
          $(this).find('[id^=extra_field_exercise_] input').each(function()
          {
            // Any extra fields
            var exerciseExtraFieldId = parseInt($(this).attr('data-exercise-extra-field-id'));
            var value = $(this).val();
            exercise.exercise_extra_fields.push({'exercise_extra_field_id': exerciseExtraFieldId, 'value': value});
          });

          // The exercise is checked.
          if (isTeamexercise)
          {
            var teamsContainer = $('#teams_container_' + exerciseId);
            var teamId = $(teamsContainer).find('select').val();
            var teamName = $(teamsContainer).find('select').dropdown('get text')[0];
            var team = {'team_id': teamId, 'team_name': teamName, 'is_player': true};
            exercise['team'] = team;
          }

          exercises.push(exercise);
        }
      });
    }

    sport['exercises'] = exercises;
    sports.push(sport);
  });

  return sports;

//  var sports = [];
//  // Iterate through sports_boxes and get exercises
//  $('#sports_container [data-name="sports_box"]').each(function()
//  {
//    var sport = {};
//    var sportId =  $(this).attr('id').substr($(this).attr('id').indexOf('_') + 5);
//    sport['sport_id'] = parseInt($('#sports_'+sportId).val());
//
//    var exercises = [];
//    // Find and add checked exercises for a participant
//    if (ticket_type == TICKET_TYPE_PARTICIPANT)
//    {
//      $('#exercises_' + sportId + ' input:checked').each(function()
//      {
//        var exercise_id = parseInt($(this).attr('value'));
//        var team_id = parseInt(parseInt($('#teams_' + sportId).val()));
//        var team = {'team_id': team_id};
//
//        var exercise = {'exercise_id': exercise_id , 'team': team, 'exercise_extra_fields': [] };
//        // Add extra fields
//        $($(this).parent().parent().parent().find('input:text')).each(function()
//        {
//          var exerciseExtraFieldId = parseInt($(this).attr('data-exercise-extra-field-id'));
//          var value = $(this).val();
//
//          exercise.exercise_extra_fields.push({'exercise_extra_field_id': exerciseExtraFieldId, 'value': value});
//        });
//
//        exercises.push(exercise);
//      });
//    }
//    else if (ticket_type == TICKET_TYPE_TEAM)
//    {
//      // Add exercise with team info for team
//      $('#exercises_' + sportId + ' input:checked').each(function()
//      {
//        var exercise_id = parseInt($(this).attr('value'));
//        var is_player = (($('#is_playing').val() == '1') ? true : false);
//        var team_name = $('#team_name').val();
//        var team_gender = $('#team_gender').val();
//        var team_number = 0;
//
//        var team = {'team_name': team_name, 'team_gender': team_gender, 'team_number': team_number};
//
//        exercises.push({'exercise_id': exercise_id , 'is_player': is_player, 'team': team });
//      });
//    }
//    sport['exercises'] = exercises;
//
//    sports.push(sport);
//  });
//
//  return sports;
}

//Check whether a sport has any team exercises
function hasTeamExercise(sport){
    var hasTeamExercise = false;

    $.each(sport.exercises, function(i, exercise){
        if(exercise.is_teamexercise){
            hasTeamExercise = true;
        }
    });
    return hasTeamExercise;
}

//Get the ID for the sports_container to be added when user wants to sign up for several sports
// function getNextSportsContainerId(){
//   var nextSportsContainerId = null;
//   $('#sports_container > div').each(function()
//   {
//     nextSportsContainerId = $(this).attr("id").substr($(this).attr("id").length - 1);
//   });

//   return parseInt(nextSportsContainerId)+1;
// }

// Create and return a checkbox with given value and label
function generateCheckbox(label, value, checked, onchange){
    var checkedStr = '';
    if (checked === true)
        checkedStr = ' checked ';

    return  '<div class="field">'+
    '<div class="ui checkbox">'+
    '<input type="checkbox" value="'+value+'" id="addition_id_' + value + '" onchange="'+ onchange +'" ' + checkedStr +'>' +
    '<label for="addition_id_' + value + '">'+label+'</label>'+
    '</div>'+
    '</div>';
}

// Create and return a pair of labels for the confirm modal
function generateLabelPair(label, value){
  return   '<div class="inline fields">'+
  '<label class="field four wide">'+label+'</label>'+
  '<p>' + escapeHtml(value) + '</p>'+
  '</div>';
}
