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
    .dropdown()
    ;

    //API-calls on page load
    getClubs();
    getSports();

    // Get and display exercises for the sport that has been selected
    $('#sports').on('change', function() {
        getExercises( $( "#sports" ).val() ); 
    });
 
});

// Populate dropdown with clubs from REST-api
function displayClubs(clubs){
    if(clubs){
        $.each(clubs, function(i, club){
           $('#clubs').append('<option value='+club.club_id+'>'+club.club_name+'</option>');      
       });
    }
}

// Populate dropdown with sports from REST-api
function displaySports(sports){
    if(sports){
       $.each(sports, function(i, sport){
           $('#sports').append('<option value='+sport.sport_id+'>'+sport.sport_description+'</option>'); 
       });   
    }  
}

// Generate checkboxes for exercises from REST-api
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
    		if(exercise.is_teamexercise){
    			$('#teams_container').show();
    			//Get teams for this exercise and populate teams dropdown
    			getTeams( exercise.exercise_id );

    		}else{
    			$('#teams_container').hide();
    		} 
    	}
    }  
}

//Called when a participant clicks the submit-button 
function submitParticipantForm(){
	var participantForm = $('#participant_form');

    if(  participantForm.form('is valid')  ){
        postParticipant(participantForm);
    }
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
