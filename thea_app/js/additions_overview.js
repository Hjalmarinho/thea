'use strict';

var event_id = sessionStorage.getItem('event_id');

$(document).ready(function()
{
  var request = apiGetAdditionsOverview(displayAdditions, handleError, event_id);
  $.when(request).always(function() { removeLoader(); });
});

function displayAdditions(participants) {
  var additions_summary = {};

  var prev_addition_id = -1;
  $.each(participants, function (i, participant)
  {
    if (prev_addition_id != participant.addition_id)
    {
      additions_summary[participant.addition_id] = 
      {
        'addition_description': participant.addition_description,
        'num_persons': 0,
        'num_items': 0
      };

      var table_html = '<h2>' + participant.addition_description + '</h2> \
      <table class="ui selectable stackable sortable celled table compact"> \
        <thead> \
          <tr> \
            <th>Fornavn</th> \
            <th>Etternavn</th> \
            <th>Antall</th> \
        </tr> \
        </thead> \
        <tbody id="additions_' + participant.addition_id + '"> \
        </tbody> \
      </table>';

      $('#tables').append(table_html);
    }

    var tablerow = '<tr>';

    tablerow = tablerow + '<td onclick="window.location.href =\'./participant.php?entry_id=' + participant.entry_id + '\';" style="cursor:pointer;">';
    tablerow = tablerow + participant.first_name;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + participant.last_name;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + participant.num_items;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '</tr>';

    $('#additions_' + participant.addition_id).append(tablerow);
    prev_addition_id = participant.addition_id;
    additions_summary[participant.addition_id].num_persons++;
    additions_summary[participant.addition_id].num_items += participant.num_items;
  });

  // Print out summary
  for (var key in additions_summary)
  {
    summary_table
    var tablerow = '<tr>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + additions_summary[key].addition_description;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + additions_summary[key].num_items;
    tablerow = tablerow + '</td>';
    tablerow = tablerow + '</tr>';

    $('#summary_table').append(tablerow);
  }

  //Initialize tablesort
  if (typeof $('table').tablesort === "function")
  {
    $('table').tablesort();
  }

  // $('#summary').html(numConfirmed + ' påmeldte, ' + numCancelled + ' kansellerte.');
}

function removeLoader() {
  $('#additionsLoader').remove();
}

function handleError(errorMsg) {
  console.log(errorMsg);
}
