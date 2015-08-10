
<!DOCTYPE html>
<html>
<head>
  <!-- Standard Meta -->
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

  <!-- Site Properities -->
  <title>Responsive Elements - Semantic</title>

  <!-- Include jQuery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>

  <!-- Include semantic UI -->
  <link rel="stylesheet" type="text/css" href="css/semantic.min.css">
  <script type="text/javascript" src="js/semantic.min.js"></script>
 
  <!-- Include custom css -->
  <link rel="stylesheet" type="text/css" href="css/style.css">

  <!-- Include custom js -->
  <script type="text/javascript" src="js/main.js"></script>
  <script type="text/javascript" src="js/validation.js"></script>
  <script type="text/javascript" src="js/api_handler.js"></script>

</head>
<body>


  <div class="ui container">

    <form class="ui form" id="entry_form" role="form">

      <!-- PERSONLIG INFORMASJON -->
      <h4 class="ui dividing header">Personlig informasjon</h4>

      <div class="inline fields">
        <label class="field two wide">Fornavn</label>
        <div class="field four wide">
          <input type="text" name="first_name">
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Etternavn</label>
        <div class="field four wide">
          <input type="text" name="last_name">
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Fødselsdato</label>
        <div class="fields">
          <div class="two wide field">
            <input type="text" name="birthdate" placeholder="dd" maxlength="2">
          </div>
          <div class="two wide field">
            <input type="text" name="birthdate" placeholder="mm" maxlength="2">
          </div>
          <div class="four wide field">
            <input type="text" name="birthdate" placeholder="yyyy" maxlength="4">
          </div>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Kjønn</label>
        <div class="field four wide">
          <select class="ui dropdown" name="gender">
            <option value="">Hvilket kjønn?</option>
            <option value="1">Mann</option>
            <option value="0">Kvinne</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Student</label>
        <div class="field four wide">
          <select class="ui dropdown" name="is_student">
            <option value="">Er du student?</option>
            <option value="1">Student</option>
            <option value="0">Ikke student</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Epost</label>
        <div class="field four wide">
          <input type="email" name="email">
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Mobil</label>
        <div class="field four wide">
          <input type="text" name="phone">
        </div>
      </div>

      <!-- DELTAKERINFORMASJON -->
      <h4 class="ui dividing header">Deltakerinformasjon</h4>

      <div class="inline fields">
        <label class="field two wide">Klubb</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="club" id="clubs">
            <option value="">Hvilken klubb?</option>

          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Idrett</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="sports" id="sports">
            <option value="">Hvilken idrett?</option>
          </select>
        </div>
      </div>


      <div class="inline fields">
        <label class="field two wide">Lag</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="teams" id="teams">
            <option value="">Hvilket lag?</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide"></label>
        <div class="ui basic button"> Delta i flere idretter</div>
      </div>

      <!-- BILDE OG TILLEGG -->
      <h4 class="ui dividing header">Bilde og tillegg</h4>

      <div class="inline fields">
        <label class="field two wide">Bilde</label>
        <div class="ui button" name="portrait">Last opp bilde</div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Tillegg</label>
        <div class="grouped fields">
          <div class="field">
          <div class="ui checkbox" style="margin-top: 10px;">
              <input type="checkbox">
              <label>Overnatting  (300,-)</label>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox" style="margin-top: 10px;">
              <input type="checkbox">
              <label>Bussbillett  (90,-)</label>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox" style="margin-top: 10px;">
              <input type="checkbox" checked="checked">
              <label>Bankett  (0,-)</label>
            </div>
          </div>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Avtalevilkår</label>
        <div class="field">
          <div class="ui checkbox">
          <input type="checkbox" name="terms">
            <label>Jeg har lest og forstått avtalevilkårene</label>
          </div>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide"></label>
        <button class="ui green submit button">
          Meld på
        </button>
      </div>
      <div class="ui error message"></div>

    </form>

  </div>
</body>
</html>