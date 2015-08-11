// **********************************************************************
//  [Main JavaScript]

//  Project:        Thea 
//  Version:        2.0
//  Last change:    11/08/2015
//  Author:         Øystein Molnes
//  Primary use:    Main functions used by the entry GUI
// ***********************************************************************

$( document ).ready(function() {
    // Initialize dropdown
    $('.ui.dropdown')
    .dropdown();

    //API-calls on page load
    getClubs(displayClubs);
    getSports(displaySports);
    getAdditions(displayAdditions);

    // Get and display exercises for the sport that has been selected
    $('#sports').on('change', function() {
        getExercises( $( "#sports" ).val(), displayExercises ); 
    });
 
});

// Populate dropdown with clubs received from REST-api
function displayClubs(clubs){
    if(clubs){
        $.each(clubs, function(i, club){
           $('#clubs').append('<option value='+club.club_id+'>'+club.club_name+'</option>');      
       });
    }
}

// Populate dropdown with sports received from REST-api
function displaySports(sports){
    if(sports){
       $.each(sports, function(i, sport){
           $('#sports').append('<option value='+sport.sport_id+'>'+sport.sport_description+'</option>'); 
       });   
    }  
}

// Generate checkboxes for exercises received from REST-api
function displayExercises(exercises){
    $('#exercises').empty();
	$('#teams_container').hide();

	if(exercises){
    	//Display checkboxes for each available exercise if there are many
    	if(1 < exercises.length){
    		$.each(exercises, function(i, exercise){
    			$('#exercises').append(generateCheckbox(exercise.exercise_id, exercise.exercise_description)); 
    		});  
    	}else{
    		var exercise = exercises[0];
            $('#exercises').append(generateCheckbox(exercise.exercise_id, exercise.exercise_description)); 
            $('#exercises input').each(function(){
                $(this).attr("checked", true);
            });
    		if(exercise.is_teamexercise){
    			$('#teams_container').show();
    			//Get teams for this exercise and populate teams dropdown
    			getTeams( exercise.exercise_id, displayTeams );

    		}else{
    			$('#teams_container').hide();
    		} 
    	}
    }  
}

// Generate checkboxes for exercises received from REST-api
function displayAdditions(additions){
    if(additions){
       $.each(additions, function(i, addition){
            var label = addition.addition_description+' ('+addition.addition_fee+' ,-)';
            $('#additions').append(generateCheckbox(addition.addition_id, label)); 
       });   
    }  
}

// Generate checkboxes for exercises received from REST-api
function displayTeams(teams){
    $('#teams').empty();
    if(teams){
       $.each(teams, function(i, team){
            $('#teams').append('<option value='+team.team_id+'>'+team.team_name+'</option>'); 
       });   
    }  
}

//Called when a participant clicks the submit-button 
function submitParticipantForm(){
	var participantForm = $('#participant_form');

    // if(  participantForm.form('is valid')  ){
        //Serialize the form into a json-object in order to post the participant to the REST-api
        var jsonForm = {};
        //Personal information
        jsonForm["first_name"] = $('#first_name').val();
        jsonForm["last_name"] = $('#last_name').val();
        jsonForm["birthdate"] = $('#birthdate').val();
        jsonForm["gender"] =    $('#gender').val();
        jsonForm["is_student"] = (($('#is_student').val()  == 1) ? true : false);
        jsonForm["email"] = $('#email').val();
        jsonForm["phone"] = $('#phone').val();

        //Participant information
        jsonForm["ticket_id"] = $('#ticket_id').data('value');
        jsonForm["club_id"] = $('#clubs').val();
        jsonForm["is_member"] = (($('#is_member').val()  == 1) ? true : false);
        jsonForm["sports"] = [];

        //Portrait and additions
        jsonForm["allergies"] = $('#allergies').val();
        jsonForm["portrait"] = 'This is an image converted into a string';
        jsonForm["additions"] = [];



        //Add sports and checked exercises
        var sport_id = $("#sports").val();
        var exercises = [];
        $('#exercises input:checked').each(function(){
            var exercise_id = $(this).attr('value');
            var team_id = $("#teams").val()
            exercises.push({exercise_id , team_id });
        });
        jsonForm["sports"].push({sport_id, exercises});


        //Add all checked additions
        $('#additions input:checked').each(function(){
            var addition_id = $(this).attr('value');
            jsonForm["additions"].push({addition_id});
        });

        //Post the participant using the REST-api
        postParticipant(jsonForm);
    // }
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
