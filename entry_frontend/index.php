
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

</head>
<body>


  <div class="ui container">

    <form class="ui form" id="entry-form" role="form">

      <!-- PERSONLIG INFORMASJON -->
      <h4 class="ui dividing header">Personlig informasjon</h4>

      <div class="inline fields">
        <label class="field two wide">Fornavn</label>
        <div class="field four wide">
          <input type="text" name="fornavn">
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Etternavn</label>
        <div class="field four wide">
          <input type="text" name="etternavn">
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Fødselsdato</label>
        <div class="fields">
          <div class="two wide field">
            <input type="text" name="fodselsdato" placeholder="dd" maxlength="2">
          </div>
          <div class="two wide field">
            <input type="text" name="fodselsdato" placeholder="mm" maxlength="2">
          </div>
          <div class="four wide field">
            <input type="text" name="fodselsdato" placeholder="yyyy" maxlength="4">
          </div>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Kjønn</label>
        <div class="field four wide">
          <select class="ui dropdown" name="kjonn">
            <option value="">Hvilket kjønn?</option>
            <option value="1">Mann</option>
            <option value="0">Kvinne</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Student</label>
        <div class="field four wide">
          <select class="ui dropdown" name="student">
            <option value="">Er du student?</option>
            <option value="1">Student</option>
            <option value="0">Ikke student</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Epost</label>
        <div class="field four wide">
          <input type="email" name="epost">
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Mobil</label>
        <div class="field four wide">
          <input type="text" name="mobil">
        </div>
      </div>

      <!-- DELTAKERINFORMASJON -->
      <h4 class="ui dividing header">Deltakerinformasjon</h4>

      <div class="inline fields">
        <label class="field two wide">Klubb</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="klubb">
            <option value="">Hvilken klubb?</option>

          </select>
        </div>
      </div>


      <div class="inline fields">
        <label class="field two wide">Idrett</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="idrett">
            <option value="">Hvilken idrett?</option>
            <option>Amerikansk fotball</option>
            <option>Badminton</option>
            <option>Fekting</option>
            <option>Futsal</option>
            <option>Innebandy</option>
            <option>Tennis</option>
            <option>Svømming</option>
          </select>
        </div>
      </div>


      <div class="inline fields">
        <label class="field two wide">Lag</label>
        <div class="field four wide">
          <select class="ui search dropdown" name="lag">
            <option value="">Hvilket lag?</option>
            <option>BISI 1</option>
            <option>BISI 3</option>
            <option>HiSSI</option>
            <option>NTNUI 1</option>
            <option>NTNUI 2</option>
            <option>NTNUI 3</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide"></label>
        <div class="ui basic button" name="flere-idretter"> Delta i flere idretter</div>
      </div>

      <!-- BILDE OG TILLEGG -->
      <h4 class="ui dividing header">Bilde og tillegg</h4>

      <div class="inline fields">
        <label class="field two wide">Bilde</label>
        <div class="ui button" name="bilde">Last opp bilde</div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Tillegg</label>
        <div class="grouped fields">
          <div class="field">
          <div class="ui checkbox" style="margin-top: 10px;">
              <input type="checkbox" name="overnatting">
              <label>Overnatting  (300,-)</label>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox" style="margin-top: 10px;">
              <input type="checkbox" name="bussbillett">
              <label>Bussbillett  (90,-)</label>
            </div>
          </div>
          <div class="field">
            <div class="ui checkbox" style="margin-top: 10px;">
              <input type="checkbox" name="bankett" checked="checked">
              <label>Bankett  (0,-)</label>
            </div>
          </div>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide">Avtalevilkår</label>
        <div class="field">
          <div class="ui checkbox">
          <input type="checkbox" name="avtalevilkar">
            <label>Jeg har lest og forstått avtalevilkårene</label>
          </div>
        </div>
      </div>

      <div class="inline fields">
        <label class="field two wide"></label>
        <button class="ui green submit button" name="meld-pa">
          Meld på
        </button>
      </div>
      <div class="ui error message"></div>

    </form>

  </div>
</body>
</htmL.