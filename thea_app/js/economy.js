'use strict';

var event_id = sessionStorage.getItem('event_id');

$(document).ready(function() {
  var request = apiGetTransactionsSummary(displayTransactions, handleError, event_id);
  $.when(request).always(function() { removeLoader(); });
});

function displayTransactions(transactions) {
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
  $.each(transactions, function (i, transaction) {
    var tablerow;

    if (transaction.order_status == "COMPLETED")
      tablerow = '<tr>';
    else
      tablerow = '<tr class="disabled">';

    tablerow = tablerow + '<td class="right aligned">';
    tablerow = tablerow + transaction.order_number;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td onclick="showPaymentLog(this, \'' + transaction.transaction_id + '\');" style="cursor:pointer;">';
    tablerow = tablerow + transaction.transaction_id;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td onclick="window.location.href =\'./participant.php?entry_id=' + transaction.entry_id + '\';" style="cursor:pointer;">';
    tablerow = tablerow + transaction.first_name;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '<td>';
    tablerow = tablerow + transaction.last_name;
    tablerow = tablerow + '</td>';

    var order_amount = new BigNumber(transaction.order_amount);
    tablerow = tablerow + '<td class="right aligned">';
    tablerow = tablerow + order_amount.toFormat(2);
    tablerow = tablerow + '</td>';

    var amount_refunded = new BigNumber(transaction.amount_refunded);
    tablerow = tablerow + '<td class="right aligned">';
    tablerow = tablerow + amount_refunded.toFormat(2);
    tablerow = tablerow + '</td>';

    if (transaction.order_status == "COMPLETED")
    {
      accumulated = accumulated.plus(order_amount);
      accumulated = accumulated.minus(amount_refunded);
    }
    tablerow = tablerow + '<td class="right aligned">';
    tablerow = tablerow + accumulated.toFormat(2);
    tablerow = tablerow + '</td>';

    var order_status_str;
    if (transaction.order_status == "COMPLETED")
      order_status_str = "Fullført";
    else if (transaction.order_status == "CREATED")
      order_status_str = "Opprettet";
    else if (transaction.order_status == "INITIALIZED")
      order_status_str = "Påbegynt";

    tablerow = tablerow + '<td>';
    tablerow = tablerow + order_status_str
    tablerow = tablerow + '</td>';

    var time_registered = parseDateString(transaction.time_registered);
    var time_registered_str = time_registered.customFormat('#DD# #MMM# #YYYY#, kl. #hhh#.#mm#.#ss#');
    tablerow = tablerow + '<td data-sort-value="' + time_registered.getTime() + '">';
    tablerow = tablerow + time_registered_str;
    tablerow = tablerow + '</td>';

    tablerow = tablerow + '</tr>';

    $('#transactions').append(tablerow);
  });

}

function removeLoader() {
  $('#transactionsLoader').remove();
}

function handleError(errorMsg) {
  console.log(errorMsg);
}

function showPaymentLog(sender, transactionId)
{
  var request = apiGetTransaction(
    function(data)
    {
      $('#payment-log-content').text(data.rawData);
      $('#payment-log').modal('show');
    },
    function(data) { },
    event_id,
    transactionId);
}
