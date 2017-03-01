'use strict';

var event_id = sessionStorage.getItem('event_id');

$(document).ready(function()
{
  var request = apiGetExternalPersons(displayExternalPersons, handleError, event_id, -1);
  $.when(request).always(function() { removeLoader(); });
})

function displayExternalPersons(externalPersons)
{
  $('table').DataTable({
    'pagingType': 'numbers',
    'info': false,
    'language':
    {
      'search': 'Søk',
      'zeroRecords': 'Ingen treff',
      'lengthMenu': 'Vis _MENU_ personer'
    },
    'columns':
    [
      {
        'data': 'person.first_name',
        'createdCell': function (td, cellData, rowData, row, col)
        {
          $(td).attr('onclick', 'window.location.href="./external.php?external_person_id=' + rowData.external_person_id + '";');
          $(td).css('cursor', 'pointer');
          $(td).css('color', '#5b9aff');
        }
      },
      { 'data': 'person.last_name' },
      { 'data': 'person.phone' },
      { 'data': 'person.email' },
      { 'data': 'organization' },
      { 'data': 'description' },
      { 'data': 'external_person_id', 'visible': false },
    ],
    'order': [[6, 'desc']],
    'createdRow': function ( row, data, index )
    {
      switch (data.status)
      {
        case REGISTRATION_CANCELLED:
          $(row).addClass('error');
          break;
      }
    }
  }).rows.add(externalPersons).draw();
}


function removeLoader()
{
  $("#participantsLoader").remove();
}


function handleError(errorMsg)
{
}
