<?php require 'header.php';?>

<div class="ui items">
    <div class="header">
      <!-- <i class="large sidebar icon" id="menubutton"></i> -->
      <h1>Dashboard</h1>
      <p id="summary"></p>
    </div>
</div>

<div>
  <div id="loader" class="ui active inverted dimmer">
    <div class="ui large text loader">Henter rykende fersk statistikk...</div>
  </div>
  <div class="ui four statistics">
    <div class="ui statistic">
      <div class="value" id="numEntries">
        -
      </div>
      <div class="label">
        Total
      </div>
    </div>
     <div class="ui pink statistic">
      <div class="value" id="numFemale">
        -
      </div>
      <div class="label">
        Damer
      </div>
    </div>
     <div class="ui blue statistic">
      <div class="value" id="numMale">
        -
      </div>
      <div class="label">
        Herrer
      </div>
    </div>
    <div class="statistic">
      <div class="value" id="numTeams">
        -
      </div>
      <div class="label">
        Lag
      </div>
    </div>
<!--     <div class="statistic">
      <div class="value" id="numAccreditated">
        -
      </div>
      <div class="label">
        Akkreditert
      </div>
    </div> -->
  </div>

  <h4 class=" center aligned " id="last_entry"></h4>

  <div class="header">
    <!-- <i class="large sidebar icon" id="menubutton"></i> -->
    <h1>Idretter</h1>
  </div>

  <table class="ui selectable sortable striped celled table">
    <thead>
      <tr>
        <th>Øvelse</th>
        <th>Idrett</th>
        <th>Herrer</th>
        <th>Damer</th>
        <th>Mix</th>
        <th>Totalt</th>
      </tr>
    </thead>
    <tbody id="exercisesBody">
    </tbody>
  </table>
</div>

<?php require 'footer.php';?>