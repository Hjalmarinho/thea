<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Thea 2.0</title>

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.9/semantic.min.css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/cropper/3.0.0-beta/cropper.min.css" rel="stylesheet">
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
    <script src="js/shared.js"></script>
    <script src="js/reports.js"></script>
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
              <h1 class="ui dividing participantname">Rapporter</h1>
            </div>
          </div>

          <div id="loader" class="ui active inverted dimmer" style="display:none;">
            <div class="ui large text loader">Genererer rapporten...</div>
          </div>

          <div class="ui stackable two column grid">
            <div class="eight wide column">
              <div class="ui list">
                <a class="item" onclick="getAccreditationList();">
                  <i class="users icon"></i>
                  <div class="content">
                    <div class="header">Akkrediteringsliste</div>
                    <div class="description">En excel-fil med alle deltagere, deres idretter og tilhørende klubb.</div>
                  </div>
                </a>
                <a class="item" onclick="getContactList();">
                  <i class="users icon"></i>
                  <div class="content">
                    <div class="header">Kontaktliste</div>
                    <div class="description">En excel-fil med epost og telefonnummer til alle deltakere.</div>
                  </div>
                </a>
                <a class="item" onclick="getExtendedContactList();">
                  <i class="users icon"></i>
                  <div class="content">
                    <div class="header">Utvidet kontaktliste</div>
                    <div class="description">En excel-fil med epost, telefonnummer, idretter og tillegg til alle deltakere.</div>
                  </div>
                </a>
                <a class="item" onclick="getExternalPersons();">
                  <i class="users icon"></i>
                  <div class="content">
                    <div class="header">Eksternt personell</div>
                    <div class="description">En excel-fil med epost og telefonnummer til eksternt personell.</div>
                  </div>
                </a>
                <a class="item" onclick="getTeamsContactList();">
                  <i class="users icon"></i>
                  <div class="content">
                    <div class="header">Kontaktliste lag</div>
                    <div class="description">En excel-fil med epost og telefonnummer til kontakperson for lag-idretter.</div>
                  </div>
                </a>
                <a class="item" onclick="getPortraits();">
                  <i class="file image outline icon"></i>
                  <div class="content">
                    <div class="header">Portrettbilder</div>
                    <div class="description">En ZIP-fil med portrettbilde av alle deltagere.</div>
                  </div>
                </a>
              </div>
            </div> <!-- /.six.wide.column -->
          </div>
        </div>
      </div>
    </div>

    <div class="ui modal" id="email-modal">
      <div class="header">
        Epost
      </div>
      <div class="content">
        <p>Skriv inn din epost-adresse her, så sender jeg deg en epost når nedlastingen er klar!</p>
        <p>Merk at hvis det er veldig mange påmeldte, så kan dette ta en del tid (mange minutter).</p>
        <form class="ui form">
          <div class="inline fields">
            <label class="field four wide">E-post</label>
            <div class="field twelve wide">
              <input type="email" name="email" id="email">
            </div>
          </div>
        </form>
        <p id="error-msg"></p>
      </div>
      <div class="actions">
        <div class="ui ok green button" onclick="doGetPortraits();">Ok</div>
        <div class="ui cancel button" >Avbryt</div>
      </div>
    </div>
  </body>
</html>
