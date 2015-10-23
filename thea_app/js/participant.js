"use strict";

var event_id = sessionStorage.getItem("event_id");

$(document).ready(function(){
	$('.special.card .image').dimmer({
  		on: 'hover'
	});

	$('#updateParticipant').click(function(){
        $('#approve-update').modal('show');
     });

	$('#creditParticipant').click(function(){
        $('#credit-update').modal('show');
     });

	$('#cancelParticipant').click(function(){
		$('#cancel-modal').modal('show');
	});

	var req1 = apiGetClubs(displayClubs, errorHandler)
	var req2 = apiGetSports(displaySports, errorHandler, event_id)
	var req3 = apiGetParticipant(displayParticipant, errorHandler, event_id, local_entry_id);
	var req4 = apiGetPortrait(displayPortrait, errorHandler, event_id, local_entry_id);

	$.when(req1, req2, req3, req4).always(function() {
		$("#participantLoader").remove();
	});

	
;
})

//Global variables, updated in displayParticipant
var local_entry_id = GetURLParameter('entry_id');
var local_status
var local_birthdate
var local_time_registrated
var local_ticket_id
var local_person_id
var local_user_id
var global_participant


function errorHandler(errorMessage) {

}

function displayPortrait(image){
	$('#portrait').attr('src', 'data:image/jpeg;base64,' + image.image_data)
}

function displayClubs(clubs){
    if(clubs){
        $.each(clubs, function(i, club){
           $('#clubs').append('<option value='+club.club_id+'>'+club.club_name+'</option>');      
       });
    }
}

function displaySports(sports) {
	if (sports) {
		$.each(sports, function(i, sport) {
			$('#exercises').append('<option value='+sport.sport_id+'>' + sport.sport_description + '</option>');
		});
	}
}

