$(document).ready(function(){
	



	$('.ui.dropdown').dropdown()

	$('.special.card .image').dimmer({
  		on: 'hover'
	});

	$('#updateParticipant').click(function(){
        $('#approve-update').modal('show');    
     });

	apiGetParticipant(entry_id, displayParticipant);

	apiGetClubs(displayClubs)

})

	var local_person_id, local_user_id, local_entry_id, local_time_registrated, local_ticket_id, local_status

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
	var id_first_name = $('#first_name')
	var id_last_name = $('#last_name')
	var id_gender = $('#selectgender')
	var id_clubs = $('#clubs')
	var id_student = $('#studentCheckbox')
	var id_clubmember = $('#clubmemberCheckbox')
	var id_accreditated = $('#accreditatedCheckbox')
	var id_participantname = $('.participantname')
	var id_travel_information = $('#travel_information')
	var id_allergies = $('#allergies')
	var id_email = $('#email')
	var id_phone = $('#phone')
	var id_comment = $('#comment')
	var id_birthday = $('#birthday')
	var id_birthmonth = $('#birthmonth')
	var id_birthyear = $('#birthyear')
	var id_time_registrated = $('#time_registrated')

	var local_person_id = participant.person.person_id
	var local_user_id = participant.person.user_id
	var local_entry_id = participant.entry_id
	var local_time_registrated = participant.time_registrated
	var local_ticket_id = participant.ticket_id
	var local_status = participant.status
	var time_registrated = new Date(local_time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#")

	id_first_name.val(participant.person.first_name)
	id_last_name.val(participant.person.last_name)
	id_time_registrated.text('Påmeldt: ' + local_time_registrated)

	id_gender.val(participant.person.gender)

	console.log('Kjønn: ' + id_gender.val())
	id_clubs.val(participant.club.club_id)
	console.log('Klubb: ' + id_clubs.val())

	if(participant.is_student){
		id_student.val(id_student.prop('checked', true))
	}
	console.log('Klubbmedlem: ' + participant.is_clubmember)
	if(participant.is_clubmember){
		id_clubmember.val(id_clubmember.prop('checked', true))
	}
	if(participant.accreditated){
		id_accreditated.val(id_accreditated.prop('checked', true))
		
	}
	id_participantname.text(participant.person.first_name + ' ' + participant.person.last_name)
	id_travel_information.val(participant.travel_information)
	id_allergies.val(participant.person.allergies)
	id_email.val(participant.person.email)
	id_phone.val(participant.person.phone)
	if(participant.comment != null){
		id_comment.text(participant.comment)
	}
	var birthdate = participant.person.birthdate.split('-')
	id_birthday.val(birthdate[2])
	id_birthmonth.val(birthdate[1])
	console.log('Bursdagsmåned: ' + id_birthmonth.val())
	id_birthyear.val(birthdate[0])
	console.log(participant)
}

function updateParticipant(){
	var local_birthdate = $('#birthyear').val() + '-' + $('#birthmonth').val() + '-' + $('#birthday').val()
	var putObject = {}
	putObject['accreditated'] = $('#accreditatedCheckbox').is(':checked')
	putObject['comment'] = $('#comment').val()
	putObject['entry_id'] = local_entry_id
	putObject['is_clubmember'] = $('#clubmemberCheckbox').is(':checked')
	putObject['is_student'] = $('#studentCheckbox').is(':checked')
	putObject['status'] = local_status
	putObject['ticket_id'] = local_ticket_id
	putObject['time_registrated'] = local_time_registrated
	putObject['travel_information'] = $('#travel_information').val()

	putObject['club'] = {}
	putObject.club['club_id'] = $('#clubs').val()
	putObject.club['club_name'] = $('#clubs option[value="' + $('#clubs').val() + '"').text()

	putObject['person'] = {}
	putObject.person['first_name'] = id_first_name.val()
	putObject.person['last_name'] = $('#last_name').val()
	putObject.person['gender'] = $('#selectgender').val()
	putObject.person['birthdate'] = local_birthdate
	putObject.person['email'] = $('#email').val()
	putObject.person['phone'] = $('#phone').val()
	putObject.person['allergies'] = $('#allergies').val()
	putObject.person['person_id'] = local_person_id
	putObject.person['portrait_id'] = 'null'
	putObject.person['user_id'] = local_user_id

	apiPutParticipant(local_entry_id, putObject, null , comment)
	console.log(putObject)
}