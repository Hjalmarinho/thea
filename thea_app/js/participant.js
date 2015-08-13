$(document).ready(function(){
	$('.ui.dropdown').dropdown()

	$('.special.cards .image').dimmer({
  		on: 'hover'
	});

	$('.ui.rating').rating();
})

function GetURLParameter(sParam){
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++){
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam){
			return sParameterName[1];
		}
	}
}

var entry_id = GetURLParameter('entry_id');

getParticipant(entry_id, displayParticipant);

function displayParticipant(participant){
	var time_registrated = new Date(participant.time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#")

	$('#first_name').attr('value', participant.person.first_name)
	$('#last_name').attr('value', participant.person.last_name)
	$('#time_registrated').text('Påmeldt: ' + time_registrated)
	$('#selectgender').val(participant.person.gender)
	$('#selectgender option:selected').change()
	if(participant.is_student){
		$('#studentCheckbox').val($('#studentCheckbox').prop('checked', true))
	}
	if(participant.is_clubmember){
		$('#clubmemberCheckbox').val($('#clubmemberCheckbox').prop('checked', true))
	}
	if(participant.accreditated){
		$('#accreditatedCheckbox').val($('#accreditatedCheckbox').prop('checked', true))
		
	}
	$('#club_name').text(participant.club.club_name)
	console.log(participant.is_clubmember)
	console.log(participant)
}