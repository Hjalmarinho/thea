 <!-- BILDE OG TILLEGG -->
 <h4 class="ui dividing header">Bilde og tillegg</h4>

 <div class="inline fields">
  <label class="field four wide">Bilde</label>
  <div class="ui button" id="image_button">Last opp portrettbilde</div>
  <div id="portrait_container"></div>
</div>

<?php
if (!defined('SKIP_ADDITIONS'))
{
?>
<div class="inline fields" id="additions-container">
  <label class="field four wide">Tillegg</label>
  <div class="grouped fields" id="additions">
    <!-- Additions-checkboxes are populated here from api_handler on page load -->
  </div>
</div>
<?php
}
?>

<div class="inline fields">
  <label class="field four wide">Allergier</label>
  <div class="field twelve wide">
    <input type="text" name="allergies" id="allergies">
  </div>
</div>

<?php
if (!defined('SKIP_TERMS'))
{
?>
<div class="inline fields" id="terms">
  <label class="field four wide">Avtalevilkår</label>
  <div class="field">
    <div class="ui checkbox">
      <input type="checkbox" name="terms">
      <label><a id="terms_url" href="#" target="_blank">Jeg har lest og forstått avtalevilkårene</a></label>
    </div>
  </div>
</div>
<?php
}
?>

<?php require_once(__DIR__ . '/../../shared/portrait_modal.php'); ?>