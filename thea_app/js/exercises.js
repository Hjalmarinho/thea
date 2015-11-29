"use strict";

var event_id = sessionStorage.getItem("event_id");

$(document).ready(function()
{
  var request = apiGetSports(displayExercises, handleError, event_id)
  
  $.when(request).done(function()
  {
    $("#exerciseLoader").hide();
  });

});

function displayExercises(sports)
{
  console.log(sports)

  $.each(sports, function (i, sport){
    for(var i = 0; i < sport.exercises.length; i++){
      var exercise_id = sport.exercises[i].exercise_id
      var exercise_name = sport.exercises[i].exercise_description
      var sport_name = sport.sport_description
      var sport_id = sport.sport_id
      var num_participants = '100'
      var num_teams

      if(sport.exercises[i].is_teamexercise)
      {
        num_teams = 2
      }
      else
      {
        num_teams = '-'
      }
      var tablerow = '<tr><td><a href="./exercise.php?team_id=' + exercise_id +'">' + exercise_name + '</a></td><td><a href="./sport.php?sport_id=' + sport_id +'">' + sport_name + '</a></td><td>' + num_participants + '</td><td>' + 
               num_teams + '</td></tr>'
      $('#exercises').append(tablerow)

    }
  });
}

function handleError(errorMsg)
{
}