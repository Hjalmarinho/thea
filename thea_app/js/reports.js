'use strict';

var event_id = sessionStorage.getItem('event_id');

function getAccreditationList()
{
  showLoader();

  var request = apiGetAccreditationList(function (data)
  {
    window.open(data.url);
  }, function (data) {}, event_id);

  $.when(request).always(function() { hideLoader(); });
}

function getContactList()
{
  showLoader();

  var request = apiGetContactList(function (data)
  {
    window.open(data.url);
  }, function (data) {}, event_id);

  $.when(request).always(function() { hideLoader(); });
}

function getExtendedContactList()
{
  showLoader();

  var request = apiGetExtendedContactList(function (data)
  {
    window.open(data.url);
  }, function (data) {}, event_id);

  $.when(request).always(function() { hideLoader(); });
}

function getExternalPersons()
{
  showLoader();

  var request = apiGetExternalPersonsContactList(function (data)
  {
    window.open(data.url);
  }, function (data) {}, event_id);

  $.when(request).always(function() { hideLoader(); });
}

function getPortraits()
{
  showLoader();

  var request = apiGetPortraits(function (data)
  {
    window.open(data.url);
  }, function (data) {}, event_id);

  $.when(request).always(function() { hideLoader(); });
}

function showLoader()
{
  $('#loader').show();
}

function hideLoader()
{
  $('#loader').hide();
}