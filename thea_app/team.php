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
    <script src="js/team.js"></script>
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
          <div id="teamLoader" hidden class="ui active inverted dimmer">
            <div class="ui large text loader">Henter laget...</div>
          </div>
            <div class="header">
              <h1 class="ui dividing teamname">Lag</h1>
            </div>
          </div>

          <div class="ui modal" id="approve-update">
            <div class="header">
              Er du sikker at du vil endre <span class="teamname"></span>?
            </div>
            <div class="actions">
              <div class="ui button cancel close">Avbryt</div>
              <div class="ui button ok close green" onclick="updateTeam();" >Oppdater</div>
            </div>
          </div>

          <div class="ui modal" id="error-modal">
            <div class="header">
              Upsi
            </div>
            <div class="content">
              <p id="error-msg"></p>
            </div>
            <div class="actions">
              <div class="ui button close" >Ok</div>
            </div>
          </div>

          <div class="ui modal" id="cancel-modal">
            <div class="header">
              Er du sikker at du vil kansellere <span class="teamname"></span>?
            </div>
            <div class="content">
              Gjør det lettere å forstå hva som har skjedd, skriv en kommentar!
              <textarea rows="4" id="update-comment" style="max-width:100%;width:100%;"></textarea>
            </div>
            <div class="actions">
              <div class="ui button close">Avbryt</div>
              <div class="ui button close" onclick="updateParticipant()" >Oppdater</div>
            </div>
          </div>

          <div class="ui stackable two column grid">
            <div class="eight wide column">
              <div class="ui form" id="entry-form">

                <div class="inline fields">
                  <label class="field four wide">Navn</label>
                  <div class="field nine wide">
                    <input type="text" value="" onchange="teamNameChanged(this);" id="team_name">
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Idrett</label>
                  <div class="field nine wide">
                    <select class="ui dropdown" id="sports" onchange="sportChanged(this);">
                      <option value="">Velg idrett</option>
                    </select>
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Øvelse</label>
                  <div class="field nine wide">
                    <select class="ui dropdown" id="exercises" onchange="exerciseChanged(this);">
                      <option value="">Velg øvelse</option>
                    </select>
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Klubb</label>
                  <div class="field nine wide">
                    <select class="ui dropdown" onchange="clubChanged(this);" id="clubs">
                    </select>
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Kjønn</label>
                  <div class="field nine wide">
                    <select class="ui dropdown" onchange="genderChanged(this);" id="selectgender">
                      <option value="">Velg lagets kjønn</option>
                      <option value="Female" >Dame</option>
                      <option value="Male" >Herre</option>
                      <option value="Mix" >Mix</option>
                    </select>
                  </div>
                </div>
              </div><!-- /.form -->
              <h4 class="ui dividing header">Lagmedlemmer</h4>
            <div class="ui fourteen wide column">

              <table class="ui very basic table">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th class="center aligned">Spiller</th>
                    <th class="center aligned">Lagleder</th>
                    <th class="center aligned">Kontaktperson</th>
                  </tr>
                </thead>
                <tbody id="teammembers">

                </tbody>
              </table>

            </div>

            </div> <!-- /.ten.wide.column -->

            <div class="six wide column">

              <div class="ui special card">
                <div class="content">
                  <a class="header teamname">Laginformasjon</a>
                  <div class="meta">
                  <span class="date" id="team_info"></span>
                </div>
                  </div>
              <div class="extra content">
                <textarea rows="4" id="comment" style="max-width:100%;width:100%;">Ingen kommentarer</textarea>

                <button class="fluid ui button" id="updateTeam">Oppdater laget</button>
                <div class="ui divider"></div>
                <button class="fluid red ui button" id="cancelTeam" onclick="cancelTeam();">Kanseller laget</button>
              </div>
              </div>

              <div class="field sixteen wide">
              </div>
            </div> <!-- /.six.wide.column -->

          <div class="row">
            <div class="fourteen wide column"></div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
