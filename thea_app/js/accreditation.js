$(document).ready(function(){
	$('.ui.dropdown').dropdown()

	$('.special.cards .image').dimmer({
  		on: 'hover'
	});

	apiGetParticipants(displayParticipants);
	$('#participant_card')
	  .transition('fade up')
	;
});

//Make participants table searchable
function initiateSearch(){
	var $rows = $('#participants_table tbody tr');
	$('#search_input').keyup(function() {
	    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
	    
	    $rows.show().filter(function() {
	        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
	        return !~text.indexOf(val);
	    }).hide();
	});
}

//Populate table-body with all participants
function displayParticipants(participants){
	var participants_table_body = ('#participants_table_body')
	$.each(participants, function (i, participant){
		var check_icon = '';
		if(participant.accreditated){
			check_icon = '<i class="checkmark green icon"></i>';
		}

		var tablerow = 		'<tr onclick="participantClicked('+participant.entry_id+')">'+ 
								'<td>' + participant.person.first_name +' '+participant.person.last_name + '</a></td>'+
								'<td>' + participant.club.club_name + '</td>'+
								'<td value="'+participant.entry_id+'">' + check_icon +'</td>'+
							'</tr>';
		$(participants_table_body).append(tablerow);
	});
	initiateSearch();
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
	$('#participant_card').val(participant.entry_id);
	$('#card_name').text(participant.person.first_name+' '+participant.person.last_name);
	$('#card_time_registrated').text(new Date(participant.time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#"));
	$('#card_comment').val(participant.comment);
	
	//Display green check-icon if participant has been accreditated
	displayAccreditated(participant.entry_id, participant.accreditated);

	$('#participant_card').show();


};

//Display green check-icon and accreditation-button dependent on whether the participant has been accreditated
function displayAccreditated(entry_id, accreditated){
	$('#participant_card').transition('fade', '0ms');
	$('#participant_card').transition('fade up', '500ms');


	var check_icon;
	if(accreditated){
		$('#button_unaccreditate').show();
		$('#button_accreditate').hide();
		$('#card_accreditated_mark').show();
		$('#participant_card').css("background-color", "rgba(34, 190, 52, .2)");
		check_icon = '<i class="checkmark green icon"></i>';
	}
	else{
		$('#button_accreditate').show();
		$('#button_unaccreditate').hide();
		$('#card_accreditated_mark').hide();
		$('#participant_card').css("background-color", " rgba(257, 257, 257, 1)");
		check_icon = '';

	}

	//Display in the table if participant is accreditated or not
	$('#participants_table td').each(function() {
		var td_value =  $(this).attr("value");
		if(td_value == entry_id){
			$(this).html(check_icon);
		}
	 });
}


function displayCommentSaved(comment){
	console.log(comment);
}

//Accreditate participant by getting the entry_id from the value-attribute of the participant_card
function accreditateParticipant(accreditated){
	var entry_id = $( '#participant_card' ).val();
	var jsonData = {"accreditated": accreditated};
	apiPutAccreditation(entry_id, jsonData, participantAccreditated);
}

//Callback function when a participant has been accreditated
function participantAccreditated(accreditation){
	displayAccreditated(accreditation.entry_id, accreditation.accreditated);
}

//Called when user clicks the "Lagre kommentar"-button
function saveComment(){
	var entry_id = $( '#participant_card' ).val();
	var comment = $('#card_comment').val();
	var jsonData = {"comment": comment};

	apiPutComment(entry_id, jsonData, displayCommentSaved);
}