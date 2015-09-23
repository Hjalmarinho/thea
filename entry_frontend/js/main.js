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
$( document ).ready(function() {

    // Initialize dropdown
    // $('.ui.dropdown').dropdown();

    //API-calls on page load, parameter is the callback-function
    apiGetClubs(displayClubs, showError);
    apiGetSports(displaySports, showError);
    apiGetAdditions(displayAdditions, showError);

    // Get and display exercises when a sport is selected, for the correct sports_box
    $('#sports_container').change(function(event) {
        if(event.target.name == "sports"){
            current_sports_box = event.target.id.substr(event.target.id.length - 1);
            var dropdown = $('#sports_'+current_sports_box);
            apiGetExercises( $( dropdown ).val(), displayExercises, showError); 
        }
    });

    //Display confirm-modal if the form is valid
    $('#entry_button').click(function(){
       if(  $('#entry_form').form('is valid')  ){
        // See if portrait is added
        if ($('#portrait').attr('src') === undefined) {
            showError("Du må laste opp et portrettbilde først.");
            return;
        }

        createConfirmModal();
        $('#confirm_modal').modal('show');
    }
});

    //Display image-modal for portrait-upload
    $('#image_button').click(function(){
        $('#image_modal').modal('show');
	$("#portrait_crop").cropper('replace', $("#portrait_crop").attr("src"));
    });

    //Prevent entry_form from submitting when clicking "Meld på"
    $("#entry_form").submit(function(event){
        event.preventDefault();
    });
});

//Constants
var TICKET_ID_PARTICIPANT = 1;
var TICKET_ID_TEAM = 2;
var TICKET_ID_SUPPORTER = 3;

//This variable holds track of which sport_box is being handled
var current_sports_box = 1;

//      UPDATE GUI FUNCTIONS
// ***********************************************************************

// Populate dropdown with clubs received from API
function displayClubs(clubs){
    if(clubs){
	// Sort clubs by their name
	clubs.sort(function(a, b) { return stringCmp(a, b, "club_name"); });
	
        $.each(clubs, function(i, club){
           $('#clubs').append('<option value="'+club.club_id+'">' + escapeHtml(club.club_name) + '</option>');
       });
    }
}


function stringCmp(object_a, object_b, property) {
    return object_a[property].localeCompare(object_b[property]);
}


// Populate dropdown with sports received from API
function displaySports(sports){
    if(sports){
	// First, sort sports by their description.
	sports.sort(function(a, b) { return stringCmp(a, b, "sport_description"); });
       $.each(sports, function(i, sport){
        var ticket_id = $('#ticket_id').data('value');
            //Display only sports having a team_exercise if user is adding a team
            if( ticket_id == TICKET_ID_TEAM && hasTeamExercise(sport)){
                $('#sports_'+current_sports_box).append('<option value="'+sport.sport_id+'">'+escapeHtml(sport.sport_description)+'</option>'); 
            }
            //Display all sports for a participant
            else if(ticket_id == TICKET_ID_PARTICIPANT){
                $('#sports_'+current_sports_box).append('<option value="'+sport.sport_id+'">'+escapeHtml(sport.sport_description)+'</option>'); 
            }
        });  
       $('.dropdown').dropdown('refresh'); 
   }  
}

function exerciseChecked(sender) {
    // TODO: Implement
}


// Generate checkboxes for exercises received from API
function displayExercises(exercises){
    var curr_id = current_sports_box;
    $('#exercises_'+curr_id).empty();
    $('#teams_container_'+curr_id).hide();
    if(exercises){
	// Sort exercises by name
	exercises.sort(function(a, b) { return stringCmp(a, b, "exercise_description"); });

        //Display checkboxes for each available exercise if there are many
        $.each(exercises, function(i, exercise){
            var checkbox = generateCheckbox(exercise.exercise_description, exercise.exercise_id, false, 'exerciseChecked(this)')
            $('#exercises_'+curr_id).append(checkbox); 
        });  
        //If sport has only one exercise, check and hide it
        if(exercises.length == 1){
            $('#exercises_'+curr_id+' input').each(function(){
                $(this).attr('checked', true);
                $(this).parent().css("display", "none");
            });
            if(exercises[0].is_teamexercise){
                //Get teams for this exercise and populate teams dropdown
                apiGetTeams( exercises[0].exercise_id, displayTeams , showError);
                $('#teams_container_'+curr_id).show();
            }
        }
    }  
}

