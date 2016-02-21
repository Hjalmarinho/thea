<?php require('header.php'); ?>

<div class="ui container">
  <div id="participantsLoader" class="ui active inverted dimmer">
    <div class="ui large text loader">Henter påmeldinger...</div>
  </div>

  <div class="ui grid">
    <!-- Search field -->
    <div class="row">
      <div class="ten wide column" >

        <h1>Akkreditering</h1>

        <!-- Search field -->
        <div class="ui icon input">
          <input type="text" id="search_input" placeholder="Søk...">
          <i class="search icon"></i>
        </div>
      </div>
    </div>

    <div class="ten wide column" >

      <!-- Participants table -->
      <table id="participants_table" class="ui sortable celled striped table" style="cursor: pointer" onclick="initiateSearch()">
        <thead>
          <tr>
            <th class="four wide ascending">Fornavn</th>
            <th class="four wide ascending">Etternavn</th>
            <th class="seven wide">Klubb</th>
          </tr>
        </thead>
        <tbody id="participants_table_body">        
          <!-- Participants are populated here when a call has been made to the API from api_handler.js -->
        </tbody>
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
          <div class="extra content" id="comment_div">
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
</div> <!-- /container -->
<?php require('footer.php'); ?>

