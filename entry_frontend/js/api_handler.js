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
                console.log(result.error);
                callback(result.data);
            }else{
                callback(result.data);
            }
        },
        error: function(){
            console.log('Got an error from server while running GET');
        } 
    });
}

// Perform POST-call to REST-api with given URL.
function doPost(urlPOST, jsonData, callback){
    console.log(jsonData);
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        url: urlPOST,
        data: JSON.stringify(jsonData),
        dataType: "json",
        success: function(result){
            if(result.error){
                // TODO: do something with the potential error from server, and return
                console.log(result.error);
                callback(result.data);
            }else{
                //TODO: the POST was successful
                callback(result.data);
            }
        },
        error: function(){
            console.log('Got an error from server while running POST');
        } 
    });
}

// http://docs.thea.apiary.io/#reference/club/clubs/list-all-clubs
function apiGetClubs(callback){
    doGet(baseURL+'clubs', callback);
}

// http://docs.thea.apiary.io/#reference/sport/sports/list-all-sports
function apiGetSports(callback){
    doGet(baseURL+'sports', callback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetExercises(sportID, callback){
    doGet(baseURL+'sports/'+sportID+'/exercises', callback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetTeams(exerciseID, callback){
    doGet(baseURL+'exercises/'+exerciseID+'/teams', callback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetAdditions(callback){
    doGet(baseURL+'additions/', callback);
}

// http://docs.thea.apiary.io/#reference/participant/participants/add-a-participant
function apiPostParticipant(json, callback){
    doPost(baseURL+'participants/', json, callback);
}
