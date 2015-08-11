 <!-- PERSONLIG INFORMASJON -->
 <h4 class="ui dividing header">Personlig informasjon</h4>

 <div class="inline fields">
  <label class="field two wide">Fornavn</label>
  <div class="field four wide">
    <input type="text" name="first_name">
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Etternavn</label>
  <div class="field four wide">
    <input type="text" name="last_name">
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Fødselsdato</label>
  <div class="fields">
    <div class="two wide field">
      <input type="text" name="birthdate" placeholder="dd" maxlength="2">
    </div>
    <div class="two wide field">
      <input type="text" name="birthdate" placeholder="mm" maxlength="2">
    </div>
    <div class="four wide field">
      <input type="text" name="birthdate" placeholder="yyyy" maxlength="4">
    </div>
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Kjønn</label>
  <div class="field four wide">
    <select class="ui dropdown" name="gender">
      <option value="">Hva er ditt kjønn?</option>
      <option value="1">Mann</option>
      <option value="0">Kvinne</option>
    </select>
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Student</label>
  <div class="field four wide">
    <select class="ui dropdown" name="is_student">
      <option value="">Er du student?</option>
      <option value="1">Ja</option>
      <option value="0">Nei</option>
    </select>
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Epost</label>
  <div class="field four wide">
    <input type="email" name="email">
  </div>
</div>

<div class="inline fields">
  <label class="field two wide">Mobil</label>
  <div class="field four wide">
    <input type="text" name="phone">
  </div>
</div>