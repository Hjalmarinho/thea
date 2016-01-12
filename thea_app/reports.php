<?php require('header.php'); ?>

<div class="ui items">
  <div class="header">
    <h1 class="ui dividing participantname">Rapporter</h1>
  </div>
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
