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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropper/3.0.0-beta/cropper.min.js"></script>
    <script src="js/shared.js"></script>
    <script src="js/participant.js"></script>

    <!-- Portrait cropping -->
    <script>
    <?php require_once(__DIR__ . '/../shared/js/portrait_cropping.js'); ?>
    </script>
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
          <div id="participantLoader" hidden class="ui active inverted dimmer">
            <div class="ui large text loader">Henter påmeldingen...</div>
          </div>
            <div class="header">
              <h1 class="ui dividing participantname">Deltaker</h1>
            </div>
          </div>

          <?php require_once(__DIR__ . '/../shared/portrait_modal.php'); ?>

          <!-- New exercise modals -->
          <div class="ui modal" id="select-exercise-modal">
            <div class="header">
              Hvilken idrett/øvelse?
            </div>
            <div class="content">
              <select class="ui fluid dropdown" id="select-exercise-dropdown">
              </select>
            </div>
            <div class="actions">
              <div class="ui button cancel">Avbryt</div>
              <div class="ui button green" onclick="nextAfterSelectExercise(this);">Neste</div>
            </div>
          </div>

          <div class="ui modal" id="select-exercise-team-modal">
            <div class="header">
              Hvilket lag?
            </div>
            <div class="content">
              <select class="ui fluid dropdown" id="select-exercise-team-dropdown">
              </select>
            </div>
            <div class="actions">
              <div class="ui button cancel">Avbryt</div>
              <div class="ui button green" onclick="doTeamEntry(this);">Neste</div>
            </div>
          </div>

          <!-- New exercise modals end -->
          <div class="ui modal" id="approve-update">
            <div class="header">
              Er du sikker at du vil endre <span class="participantname"></span>?
            </div>
            <div class="actions">
              <div class="ui button cancel">Avbryt</div>
              <div class="ui button ok green" onclick="updateParticipant();" >Oppdater</div>
            </div>
          </div>

          <div class="ui modal" id="receipt-sent">
            <div class="header">
              En ny påmeldingskvittering er sendt ut til <span class="participantname"></span>.
            </div>
            <div class="actions">
              <div class="ui ok button green">Okey!</div>
            </div>
          </div>

          <div class="ui modal" id="payment-log">
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

          <div class="ui modal" id="error-modal">
            <div class="header">
              Upsi
            </div>
            <div class="content">
              <p id="error-msg"></p>
            </div>
            <div class="actions">
              <div class="ui ok button" >Ok</div>
            </div>
          </div>

          <div class="ui modal" id="credit-update">
            <div class="header">
              Refunder penger til <span class="participantname"></span>
            </div>
            <div class="content">
              <div class="ui form">
                <div class="inline fields">
                  <label class="field four wide">Hvor mye vil du refundere?</label>
                  <div class="field twelve wide">
                    <input type="text" id="credit-amount" value="">
                  </div>
                </div>
              </div>

              <div hidden class="ui negative message" id="credit-error">
                <div class="header">
                  Upsi!
                </div>
                <p id="credit-error-msg"></p>
              </div>
            </div>
            <div class="actions">
              <div class="ui button cancel red">Avbryt</div>
              <div class="ui button ok green" id="credit-button" onclick="creditParticipant();">Refunder</div>
            </div>
          </div>

          <div class="ui stackable two column grid">
            <div class="eight wide column">
              <div class="ui form" id="entry-form">

                <div class="inline fields">
                  <label class="field four wide">Fornavn</label>
                  <div class="field nine wide">
                    <input type="text" value="" id="first_name" onchange="firstNameChanged(this);">
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Etternavn</label>
                  <div class="field nine wide">
                    <input type="text" value="" id="last_name" onchange="lastNameChanged(this);">
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Fødselsdato</label>
                  <div class="field two wide">
                    <input type="text" name="birthdate" id="birthday" placeholder="dd" onchange="birthdateChanged(this);">
                  </div>

                  <div class="field four wide">
                    <select class="ui fluid dropdown" id="birthmonth" onchange="birthdateChanged(this);">
                      <option value="">mm</option>
                      <option value="01">januar</option>
                      <option value="02">februar</option>
                      <option value="03">mars</option>
                      <option value="04">april</option>
                      <option value="05">mai</option>
                      <option value="06">juni</option>
                      <option value="07">juli</option>
                      <option value="08">august</option>
                      <option value="09">september</option>
                      <option value="10">oktober</option>
                      <option value="11">november</option>
                      <option value="12">desember</option>
                    </select>
                  </div>

                  <div class="field three wide">
                    <input type="text" name="birthdate" id="birthyear" placeholder="yyyy" onchange="birthdateChanged(this);">
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Kjønn</label>
                  <div class="field nine wide">
                    <select class="ui fluid dropdown" id="selectgender" onchange="genderChanged(this);">
                      <option value="">Velg kjønn</option>
                      <option value="Female" >Dame</option>
                      <option value="Male" >Herre</option>
                    </select>
                  </div>
                </div>

                <div class="inline fields">
                    <label class="field four wide">Student</label>
                  <div class="ui fitted checkbox">
                    <input type="checkbox" tabindex="0" id="studentCheckbox" onchange="isStudentChanged(this);">
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">E-post</label>
                  <div class="field nine wide">
                    <input type="text" value="" id="email" onchange="emailChanged(this);">
                    </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Telefonnummer</label>
                  <div class="field nine wide">
                    <input type="text" value="" id="phone" onchange="phoneNumberChanged(this);">
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Reiseinformasjon</label>
                  <div class="field nine wide">
                     <input type="text" value="" id="travel_information" onchange="travelInformationChanged(this);">
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Allergier</label>
                  <div class="field nine wide">
                    <input type="text" value="" id="allergies" onchange="allergiesChanged(this);">
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Billettype</label>
                  <div class="field nine wide">
                    <input type="text" value="" id="ticket_type" readonly>
                  </div>
                </div>

                <h4 class="ui dividing header">Deltakerinformasjon</h4>

                <div class="inline fields">
                    <label class="field four wide">Akkreditert</label>
                  <div class="ui checkbox">
                    <input type="checkbox" tabindex="0" class="hidden" id="accreditatedCheckbox" onchange="isAccreditatedChanged(this);">
                  </div>
                </div>

                <div class="inline fields">
                  <label class="field four wide">Klubb</label>
                  <div class="field nine wide">
                    <select class="ui fluid dropdown" id="clubs" onchange="clubChanged(this);">
                    </select>
                  </div>
                </div>

                <div class="inline fields">
                    <label class="field four wide">Medlem av klubb </label>
                  <div class="ui checkbox">
                    <input type="checkbox" tabindex="0" id="clubmemberCheckbox" onchange="isClubMemberChanged(this);">
                  </div>
                </div>

                <div id="exercises">

                </div>
                <button class="green ui button" onclick="beginAddExercise(this);">Meld opp i idrett</button>

                <h4 class="ui dividing header">Tillegg</h4>
                <div id="additions">
                </div>

                <h4 class="ui dividing header">Betaling</h4>
                <div class="ui cards" id="orders"></div>
              </div><!-- /.form -->
            </div> <!-- /.ten.wide.column -->

            <div class="six wide column">

              <div class="ui special card">
                <div class="blurring dimmable image">
                  <div class="ui dimmer">
                    <div class="content">
                      <div class="center">
                        <div class="ui inverted button" id="uploadPortraitButton">Last opp nytt bilde</div>
                      </div>
                    </div>
                  </div>
                  <img id="portrait" src="https://semantic-ui.com/images/avatar/large/elliot.jpg">
                </div>
                <div class="content">
                  <a class="header participantname">Deltaker</a>
                  <div class="meta">
                    <span class="date" id="time_registrated"></span>
                  </div>
                </div>
                <div class="extra content">
                  <textarea rows="4" id="comment" style="max-width:100%;width:100%;" onchange="commentChanged(this);">Ingen kommentarer</textarea>

                  <button class="fluid ui button" id="updateParticipant">Oppdater deltakerinformasjon</button>
                  <div class="ui divider"></div>
                  <div id="recietButton">
                    <button class="fluid ui button" id="recieptParticipant">
                      Last ned kvittering
                    </button>
                  </div>
                  <div class="ui divider"></div>
                  <button class="fluid ui button" id="resendReceipt" onclick="resendReceipt(this);">Send påmeldingskvittering på nytt</button>
                  <div class="ui divider"></div>
                  <button class="fluid red ui button" id="cancelParticipant" onclick="cancelParticipant();">Kanseller deltaker</button>
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