// Generate checkboxes for teams received from API
function displayTeams(teams){
    var curr_id = current_sports_box;
    $('#teams_'+curr_id).empty();
    if(teams){
	// Sort teams by name
	teams.sort(function(a, b) { return stringCmp(a, b, "team_name"); });
       $.each(teams, function(i, team){
        $('#teams_'+curr_id).append('<option value="'+team.team_id+'">'+escapeHtml(team.team_name)+'</option>');
    });
   }
}

// Generate checkboxes for exercises received from API
function displayAdditions(additions){
    if(additions){
	// Sort additions by name
	additions.sort(function(a, b) { return stringCmp(a, b, "addition_description"); });
       $.each(additions, function(i, addition){
        var addition_label = addition.addition_description+' ('+addition.addition_fee+' ,-)';
        $('#additions').append(generateCheckbox(addition_label, addition.addition_id, (addition.addition_fee == 0), ''));
    });   
   }  
}

//Create GUI to allow user to sign up for several sports
function addSport(){
    //We create and add a new sports_box and set the correct IDs for its input-fields
    current_sports_box= getNextSportsContainerId();
    var $sports_box = $("#sports_box_1").clone();
    $sports_box.attr("id", "sports_box_"+current_sports_box);
    var $remove_btn =  '<div class="inline fields">'+
                            '<label class="field four wide"></label>'+
                            '<div class="ui button" onclick="removeSport(this)"> Fjern</div>'+
                        '</div>';

    $sports_box.prepend('<div class="ui divider"> </div>');
    $sports_box.append($remove_btn);
    $sports_box.append('<div class="ui divider"> </div>');
    $("#sports_container").append($sports_box);

    var $sports = $sports_box.find("[data-name='sports']");
    $sports.attr("id", "sports_"+current_sports_box)

    var $exercises = $sports_box.find("[data-name='exercises']");
    $exercises.attr("id", "exercises_"+current_sports_box)

    var $teams_container = $sports_box.find("[data-name='teams_container']");
    $teams_container.attr("id", "teams_container_"+current_sports_box)

    var $teams = $sports_box.find("[name='teams']");
    $teams.attr("id", "teams_"+current_sports_box)

    apiGetSports(displaySports, showError);

}

//Remove sport_box from GUI
function removeSport(removeButton){
    $( removeButton ).closest('[data-name="sports_box"]').remove();
    current_sports_box = 1;
}

