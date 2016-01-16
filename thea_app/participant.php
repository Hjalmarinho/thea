<?php require('header.php'); ?>



<div class="ui items">
<div id="participantLoader" hidden class="ui active inverted dimmer">
  <div class="ui large text loader">Henter påmeldingen...</div>
</div>
  <div class="header">
    <!-- <i class="large sidebar icon" id="menubutton"></i> -->
    <h1 class="ui dividing participantname">Deltaker</h1>
  </div>

</div>

<div class="ui modal" id="approve-update">
  <div class="header">
    Er du sikker at du vil endre <span class="participantname"></span>?
  </div>
  <div class="actions">
    <div class="ui button close">Avbryt</div>
    <div class="ui button close green" onclick="updateParticipant();" >Oppdater</div>
  </div>
</div>

<div class="ui modal" id="receipt-sent">
  <div class="header">
    En ny påmeldingskvittering er sendt ut til <span class="participantname"></span>.
  </div>
  <div class="actions">
    <div class="ui button close green">Okey!</div>
  </div>
</div>

<div class="ui modal" id="payment-log">
  <div class="header">
    Betalingslogg
  </div>
  <div class="content">
    <div class="ui yellow message">Alle pengesummer her er multiplisert med 100. Dvs, når det står "55000", betyr det "550.00".</div>
    <pre id="payment-log-content">
    </pre>
  </div>
  <div class="actions">
    <div class="ui green button close">Ok</div>
  </div>
</div>

<div class="ui modal" id="error-modal">
  <div class="header">
    Upsi
  </div>
  <div class="content">
    <p id="error-msg"></p>
  </div>
  <div class="actions">
    <div class="ui button close" >Ok</div>
  </div>
</div>

<div class="ui modal" id="credit-update">
  <div class="header">
    Refunder penger til <span class="participantname"></span>
  </div>
  <div class="content">
    <div class="ui form">
      <div class="inline fields">
        <label class="field four wide">Hvor mye vil du refundere?</label>
        <div class="field twelve wide">
          <input type="text" id="credit-amount" value="">
        </div>
      </div>
    </div>

    <div hidden class="ui negative message" id="credit-error">
      <div class="header">
        Upsi!
      </div>
      <p id="credit-error-msg"></p>
    </div>
    <!--<div>
      Gjør det lettere å huske hvorfor du refunderte penger, skriv en kommentar!
      <div class="ui form">
        <div class="field">
          <textarea rows="4" id="update-comment" style="max-width:100%;width:100%;"></textarea>
        </div>
      </div>
     </div>-->
  </div>
  <div class="actions">
    <div class="ui button red close">Avbryt</div>
    <div class="ui button green" id="credit-button" onclick="creditParticipant();">Refunder</div>
  </div>
</div>

