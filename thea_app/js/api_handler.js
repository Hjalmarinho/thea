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
// var baseURL = 'http://localhost:8080/thea-backend/v1/';

function addJWT(xhr) {
    // Add the jwt header if it exists
    var jwt = sessionStorage.getItem("jwt");
    if (jwt !== null) {
        xhr.setRequestHeader("Authorization", "Bearer " + jwt);
    }
}

// Perform GET-call to API with given URL. Run callback-function with the result
function doGet(urlGET, callback, errorCallback){
    $.ajax({
        type: 'GET',
        url: urlGET,
        beforeSend : addJWT,
        success: function(result){
            handleResult(result, callback, errorCallback);
        },
        error: function(){
            errorCallback("Ooops, noe uventet skjedde...");
            // console.log('Got an error from server while running GET');
        }
    });
}

// Perform POST-call to API with given URL.
function doPost(urlPOST, jsonData, callback, errorCallback){
    console.log('url: '+urlPOST)
    console.log(jsonData)
    $.ajax({
        type: 'POST',
        contentType: "application/json",
        url: urlPOST,
        data: JSON.stringify(jsonData),
        dataType: "json",
        beforeSend : addJWT,
        success: function(result){
            handleResult(result, callback, errorCallback);
        },
        error: function(){
            errorCallback("Ooops, noe uventet skjedde...");
            // console.log('Got an error from server while running POST');
        }
    });
}

// Perform PUT-call to API with given URL.
function doPut(urlPUT, jsonData, callback, errorCallback, headerData){
    $.ajax({
        type: 'PUT',
        contentType: "application/json",
        url: urlPUT,
        data: JSON.stringify(jsonData),
        header: headerData,
        dataType: "json",
        beforeSend : addJWT,
        success: function(result){
            handleResult(result, callback, errorCallback);
        },
        error: function(){
            errorCallback("Ooops, noe uventet skjedde...");
            // console.log('Got an error from server while running PUT');
        }
    });
}

//Handle result from the API
function handleResult(result, callback, errorCallback){
    if(result.error){
        // TODO: do something with the potential error from server, and return
        errorCallback(result.error);
    }else{
        callback(result.data);
    }
}

//      PARTICIPANTS
// ***********************************************************************
function apiGetParticipants(callback, event_id, errorCallback){
    doGet(baseURL + 'events/' + event_id + '/participants/', callback, errorCallback)
}

function apiGetParticipant(entry_id, event_id, callback, errorCallback){
    doGet(baseURL + 'events/' + event_id + '/participants/' + entry_id, callback, errorCallback)
}


function apiGetPortrait(entry_id, event_id, callback, errorCallback){
    doGet(baseURL + 'events/' + event_id + '/participants/' + entry_id + '/portrait', callback, errorCallback)
}

//      SPORTS, EXERCISES, CLUBS, TEAMS
// ***********************************************************************
function apiGetSports(event_id, callback, errorCallback){
    doGet(baseURL + 'events/' + event_id + '/sports', callback, errorCallback);
}

function apiGetClubs(callback, errorCallback){
    doGet(baseURL+'clubs', callback, errorCallback);
}


//      USER
// ***********************************************************************
function apiLoginUser(jsonData, callback, errorCallback) {
    doPost(baseURL + 'users/login/', jsonData, callback, errorCallback);
}

