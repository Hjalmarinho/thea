// **********************************************************************
//  [Api Handler]

//  Project:        Thea 
//  Version:        2.0
//  Last change:    11/08/2015
//  Author:         Øystein Molnes
//  Primary use:    Handles communication with the REST-api, and 
//                  updates the view(html)
// ***********************************************************************


// URLs used to call the API
var baseURL = 'http://92.62.34.78:8080/thea-backend/v1/';
var participantsURL = baseURL + 'participants/'


// Perform GET-call to REST-api with given URL. Run callback-function with the result
function doGet(urlGET, callback){
    $.ajax({
        type: 'GET',
        url: urlGET,
        success: function(result){
            if(result.error){
                // TODO: do something with the potential error, and return
                callback(result.data);
            }else{
                callback(result.data);
            }
        } 
    });
}

// http://docs.thea.apiary.io/#reference/club/clubs/list-all-clubs
function getClubs(){
    doGet(baseURL+'clubs', displayClubs);
}

// http://docs.thea.apiary.io/#reference/sport/sports/list-all-sports
function getSports(){
    doGet(baseURL+'sports', displaySports);
}

// http://docs.thea.apiary.io/#reference/sport/sports/list-all-sports
function getSports(){
    doGet(baseURL+'sports', displaySports);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function getExercises(sportID){
    doGet(baseURL+'sports/'+sportID+'/exercises', displayExercises);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function getTeams(exerciseID){
    console.log('Display teams for '+exerciseID);
}

// http://docs.thea.apiary.io/#reference/participant/participants/add-a-participant
function postParticipant(form){
    console.log('Post participant');
}