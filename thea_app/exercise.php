<?php require('header.php'); ?>

<div class="ui items">
  <div id="exercise-loader" hidden class="ui active inverted dimmer">
    <div class="ui large text loader">Henter laget...</div>
  </div>
  <div class="header">
    <h1 class="ui dividing exercise-description">Øvelse</h1>
  </div>
</div>

<div class="ui stackable two column grid">
  <div class="eight wide column">
    <div class="ui form" id="entry-form">

      <div class="inline fields"> 
        <label class="field four wide">Beskrivelse</label>
        <div class="field nine wide">
          <input type="text" value="" id="exercise-description">
        </div>
      </div>

      <div class="inline fields"> 
        <label class="field four wide">Maks antall herrer</label>
        <div class="field nine wide">
          <input type="text" placeholder="Ingen grense" value="" id="max-male">
        </div>
      </div>

      <div class="inline fields"> 
        <label class="field four wide">Maks antall damer</label>
        <div class="field nine wide">
          <input type="text" placeholder="Ingen grense" value="" id="max-female">
        </div>
      </div>

      <div class="inline fields"> 
        <label class="field four wide">Maks antall totalt</label>
        <div class="field nine wide">
          <input type="text" placeholder="Ingen grense" value="" id="max-total">
        </div>
      </div>

      <div id="team-info" hidden>
        <div class="inline fields"> 
          <label class="field four wide">Deltagere per lag</label>
          <div class="field nine wide">
            <input type="text" value="" id="slots-per-team">
          </div>
        </div>

        <div class="inline fields"> 
          <label class="field four wide">Maks ikke-studenter per lag</label>
          <div class="field nine wide">
            <input type="text" placeholder="Ingen grense" value="" id="max-non-students-per-team">
          </div>
        </div>

        <div class="inline fields"> 
          <label class="field four wide">Tillat mikslag</label>
          <div class="ui fitted checkbox">
            <input type="checkbox" tabindex="0" id="allow-mix-teams">
          </div>
        </div>
      </div>
    </div><!-- /.form -->

    <div id="entry-teams" hidden>
      <h2>Påmeldte lag</h2>
      <table class="ui sortable celled striped table">
        <thead>
          <tr>
            <th>Navn</th>
            <th>Klubb</th>
            <th>Kjønn</th>
            <th>Kontaktperson</th>
          </tr>
        </thead>
        <tbody id="teams">
        </tbody>
      </table>
    </div>

    <div id="entry-individuals" hidden>
      <h2>Påmeldte deltagere</h2>
      <table class="ui sortable celled striped table">
        <thead>
          <tr>
            <th>Navn</th>
            <th>Klubb</th>
            <th>Kjønn</th>
          </tr>
        </thead>
        <tbody id="participants">
        </tbody>
      </table>
    </div>
  </div> <!-- /.ten.wide.column -->

  <div class="six wide column">

    <div class="ui special card">
      <div class="content">
        <a class="header">Statistikk</a>
        <div class="meta">
          <span class="date" id="exercise-info"></span>
        </div>
      </div>
      <div class="extra content">
        <textarea rows="4" id="comment" style="max-width:100%;width:100%;">Ingen kommentarer</textarea>
        <button class="fluid disabled ui button" id="update-exercise">Oppdater øvelsen</button>
      </div>
    </div>

    <div class="field sixteen wide">
    </div>
  </div> <!-- /.six.wide.column -->
</div>
<?php require('footer.php'); ?>
