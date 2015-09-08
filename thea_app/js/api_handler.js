// **********************************************************************
//  [Api Handler]

//  Project:        Thea 
//  Version:        2.0
//  Last change:    11/08/2015
//  Author:         Øystein Molnes
//  Primary use:    Handles communication with the API, documentet at 
//                  http://docs.thea.apiary.io/#, and updates the view(html)
// ***********************************************************************


// URL used to call the API
var baseURL = 'http://92.62.34.78:8080/thea-backend/v1/';


// Perform GET-call to API with given URL. Run callback-function with the result
function doGet(urlGET, callback){
    $.ajax({
        type: 'GET',
        url: urlGET,
        success: function(result){
            handleResult(result, callback);
        },
        error: function(){
            console.log('Got an error from server while running GET');
        } 
    });
}

// Perform POST-call to API with given URL.
function doPost(urlPOST, jsonData, callback){
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        url: urlPOST,
        data: JSON.stringify(jsonData),
        dataType: "json",
        success: function(result){
            handleResult(result, callback);
        },
        error: function(){
            console.log('Got an error from server while running POST');
        } 
    });
}

// Perform PUT-call to API with given URL.
function doPut(urlPUT, jsonData, callback, headerData){
    $.ajax({
        type: 'PUT',
        contentType: "application/json",
        url: urlPUT,
        data: JSON.stringify(jsonData),
        header: headerData,
        dataType: "json",
        success: function(result){
            handleResult(result, callback);
        },
        error: function(){
            console.log('Got an error from server while running PUT');
        } 
    });    
}

//Handle result from the API
function handleResult(result, callback){
    if(result.error){
        // TODO: do something with the potential error from server, and return
        console.log(result.error);
        callback(result.data);
    }else{
        callback(result.data);
    }
}

//      PARTICIPANTS
// ***********************************************************************
function apiGetParticipants(callback){
    doGet(baseURL + 'participants/', callback)
}

function apiGetParticipant(entry_id, callback){
    doGet(baseURL + 'participants/' + entry_id, callback)
}

function apiPutParticipant(entry_id, jsonData, callback, comment){
    doPut(baseURL + 'participants/' + entry_id, jsonData, callback, {'comment': comment})
}

function apiPostParticipant(jsonData, callback){
    doPost(baseURL+'participants/', jsonData, callback);
}

function apiGetPortrait(entry_id, callback){
    doGet(baseURL + 'participants/' + entry_id + '/portrait', callback)
}

function apiPutAccreditation(entry_id, jsonData, callback){
    doPut(baseURL + 'participants/'+entry_id+'/accreditated', jsonData, callback, {})
}

function apiPutComment(entry_id, jsonData, callback){
    doPut(baseURL + 'participants/'+entry_id+'/comment', jsonData, callback)
}

function apiCancelParticipant(entry_id, callback, comment){
    doPut(baseURL + 'participants/' + entry_id + "/cancel", "", callback, {'comment': comment})
}
//      SPORTS, EXERCISES, CLUBS, TEAMS
// ***********************************************************************
function apiGetSports(callback){
    doGet(baseURL+'sports', callback);
}

function apiPostSport(jsonData, callback){
    doPost(baseURL+'sports/', jsonData, callback);
}

function apiGetExercises(sportID, callback){
    doGet(baseURL+'sports/'+sportID+'/exercises', callback);
}

function apiGetTeams(exerciseID, callback){
    doGet(baseURL+'exercises/'+exerciseID+'/teams', callback);
}

function apiGetClubs(callback){
    doGet(baseURL+'clubs', callback);
}

function apiGetAllTeams(callback){
    doGet(baseURL + 'teams', callback)
}


//      EXTRAS
// ***********************************************************************
function apiGetAdditions(callback){
    doGet(baseURL+'additions/', callback);
}

//      EVENTS
// ***********************************************************************
function apiGetEvents(callback){
    doGet(baseURL+'events/', callback);
}

function apiPostEvent(jsonData, callback){
    doPost(baseURL+'events/', jsonData, callback);
}
