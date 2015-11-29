<?php require 'header.php';?>

<div class="ui items">
    <div class="header">
      <!-- <i class="large sidebar icon" id="menubutton"></i> -->
      <h1>Øvelser</h1>
      <p id="summary"></p>
    </div>
</div>

<div>
  <div id="exerciseLoader" class="ui active inverted dimmer">
    <div class="ui large text loader">Henter øvelser...</div>
  </div>
  <table class="ui selectable stackable sortable celled table">
    <thead>
      <tr>
  	    <th class="ascending">Øvelse</th>
  	    <th>Idrett</th>
  	    <th>Deltakere</th>
  	    <th>Lag</th>
  	</tr>
    </thead>
    <tbody id="exercises">
    </tbody>
  </table>
</div>

<?php require 'footer.php';?>