//When user clicks "Meld på" a confirm-modal is populated with the data that the user has entered
function createConfirmModal(){

    //Create personal info
    $('#confirm_personal_container').empty();
    var personal_html = '';
    personal_html += generateLabelPair('Fornavn', $('#first_name').val() );
    personal_html += generateLabelPair('Etternavn', $('#last_name').val() );
    var birthdate = $('#birthday').val() + '. ' + $('#birthmonth  option:selected').text() + ' ' + $('#birthyear').val();
    personal_html += generateLabelPair('Fødselsdato', birthdate );
    personal_html += generateLabelPair('Kjønn',   $('#gender  option:selected').text() );
    personal_html += generateLabelPair('Student', $('#is_student  option:selected').text() );
    personal_html += generateLabelPair('Epost', $('#email').val() );
    personal_html += generateLabelPair('Mobil', $('#phone').val() );
    personal_html += generateLabelPair('Reiseinfo', $('#travel_information  option:selected').text() );
    $('#confirm_personal_container').append(personal_html);

    //Create participant info
    $('#confirm_participant_container').empty();
    var ticket_id = parseInt($('#ticket_id').data('value'));
    var participant_html = '';
    participant_html += generateLabelPair('Klubb', $('#clubs  option:selected').text() );

    if(ticket_id != TICKET_ID_SUPPORTER){
        participant_html += generateLabelPair('Medlem', $('#is_clubmember  option:selected').text() );
        participant_html += generateLabelPair('Idrett', $('#sports_1  option:selected').text() );
    }
    if(ticket_id == TICKET_ID_PARTICIPANT){
        $('#exercises input:checked').each(function(){
            participant_html += generateLabelPair('', $(this).attr('id') );
        });
        if($('#teams_container_1').is(":visible") ){
            participant_html += generateLabelPair('Lag', $('#teams_1  option:selected').text() );
        }
    }
    else if(ticket_id == TICKET_ID_TEAM){
        participant_html += generateLabelPair('Lagnavn', $('#team_name').val() );
        participant_html += generateLabelPair('Klasse', $('#team_gender  option:selected').text() );
        participant_html += generateLabelPair('Spillende', $('#is_playing  option:selected').text() );
    } 
    $('#confirm_participant_container').append(participant_html);


    //Create additional info
    $('#confirm_additions_container').empty();
    var additions_html = '';

    additions_html += '<img src="' + $('#portrait').attr('src') + '" style="width:75px; height:100px;"/>';
    $('#additions input:checked').each(function(){
        additions_html += generateLabelPair('Tillegg', $(this).attr('id') );
    });
    additions_html += generateLabelPair('Allergier', $('#allergies').val() );

    $('#confirm_additions_container').append(additions_html);

}

//Redirect user to payment-page
function redirectToPayment(data){
    window.location.replace(data.payment_url);
}



//      PORTRAIT CROPPING
// ***********************************************************************

//Display selected image in image-modal and update the cropper.
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if ($("#crop_container").html().trim().length == 0) {
                // First time cropper is loaded.

                $("#crop_container").html('<img id="portrait_crop" style="max-width:200px; image-orientation: from-image;" alt="Portrettbilde" src="' + e.target.result + '" />');

                $("#portrait_crop").cropper({
                  aspectRatio: 3 / 4,
                  preview: ".img-preview",
                  moveable: false,
                  zoomable: false,
                  responsive: false
                });

                $("#rotatePreviewIcons").show();
            } else {
                $("#portrait_crop").cropper('replace', e.target.result);
            }
            

            
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// Rotate the image in cropping.
function rotatePreview(amount) {
    $("#portrait_crop").cropper('rotate', amount);
}

// Confirm the cropped portrait and close modal.
function confirmPortrait() {
    var canvas = $("#portrait_crop").cropper("getCroppedCanvas");
    $('#portrait_container').html('<img id="portrait" style="display:none; width:150px; height:200px;" alt="Portrettbilde" src="' + canvas.toDataURL("image/jpeg") + '" />');
    $('#image_modal').modal('hide');
    $('#portrait').show();
}


//      POST TO API FUNCTIONS
// ***********************************************************************

//Called when a participant clicks the submit-button 
function submitParticipantForm(){
    //Serialize the form into a json-object in order to post the participant to the API
    var jsonForm = createJSON();

    //Post the participant using the API
    apiPostParticipant(jsonForm, redirectToPayment, showError);
}

//Called when a user has completed payment 
function completeEntry(transaction_id, callback, errorCallback){
    apiPutTransaction(transaction_id, callback, errorCallback);
}


//Called when a user cancelled the payment
function terminateEntry(transaction_id) {
    apiPutTerminateEntry(transaction_id, function(data) { return true; }, function(data) { return true; });
}


function showError(error_msg) {
    $("#error_message").text(error_msg);
    $("#error_modal").modal("show");
}

//      HELP FUNCTIONS
// ***********************************************************************

