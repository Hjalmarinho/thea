 <!-- PERSONLIG INFORMASJON -->
 <h4 class="ui dividing header">Personlig informasjon</h4>

 <div class="inline fields">
  <label class="field two wide">Fornavn</label>
  <div class="field four wide">
    <input type="text" name="first_name" id="first_name">
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Etternavn</label>
  <div class="field four wide">
    <input type="text" name="last_name" id="last_name">
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Fødselsdato</label>
  <div class="field two wide">
    <input type="text" name="birthdate" id="birthdate" placeholder="yyyy-mm-dd" maxlength="10">
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Kjønn</label>
  <div class="field four wide">
    <select class="ui dropdown" name="gender" id="gender">
      <option value="">Hva er ditt kjønn?</option>
      <option value="MALE">Mann</option>
      <option value="FEMALE">Kvinne</option>
    </select>
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Student</label>
  <div class="field four wide">
    <select class="ui dropdown" name="is_student" id="is_student">
      <option value="">Er du student?</option>
      <option value="1">Ja</option>
      <option value="0">Nei</option>
    </select>
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Epost</label>
  <div class="field four wide">
    <input type="email" name="email" id="email">
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Mobil</label>
  <div class="field four wide">
    <input type="text" name="phone" id="phone">
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Reiseinfo</label>
  <div class="field four wide">
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