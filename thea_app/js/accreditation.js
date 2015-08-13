$(document).ready(function(){
	$('.ui.dropdown').dropdown()

	$('.special.cards .image').dimmer({
  		on: 'hover'
	});

	apiGetParticipants(displayAccreditations);
});


function displayAccreditations(accreditations){
	var accreditationsdiv = ('#accreditations')
	$.each(accreditations, function (i, accreditant){
		var first_name = accreditant.person.first_name;
		var last_name = accreditant.person.last_name;
		var club = accreditant.club.club_name;
		var time_registrated = new Date(accreditant.time_registrated).customFormat("#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#");
		var entry_id = accreditant.entry_id;

		var tablerow = 		'<tr onclick="displayAccreditant()"> <td>' + first_name + '</a></td>'+
								'<td>' + last_name + '</td>'+
								'<td>' + club + '</td>'+
							'</tr>';
		$(accreditationsdiv).append(tablerow);
	});
};

function displayAccreditant(accreditant){
	console.log('hello');
};