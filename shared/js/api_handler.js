// **********************************************************************
//  [Api Handler]

//  Project:        Thea
//  Version:        2.0
//  Last change:    11/08/2015
//  Author:         Øystein Molnes
//  Primary use:    Handles communication with the API.
// ***********************************************************************


// URLs used to call the API
var eventId = -1;
<?php
    // Read the API base url from settings file.
    $input_event_id = filter_input(INPUT_GET, 'event_id', FILTER_VALIDATE_INT);
    if (!is_null($input_event_id) && $input_event_id !== false)
    {
      echo 'eventId = ' . $input_event_id . ';';
    }
    $content = file_get_contents(__DIR__ . "/../../settings.json");
    $jsonObject = json_decode($content);
    echo "var baseURL = '" . $jsonObject->frontend->api_base_url . "';";
    echo "var baseURLv2 = '" . str_replace("v1", "v2", $jsonObject->frontend->api_base_url) . "';";

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
        beforeSend : function (request)
        {
            addJWT(request);
        },
        success: function(result){
            handleResult(result, successCallback, errorCallback);
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
        url: urlPOST,
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend : function (request)
        {
            addJWT(request);
        },
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
        beforeSend : function (request)
        {
            addJWT(request);
        },
        success: function(result){
            handleResult(result, successCallback, errorCallback);
        },
        error: function(){
            errorCallback('Ooops, noe uventet skjedde...');
        }
    });
}

