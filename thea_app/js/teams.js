$(document).ready(function(){
	apiGetAllTeams(displayTeams);
})

function displayTeams(teams){
	console.log(teams)
	var teamsdiv = ('#teams')
	$.each(teams, function (i, team){
		var team_name = team.team_name
		var club_name = team.contact_person.club.club_name
		var team_gender = customGenderFormat(team.team_gender)
		var entry_id = team.contact_person.entry_id
		var contact_person_first_name = team.contact_person.person.first_name
		var contact_person_last_name = team.contact_person.person.last_name
		var team_id = team.team_id
		var club_id = team.contact_person.club.club_id
		var tablerow = '<tr><td><a href="./team.php?team_id=' + team_id +'">' + team_name + '</a></td><td>' + team.exercise.sport.sport_description + '</td><td>' + team.exercise.exercise_description + '</td><td>' + 
					   club_name + '</td><td>' + team_gender + '</td><td><a href="./participant.php?entry_id=' + 
					   entry_id +'">' + contact_person_first_name + " " + contact_person_last_name + '</a></td></tr>'
		$(teamsdiv).append(tablerow)
	});

}