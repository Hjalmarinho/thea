'use strict';

var event_id = sessionStorage.getItem('event_id');

$(document).ready(function()
{
  var request = apiGetAdditionsOverview(displayAdditions, handleError, event_id);
  $.when(request).always(function() { removeLoader(); });
});

function displayAdditions(participants)
{
  var additions_summary = {};

  var prev_addition_id = -1;
  $.each(participants, function (i, participant)
  {
    if (prev_addition_id != participant.addition_id)
    {
      additions_summary[participant.addition_id] = 
      {
        'addition_description': participant.addition_description,
        'num_items': 0,
        'persons': []
      };

      var table_html = '<h2 id="addition-' + participant.addition_id + '">' + participant.addition_description + '</h2> \
      <table class="ui selectable stackable sortable celled table compact datatables" id="table-' + participant.addition_id + '"> \
        <thead> \
          <tr> \
            <th>Fornavn</th> \
            <th>Etternavn</th> \
            <th>Antall</th> \
          </tr> \
        </thead> \
        <tbody> \
        </tbody> \
      </table>';

      $('#tables').append(table_html);
    }

    prev_addition_id = participant.addition_id;
    additions_summary[participant.addition_id].num_items += participant.num_items;
    additions_summary[participant.addition_id].persons.push(participant);
  });

  // Print out summary
  for (var key in additions_summary)
  {
    summary_table
    var tablerow = '<tr>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + '<a href="#addition-' + key + '">';
    tablerow = tablerow + additions_summary[key].addition_description;
    tablerow = tablerow + '</a>';
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + additions_summary[key].num_items;
    tablerow = tablerow + '</td>';
    tablerow = tablerow + '</tr>';

    $('#summary_table').append(tablerow);

    $('#table-' + key + '').DataTable({
      'pagingType': 'numbers',
      'info': false,
      'language':
      {
        'search': 'Søk',
        'lengthMenu': 'Vis _MENU_ deltagere',
        'zeroRecords': 'Ingen treff'
      },
      'lengthMenu': [ [10, 25, 50, -1], [10, 25, 50, 'Alle'] ],
      'columns': [
        {
          'data': 'first_name',
          'createdCell': function (td, cellData, rowData, row, col)
          {
            $(td).attr('onclick', 'window.location.href="./participant.php?entry_id=' + rowData.entry_id + '";');
            $(td).css('cursor', 'pointer');
            $(td).css('color', '#5b9aff');
          }
        },
        { 'data': 'last_name' },
        { 'data': 'num_items' }
      ]
    }).rows.add(additions_summary[key].persons).draw();
  }
}

function removeLoader()
{
  $('#additionsLoader').remove();
}

function handleError(errorMsg)
{
  console.log(errorMsg);
}
