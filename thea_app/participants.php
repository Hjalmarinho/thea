<?php require 'header.php';?>

	
	
<div class="ui items">

    <div class="header">
        <!-- <i class="large sidebar icon" id="menubutton"></i> -->
        <h1>Deltakere</h1>
      </div>

</div>

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


<?php require 'footer.php';?>