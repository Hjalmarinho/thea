$(document).ready(function(){
});

function displaySports(sports){
	if(sports){
	    $.each(sports, function(i, sport){
	     $('#sport_description').append('<option value='+sport.sport_id+'>'+sport.sport_description+'</option>');      
	 });
	}
}


function displaySportSaved(data){
	console.log(data);
}

function displayRestrinctionsSaved(data){
	console.log(data);
}

function showSportModal(){
	apiGetSports(displaySports);
	$('#sport_modal')
	.modal('show')
	;
}

function showRestrictionsModal(){
	$('#restrictions_modal')
	.modal('show')
	;
}

function saveSport(){
	var sportJSON = {};
	sportJSON["sport_description"] = $('#sport_description').val();
	sportJSON["sport_type"] = $('#sport_type').val();
	sportJSON["sport_responsible"] = $('#sport_responsible').val();
	sportJSON["sport_location"] = $('#sport_location').val();
	sportJSON["sport_deadline"] = $('#sport_deadline_year').val()+ '-' + $('#sport_deadline_month').val() + '-' + $('#sport_deadline_day').val();
	sportJSON["sport_capacity"] = $('#sport_capacity').val();

	console.log(sportJSON);
	apiPostSport(sportJSON, displaySportSaved);
}

function saveRestrictions(){
	var restrictionsJSON = {};
	restrictionsJSON["restriction"] = "null";

	console.log(restrictionsJSON);
	apiPostSport(restrictionsJSON, displayRestrinctionsSaved);
}