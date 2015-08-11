
<!DOCTYPE html>
<html>

<?php include("view_components/head.php"); ?>
<body>

  <div class="ui container">

    <form class="ui form" id="entry_form" role="form">

      <!-- Sett inn personlig informasjon view -->
      <?php include("view_components/personal_info.php"); ?>

      <!-- LAG- OG DELTAKERINFORMASJON -->
      <h4 class="ui dividing header">Lag- og deltakerinformasjon</h4>

      <div class="inline fields">
        <label class="field two wide">Klubb</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="club" id="clubs">
            <option value="">Hvilken klubb tilhører laget?</option>

          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Medlem</label>
        <div class="field four wide">
          <select class="ui dropdown" name="member">
            <option value="">Er du medlem av klubben?</option>
            <option value="1">Ja</option>
            <option value="0">Nei</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Idrett</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="sports" id="sports">
            <option value="">Hvilken idrett skal laget delta i?</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Lagnavn</label>
        <div class="field four wide">
          <input type="text" name="team_name">
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Klasse</label>
        <div class="field four wide">
          <select class="ui dropdown" name="team_gender">
            <option value="">I hvilken klasse spiller laget?</option>
            <option value="1">Herre</option>
            <option value="0">Dame</option>
            <option value="0">Mix</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Spillende</label>
        <div class="field four wide">
          <select class="ui dropdown" name="is_playing">
            <option value="">Skal du spille på laget?</option>
            <option value="1">Ja</option>
            <option value="0">Nei</option>
          </select>
        </div>
      </div>

      <!-- Sett inn bilde og tillegg view -->
      <?php include("view_components/portrait_additions.php"); ?>

      <div class="inline fields">
        <label class="field two wide"></label>
        <button class="ui green submit button">
          Meld på lag
        </button>
      </div>
      <div class="ui error message"></div>

    </form>

  </div>
</body>
</html>