<?php require 'header.php';?>



<div class="ui items">
  <div class="item">
    <div class="content">
    <div class="header">
        <i class="large sidebar icon" id="menubutton"></i>
        <i class="header">Deltakere</i>
      </div>
    </div>
  </div>
</div>

<div class="wee">
<table class="ui sortable celled striped table">
  <thead>
    <tr>
	    <th class="ascending">Fornavn</th>
	    <th>Etternavn</th>
	    <th>Kjønn</th>
	    <th>Klubb</th>
	    <th>Telefon</th>
	    <th>E-post</th>
	    <th>Påmeldingsdato</th>
	</tr>
  </thead>
  <tbody id="participants">
  </tbody>
</table>
</div>

<?php require 'footer.php';?>