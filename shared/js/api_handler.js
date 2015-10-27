// **********************************************************************
//  [Api Handler]

//  Project:        Thea 
//  Version:        2.0
//  Last change:    11/08/2015
//  Author:         Øystein Molnes
//  Primary use:    Handles communication with the API.
// ***********************************************************************


// URLs used to call the API
var eventId = 1;
<?php
    // Read the API base url from settings file.
    $content = file_get_contents(__DIR__ . "/../../settings.json");
    $jsonObject = json_decode($content);
    echo "var baseURL = '" . $jsonObject->frontend->api_base_url . "';";
?>

function addJWT(xhr) {
    // Add the jwt header if it exists
    var jwt = sessionStorage.getItem('jwt');
    if (jwt !== null)
        xhr.setRequestHeader('Authorization', 'Bearer ' + jwt);
}

// Perform GET-call to API with given URL. Run callback-function with the result
function doGet(urlGET, successCallback, errorCallback) {
    return $.ajax({
        type: 'GET',
        url: urlGET,
        beforeSend : addJWT,
        success: function(result){
            handleResult(result, successCallback, errorCallback);
        },
        error: function(){
            errorCallback('Ooops, noe uventet skjedde...');
        } 
    });
}


// Perform a RAW GET-call to API with given URL. Run callback-function with the result
function doRawGet(urlGET, successCallback, errorCallback) {
    return $.ajax({
        type: 'GET',
        url: urlGET,
        beforeSend : addJWT,
        success: function(result){
            successCallback(result);
        },
        error: function(){
            errorCallback('Ooops, noe uventet skjedde...');
        } 
    });
}


// Perform POST-call to API with given URL.
function doPost(urlPOST, jsonData, successCallback, errorCallback) {
    return $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: urlPOST,
        data: JSON.stringify(jsonData),
        dataType: 'json',
        beforeSend : addJWT,
        success: function(result){
            handleResult(result, successCallback, errorCallback);
        },
        error: function(){
            errorCallback('Ooops, noe uventet skjedde...');
        } 
    });
}

// Perform PUT-call to API with given URL.
function doPut(urlPUT, jsonData, successCallback, errorCallback, headerData) {
    return $.ajax({
        type: 'PUT',
        contentType: 'application/json',
        url: urlPUT,
        data: JSON.stringify(jsonData),
        header: headerData,
        dataType: 'json',
        beforeSend : addJWT,
        success: function(result){
            handleResult(result, successCallback, errorCallback);
        },
        error: function(){
            errorCallback('Ooops, noe uventet skjedde...');
        } 
    }); 
}

//Handle result from the API
function handleResult(result, successCallback, errorCallback) {
    if (result.error) {
        errorCallback(result.error);
    } else {
        successCallback(result.data);
    }
}

// http://docs.thea.apiary.io/#reference/club/clubs/list-all-clubs
function apiGetClubs(successCallback, errorCallback) {
    return doGet(baseURL + 'clubs', successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/sport/sports/list-all-sports
function apiGetSports(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/sports', successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetExercises(successCallback, errorCallback, eventId, sportId) {
    return doGet(baseURL + 'events/' + eventId + '/sports/' + sportId + '/exercises', successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetTeams(successCallback, errorCallback, eventId, exerciseId) {
    return doGet(baseURL + 'events/' + eventId + '/exercises/' + exerciseId + '/teams', successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetAdditions(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/additions/', successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/participant/participants/add-a-participant
function apiPostParticipant(successCallback, errorCallback, json, eventId) {
    return doPost(baseURL + 'events/' + eventId + '/participants/', json, successCallback, errorCallback);
}

//http://docs.thea.apiary.io/#reference/transaction/transactionsidprocess/complete-a-participant-registration
function apiPutTransaction(successCallback, errorCallback, transactionId) {
    return doPut(baseURL + 'events/' + eventId + '/transactions/'+transactionId+'/process', {}, successCallback, errorCallback);
}

function apiPutTerminateEntry(successCallback, errorCallback, transactionId, eventId) {
    return doPut(baseURL + 'events/' + eventId + '/transactions/' + transactionId + '/terminate', {}, successCallback, errorCallback);
}

function apiGetParticipants(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/participants/', successCallback, errorCallback)
}

function apiGetParticipant(successCallback, errorCallback, eventId, entryId) {
    return doGet(baseURL + 'events/' + eventId + '/participants/' + entryId, successCallback, errorCallback)
}

function apiGetPortrait(successCallback, errorCallback, eventId, entryId) {
    return doGet(baseURL + 'events/' + eventId + '/participants/' + entryId + '/portrait', successCallback, errorCallback)
}

function apiLoginUser(successCallback, errorCallback, jsonData) {
    return doPost(baseURL + 'users/login/', jsonData, successCallback, errorCallback);
}

function apiGetReceipt(successCallback, errorCallback, eventId, entryId) {
    return doRawGet(baseURL + 'events/' + eventId + '/participants/' + entryId + '/receipt', successCallback, errorCallback)
}

function apiCancelParticipant(entry_id, callback, errorCallback, comment){
    doPut(baseURL + 'events/' + eventId + '/participants/' + entry_id + "/cancel", "", callback, errorCallback, {'comment': comment})
}