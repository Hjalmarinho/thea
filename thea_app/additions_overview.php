<?php require 'header.php';?>

<div class="ui items">
    <div class="header">
      <!-- <i class="large sidebar icon" id="menubutton"></i> -->
      <h1>Tillegg</h1>
    </div>
</div>

<div>
  <div id="additionsLoader" class="ui active inverted dimmer">
    <div class="ui large text loader">Henter oversikt over tillegg...</div>
  </div>
  <div>
    <table class="ui selectable stackable sortable celled table compact">
      <thead>
        <tr>
          <th class="ascending">Beskrivelse</th>
          <th>Antall bestilte</th>
      </tr>
      </thead>
      <tbody id="summary_table">
      </tbody>
    </table>
    <br>
  </div>
  <div id="tables"></div>
</div>

<?php require 'footer.php';?>
