<?php require 'header.php';?>

<div class="ui items">
    <div class="header">
      <!-- <i class="large sidebar icon" id="menubutton"></i> -->
      <h1>Eksternt personell</h1>
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
        <th>Telefon</th>
        <th>E-post</th>
        <th>Organisasjon</th>
        <th>Rolle</th>
    </tr>
    </thead>
    <tbody id="externalPersons">
    </tbody>
  </table>
</div>

<?php require 'footer.php';?>
