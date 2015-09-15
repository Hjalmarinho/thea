// **********************************************************************
//  [Api Handler]

//  Project:        Thea 
//  Version:        2.0
//  Last change:    11/08/2015
//  Author:         Øystein Molnes
//  Primary use:    Handles communication with the API, and 
//                  updates the view(html)
// ***********************************************************************


// URLs used to call the API
var eventId = 1;
var baseURL = 'http://62.122.254.121:8080/thea-backend/v1/';
var participantsURL = baseURL + 'participants/'


// Perform GET-call to API with given URL. Run callback-function with the result
function doGet(urlGET, successCallback, errorCallback){
    $.ajax({
        type: 'GET',
        url: urlGET,
        success: function(result){
            handleResult(result, successCallback, errorCallback);
        },
        error: function(){
            console.log('Got an error from server while running GET');
        } 
    });
}

// Perform POST-call to API with given URL.
function doPost(urlPOST, jsonData, successCallback, errorCallback){
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        url: urlPOST,
        data: JSON.stringify(jsonData),
        dataType: "json",
        success: function(result){
            handleResult(result, successCallback, errorCallback);
        },
        error: function(){
            console.log('Got an error from server while running POST');
        } 
    });
}

// Perform PUT-call to API with given URL.
function doPut(urlPUT, jsonData, successCallback, errorCallback){
    $.ajax({
        type: 'PUT',
        contentType: "application/json",
        url: urlPUT,
        data: JSON.stringify(jsonData),
        dataType: "json",
        success: function(result){
            handleResult(result, successCallback, errorCallback);
        },
        error: function(){
            console.log('Got an error from server while running PUT');
        } 
    }); 
}

//Handle result from the API
function handleResult(result, successCallback, errorCallback){
    if(result.error){
        // TODO: do something with the potential error from server, and return
        // showError(result.error);
        errorCallback(result.error);
        // callback(result.data);
    }else{
        successCallback(result.data);
    }
}

// http://docs.thea.apiary.io/#reference/club/clubs/list-all-clubs
function apiGetClubs(successCallback, errorCallback){
    doGet(baseURL+'clubs', successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/sport/sports/list-all-sports
function apiGetSports(successCallback, errorCallback){
    doGet(baseURL+ 'events/' + eventId + '/sports', successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetExercises(sportID, successCallback, errorCallback){
    doGet(baseURL+ 'events/' + eventId + '/sports/'+sportID+'/exercises', successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetTeams(exerciseID, successCallback, errorCallback){
    doGet(baseURL+ 'events/' + eventId + '/exercises/'+exerciseID+'/teams', successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetAdditions(successCallback, errorCallback){
    doGet(baseURL+ 'events/' + eventId + '/additions/', successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/participant/participants/add-a-participant
function apiPostParticipant(json, successCallback, errorCallback){
    doPost(baseURL+ 'events/' + eventId + '/participants/', json, successCallback, errorCallback);
}

//http://docs.thea.apiary.io/#reference/transaction/transactionsidprocess/complete-a-participant-registration
function apiPutTransaction(transactionID, successCallback, errorCallback){
    doPut(baseURL+ 'events/' + eventId + '/transactions/'+transactionID+'/process', {}, successCallback, errorCallback);
}

function apiPutTerminateEntry(transactionID, successCallback, errorCallback){
    doPut(baseURL+ 'events/' + eventId + '/transactions/'+transactionID+'/terminate', {}, successCallback, errorCallback);
}