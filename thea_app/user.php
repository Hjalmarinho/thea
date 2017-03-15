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
    <script src="js/user.js"></script>
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
                <h1>Din bruker</h1>
                <p id="summary"></p>
              </div>
          </div>

          <div class="ui stackable two column grid">
            <div class="eight wide column">
              <div class="ui form" id="entry-form">
                <div class="inline fields">
                  <label class="field four wide">Gammelt passord</label>
                  <div class="field nine wide">
                    <input type="password" value="" id="old_password">
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Nytt passord</label>
                  <div class="field nine wide">
                    <input type="password" value="" id="new_password">
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Gjenta nytt passord</label>
                  <div class="field nine wide">
                    <input type="password" value="" id="new_password_repeat">
                  </div>
                </div>

                <div hidden class="ui negative message" id="errorMessage">
                  <div class="header">
                    Upsi!
                  </div>
                  <p id="errorMessageContent"></p>
                </div>

                <div hidden class="ui success message" id="okMessage">
                  <div class="header">
                    Suksess!
                  </div>
                  <p>Passordet ditt har blitt endret.</p>
                </div>

                <button class="green ui button" onclick="change_password();" id="changePassword">Endre passord</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
