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
    <script src="js/shared.js"></script>
    <script src="js/externals.js"></script>
  </head>
  <body>
    <div class="ui sidebar inverted vertical menu">
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
                <h1>Eksternt personell</h1>
              </div>
          </div>

          <div>
            <div id="participantsLoader" class="ui active inverted dimmer">
              <div class="ui large text loader">Henter påmeldinger...</div>
            </div>
            <table class="ui selectable stackable sortable celled table">
              <thead>
                <tr>
                  <th>Fornavn</th>
                  <th>Etternavn</th>
                  <th>Telefon</th>
                  <th>E-post</th>
                  <th>Organisasjon</th>
                  <th>Rolle</th>
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
