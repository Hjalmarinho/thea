 <!-- BILDE OG TILLEGG -->
 <h4 class="ui dividing header">Bilde og tillegg</h4>

 <div class="inline fields">
  <label class="field four wide">Bilde</label>
  <div class="ui button" id="image_button">Last opp portrettbilde</div>
  <img id="portrait" style="display:none; width:150px; height:200px; overflow:hidden;"/>
</div>

<div class="inline fields">
  <label class="field four wide">Tillegg</label>
  <div class="grouped fields" id="additions">
    <!-- Additions-checkboxes are populated here from api_handler on page load -->
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Allergier</label>
  <div class="field twelve wide">
    <input type="text" name="allergies" id="allergies">
  </div>
</div>

<div class="inline fields">
  <label class="field four wide">Avtalevilkår</label>
  <div class="field">
    <div class="ui checkbox">
      <input type="checkbox" name="terms">
      <label><a href="avtalevilkaar.pdf" target="_blank">Jeg har lest og forstått avtalevilkårene</a></label>
    </div>
  </div>
</div>

<!-- Image modal -->
<div class="ui modal" id="image_modal">
  <div class="header">
    Last opp et portrettbilde
  </div>
  <div class="content">

    <div class="ui grid">
      <div class="row">
        <div class="four wide computer eight wide mobile column">
          <label for="file" class="ui icon button"><i class="file image outline icon"></i>Velg bilde</label>
          <input type="file" id="file" style="display:none" onchange="readURL(this);" />
        </div>
      </div>
      <div class="four wide computer eight wide mobile column" >
        <img id="portrait_crop" width="200" />

        <div id="rotatePreviewIcons" style="display:none;" >
            <button class="ui icon button big" onclick="rotatePreview(90);"><i class="retweet icon"></i></button>
            <button class="ui icon button big" onclick="rotatePreview(-90);"><i class="flipped retweet icon"></i></button>
        </div>
      </div>
      <div class="four wide computer eight wide mobile column">
        <div id="portraitPreview" class="img-preview preview-lg"></div>
      </div>
    </div>

  </div>
  <div class="actions">
    <div class="ui button close">Avbryt</div>
    <div class="ui blue button" onclick="confirmPortrait()">Ferdig</div>
  </div>
</div>  <!-- /image modal -->