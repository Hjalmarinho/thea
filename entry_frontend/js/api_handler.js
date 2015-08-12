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
        },
        error: function(){
            alert('Got an error from server while running GET');
        } 
    });
}

// Perform POST-call to REST-api with given URL.
function doPost(urlPOST, json){
    $.ajax({
        type: 'POST',
        url: urlPOST,
        data: json,
        success: function(result){
            if(result.error){
                // TODO: do something with the potential errorfrom server, and return
                console.log(result.data);
            }else{
                console.log(result.data);
            }
        },
        error: function(){
            alert('Got an error from server while running POST');
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

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function getExercises(sportID, callback){
    doGet(baseURL+'sports/'+sportID+'/exercises', callback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function getTeams(exerciseID, callback){
    doGet(baseURL+'exercises/'+exerciseID+'/teams', callback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function getAdditions(callback){
    doGet(baseURL+'additions/', callback);
}

// http://docs.thea.apiary.io/#reference/participant/participants/add-a-participant
function postParticipant(json){
    doPost(baseURL+'participants/', json);
}
