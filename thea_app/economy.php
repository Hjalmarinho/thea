<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Thea 2.0</title>

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.13/css/dataTables.semanticui.min.css" />
    <link rel="stylesheet" type="text/css" href="css/style.css" />

    <script>
    <?php
      // Include shared code
      require_once(__DIR__ . "/site_info.php");
      require_once(__DIR__ . "/../shared/js/shared.js");
      require_once(__DIR__ . "/../shared/js/api_handler.js");
    ?>
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.13/js/jquery.dataTables.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.13/js/dataTables.semanticui.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bignumber.js/4.0.0/bignumber.min.js"></script>

    <script src="js/shared.js"></script>
    <script src="js/economy.js"></script>
  </head>
  <body>
    <div class="ui sidebar inverted vertical menu">
      <?php require 'include/menu.php';?>
    </div>
    <div class="pusher">
      <div class="ui grid">
        <div class="computer only three wide column" >
          <div class="ui vertical inverted menu" >
            <?php require 'include/menu.php';?>
          </div>
        </div>

        <div class="ui thirteen wide column margin-top-30 fade-in" id="context">
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
              <tbody>
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
              <div class="ui green ok button">Ok</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
