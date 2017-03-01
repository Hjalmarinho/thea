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
    <script src="js/accreditation.js"></script>
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
          <div id="participantsLoader" class="ui active inverted dimmer">
            <div class="ui large text loader">Henter påmeldinger...</div>
          </div>

          <div class="ui grid">
            <div class="row">
              <div class="thirteen wide column" >
                <h1>Akkreditering</h1>
              </div>
            </div>

            <div class="ten wide column" >
              <p id="num_accreditated"></p>
              <!-- Participants table -->
              <table id="participants_table" class="ui sortable celled striped selectable table" style="cursor: pointer">
                <thead>
                  <th>Fornavn</th>
                  <th>Etternavn</th>
                  <th>Klubb</th>
                  <th>Akkreditert</th>
                </thead>
                <tbody></tbody>
              </table>
            </div> <!-- /table column -->

            <div class="six wide column" >
              <!-- Participant card -->
              <div class="ui special cards">
                <div class="card" id="participant_card" style="display: none">
                  <div id="participantLoader" class="ui active inverted dimmer" style="display:none;">
                    <div class="ui large text loader">Henter påmeldingen...</div>
                  </div>
                  <div class="blurring dimmable image">
                    <div class="ui dimmer">
                      <div class="content">
                        <div class="center">
                          <div id="button_accreditate" class="ui inverted green button" onclick="accreditateParticipant(true);">Akkrediter</div>
                          <div id="button_unaccreditate" class="ui inverted red button" onclick="accreditateParticipant(false);">Avakkrediter</div>
                        </div>
                      </div>
                    </div>
                    <img src="http://semantic-ui.com/images/avatar/large/elliot.jpg" id="card_portrait">
                  </div>
                  <div class="content" id="participant_content">
                    <a class="header" id="card_name"></a>
                    <div class="meta">
                      <span class="date" id="card_time_registrated"></span>
                    </div>
                    <div class="description" id="description">
                      Kristy is an art director living in New York.
                    </div>
                    <br>
                    <p id="card_accreditated_mark" style="display:none" class="success"><i class="checkmark icon"></i>Akkreditert</p>
                  </div>
                  <div class="ui form" id="comment_div">
                    <textarea rows="4" id="card_comment" placeholder="Ingen kommentarer..."></textarea>
                    <!-- Displayed when the comment is saved -->
                    <div class="ui icon success  message" id="comment_message" style="display:none">
                      <i class="checkmark icon"></i>
                      <div class="content">
                        <p>Kommentar lagret</p>
                      </div>
                    </div>
                  </div>

                  <div class="ui bottom attached button" id="button_comment" onclick="saveComment()">
                    Lagre kommentar
                  </div>
                </div> <!-- /card -->
              </div>
            </div> <!-- /card column -->
          </div> <!-- /ui grid -->
        </div>
      </div>
    </div>
  </body>
</html>
