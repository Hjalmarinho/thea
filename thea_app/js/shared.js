$(document).ready(function(){
	$('.wee').hide().transition('fade up', '750ms');

	$("#menubutton").click( function(){
		$('.ui.sidebar').sidebar('toggle');
	});

	getParticipants(displayParticipants);
});

function displayParticipants(participants){
	$.each(participants, function (i, participant){
		var first_name = participant.person.first_name
		var last_name = participant.person.last_name
		var gender = participant.person.gender
		var club = participant.club_id
		var phone = participant.person.phone
		var email = participant.person.email
		var time_registrated = participant.time_registrated
		$('#participants').append('<tr><td>' + first_name + '</td><td>' + last_name + '</td><td>' + gender + '</td><td>' + club + '</td><td>' + phone + '</td><td>' + email + '</td><td>' + time_registrated + '</td></tr>')
	});
}