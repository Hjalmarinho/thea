$(document).ready(function(){
	apiGetEvents(displayEvents);
});

function showEventModal(){
	apiGetClubs(displayOrganizers);

	$('.ui.modal')
	  .modal('show')
	;
}

function displayEvents(events){
	console.log(events);
	if(events){
	    $.each(events, function(i, event){
	     $('#events').append('<option value='+event.event_id+'>'+event.event_description+'</option>');      
	 });
	}
}

function displayOrganizers(organizers){
	if(organizers){
	    $.each(organizers, function(i, organizer){
	     $('#event_organizer').append('<option value='+organizer.club_id+'>'+organizer.club_name+'</option>');      
	 });
	}
}

function displayEventSaved(data){
	console.log(data);
}

function postEvent(){
	var eventJSON = {};
	eventJSON["event_organizer"] = parseInt($('#event_organizer').val());
	eventJSON["event_type"] = $('#event_type').val();
	eventJSON["event_description"] = $('#event_description').val();
	var event_admin = {};
	event_admin["email"] = $('#event_admin').val();
	eventJSON["event_admin"] = event_admin;
	eventJSON["event_email"] = $('#event_email').val();
	eventJSON["event_start"] = $('#event_start_year').val()+ '-' + $('#event_start_month').val() + '-' + $('#event_start_day').val();
	eventJSON["event_end"] = $('#event_end_year').val()+ '-' + $('#event_end_month').val() + '-' + $('#event_end_day').val();
	eventJSON["terms_text"] = "terms_text";
	eventJSON["terms_url"] = "terms_url";


	apiPostEvent(eventJSON, displayEventSaved);
}