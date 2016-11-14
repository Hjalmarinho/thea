<?php require 'header.php';?>

<div class="ui items">
    <div class="header">
      <!-- <i class="large sidebar icon" id="menubutton"></i> -->
      <h1>Økonomi</h1>
      <p id="summary"></p>
    </div>
</div>

<div>
  <div id="transactionsLoader" class="ui active inverted dimmer">
    <div class="ui large text loader">Henter transaksjoner...</div>
  </div>
  <table class="ui selectable stackable sortable celled table">
    <thead>
      <tr>
        <th class="ascending right aligned">Ordrenr.</th>
        <th>Transaksjons-ID</th>
        <th>Fornavn</th>
        <th>Etternavn</th>
        <th class="right aligned">Sum</th>
        <th class="right aligned">Refundert</th>
        <th class="right aligned">Akkumulert</th>
        <th>Ordrestatus</th>
        <th>Dato</th>
    </tr>
    </thead>
    <tbody id="transactions">
    </tbody>
  </table>
</div>

<div class="ui modal" id="payment-log">
  <div id="payment-loader" class="ui active inverted dimmer">
    <div class="ui large text loader">Henter...</div>
  </div>
  <div class="header">
    Betalingslogg
  </div>
  <div class="content">
    <div class="ui yellow message">Alle pengesummer her er multiplisert med 100. Dvs, når det står "55000", betyr det "550.00".</div>
    <pre id="payment-log-content">
    </pre>
  </div>
  <div class="actions">
    <div class="ui green button close">Ok</div>
  </div>
</div>

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bignumber.js/3.0.0/bignumber.js"></script>

<?php require 'footer.php';?>
