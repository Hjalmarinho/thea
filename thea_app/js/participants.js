$(document).ready(function(){
	apiGetParticipants(displayParticipants);
})

function displayParticipants(participants){
	var participantsdiv = ('#participants')
	$.each(participants, function (i, participant){
		var first_name = participant.person.first_name
		var last_name = participant.person.last_name
		var gender = customGenderFormat(participant.person.gender)
		var club = participant.club.club_name
		var phone = participant.person.phone
		var email = participant.person.email
		var time_registrated = new Date(participant.time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#")
		var entry_id = participant.entry_id
		var tablerow = '<tr><td><a href="./participant.php?entry_id=' + entry_id +'">' + first_name + '</a></td><td>' + last_name + '</td><td>' + 
					   gender + '</td><td>' + club + '</td><td>' + phone + '</td><td><a href="mailto:' + email + '">' + email + '</a></td><td>' + 
					   time_registrated + '</td></tr>'
		$(participantsdiv).append(tablerow)
	});
}
