'use strict';

var event_id = sessionStorage.getItem('event_id');

$(document).ready(function()
{
  var request = apiGetTransactionsSummary(displayTransactions, handleError, event_id);
  $.when(request).always(function() { removeLoader(); });
});


function displayTransactions(transactions)
{
  sortArrayByNumber(transactions, 'order_number');

  var format = {
    decimalSeparator: '.',
    groupSeparator: ' ',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0
  }
  BigNumber.config({ FORMAT: format })

  var accumulated = new BigNumber(0);
  for (var i = 0; i < transactions.length; ++i)
  {
    var transaction = transactions[i];
    if (transaction.order_status == "COMPLETED")
    {
      accumulated = accumulated.plus(transaction.order_amount);
      accumulated = accumulated.minus(transaction.amount_refunded);
    }

    transaction.accumulated = accumulated;
  }

  $('table').DataTable({
    'columns': [
      { 'data': 'order_number', 'className': 'right aligned' },
      {
        'data': 'transaction_id',
        'createdCell': function (td, cellData, rowData, row, col)
        {
          $(td).attr('onclick', 'showPaymentLog(this, \'' + rowData.transaction_id + '\');');
          $(td).css('cursor', 'pointer');
          $(td).css('color', '#5b9aff');
        }
      },
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
      { 'data': 'order_amount', 'render': money_column_render, 'className': 'right aligned' },
      { 'data': 'amount_refunded', 'render': money_column_render, 'className': 'right aligned' },
      { 'data': 'accumulated', 'render': money_column_render, 'className': 'right aligned' },
      { 'data': 'order_status', 'render': order_status_column_render },
      { 'data': 'time_registered', 'render': time_registered_column_render }
    ],
    'pagingType': 'numbers',
    'info': false,
    'language':
    {
      'search': 'Søk',
      'lengthMenu': 'Vis _MENU_ transaksjoner'
    },
    'lengthMenu': [ [10, 25, 50, -1], [10, 25, 50, 'Alle'] ],
    'order': [[0, 'desc']],
    'createdRow': function ( row, data, index )
    {
      if (data.order_status === 'COMPLETED')
        $(row).addClass('positive');
    },
  }).rows.add(transactions).column(1).search('^(?!\s*$).+', true).draw();
}

function time_registered_column_render( data, type, full, meta )
{
  var date = parseDateString(data);
  if (type === 'sort')
    return date.getTime();
  else
    return date.customFormat('#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#');
}

function money_column_render( data, type, full, meta )
{
  if (type === 'display')
  {
    var tmp = new BigNumber(data);
    return tmp.toFormat(2);
  }
  return data;
}


function order_status_column_render( data, type, full, meta )
{
  switch (data)
  {
    case 'COMPLETED':
      return 'Fullført';
    case 'CREATED':
      return 'Opprettet';
    case 'INITIALIZED':
      return 'Påbegynt';
    default:
      return '';
  }
}


function removeLoader()
{
  $('#transactionsLoader').removeClass('active');
}


function handleError(errorMsg)
{
  console.log(errorMsg);
}


function showPaymentLog(sender, transactionId)
{
  $('#payment-log-content').text('');
  $('#payment-loader').addClass('active');
  $('#payment-log').modal('show');

  var request = apiGetTransaction(
    function(data)
    {
      $('#payment-log-content').text(data.rawData);
    },
    function(data) { $('#payment-log-content').text(data); },
    event_id,
    transactionId);

  $.when(request).always(function()
  {
    $('#payment-loader').removeClass('active');
    $('#payment-log').modal('refresh');
  });
}