// Perform DELETE-call to API with given URL.
function doDelete(urlDELETE, jsonData, successCallback, errorCallback, headerData) {
    return $.ajax({
        type: 'delete',
        contentType: 'application/json',
        url: urlDELETE,
        data: JSON.stringify(jsonData),
        header: headerData,
        dataType: 'json',
        beforeSend : function (request)
        {
            addJWT(request);
        },
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


function apiGetEvent(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId, successCallback, errorCallback);
}

function apiGetEvents(successCallback, errorCallback) {
    return doGet(baseURL + 'events', successCallback, errorCallback);
}


function apiGetEventFromAlias(successCallback, errorCallback, alias) {
    return doGet(baseURL + 'events/alias/' + alias, successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetExercises(successCallback, errorCallback, eventId, sportId) {
    return doGet(baseURL + 'events/' + eventId + '/sports/' + sportId + '/exercises', successCallback, errorCallback);
}

function apiGetExercise(successCallback, errorCallback, eventId, exerciseId) {
    return doGet(baseURL + 'events/' + eventId + '/exercises/' + exerciseId, successCallback, errorCallback);
}


// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetTeams(successCallback, errorCallback, eventId, exerciseId) {
    return doGet(baseURL + 'events/' + eventId + '/exercises/' + exerciseId + '/teams', successCallback, errorCallback);
}

function apiGetTeamsForExercise(successCallback, errorCallback, eventId, exerciseId) {
    return doGet(baseURLv2 + 'events/' + eventId + '/exercises/' + exerciseId + '/teams', successCallback, errorCallback);
}

function apiGetParticipantsForExercise(successCallback, errorCallback, eventId, exerciseId) {
    return doGet(baseURLv2 + 'events/' + eventId + '/exercises/' + exerciseId + '/participants', successCallback, errorCallback);
}


// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetTeam(successCallback, errorCallback, eventId, teamId) {
    return doGet(baseURL + 'events/' + eventId + '/teams/' + teamId, successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetAdditions(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/additions/', successCallback, errorCallback);
}


function apiGetEventSummary(successCallback, errorCallback, eventId) {
    return doGet(baseURLv2 + 'events/' + eventId + '/summary', successCallback, errorCallback)
}

// -- PARTICIPANTS -- \\
function apiPutParticipant(successCallback, errorCallback, eventId, entryId, jsonData, comment) {
    return doPut(baseURL + 'events/' + eventId + '/participants/' + entryId, jsonData, successCallback, errorCallback, {'comment': comment})
}

function apiPostNewParticipant(successCallback, errorCallback, json, eventId) {
    return doPost(baseURL + 'events/' + eventId + '/participants/blank', json, successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/participant/participants/add-a-participant
function apiPostParticipant(successCallback, errorCallback, json, eventId) {
    return doPost(baseURL + 'events/' + eventId + '/participants/', json, successCallback, errorCallback);
}

function apiPostParticipantAdditions(successCallback, errorCallback, json, eventId) {
    return doPost(baseURL + 'events/' + eventId + '/participants/additions', json, successCallback, errorCallback);
}

function apiPostExternalPerson(successCallback, errorCallback, json, eventId) {
    return doPost(baseURL + 'events/' + eventId + '/externalpersons/', json, successCallback, errorCallback);
}

function apiGetParticipants(successCallback, errorCallback, eventId, includeOrders, includeExercises, includeTicket, includeClub, includeAdditions, lastHistoryId) {
    var url = baseURL + 'events/' + eventId + '/participants/';
    url = url + '?orders=' + includeOrders;
    url = url + '&exercises=' + includeExercises;
    url = url + '&ticket=' + includeTicket;
    url = url + '&club=' + includeClub;
    url = url + '&additions=' + includeAdditions;
    url = url + '&last_history_id=' + lastHistoryId;

    return doGet(url, successCallback, errorCallback);
}

function apiGetParticipantsSimplified(successCallback, errorCallback, eventId) {
    var url = baseURLv2 + 'events/' + eventId + '/participants/simplified';
    return doGet(url, successCallback, errorCallback);
}

function apiGetAdditionsOverview(successCallback, errorCallback, eventId) {
    var url = baseURLv2 + 'events/' + eventId + '/additions/overview';
    return doGet(url, successCallback, errorCallback);
}

function apiGetTransactionsSummary(successCallback, errorCallback, eventId) {
    var url = baseURLv2 + 'events/' + eventId + '/transactions/summary';
    return doGet(url, successCallback, errorCallback);
}

function apiGetParticipant(successCallback, errorCallback, eventId, entryId) {
    return doGet(baseURL + 'events/' + eventId + '/participants/' + entryId, successCallback, errorCallback)
}

function apiGetPortrait(successCallback, errorCallback, eventId, entryId) {
    return doGet(baseURL + 'events/' + eventId + '/participants/' + entryId + '/portrait', successCallback, errorCallback)
}

function apiGetReceipt(successCallback, errorCallback, eventId, entryId) {
    return doGet(baseURL + 'events/' + eventId + '/participants/' + entryId + '/receipt', successCallback, errorCallback)
}

function apiResendReceipt(successCallback, errorCallback, eventId, entryId) {
    return doPut(baseURL + 'events/' + eventId + '/participants/' + entryId + '/receipt/resend', {}, successCallback, errorCallback)
}

function apiPutTerminateEntry(successCallback, errorCallback, orderNumber, eventId) {
    return doPut(baseURL + 'events/' + eventId + '/transactions/' + orderNumber + '/terminate', {}, successCallback, errorCallback);
}

function apiDeleteEntryExercise(successCallback, errorCallback, eventId, entryId, entryExerciseId) {
    return doDelete(baseURL + 'events/' + eventId + '/participants/' + entryId + '/exercises/' + entryExerciseId, {}, successCallback, errorCallback);
}

function apiPostEntryExercise(successCallback, errorCallback, eventId, entryId, jsonData) {
    return doPost(baseURL + 'events/' + eventId + '/participants/' + entryId + '/exercises', jsonData, successCallback, errorCallback);
}

function apiDeleteEntryAddition(successCallback, errorCallback, eventId, entryId, entryAdditionId) {
    return doDelete(baseURL + 'events/' + eventId + '/participants/' + entryId + '/additions/' + entryAdditionId, {}, successCallback, errorCallback);
}

function apiPostEntryAddition(successCallback, errorCallback, eventId, entryId, jsonData) {
    return doPost(baseURL + 'events/' + eventId + '/participants/' + entryId + '/additions', jsonData, successCallback, errorCallback);
}

function apiPutEntryExercise(successCallback, errorCallback, eventId, entryId, entryExerciseId, jsonData) {
    return doPut(baseURL + 'events/' + eventId + '/participants/' + entryId + '/exercises/' + entryExerciseId, jsonData, successCallback, errorCallback);
}

function apiLoginUser(successCallback, errorCallback, jsonData) {
    return doPost(baseURL + 'users/login/', jsonData, successCallback, errorCallback);
}

function apiPutPassword(successCallback, errorCallback, jsonObject) {
    return doPut(baseURL + 'users/password', jsonObject, successCallback, errorCallback)
}

// -- TEAMS -- \\
function apiGetAllTeams(successCallback, errorCallback, eventId, includeTeamMembes, includeExercises) {
    var url = baseURL + 'events/' + eventId + '/teams';
    url = url + '?team_members=' + includeTeamMembes;
    url = url + '&exercises=' + includeExercises;

    return doGet(url, successCallback, errorCallback);
}

function apiGetAllTeamsSimplified(successCallback, errorCallback, eventId) {
    var url = baseURLv2 + 'events/' + eventId + '/teams/simplified';
    return doGet(url, successCallback, errorCallback);
}

function apiPutTeam(successCallback, errorCallback, eventId, teamId, jsonData, comment) {
    return doPut(baseURL + 'events/' + eventId + '/teams/' + teamId, jsonData, successCallback, errorCallback, {'comment': comment})
}

function apiPostNewTeam(successCallback, errorCallback, json, eventId) {
    return doPost(baseURL + 'events/' + eventId + '/teams/blank', json, successCallback, errorCallback);
}

// -- TRANSACTIONS -- \\
function apiGetTransaction(successCallback, errorCallback, eventId, transactionId) {
    return doGet(baseURL + 'events/' + eventId + '/transactions/' + transactionId, successCallback, errorCallback);
}

function apiPostCreditTransaction(successCallback, errorCallback, json, eventId, transactionId) {
    return doPost(baseURL + 'events/' + eventId + '/transactions/' + transactionId + '/credit', json, successCallback, errorCallback);
}

//http://docs.thea.apiary.io/#reference/transaction/transactionsidprocess/complete-a-participant-registration
function apiPutTransaction(successCallback, errorCallback, orderNumber, eventId) {
    return doPut(baseURL + 'events/' + eventId + '/transactions/' + orderNumber + '/process', {}, successCallback, errorCallback);
}

function apiGetAccreditationList(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/reports/accreditationlist', successCallback, errorCallback)
}

function apiGetContactList(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/reports/contactlist', successCallback, errorCallback)
}

function apiGetExternalPersonsContactList(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/reports/externalpersons', successCallback, errorCallback)
}

function apiGetExtendedContactList(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/reports/contactlist/extended', successCallback, errorCallback)
}

function apiGetTeamsContactList(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/reports/teamscontactlist', successCallback, errorCallback)
}

function apiPostPortraits(successCallback, errorCallback, eventId, json) {
    return doPost(baseURL + 'events/' + eventId + '/reports/portraits', json, successCallback, errorCallback)
}

function apiPutPortrait(successCallback, errorCallback, eventId, entryId, jsonData, comment) {
    return doPut(baseURL + 'events/' + eventId + '/participants/' + entryId + '/portrait', jsonData, successCallback, errorCallback, {'comment': comment});
}

/* External persons */
function apiGetExternalPersons(successCallback, errorCallback, eventId, lastHistoryId) {
  var url = baseURL + 'events/' + eventId + '/externalpersons/';
  url = url + '?last_history_id=' + lastHistoryId;

  return doGet(url, successCallback, errorCallback);
}

function apiGetExternalPerson(successCallback, errorCallback, eventId, externalPersonId) {
  return doGet(baseURL + 'events/' + eventId + '/externalpersons/' + externalPersonId, successCallback, errorCallback);
}

function apiPutExternalPerson(successCallback, errorCallback, eventId, externalPersonId, jsonData, comment) {
    return doPut(baseURL + 'events/' + eventId + '/externalpersons/' + externalPersonId, jsonData, successCallback, errorCallback, {'comment': comment})
}

function apiGetExternalPersonPortrait(successCallback, errorCallback, eventId, externalPersonId) {
  return doGet(baseURL + 'events/' + eventId + '/externalpersons/' + externalPersonId + '/portrait', successCallback, errorCallback);
}

function apiPutExternalPersonPortrait(successCallback, errorCallback, eventId, externalPersonId, jsonData, comment) {
  return doPut(baseURL + 'events/' + eventId + '/externalpersons/' + externalPersonId + '/portrait', jsonData, successCallback, errorCallback, {'comment': comment});
}
