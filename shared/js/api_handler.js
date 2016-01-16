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
var router_url = '<?php echo ROOT_URL; ?>/router.php';
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
        url: router_url,
        beforeSend : function (request)
        {
            addJWT(request);
            request.setRequestHeader('redirect-method', 'get');
            request.setRequestHeader('redirect-source', urlGET);
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
        url: router_url,
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend : function (request)
        {
            addJWT(request);
            request.setRequestHeader('redirect-method', 'post');
            request.setRequestHeader('redirect-source', urlPOST);
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
        url: router_url,
        data: JSON.stringify(jsonData),
        header: headerData,
        dataType: 'json',
        beforeSend : function (request)
        {
            addJWT(request);
            request.setRequestHeader('redirect-method', 'put');
            request.setRequestHeader('redirect-source', urlPUT);
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

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetTeam(successCallback, errorCallback, eventId, teamId) {
    return doGet(baseURL + 'events/' + eventId + '/teams/' + teamId, successCallback, errorCallback);
}

// http://docs.thea.apiary.io/#reference/sport/sportsidexercises/list-all-exercises
function apiGetAdditions(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/additions/', successCallback, errorCallback);
}


// -- PARTICIPANTS -- \\
function apiPutParticipant(successCallback, errorCallback, eventId, entryId, jsonData, comment) {
    return doPut(baseURL + 'events/' + eventId + '/participants/' + entryId, jsonData, successCallback, errorCallback, {'comment': comment})
}

// http://docs.thea.apiary.io/#reference/participant/participants/add-a-participant
function apiPostParticipant(successCallback, errorCallback, json, eventId) {
    return doPost(baseURL + 'events/' + eventId + '/participants/', json, successCallback, errorCallback);
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

function apiGetReceipt(successCallback, errorCallback, eventId, entryId) {
    return doGet(baseURL + 'events/' + eventId + '/participants/' + entryId + '/receipt', successCallback, errorCallback)
}

function apiResendReceipt(successCallback, errorCallback, eventId, entryId) {
    return doPut(baseURL + 'events/' + eventId + '/participants/' + entryId + '/receipt/resend', {}, successCallback, errorCallback)
}

function apiPutTerminateEntry(successCallback, errorCallback, transactionId, eventId) {
    return doPut(baseURL + 'events/' + eventId + '/transactions/' + transactionId + '/terminate', {}, successCallback, errorCallback);
}

function apiLoginUser(successCallback, errorCallback, jsonData) {
    return doPost(baseURL + 'users/login/', jsonData, successCallback, errorCallback);
}

function apiPutPassword(successCallback, errorCallback, jsonObject) {
    return doPut(baseURL + 'users/password', jsonObject, successCallback, errorCallback)
}

// -- TEAMS -- \\
function apiGetAllTeams(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/teams', successCallback, errorCallback);
}

function apiPutTeam(successCallback, errorCallback, eventId, teamId, jsonData, comment) {
    return doPut(baseURL + 'events/' + eventId + '/teams/' + teamId, jsonData, successCallback, errorCallback, {'comment': comment})
}

// -- TRANSACTIONS -- \\
function apiGetTransaction(successCallback, errorCallback, eventId, transactionId) {
    return doGet(baseURL + 'events/' + eventId + '/transactions/' + transactionId, successCallback, errorCallback);
}

function apiPostCreditTransaction(successCallback, errorCallback, json, eventId, transactionId) {
    return doPost(baseURL + 'events/' + eventId + '/transactions/' + transactionId + '/credit', json, successCallback, errorCallback);
}

//http://docs.thea.apiary.io/#reference/transaction/transactionsidprocess/complete-a-participant-registration
function apiPutTransaction(successCallback, errorCallback, transactionId) {
    return doPut(baseURL + 'events/' + eventId + '/transactions/'+transactionId+'/process', {}, successCallback, errorCallback);
}

function apiGetAccreditationList(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/reports/accreditationlist', successCallback, errorCallback)
}

function apiGetPortraits(successCallback, errorCallback, eventId) {
    return doGet(baseURL + 'events/' + eventId + '/reports/portraits', successCallback, errorCallback)
}

