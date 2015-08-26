 <!-- PERSONLIG INFORMASJON -->
 <h4 class="ui dividing header">Personlig informasjon</h4>

 <div class="inline fields">
  <label class="field four wide">Fornavn</label>
  <div class="field twelve wide">
    <input type="text" name="first_name" id="first_name">
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Etternavn</label>
  <div class="field twelve wide">
    <input type="text" name="last_name" id="last_name">
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Fødselsdato</label>
  <div class="field three wide">
    <input type="text" name="birthdate" id="birthday" placeholder="dd" maxlength="2">
  </div>
  
  <div class="field five wide">
    <select class="ui fluid dropdown" name="birthdate" id="birthmonth">
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

  <div class="field four wide">
    <input type="text" name="birthdate" id="birthyear" placeholder="yyyy" maxlength="4">
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Kjønn</label>
  <div class="field twelve wide">
    <select class="ui dropdown" name="gender" id="gender">
      <option value="">Hva er ditt kjønn?</option>
      <option value="MALE">Mann</option>
      <option value="FEMALE">Kvinne</option>
    </select>
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Student</label>
  <div class="field twelve wide">
    <select class="ui dropdown" name="is_student" id="is_student">
      <option value="">Er du student?</option>
      <option value="1">Ja</option>
      <option value="0">Nei</option>
    </select>
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Epost</label>
  <div class="field twelve wide">
    <input type="email" name="email" id="email">
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Mobil</label>
  <div class="field twelve wide">
    <input type="text" name="phone" id="phone">
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Reiseinfo</label>
  <div class="field twelve wide">
    <select class="ui search dropdown" name="travel_information" id="travel_information">
      <option value="">Hvilken by reiser du fra?</option>
      <option value="0">Alta</option>
      <option value="1">Bergen</option>
      <option value="2">Kristiansand</option>
      <option value="3">Oslo</option>
      <option value="4">Stavanger</option>
      <option value="5">Trondheim</option>
      <option value="6">Tromsø</option>
      <option value="7">Ålesund</option>
    </select>
  </div>
</div>