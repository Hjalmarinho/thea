$(document).ready(function(){
	$('.ui.dropdown').dropdown()

	$('.special.cards .image').dimmer({
  		on: 'hover'
	});

	apiGetParticipants(displayParticipants);
	
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

//      UPDATE GUI FUNCTIONS
// ***********************************************************************

//Populate table-body with all participants
function displayParticipants(participants){
	var participants_table_body = ('#participants_table_body');
	$.each(participants, function (i, participant){

		var tablerow = 	$('<tr value="'+ participant.entry_id + '" onclick="participantClicked(' + participant.entry_id + ')">'+ 
								'<td>' + participant.person.first_name + '</td>'+
								'<td>' + participant.person.last_name + '</td>'+
								'<td>' + participant.club.club_name + '</td>'+
							'</tr>');

		//Display green check-icon if participant has been accreditated
		setBackgroundColor($(tablerow), participant.accreditated);

		$(participants_table_body).append(tablerow);
	});
	initiateSearch();
};	

// Display a participant on the card
function displayParticipant(participant){
	$('#participant_card').val(participant.entry_id);
	$('#card_name').text(participant.person.first_name+' '+participant.person.last_name);

	//TODO: Print out additions

	
	$('#card_img').attr('src', '')
	apiGetPortrait(participant.entry_id, displayPortrait);

	$('#card_time_registrated').text('Påmeldt ' + new Date(participant.time_registrated).customFormat("#DD#. #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#"));
	$('#card_comment').val(participant.comment);
	
	//Display green check-icon if participant has been accreditated
	displayAccreditated(participant.entry_id, participant.accreditated);

	$('#participant_card').show();

};

function displayPortrait(image){
	$('#card_portrait').attr('src', 'data:image/jpeg;base64,' + image.image_data)
}

//Callback function when a participant has been accreditated
function participantAccreditated(accreditation){
	displayAccreditated(accreditation.entry_id, accreditation.accreditated);
}

//Display green check-icon and accreditation-button dependent on whether the participant has been accreditated
function displayAccreditated(entry_id, accreditated){

	if(accreditated){
		$('#button_unaccreditate').show();
		$('#button_accreditate').hide();
		$('#card_accreditated_mark').show();
		setBackgroundColor($('#participant_card'), true);
	}
	else{
		$('#button_accreditate').show();
		$('#button_unaccreditate').hide();
		$('#card_accreditated_mark').hide();
		setBackgroundColor($('#participant_card'), false);
	}

	//Display in the table if participant is accreditated or not
	$('#participants_table tr').each(function() {
		var tr_value =  $(this).attr("value");
		if(tr_value == entry_id){
			setBackgroundColor($(this), accreditated);
		}
	 });
}

function displayCommentSaved(comment){
	console.log(comment);
	$('#card_comment').hide();
	$('#comment_message').show();
	$('#comment_message').delay(1000).fadeOut();
	$('#card_comment').delay(1400).fadeIn();

}

function setBackgroundColor(div, accreditated){
	if(accreditated){
		div.css("background-color", "rgba(34, 190, 52, .2)");
	}else{
		div.css("background-color", "rgba(257, 257, 257, 1)");
	}
}

//      POST/PUT/GET TO API FUNCTIONS
// ***********************************************************************

//Called when a participant in the table is clicked
function participantClicked(entry_id){
	if(entry_id){
		//Get participant from API and display it's data in the participant_card
		apiGetParticipant(entry_id, displayParticipant);
	}
}

//Accreditate participant by getting the entry_id from the value-attribute of the participant_card
function accreditateParticipant(accreditated){
	var entry_id = $( '#participant_card' ).val();
	var jsonData = {"accreditated": accreditated};
	apiPutAccreditation(entry_id, jsonData, participantAccreditated);
}

//Called when user clicks the "Lagre kommentar"-button
function saveComment(){
	var entry_id = $( '#participant_card' ).val();
	var comment = $('#card_comment').val();
	var jsonData = {"comment": comment};

	apiPutComment(entry_id, jsonData, displayCommentSaved);
}

