"use strict";

var event_id = sessionStorage.getItem("event_id");

$(document).ready(function(){
	var request = apiGetParticipants(displayParticipants, handleError, event_id);
	$.when(request).always(function() { removeLoader(); });
})

function displayParticipants(participants){
	var participantsdiv = $('#participants');
	var numCancelled = 0;
	var numConfirmed = 0;

	$.each(participants, function (i, participant) {
		var cssClass = "";
		switch (participant.status) {
			case REGISTRATION_CONFIRMED:
				numConfirmed++;
				break;
			case REGISTRATION_CANCELLED:
				cssClass = ' class="error" ';
				numCancelled++;
				break;
			default:
				return true;
		}
		var first_name = participant.person.first_name
		var last_name = participant.person.last_name
		var gender = customGenderFormat(participant.person.gender)
		var club = participant.club.club_name
		var phone = participant.person.phone
		var email = participant.person.email
		var time_registrated = new Date(participant.time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#")
		var entry_id = participant.entry_id

		var tablerow = '<tr ' + cssClass + '><td>' + first_name + '</td><td>' + last_name + '</td><td>' + 
		gender + '</td><td>' + club + '</td><td>' + phone + '</td><td><a href="mailto:' + email + '">' + email + '</a></td><td>' + 
		time_registrated + '</td><td onclick="getReceipt(' + entry_id + ');"><i class="download blue icon"></i></td></tr>'

		$(participantsdiv).append(tablerow)
	});

	$("#summary").html(numConfirmed + ' påmeldte, ' + numCancelled + ' kansellerte.');
}

function removeLoader() {
	$("#participantsLoader").remove();
}

function handleError(errorMsg) {
}


function getReceipt(entryId)
{
	apiGetReceipt(function (data)
		{
			window.open('data:application/pdf;base64,' + data);
			console.log('yee');
		}, function (data) { console.log('buhuuu'); }, event_id, entryId);
}