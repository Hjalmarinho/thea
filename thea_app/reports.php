<?php require('header.php'); ?>

<div class="ui items">
  <div class="header">
    <h1 class="ui dividing participantname">Rapporter</h1>
  </div>
</div>

<div id="loader" class="ui active inverted dimmer" style="display:none;">
  <div class="ui large text loader">Genererer rapporten...</div>
</div>

<div class="ui stackable two column grid">
  <div class="eight wide column">
    <div class="ui list">
      <a class="item" onclick="getAccreditationList();">
        <i class="users icon"></i>
        <div class="content">
          <div class="header">Akkrediteringsliste</div>
          <div class="description">En excel-fil med alle deltagere, deres idretter og tilhørende klubb.</div>
        </div>
      </a>
      <a class="item" onclick="getContactList();">
        <i class="users icon"></i>
        <div class="content">
          <div class="header">Kontaktliste</div>
          <div class="description">En excel-fil med epost og telefonnummer til alle deltakere.</div>
        </div>
      </a>
      <a class="item" onclick="getExtendedContactList();">
        <i class="users icon"></i>
        <div class="content">
          <div class="header">Utvidet kontaktliste</div>
          <div class="description">En excel-fil med epost, telefonnummer, idretter og tillegg til alle deltakere.</div>
        </div>
      </a>
      <a class="item" onclick="getExternalPersons();">
        <i class="users icon"></i>
        <div class="content">
          <div class="header">Eksternt personell</div>
          <div class="description">En excel-fil med epost og telefonnummer til eksternt personell.</div>
        </div>
      </a>
      <a class="item" onclick="getTeamsContactList();">
        <i class="users icon"></i>
        <div class="content">
          <div class="header">Kontaktliste lag</div>
          <div class="description">En excel-fil med epost og telefonnummer til kontakperson for lag-idretter.</div>
        </div>
      </a>
      <a class="item" onclick="getPortraits();">
        <i class="file image outline icon"></i>
        <div class="content">
          <div class="header">Portrettbilder</div>
          <div class="description">En ZIP-fil med portrettbilde av alle deltagere.</div>
        </div>
      </a>
    </div>
  </div> <!-- /.six.wide.column -->
</div>



<?php require('footer.php'); ?>
