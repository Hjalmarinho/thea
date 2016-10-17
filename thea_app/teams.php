<?php require 'header.php';?>

<div class="ui items">

    <div class="header">
        <!-- <i class="large sidebar icon" id="menubutton"></i> -->
        <h1>Lag</h1>
        <button onclick="addNewTeam()" class="ui floated right button" id="addTeam">Legg til lag</button>
      </div>

</div>
<div id="teamsLoader" class="ui active inverted dimmer">
    <div class="ui large text loader">Henter lag...</div>
  </div>
<table class="ui sortable celled striped table">
  <thead>
    <tr>
        <th>Navn</th>
        <th>Idrett</th>
        <th>Øvelse</th>
        <th>Klubb</th>
        <th>Kjønn</th>
        <th>Påmeldingsdato</th>
    </tr>
  </thead>
  <tbody id="teams">
  </tbody>
</table>

<?php require 'footer.php';?>
