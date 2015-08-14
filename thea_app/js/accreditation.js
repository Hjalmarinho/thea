$(document).ready(function(){
	$('.ui.dropdown').dropdown()

	$('.special.cards .image').dimmer({
  		on: 'hover'
	});


	apiGetParticipants(displayAccreditations);

});


function displayAccreditations(accreditations){
	var accreditationsbody = ('#accreditations_body')
	$.each(accreditations, function (i, accreditant){
		var first_name = accreditant.person.first_name;
		var last_name = accreditant.person.last_name;
		var club = accreditant.club.club_name;
		var time_registrated = new Date(accreditant.time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#");
		var entry_id = accreditant.entry_id;

		console.log(accreditant);

		var tablerow = 		'<tr onclick="accreditantClicked('+entry_id+')">'+ 
								'<td>' + first_name + '</a></td>'+
								'<td>' + last_name + '</td>'+
								'<td>' + club + '</td>'+
							'</tr>';
		$(accreditationsbody).append(tablerow);
	});


};	

//Called when a participant in the table is clicked
function accreditantClicked(entry_id){
	if(entry_id){
		apiGetParticipant(entry_id, displayAccreditant);
	}
}

// Display a participant on the card
function displayAccreditant(accreditant){
	$('#accreditant_card').show();
	$('#accreditant_card').val(accreditant.entry_id);
	$('#card_name').text(accreditant.person.first_name+' '+accreditant.person.last_name);

	var time_registrated = new Date(accreditant.time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#")
	$('#time_registrated').text(time_registrated);

	$('#comment').text('Dette er en hardkodet kommentar om denne deltakeren');
};


//Accreditate participant by getting the entry_id from the value-attribute of the card
function accreditateParticipant(){
	var entry_id = $( '#accreditant_card' ).val();
	var jsonData = {"accreditated": true};
	apiPutAccreditation(entry_id, jsonData, participantAccreditated);
}

//Callback function when a participant has been accreditated
function participantAccreditated(accreditation){
	console.log('Participant '+accreditation.entry_id+' was successfully accreditated');
}