function displayParticipant(participant){

	global_participant = participant

	console.log(participant)
	//Update global variables
	local_status = participant.status
	local_time_registrated = participant.time_registrated
	local_ticket_id = participant.ticket.ticket_id
	local_person_id = participant.person.person_id
	local_user_id = participant.person.user_id

	//Caching div id's
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
	var id_exercise = $('#exercises')
	var id_payed = $('#payed')
	var id_payments = $('#payments')
	var id_refund = $('#refund')
	var time_registrated = new Date(local_time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#")

	//******** PERSONAL INFORMATION ********

	//First name
	id_first_name.val(participant.person.first_name)

	//Last name
	id_last_name.val(participant.person.last_name)

	//Date of birth
	var birthdate = participant.person.birthdate.split('-')
	id_birthday.val(birthdate[2])
	id_birthmonth.dropdown('set selected', birthdate[1])
	id_birthyear.val(birthdate[0])

	//Gender
	id_gender.dropdown('set selected', participant.person.gender)

	//Student
	if(participant.is_student){
		id_student.val(id_student.prop('checked', true))
	}

	//Email
	id_email.val(participant.person.email)

	//Phone number
	id_phone.val(participant.person.phone)

	//Travel information
	id_travel_information.val(participant.travel_information)
	
	//Allergies
	id_allergies.val(participant.person.allergies)
	
	//******** PARTICIPANT INFORMATION ********

	//Club
	id_clubs.dropdown('set selected', participant.club.club_id)

	//Member of club
	if(participant.is_clubmember){
		id_clubmember.val(id_clubmember.prop('checked', true))
	}

	//Sport
	id_exercise.dropdown('set selected', participant.exercises[0].exercise_id)

	//Accreditated
	if(participant.accreditated){
		id_accreditated.val(id_accreditated.prop('checked', true))	
	}
	
	//Name and time registrated
	id_participantname.text(participant.person.first_name + ' ' + participant.person.last_name)
	id_time_registrated.text('Påmeldt: ' + time_registrated)

	//Comment
	if(participant.comment != null){
		id_comment.text(participant.comment)
	}

	//Reciet
	$('#recietButton').append('\
		<button class="fluid ui button" id="recieptParticipant" onclick="getReceipt(' + local_entry_id + ');">\
			Last ned kvittering\
		</button>\
	')
	
	//Canceled participant
	if(local_status == "CANCELLED"){
		console.log('he')
		id_participantname.append(' <span style="color:#d01919;">(kansellert)</span>')
		$('#cancelParticipant').text('Meld på igjen')
	}

	//******** PAYMENT INFORMATION ********
	var total_amount = 0
	var total_refund = 0
	if(participant.orders){
		$.each(participant.orders, function(i, order){
			//Add order amount to the total amount payed
			total_amount += order.order_amount
			total_refund += order.amount_refunded

			id_payments.append('\
				<div class="inline fields">\
					<label class="field four wide">Betaling '+ (i+1) +'</label>\
					<div class="field six wide">\
						<input type="text" value="' + order.order_amount + '" id="payment">\
					</div>\
					<div class="field five wide">\
						<button class="ui button">Refunder</button>\
					</div>\
				</div>\
			')
			console.log(order.order_amount)
		});
		//Total payment
		id_payed.text(total_amount + ',-')

		//Total refund
		id_refund.text(total_refund + ',-')
	}
}//End of displayParticipant

/*
function dropdownlist(name, className, id){
	return('\
		<div class="inline fields">\
			<label class="field four wide">' + name + '</label>\
			<div class="field nine wide">\
				<select class="ui fluid dropdown selection ' + className + '" id="'+ id +'"><option value="">Velg lag</option></select>\
			</div>	\
		</div>\
	')
}
*/
/*function updateParticipant(){

	monthToNumber($('#birthmonth').val())
	var local_birthdate = $('#birthyear').val() + '-' + monthToNumber($('#birthmonth').val()) + '-' + $('#birthday').val()
	var comment = $('#update-comment').val()
	
	var putObject = {}
	putObject['accreditated'] = $('#accreditatedCheckbox').is(':checked')
	putObject['comment'] = $('#comment').val()
	putObject['entry_id'] = local_entry_id
	putObject['is_clubmember'] = $('#clubmemberCheckbox').is(':checked')
	putObject['is_student'] = $('#studentCheckbox').is(':checked')
	putObject['status'] = local_status
	putObject['time_registrated'] = local_time_registrated
	putObject['travel_information'] = $('#travel_information').val()

	putObject['ticket'] = {}
	putObject.ticket['ticket_id'] = local_ticket_id

	putObject['club'] = {}
	putObject.club['club_id'] = $('#clubs').val()
	putObject.club['club_name'] = $('#clubs option[value="' + $('#clubs').val() + '"').text()

	putObject['person'] = {}
	putObject.person['first_name'] = $('#first_name').val()
	putObject.person['last_name'] = $('#last_name').val()
	putObject.person['gender'] = $('#selectgender').val()
	putObject.person['birthdate'] = local_birthdate
	putObject.person['email'] = $('#email').val()
	putObject.person['phone'] = $('#phone').val()
	putObject.person['allergies'] = $('#allergies').val()
	putObject.person['person_id'] = local_person_id
	putObject.person['portrait_id'] = 'null'
	putObject.person['user_id'] = local_user_id

	apiPutParticipant(local_entry_id, putObject, function(){} , comment)
	console.log(putObject)
}*/

/*function creditParticipant(){
	var payment = $('#payment')
	if(payment.val()){
		console.log($('#first_name').val() + ' ' + $('#last_name').val() + ' ble kreditert ' + payment.val())
	} else{
		console.log("Du har ikke skrevet inn et beløp")
	}
}
*/
function cancelParticipant(){
	var comment = $('#cancel-comment').val()
	apiCancelParticipant(local_entry_id, participantIsCanceled, comment)
	console.log("kansellert")
}
/*
function participantIsCanceled(){
	console.log("participant cancelled ")
}*/

