// **********************************************************************
//  [Main JavaScript]

//  Project:        Thea 
//  Version:        2.0
//  Last change:    11/08/2015
//  Author:         Øystein Molnes
//  Primary use:    Main functions used by the entry GUI
// ***********************************************************************

//This function is run when the document is finsihed loading
$( document ).ready(function() {

    // Initialize dropdown
    $('.ui.dropdown')
    .dropdown();

    //API-calls on page load, parameter is the callback-function
    apiGetClubs(displayClubs);
    apiGetSports(displaySports);
    apiGetAdditions(displayAdditions);

    // Get and display exercises when a sport is selected
    $('#sports').on('change', function() {
        apiGetExercises( $( "#sports" ).val(), displayExercises ); 
    });

    //Prevent submitting form when pushing ENTER
    $('#search').bind('keypress keydown keyup', function(e){
       if(e.keyCode == 13) { e.preventDefault(); }
    });
});



//Constants
const TICKET_ID_PARTICIPANT = 1;
const TICKET_ID_TEAM= 2;


//      UPDATE GUI FUNCTIONS
// ***********************************************************************

// Populate dropdown with clubs received from API
function displayClubs(clubs){
    if(clubs){
        $.each(clubs, function(i, club){
           $('#clubs').append('<option value='+club.club_id+'>'+club.club_name+'</option>');      
       });
    }
}

// Populate dropdown with sports received from API
function displaySports(sports){
    if(sports){
       $.each(sports, function(i, sport){
            var ticket_id = $('#ticket_id').data('value');
            //Display only sports having a team_exercise if user is adding a team
            if( ticket_id == TICKET_ID_TEAM && hasTeamExercise(sport)){
                $('#sports').append('<option value='+sport.sport_id+'>'+sport.sport_description+'</option>'); 
            }
            //Display all sports for a participant
            else if(ticket_id == TICKET_ID_PARTICIPANT){
                $('#sports').append('<option value='+sport.sport_id+'>'+sport.sport_description+'</option>'); 
            }
       });   
    }  
}

// Generate checkboxes for exercises received from API
function displayExercises(exercises){
    $('#exercises').empty();
    $('#teams_container').hide();
    if(exercises){
        //Display checkboxes for each available exercise if there are many
        $.each(exercises, function(i, exercise){
            if(exercise.is_teamexercise){
                //Get teams for this exercise and populate teams dropdown
                apiGetTeams( exercise.exercise_id, displayTeams );
                $('#teams_container').show();
            }
            $('#exercises').append(generateCheckbox(exercise.exercise_id, exercise.exercise_description)); 
        });  
    }  
}

// Generate checkboxes for exercises received from API
function displayAdditions(additions){
    if(additions){
       $.each(additions, function(i, addition){
            var addition_label = addition.addition_description+' ('+addition.addition_fee+' ,-)';
            $('#additions').append(generateCheckbox(addition.addition_id, addition_label)); 
       });   
    }  
}

// Generate checkboxes for teams received from API
function displayTeams(teams){
    $('#teams').empty();
    if(teams){
       $.each(teams, function(i, team){
            $('#teams').append('<option value='+team.team_id+'>'+team.team_name+'</option>'); 
       });   
    }  
}

//Redirect user to payment-page
function redirectToPayment(data){
    window.open(data.payment_url);
}


//      POST TO API FUNCTIONS
// ***********************************************************************

//Called when a participant clicks the submit-button 
function submitParticipantForm(){
	var participantForm = $('#participant_form');

    // if(  participantForm.form('is valid')  ){

        //Serialize the form into a json-object in order to post the participant to the API
        var jsonForm = {};

        //Personal information
        jsonForm["is_clubmember"] = (($('#is_clubmember').val()  == 1) ? true : false);
        jsonForm["is_student"] = (($('#is_student').val()  == 1) ? true : false);
        jsonForm["travel_information"] = $('#travel_information  option:selected').text();
        
        var person = {};
        person["first_name"] = $('#first_name').val();
        person["last_name"]  = $('#last_name').val();
        person["phone"]      = $('#phone').val();
        person["email"]      = $('#email').val();
        person["gender"]     = $('#gender').val();
        person["birthdate"]  = $('#birthyear').val()+ '-' + $('#birthmonth').val() + '-' + $('#birthday').val();
        person["allergies"]  = $('#allergies').val();
        person["portrait"]  = 'This is an image converted into a string';
        jsonForm["person"]   = person;
        
        //Participant information
        var club_id = parseInt($('#clubs').val());
        jsonForm["club"] = {club_id};

        var ticket_id = parseInt($('#ticket_id').data('value')); 
        jsonForm["ticket"] = {ticket_id};

        jsonForm["exercises"] = uiGetExercises(ticket_id);
        
        //Additions
        jsonForm["additions"] = [];
        
        //Add all checked additions
        jsonForm["additions"] = uiGetAdditions();

        //Post the participant using the API
        apiPostParticipant(jsonForm, redirectToPayment);
    // }
}


//      HELP FUNCTIONS
// ***********************************************************************

//Iterate the additions-checkboxes and see which have been checked
function uiGetAdditions(){
    var additions = [];
    $('#additions input:checked').each(function(){
        var addition_id = parseInt($(this).attr('value'));
        var num_items = parseInt('1');
        additions.push({addition_id, num_items});
    });
    return additions;
}

//Iterate the exercise-checkboxes and see which have been checked, or if a team is to be added
function uiGetExercises(ticket_id){
    var exercises = [];

    //Find and add checked exercises for a participant
    if(ticket_id == TICKET_ID_PARTICIPANT){
        $('#exercises input:checked').each(function(){
            var exercise_id = parseInt($(this).attr('value'));
            var team_id = parseInt($("#teams").val());
            var team = {team_id};

            exercises.push({exercise_id , team });
        });
    }
    //Add exercise with team info for team
    else if(ticket_id == TICKET_ID_TEAM){
        $('#exercises input:checked').each(function(){
            var exercise_id = parseInt($(this).attr('value'));
            var is_playing = (($('#is_playing').val()  == 1) ? true : false);
            var team_name = $("#team_name").val(); 
            var gender = $("#team_gender").val();
            var team_number = 0;

            var team = {team_name, gender, team_number};

            exercises.push({exercise_id ,  is_playing, team });
        });
    } 
    return exercises;
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

// Create and return a checkbox with given value and label
function generateCheckbox(value, label){

    var checkbox = '<div class="field">'+
                      '<div class="ui checkbox">'+
                        '<input type="checkbox" value='+value+'>'+
                        '<label>'+label+'</label>'+
                      '</div>'+
                    '</div>';

    return  checkbox;   
}
