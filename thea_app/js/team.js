"use strict";

var event_id = sessionStorage.getItem("event_id");
var sport_id;

$(document).ready(function(){
	
	$('#updateTeam').click(function(){
        $('#approve-update').modal('show');    
     });

	$('#cancelTeam').click(function(){
		$('#cancel-modal').modal('show');
	});

	apiGetClubs(displayClubs, handleError)
	apiGetSports(displaySports, handleError, event_id)
	apiGetTeam(displayTeam, handleError, event_id, local_team_id);
	apiGetExercises(displayExercises, handleError, event_id, sport_id)
	$('.ui.dropdown').has($('#teamleader')).dropdown('set selected', teamleader_name);

})

var local_team_id = GetURLParameter('team_id')
var teamleader_name

function displayClubs(clubs){
	if (clubs){
		$.each(clubs, function(i, club){
			$('#clubs').append('<option value=' + club.club_id + '>' + escapeHtml(club.club_name) + '</option>');
		});
	}
}

function displaySports(sports){
	if(sports){
        $.each(sports, function(i, sport){
           $('#sports').append('<option value='+sport.sport_id+'>'+ escapeHtml(sport.sport_description) +'</option>');      
       });
    }
}

function displayTeamLeaderCandidates(member){
	if(member){
		$('#teamleader').append('<option value='+member.entry_id+'>'+ member.person.first_name + ' ' + member.person.last_name +'</option>')
	}
}

function displayExercises(exercises){
	if (exercises){
		$.each(exercises, function(i, exercise){
			$('#exercises').append('<option value=' + exercise.exercise_id + '>' + escapeHtml(exercise.exercise_description) + '</option>');
		});
	}
}

function displayTeam(team){
	console.log(team)
	sport_id = team.exercise.sport.sport_id

	var id_teamname = $('.teamname')
	var id_team_name = $('#team_name')
	var id_exercises = $('#exercises')
	var id_sports = $('#sports')
	var id_clubs = $('#clubs')
	var id_select_gender = $('#selectgender')
	var id_teamleader = $('#teamleader')
	var dropdown = $('.ui.dropdown')
	var id_teammembers = $('#teammembers')
	teamleader_name = team.contact_person.person.first_name + ' ' + team.contact_person.person.last_name;

	id_teamname.text(team.team_name)


	id_team_name.val(team.team_name)
	dropdown.has(id_select_gender).dropdown('set selected', genderToString(team.team_gender));
	dropdown.has(id_clubs).dropdown('set selected', team.contact_person.club.club_name);
	dropdown.has(id_sports).dropdown('set selected', team.exercise.sport.sport_description);

	displayTeamLeaderCandidates(team.contact_person)
	
	if(team.team_members.length > 0){

		for (var i = 0; i < team.team_members.length; i++){
			var tablerow = '<tr><td><i class="red remove icon"></td><td><a href="./participant.php?entry_id=' + team.team_members[i].entry_id + '">' + team.team_members[i].person.first_name + ' ' + team.team_members[i].person.last_name + '</a></td></tr>' 
			id_teammembers.append(tablerow)
			displayTeamLeaderCandidates(team.team_members[i])
		}
		id_teammembers.append('<tr><td><i class="green plus icon"></td><td></td></tr>')
	}
	//dropdown.has(id_teamleader).dropdown('set selected', teamleader_name);
	
}

function handleError(errorMsg) {
}