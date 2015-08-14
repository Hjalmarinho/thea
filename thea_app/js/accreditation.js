$(document).ready(function(){
	$('.ui.dropdown').dropdown()

	$('.special.cards .image').dimmer({
  		on: 'hover'
	});


	apiGetParticipants(displayParticipants);

});

//Populate table-body with all participants
function displayParticipants(participants){
	var participants_body = ('#participants_body')
	$.each(participants, function (i, participant){

		var tablerow = 		'<tr onclick="participantClicked('+participant.entry_id+')">'+ 
								'<td>' + participant.person.first_name + '</a></td>'+
								'<td>' + participant.person.last_name + '</td>'+
								'<td>' + participant.club.club_name + '</td>'+
							'</tr>';
		$(participants_body).append(tablerow);
	});


};	

//Called when a participant in the table is clicked
function participantClicked(entry_id){
	if(entry_id){
		//Get participant from API and display it's data in the participant_card
		apiGetParticipant(entry_id, displayParticipant);
	}
}

// Display a participant on the card
function displayParticipant(participant){
	$('#participant_card').show();
	$('#participant_card').val(participant.entry_id);
	$('#card_name').text(participant.person.first_name+' '+participant.person.last_name);

	var time_registrated = new Date(participant.time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#")
	$('#card_time_registrated').text(time_registrated);

	//Display green check-icon if participant has been accreditated
	displayAccreditated(participant.accreditated);

	$('#card_comment').text('Dette er en hardkodet kommentar om denne deltakeren');
};

//Display green check-icon and accreditation-button dependent on whether the participant has been accreditated
function displayAccreditated(accreditated){
	if(accreditated){
		$('#button_unaccreditate').show();
		$('#button_accreditate').hide();
		$('#card_accreditated_mark').show();
		$('#participant_card').css("background-color", "rgba(34, 190, 52, .2)");
	}
	else{
		$('#button_accreditate').show();
		$('#button_unaccreditate').hide();
		$('#card_accreditated_mark').hide();
		$('#participant_card').css("background-color", " rgba(257, 257, 257, 1)");
	}
}


//Accreditate participant by getting the entry_id from the value-attribute of the participant_card
function accreditateParticipant(accreditated){
	var entry_id = $( '#participant_card' ).val();
	var jsonData = {"accreditated": accreditated};
	apiPutAccreditation(entry_id, jsonData, participantAccreditated);
}

//Callback function when a participant has been accreditated
function participantAccreditated(accreditation){
	displayAccreditated(accreditation.accreditated);
}