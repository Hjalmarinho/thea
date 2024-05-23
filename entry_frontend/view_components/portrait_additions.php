  <!-- BILDE OG TILLEGG -->
    <h4 class="ui dividing header" id="event_questions_header">Arrangementsspørsmål</h4>
    <div id="event_questions_content"></div>



 <!-- BILDE OG TILLEGG -->
 <h4 class="ui dividing header">Bilde og tillegg</h4>
 <div class="ui message warning visible">
  Manglende bilde eller dårlig kvalitet på bildet kan medføre 50 kroner i gebyr ved akkreditering.
 </div>

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

<div class="ui message info hidden" id="sltromso2020-extra-sport">
  Send mail til <a href="mailto:magnus@studentidrett.no">magnus@studentidrett.no</a> med info om navn og idrett du skal delta i, så melder vi deg opp!
</div>

<?php if ($_GET["event_id"] != 67) { ?>
<div class="inline fields">
<label class="field four wide"><?php
if (basename(debug_backtrace()[0]["file"]) == "entry_extra.php" && $_GET["event_id"] == 61) {
	echo "Tillegsinfo (t-skjortestørrelse, allergier)";
} else {
	echo "Allergier";
}
?></label>
  <div class="field twelve wide">
    <input type="text" name="allergies" id="allergies">
  </div>
</div>
<?php } ?>

<div class="inline fields" id="policy">
  <label class="field four wide">Personvernspolicy</label>
  <div class="field">
    <div class="ui checkbox">
      <input type="checkbox" name="policy">
      <label>Jeg samtykker til at Thea behandler personlige data på vegne av NSI i henhold til avtalevilkårene og NSIs gjeldenede peronvernspolicy</label>
    </div>
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
