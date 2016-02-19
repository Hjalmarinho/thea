"use strict";

var event_id = sessionStorage.getItem("event_id");

$(document).ready(function(){
	var request = apiGetParticipants(displayParticipants, handleError, event_id, false, false, true, true, false);
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

		/* If NSI wants to show all participant sports for a participant
		var sports = []
		if (participant.exercises.length > 0){
			for (i = 0; i < participant.exercises.length; i++){
				sports.push(participant.exercises[i].exercise.exercise_description)
			}
		}
		*/

		var first_name = participant.person.first_name
		var last_name = participant.person.last_name
		var gender = customGenderFormat(participant.person.gender)
		var club = participant.club.club_name
		var phone = participant.person.phone
		var email = participant.person.email
		var time_registrated = parseDateString(participant.time_registrated);
		var time_registrated_str = time_registrated.customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#")
		var entry_id = participant.entry_id
		var ticket_type = 'Ukjent';

		if (participant.ticket.ticket_type == 'PARTICIPANT')
			ticket_type = 'Deltaker';
		else if (participant.ticket.ticket_type == 'SPECTATOR')
			ticket_type = 'Tilskuer';

//		if (participant.exercises.length == 0){
//			console.log(first_name + ' ' + last_name)
//		}

		var tablerow = '<tr ' + cssClass + '><td><a href="./participant.php?entry_id=' + entry_id +'">' + first_name + '</a></td><td>' + last_name + '</td><td>' + 
		gender + '</td><td>' + club + '</td><td>' + phone + '</td><td><a href="mailto:' + email + '">' + email + '</a></td><td>' + ticket_type + '</td><td data-sort-value="' + time_registrated.getTime() + '">' + 
		time_registrated_str + '</td><td onclick="getReceipt(' + entry_id + ');"><i class="download blue icon"></i></td></tr>'

		$(participantsdiv).append(tablerow)
	});

	$("#summary").html(numConfirmed + ' påmeldte, ' + numCancelled + ' kansellerte.');
}

function removeLoader() {
	$("#participantsLoader").remove();
}

function handleError(errorMsg) {
}