//Constructs a JSON-object from the data that has been entered in the GUI
function createJSON(){
    var jsonForm = {};
    var entry = {};
    jsonForm["redirect_url"] = 'http://pamelding.sltromso.no/completed.php';
    jsonForm["entry"] = entry;

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
    person["birthdate"]  = $('#birthyear').val()+ '-' + $('#birthmonth').val() + '-' + $('#birthday').val();
    person["allergies"]  = $('#allergies').val();
    var portrait   = {};
    portrait["portrait_data"] = $('#portrait').attr('src').split(',')[1];
    person["portrait"] = portrait;
    entry["person"]   = person;

    //Participant information
    var club_id = parseInt($('#clubs').val());
    entry["club"] = {"club_id": club_id};

    var ticket_id = parseInt($('#ticket_id').data('value')); 
    entry["ticket"] = {"ticket_id": ticket_id};

    entry["sports"] = uiGetSports(ticket_id);

    //Additions
    entry["additions"] = [];

    //Add all checked additions
    entry["additions"] = uiGetAdditions();

    return jsonForm;
}

//Iterate the additions-checkboxes and see which have been checked
function uiGetAdditions(){
    var additions = [];
    $('#additions input:checked').each(function(){
        var addition_id = parseInt($(this).attr('value'));
        var num_items = parseInt('1');
        additions.push({"addition_id": addition_id, "num_items": num_items});
    });
    return additions;
}

//Iterate the exercise-checkboxes and see which have been checked, or if a team is to be added
function uiGetSports(ticket_id){
    var sports = [];
    //Iterate through sports_boxes and get exercises
    $('#sports_container > div').each(function() {
      var sport = {};
      var curr_id =  $(this).attr("id").substr($(this).attr("id").length - 1);
      sport["sport_id"] = parseInt($('#sports_'+curr_id).val());

      var exercises = [];
        //Find and add checked exercises for a participant
        if(ticket_id == TICKET_ID_PARTICIPANT){
            $('#exercises_'+curr_id+' input:checked').each(function(){
                var exercise_id = parseInt($(this).attr('value'));
                var team_id = parseInt(parseInt($('#teams_'+curr_id).val()));
                var team = {"team_id": team_id};

                exercises.push({"exercise_id": exercise_id , "team": team });
            });
        }
        //Add exercise with team info for team
        else if(ticket_id == TICKET_ID_TEAM){
            $('#exercises_'+curr_id+' input:checked').each(function(){
                var exercise_id = parseInt($(this).attr('value'));
                var is_player = (($('#is_playing').val() == "1") ? true : false);
                var team_name = $("#team_name").val(); 
                var team_gender = $("#team_gender").val();
                var team_number = 0;

                var team = {"team_name": team_name, "team_gender": team_gender, "team_number": team_number};

                exercises.push({"exercise_id": exercise_id , "is_player": is_player, "team": team });
            });
        } 
        sport["exercises"] = exercises;

        sports.push(sport);
    });   

return sports;
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
function getNextSportsContainerId(){
    var nextSportsContainerId = null;
    $('#sports_container > div').each(function() {
      nextSportsContainerId =  $(this).attr("id").substr($(this).attr("id").length - 1);
  });
    return parseInt(nextSportsContainerId)+1;
}

// Create and return a checkbox with given value and label
function generateCheckbox(label, value, checked, onchange){
    var checkedStr = '';
    if (checked === true)
        checkedStr = ' checked ';

    return  '<div class="field">'+
    '<div class="ui checkbox">'+
    '<input type="checkbox" value="'+value+'" id="'+label+'" onchange="'+ onchange +'" ' + checkedStr +'>' +
    '<label for="'+label+'">'+label+'</label>'+
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

// Get an URL parameter
// GetURLParameter("foo"); will return "asdf" from http://anything.com?foo=asdf
function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }

    return null;
}


var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

function escapeHtml(string) {
return String(string).replace(/[&<>"'\/]/g, function (s) {
  return entityMap[s];
});
}
