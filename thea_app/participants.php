<?php require 'header.php';?>

<div class="ui items">
    <div class="header">
      <!-- <i class="large sidebar icon" id="menubutton"></i> -->
      <h1>Deltakere</h1>
      <p id="summary"></p>
    </div>
</div>

<div>
  <div id="participantsLoader" class="ui active inverted dimmer">
    <div class="ui large text loader">Henter påmeldinger...</div>
  </div>
  <table class="ui selectable stackable sortable celled table">
    <thead>
      <tr>
  	    <th class="ascending">Fornavn</th>
  	    <th>Etternavn</th>
  	    <th>Kjønn</th>
  	    <th>Klubb</th>
  	    <th>Telefon</th>
  	    <th>E-post</th>
  	    <th>Påmeldingsdato</th>
            <th class="no-sort">Kvittering</th>
  	</tr>
    </thead>
    <tbody id="participants">
    </tbody>
  </table>
</div>

<?php require 'footer.php';?>
