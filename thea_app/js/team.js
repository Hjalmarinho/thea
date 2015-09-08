$(document).ready(function(){
	
	$('#updateTeam').click(function(){
        $('#approve-update').modal('show');    
     });

	$('#cancelTeam').click(function(){
		$('#cancel-modal').modal('show');
	});

	apiGetClubs(displayClubs)
	//apiGetExercises()
	apiGetTeam(local_team_id, displayTeam);

})

var local_team_id = GetURLParameter('team_id')

function displayClubs(clubs){
    if(clubs){
        $.each(clubs, function(i, club){
           $('#clubs').append('<option value='+club.club_id+'>'+club.club_name+'</option>');      
       });
    }
}

function displayTeamLeaderCandidates(member){
	if(member){
		$('#teamleader').append('<option value='+member.entry_id+'>'+ member.person.first_name + ' ' + member.person.last_name +'</option>')
	}
}

function displayTeam(team){
	console.log(team)
	var id_teamname = $('.teamname')
	var id_team_name = $('#team_name')
	var id_exercises = $('#exercises')
	var id_clubs = $('#clubs')
	var id_select_gender = $('#selectgender')
	var id_teamleader = $('#teamleader')
	var dropdown = $('.ui.dropdown')
	var id_teammembers = $('#teammembers')
	var teamleader_name = team.contact_person.person.first_name + ' ' + team.contact_person.person.last_name;

	id_teamname.text(team.team_name)


	id_team_name.val(team.team_name)
	dropdown.has(id_select_gender).dropdown('set selected', team.team_gender);
	dropdown.has(id_clubs).dropdown('set selected', team.contact_person.club.club_name);

	displayTeamLeaderCandidates(team.contact_person)
	for (i=0; i < team.team_members.length; i++){
		var tablerow = '<tr><td><i class="red remove icon"></td><td><a href="./participant.php?entry_id=' + team.team_members[i].entry_id + '">' + team.team_members[i].person.first_name + ' ' + team.team_members[i].person.last_name + '</a></td></tr>' 
		id_teammembers.append(tablerow)
		displayTeamLeaderCandidates(team.team_members[i])
	}
	id_teammembers.append('<tr><td><i class="green plus icon"></td><td></td></tr>')
	dropdown.has(id_teamleader).dropdown('set selected', teamleader_name);

}