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
    <script src="js/exercise.js"></script>
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
            <div id="exercise-loader" hidden class="ui active inverted dimmer">
              <div class="ui large text loader">Henter laget...</div>
            </div>
            <div class="header">
              <h1 class="ui dividing exercise-description">Øvelse</h1>
            </div>
          </div>

          <div class="ui stackable two column grid">
            <div class="eight wide column">
              <div class="ui form" id="entry-form">

                <div class="inline fields"> 
                  <label class="field four wide">Beskrivelse</label>
                  <div class="field nine wide">
                    <input type="text" value="" id="exercise-description">
                  </div>
                </div>

                <div class="inline fields"> 
                  <label class="field four wide">Maks antall herrer</label>
                  <div class="field nine wide">
                    <input type="text" placeholder="Ingen grense" value="" id="max-male" onchange="max_male_changed(this);">
                  </div>
                  <div class="field two wide">
                    <p id="calculated-male-teams"></p>
                  </div>
                </div>

                <div class="inline fields"> 
                  <label class="field four wide">Maks antall damer</label>
                  <div class="field nine wide">
                    <input type="text" placeholder="Ingen grense" value="" id="max-female" onchange="max_female_changed(this);">
                  </div>
                  <div class="field two wide">
                    <p id="calculated-female-teams"></p>
                  </div>
                </div>

                <div class="inline fields"> 
                  <label class="field four wide">Maks antall totalt</label>
                  <div class="field nine wide">
                    <input type="text" placeholder="Ingen grense" value="" id="max-total" onchange="max_total_changed(this);">
                  </div>
                  <div class="field two wide">
                    <p id="calculated-total-teams"></p>
                  </div>
                </div>

                <div id="team-info" hidden>
                  <div class="inline fields"> 
                    <label class="field four wide">Deltagere per lag</label>
                    <div class="field nine wide">
                      <input type="text" value="" id="slots-per-team">
                    </div>
                  </div>

                  <div class="inline fields"> 
                    <label class="field four wide">Maks ikke-studenter per lag</label>
                    <div class="field nine wide">
                      <input type="text" placeholder="Ingen grense" value="" id="max-non-students-per-team">
                    </div>
                  </div>

                  <div class="inline fields"> 
                    <label class="field four wide">Tillat mikslag</label>
                    <div class="ui fitted checkbox">
                      <input type="checkbox" tabindex="0" id="allow-mix-teams">
                    </div>
                  </div>
                </div>
              </div><!-- /.form -->

              <div id="entry-teams" hidden>
                <h2>Påmeldte lag</h2>
                <table class="ui sortable celled striped table" id="table-teams">
                  <thead>
                    <tr>
                      <th>Navn</th>
                      <th>Klubb</th>
                      <th>Kjønn</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>

              <div id="entry-individuals" hidden>
                <h2>Påmeldte deltagere</h2>
                <table class="ui sortable celled striped table" id="table-participants">
                  <thead>
                    <tr>
                      <th>Fornavn</th>
                      <th>Etternavn</th>
                      <th>Klubb</th>
                      <th>Kjønn</th>
                    </tr>
                  </thead>
                  <tbody id="participants">
                  </tbody>
                </table>
              </div>
            </div> <!-- /.ten.wide.column -->

            <div class="six wide column">

              <div class="ui special card">
                <div class="content">
                  <a class="header">Statistikk</a>
                  <div class="meta">
                    <span class="date" id="exercise-info"></span>
                  </div>
                </div>
                <div class="extra content">
                  <textarea rows="4" id="comment" style="max-width:100%;width:100%;">Ingen kommentarer</textarea>
                  <button class="fluid disabled ui button" id="update-exercise">Oppdater øvelsen</button>
                </div>
              </div>

              <div class="field sixteen wide">
              </div>
            </div> <!-- /.six.wide.column -->
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

