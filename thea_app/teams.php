<?php require 'header.php';?>

<div class="ui items">

    <div class="header">
        <!-- <i class="large sidebar icon" id="menubutton"></i> -->
        <h1>Lag</h1>
        <button>Legg til lag</button>
      </div>

</div>

<table class="ui sortable celled striped table">
  <thead>
    <tr>
        <th class="ascending">Navn</th>
        <th>Idrett</th>
        <th>Klubb</th>
        <th>Kontaktperson</th>
    </tr>
  </thead>
  <tbody id="teams">
  </tbody>
</table>

<?php require 'footer.php';?>