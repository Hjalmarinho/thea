// **********************************************************************
//  [Api Handler]

//  Project:        Thea 
//  Version:        2.0
//  Last change:    11/08/2015
//  Author:         Øystein Molnes
//  Primary use:    Handle communication with the REST-api, and 
//                  updating the View
// ***********************************************************************

// URLs
var baseURL = 'http://92.62.34.78:8080/thea-backend/v1/';
var participantsURL = baseURL + 'participants/'


// Perform GET-call to REST-api with given URL. Run callback-function with the result
function doGet(urlGet, callback){
    $.ajax({
        type: 'GET',
        url: urlGet,
        success: function(result){
            if(result.error){
                callback(result.data);
                // return;
            }else{
                callback(result.data);
            }
        } 
    });
}

// http://docs.thea.apiary.io/#reference/club/clubs/list-all-clubs
function getClubs(callback){
    doGet(baseURL+'clubs', callback);
}

// http://docs.thea.apiary.io/#reference/sport/sports/list-all-sports
function getSports(callback){
    doGet(baseURL+'sports', callback);
}

function getParticipants(callback){
    doGet(baseURL + 'participants', callback);
}

function getParticipant(entry_id, callback){
    doGet(baseURL + 'participants/' + entry_id, callback)
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function getExercises(sportID){
    doGet(baseURL+'sports/'+sportID+'/exercises', displayExercises);
}