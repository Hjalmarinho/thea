
<!DOCTYPE html>
<html>

<?php include("view_components/head.php"); ?>
<body>

  <div class="ui container">

    <form class="ui form" id="entry_form" role="form">

      <!-- Sett inn personlig informasjon view -->
      <?php include("view_components/personal_info.php"); ?>

      <!-- DELTAKERINFORMASJON -->
      <h4 class="ui dividing header">Deltakerinformasjon</h4>

      <div class="inline fields">
        <label class="field two wide">Klubb</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="clubs" id="clubs">
            <option value="">Hvilken klubb deltar du for?</option>
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
            <option value="">Hvilken idrett skal du delta i?</option>
          </select>
        </div>
      </div>


      <div class="inline fields">
        <label class="field two wide">Lag</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="teams" id="teams">
            <option value="">Hvilket lag skal du spille for?</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Tilleggsfelt</label>
        <div class="field four wide">
          <input type="text" name="additional">
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide"></label>
        <div class="ui basic button"> Delta i flere idretter</div>
      </div>

      <!-- Sett inn bilde og tillegg view -->
      <?php include("view_components/portrait_additions.php"); ?>
      
      <div class="inline fields">
        <label class="field two wide"></label>
        <button class="ui teal submit button">
          Meld på
        </button>
      </div>
      <div class="ui error message"></div>

    </form>

  </div>
</body>
</html>