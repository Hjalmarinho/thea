$(document).ready(function(){
	apiGetSports(displaySports);
});

function displaySports(sports){
	console.log(sports);
	$('#sports_table_body').empty();
	$.each(sports, function (i, sport){
		$.each(sport.exercises, function (i, exercise){

			var tablerow = 	$('<tr value="'+ exercise.exercise_id + '" onclick="exerciseClicked(' + exercise.exercise_id + ')">'+ 
									'<td>' + sport.sport_description + '</td>'+
									'<td>' + exercise.exercise_description + '</td>'+
									'<td>' + exercise.exercise_location + '</td>'+
									'<td>' + exercise.is_teamexercise + '</td>'+
									'<td>' + sport.sport_fee + '</td>'+
									'<td>' + exercise.exercise_id + '</td>'+
								'</tr>');

			$('#sports_table_body').append(tablerow);
		});
	});
}

function displaySportSaved(data){
	console.log(data);
}

function displayExerciseSaved(data){
	console.log(data);
}

function displayRestrinctionsSaved(data){
	console.log(data);
}

function showSportModal(){
	$('#sport_modal').modal('show');
}

function showRestrictionsModal(){
	$('#restrictions_modal').modal('show');
}

function exerciseClicked(exercise_id){
	$('#sports_table tr').each(function() {
		if($(this).attr('value') == exercise_id){
			var sport_description = $(this).find('td').eq(0).text();
			var exercise_description = $(this).find('td').eq(1).text();
			var exercise_location = $(this).find('td').eq(2).text();
			var is_teamexercise = $(this).find('td').eq(3).text();
			var sport_fee = $(this).find('td').eq(4).text();

			$('#sport_description').val(sport_description);
			$('#exercise_location').val(exercise_location);
			$('#is_teamexercise').val(is_teamexercise);
			$('#sport_fee').val(sport_fee);
		}
	 });
	$('#sport_modal').modal('show');
}

function saveSport(){
	var sportJSON = {};
	sportJSON["sport_description"] = $('#sport_description').val();
	sportJSON["sport_fee"] = $('#sport_fee').val();
	sportJSON["sport_type"] = $('#sport_type').val();
	sportJSON["sport_deadline"] = $('#sport_deadline_year').val()+ '-' + $('#sport_deadline_month').val() + '-' + $('#sport_deadline_day').val();
	sportJSON["nsi_sport_id"] = null;
	sportJSON["max_male"] = parseInt($('#sport_capacity_male').val());
	sportJSON["max_female"] = parseInt($('#sport_capacity_female').val());
	sportJSON["num_slots"] = parseInt($('#sport_capacity_female').val()) + parseInt($('#sport_capacity_male').val()) ;
	sportJSON["sport_status"] = null ;
	
	var exercise = {};
	exercise["exercise_description"] = $('#sport_description').val();
	exercise["is_teamexercise"] = $('#is_teamexercise').val();
	exercise["exercise_location"] = $('#exercise_location').val();
	exercise["exercise_responsible"] = $('#exercise_responsible').val();
	sportJSON["exercises"] = [exercise];

	apiPostSport(sportJSON, displaySportSaved);
}

function saveRestrictions(){
	var restrictionsJSON = {};
	restrictionsJSON["restriction"] = "null";

	console.log(restrictionsJSON);
	apiPostSport(restrictionsJSON, displayRestrinctionsSaved);
}