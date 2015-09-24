<div class="ui modal" id="confirm_modal">
  <div class="header">
    Bekreft at informasjonen stemmer
  </div>
  <div class="content">

    <form class="ui form" onsubmit="return false;">


      <div class="ui grid">
        <div class="eight wide column" >

          <!-- DELTAKERINFORMASJON -->
          <h4 class="ui dividing header">Personlig informasjon</h4>
          <div id="confirm_personal_container">
            <!-- Personal info is populated from main.js when the modal is displayed -->
          </div>

        </div> <!-- /left modal column -->

        <div class="eight wide column">

          <!-- DELTAKERINFORMASJON -->
          <h4 class="ui dividing header">Deltakerinformasjon</h4>
          <div id="confirm_participant_container">
            <!-- Participant info is populated from main.js when the modal is displayed -->
          </div>

          <!-- BILDE OG TILLEGG -->
          <h4 class="ui dividing header">Bilde og tillegg</h4>
          <div id="confirm_additions_container">
            <!-- Additional info is populated from main.js when the modal is displayed -->
          </div>

        </div> <!-- /right modal column -->
      </div>
    </form>

  </div>
  <div class="actions">
    <div class="ui button close">Avbryt</div>
    <div id="paymentButton" class="ui blue button" onclick="submitParticipantForm()">Til betaling</div>
  </div>
</div> 