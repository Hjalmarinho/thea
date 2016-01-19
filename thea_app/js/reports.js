'use strict';

var event_id = sessionStorage.getItem('event_id');

function getAccreditationList()
{
  apiGetAccreditationList(function (data)
  {
    window.open(data.url);
  }, function (data) {}, event_id);
}

function getContactList()
{
  apiGetContactList(function (data)
  {
    window.open(data.url);
  }, function (data) {}, event_id);
}

function getPortraits()
{
  apiGetPortraits(function (data)
  {
    window.open(data.url);
  }, function (data) {}, event_id);
}