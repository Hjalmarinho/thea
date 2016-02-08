<?php require('header.php'); ?>

<!-- Portrait cropping -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/cropper/0.11.1/cropper.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/cropper/0.11.1/cropper.min.js"></script>
<script>
<?php require_once(__DIR__ . '/../shared/js/portrait_cropping.js'); ?>
</script>


<div class="ui items">
<div id="participantLoader" hidden class="ui active inverted dimmer">
  <div class="ui large text loader">Henter påmeldingen...</div>
</div>
  <div class="header">
    <!-- <i class="large sidebar icon" id="menubutton"></i> -->
    <h1 class="ui dividing participantname">Deltaker</h1>
  </div>
</div>

<?php require_once(__DIR__ . '/../shared/portrait_modal.php'); ?>


<div class="ui modal" id="approve-update">
  <div class="header">
    Er du sikker at du vil endre <span class="participantname"></span>?
  </div>
  <div class="actions">
    <div class="ui button close">Avbryt</div>
    <div class="ui button close green" onclick="updateParticipant();" >Oppdater</div>
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
        <label class="field four wide">Allergier</label>
        <div class="field nine wide">
          <input type="text" value="" id="allergies" onchange="allergiesChanged(this);">
        </div>
      </div>

      <div class="inline fields">
        <label class="field four wide">Organisasjon</label>
        <div class="field nine wide">
          <input type="text" value="" id="organization" onchange="organizationChanged(this);">
        </div>
      </div>

      <div class="inline fields">
        <label class="field four wide">Rolle</label>
        <div class="field nine wide">
          <input type="text" value="" id="role" onchange="roleChanged(this);">
        </div>
      </div>
    </div><!-- /.form -->
  </div> <!-- /.ten.wide.column -->

  <div class="six wide column">

    <div class="ui special card">
        <div class="blurring dimmable image">
          <div class="ui dimmer">
            <div class="content">
              <div class="center">
                <div class="ui inverted button" id="uploadPortraitButton">Last opp nytt bilde</div>
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
          <button class="fluid ui button" id="updateParticipant">Oppdater personinformasjon</button>
          <div class="ui divider"></div>
          <button class="fluid red ui button" id="cancelParticipant" onclick="cancelParticipant();">Kanseller person</button>
        </div>
    </div>

    <div class="field sixteen wide">
      
    </div>
  </div> <!-- /.six.wide.column -->
</div>

<?php require('footer.php'); ?>