<div class="ui stackable two column grid">
  <div class="eight wide column">
    <div class="ui form" id="entry-form">

      <div class="inline fields">  
        <label class="field four wide">Fornavn</label>
        <div class="field nine wide">
          <input type="text" value="" id="first_name" onchange="firstNameChanged(this);">
        </div>
      </div>
      
      <div class="inline fields">
        <label class="field four wide">Etternavn</label>
        <div class="field nine wide">
          <input type="text" value="" id="last_name" onchange="lastNameChanged(this);">
        </div>
      </div>

      <div class="inline fields">
        <label class="field four wide">Fødselsdato</label>
        <div class="field two wide">
          <input type="text" name="birthdate" id="birthday" placeholder="dd" onchange="birthdateChanged(this);">
        </div>

        <div class="field four wide">
          <select class="ui fluid dropdown" id="birthmonth" onchange="birthdateChanged(this);">
            <option value="">mm</option>
            <option value="01">januar</option>
            <option value="02">februar</option>
            <option value="03">mars</option>
            <option value="04">april</option>
            <option value="05">mai</option>
            <option value="06">juni</option>
            <option value="07">juli</option>
            <option value="08">august</option>
            <option value="09">september</option>
            <option value="10">oktober</option>
            <option value="11">november</option>
            <option value="12">desember</option>
          </select>
        </div>

        <div class="field three wide">
          <input type="text" name="birthdate" id="birthyear" placeholder="yyyy" onchange="birthdateChanged(this);">
        </div>
      </div>

      <div class="inline fields">
        <label class="field four wide">Kjønn</label>
        <div class="field nine wide">
          <select class="ui fluid dropdown" id="selectgender" onchange="genderChanged(this);">
            <option value="">Velg kjønn</option>
            <option value="Female" >Dame</option>
            <option value="Male" >Herre</option>
          </select>
        </div>
      </div>

      <div class="inline fields">
          <label class="field four wide">Student</label>
        <div class="ui fitted checkbox">
          <input type="checkbox" tabindex="0" id="studentCheckbox" onchange="isStudentChanged(this);">
        </div>
      </div>

      <div class="inline fields">
        <label class="field four wide">E-post</label>
        <div class="field nine wide">
          <input type="text" value="" id="email" onchange="emailChanged(this);">
          </div>
      </div>

      <div class="inline fields">
        <label class="field four wide">Telefonnummer</label>
        <div class="field nine wide">
          <input type="text" value="" id="phone" onchange="phoneNumberChanged(this);">
        </div>
      </div>

      <div class="inline fields">
        <label class="field four wide">Reiseinformasjon</label>
        <div class="field nine wide">
           <input type="text" value="" id="travel_information" onchange="travelInformationChanged(this);">
        </div>
      </div>

      <div class="inline fields">
        <label class="field four wide">Allergier</label>
        <div class="field nine wide">
          <input type="text" value="" id="allergies" onchange="allergiesChanged(this);">
        </div>
      </div>

      <h4 class="ui dividing header">Deltakerinformasjon</h4>

      <div class="inline fields">
          <label class="field four wide">Akkreditert</label>
        <div class="ui checkbox">
          <input type="checkbox" tabindex="0" class="hidden" id="accreditatedCheckbox" onchange="isAccreditatedChanged(this);">
        </div>
      </div>

      <div class="inline fields">
        <label class="field four wide">Klubb</label>
        <div class="field nine wide">
          <select class="ui fluid dropdown" id="clubs" onchange="clubChanged(this);">
          </select>
        </div>
      </div>

      <div class="inline fields">
          <label class="field four wide">Medlem av klubb </label>
        <div class="ui checkbox">
          <input type="checkbox" tabindex="0" id="clubmemberCheckbox" onchange="isClubMemberChanged(this);">
        </div>
      </div>

      <div id="exercises">
      </div>

      <h4 class="ui dividing header">Betaling</h4>
      <div class="ui cards" id="orders"></div>
    </div><!-- /.form -->
  </div> <!-- /.ten.wide.column -->

  <div class="six wide column">

    <div class="ui special card">
        <div class="blurring dimmable image">
          <div class="ui dimmer">
            <div class="content">
              <div class="center">
                <div class="ui inverted button">Last opp nytt bilde</div>
              </div>
            </div>
          </div>
          <img id="portrait" src="http://semantic-ui.com/images/avatar/large/elliot.jpg">
        </div>
        <div class="content">
          <a class="header participantname">Deltaker</a>
          <div class="meta">
            <span class="date" id="time_registrated"></span>
          </div>
        </div>
        <div class="extra content">
          <textarea rows="4" id="comment" style="max-width:100%;width:100%;">Ingen kommentarer</textarea>


          <button class="fluid ui button" id="updateParticipant">Oppdater deltakerinformasjon</button>
          <div class="ui divider"></div>
          <div id="recietButton">
            <button class="fluid ui button" id="recieptParticipant">
              Last ned kvittering
            </button>
          </div>
          <div class="ui divider"></div>
          <button class="fluid ui button" id="resendReceipt" onclick="resendReceipt(this);">Send påmeldingskvittering på nytt</button>
          <div class="ui divider"></div>
          <button class="fluid red ui button" id="cancelParticipant" onclick="cancelParticipant();">Kanseller deltaker</button>
        </div>
    </div>

    <div class="field sixteen wide">        
      
    </div>
  </div> <!-- /.six.wide.column -->

<!--
<div class="row">
  <div class="fourteen wide column">
    <div class="ui segments">
      <div class="ui segment">
        <p>Erik Frøseth changed gender from male to female on 13 august 2015, kl. 12.10.43.</p>

      </div>
      <div class="ui segment">
        <p>Øystein Molnes added himself as a participant on 11 august 2015, kl. 11.00.00.</p>
      </div>
    </div>
  </div>

</div>
-->
</div>



<?php require('footer.php'); ?>
