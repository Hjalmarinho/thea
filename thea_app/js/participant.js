$(document).ready(function(){
	$('.ui.dropdown').dropdown()

	$('.special.cards .image').dimmer({
  		on: 'hover'
	});

	$('.ui.rating').rating();

	apiGetParticipant(entry_id, displayParticipant);

	apiGetClubs(displayClubs)

})

var entry_id = GetURLParameter('entry_id');


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

function displayClubs(clubs){
    if(clubs){
        $.each(clubs, function(i, club){
           $('#clubs').append('<option value='+club.club_id+'>'+club.club_name+'</option>');      
       });
    }
}


function displayParticipant(participant){
	var time_registrated = new Date(participant.time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#")

	$('#first_name').attr('value', participant.person.first_name)
	$('#last_name').attr('value', participant.person.last_name)
	$('#time_registrated').text('Påmeldt: ' + time_registrated)

	$('#selectgender').val(participant.person.gender)

	console.log('Kjønn: ' + $('#selectgender').val())
	$('#clubs').val(participant.club.club_id)
	console.log('Klubb: ' + $('#clubs').val())

	if(participant.is_student){
		$('#studentCheckbox').val($('#studentCheckbox').prop('checked', true))
	}
	console.log('Klubbmedlem: ' + participant.is_clubmember)
	if(participant.is_clubmember){
		$('#clubmemberCheckbox').val($('#clubmemberCheckbox').prop('checked', true))
	}
	if(participant.accreditated){
		$('#accreditatedCheckbox').val($('#accreditatedCheckbox').prop('checked', true))
		
	}
	$('.participantname').text(participant.person.first_name + ' ' + participant.person.last_name)
	$('#travel_information').attr('value', participant.travel_information)
	$('#allergies').attr('value', participant.person.allergies)
	$('#email').attr('value', participant.person.email)
	$('#phone').attr('value', participant.person.phone)
	if(participant.comment != null){
		$('#comment').text(participant.comment)
	}
	var birthdate = participant.person.birthdate.split('-')
	$('#birthday').attr('value', birthdate[2])
	$('#birthmonth').val(birthdate[1])
	console.log('Bursdagsmåned: ' + $('#birthmonth').val())
	$('#birthyear').attr('value', birthdate[0])
	console.log(participant)
}