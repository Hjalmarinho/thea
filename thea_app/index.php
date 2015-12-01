<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Thea 2.0</title>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.8/semantic.min.js"></script>

    <script>
    
    <?php
      // Include shared code
      require_once(__DIR__ . "/site_info.php");
      require_once(__DIR__ . "/../shared/js/shared.js");
      require_once(__DIR__ . "/../shared/js/api_handler.js");
    ?>
    </script>

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.8/semantic.min.css" />

    <script src="js/tablesort.js"></script>
    <link rel="stylesheet" type="text/css" href="css/style.css" />
    <?php // Include React ?>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script> -->
    <script src="js/react.js"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script> -->
    <script src="js/JSXTransformer.js"></script>
    <?php // Include shared javascript ?>
    <script src="js/shared.js"></script>
    <?php // Include page specific js ?>
    <script src="js/user.js"></script>

    <?php
    $file = basename($_SERVER["SCRIPT_FILENAME"], ".php");
    echo "<script src='js/" . $file . ".js'></script>";
    ?>
    
     <style type="text/css">
        body {
          background-color: #f4f4f4;
        }
        body > .grid {
          height: 100%;
        }
        .image {
          margin-top: -100px;
        }
        .column {
          max-width: 450px;
        }
      </style>

  </head>
  <body>
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui image header">
            Velkommen til Thea 2.0
        </h2>
        <div class="ui stacked segment form">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="email" id="email" placeholder="E-post">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" id="password" placeholder="Passord">
            </div>
          </div>
          <div id="loginButton" class="ui fluid large blue button" onclick="doLogin();">Logg inn</div>
        </div>
        <div hidden class="ui negative message" id="errorMessage">
          <div class="header">
            Upsi!
          </div>
          <p id="errorMessageContent"></p>
        </div>
      </div>
    </div>
  </body>
</html>
