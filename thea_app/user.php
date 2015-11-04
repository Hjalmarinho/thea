<?php require 'header.php';?>

<div class="ui items">
    <div class="header">
      <!-- <i class="large sidebar icon" id="menubutton"></i> -->
      <h1>Din bruker</h1>
      <p id="summary"></p>
    </div>
</div>

<div class="ui stackable two column grid">
  <div class="eight wide column">
    <div class="ui form" id="entry-form">
      <div class="inline fields"> 
        <label class="field four wide">Gammelt passord</label>
        <div class="field nine wide">
          <input type="password" value="" id="old_password">
        </div>
      </div>

      <div class="inline fields"> 
        <label class="field four wide">Nytt passord</label>
        <div class="field nine wide">
          <input type="password" value="" id="new_password">
        </div>
      </div>

      <div class="inline fields"> 
        <label class="field four wide">Gjenta nytt passord</label>
        <div class="field nine wide">
          <input type="password" value="" id="new_password_repeat">
        </div>
      </div>

      <div hidden class="ui negative message" id="errorMessage">
        <div class="header">
          Upsi!
        </div>
        <p id="errorMessageContent"></p>
      </div>

      <div hidden class="ui success message" id="okMessage">
        <div class="header">
          Suksess!
        </div>
        <p>Passordet ditt har blitt endret.</p>
      </div>

      <button class="green ui button" onclick="change_password();" id="changePassword">Endre passord</button>
    </div>
  </div>
</div>

<?php require 'footer.php';?>