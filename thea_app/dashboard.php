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
    var frontend_url = null;
    <?php
      echo 'frontend_url = "' . FRONTEND_URL . '";';
    ?>
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.13/js/jquery.dataTables.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.13/js/dataTables.semanticui.min.js"></script>
    <script src="js/shared.js"></script>
    <script src="js/dashboard.js"></script>
  </head>
  <body>
    <div class="ui sidebar menu">
      <?php require 'include/menu.php';?>
    </div>
    <div class="pusher">
      <div class="ui grid">
        <div class="three wide column" >
          <div class="ui vertical inverted menu" >
            <?php require 'include/menu.php';?>
          </div>
        </div>
        <div class="ui thirteen wide column margin-top-30 fade-in" id="context">
          <div class="ui items">
              <div class="header">
                <h1>Dashboard</h1>
                <p id="summary"></p>
              </div>
          </div>

          <div>
            <div id="loader" class="ui active inverted dimmer">
              <div class="ui large text loader">Henter rykende fersk statistikk...</div>
            </div>
            <div class="ui four statistics">
              <div class="ui statistic">
                <div class="value" id="numEntries">
                  -
                </div>
                <div class="label">
                  Total
                </div>
              </div>
               <div class="ui pink statistic">
                <div class="value" id="numFemale">
                  -
                </div>
                <div class="label">
                  Damer
                </div>
              </div>
               <div class="ui blue statistic">
                <div class="value" id="numMale">
                  -
                </div>
                <div class="label">
                  Herrer
                </div>
              </div>
              <div class="statistic">
                <div class="value" id="numTeams">
                  -
                </div>
                <div class="label">
                  Lag
                </div>
              </div>
            </div>

            <h4 class="center aligned" id="last_entry"></h4>
            <h4 class="center aligned" id="external-entry"></h4>
            <div class="header">
              <h1>Idretter</h1>
            </div>

            <table class="ui selectable sortable striped celled table">
              <thead>
                <tr>
                  <th>Øvelse</th>
                  <th>Idrett</th>
                  <th>Herrer</th>
                  <th>Damer</th>
                  <th>Mix</th>
                  <th>Totalt</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>