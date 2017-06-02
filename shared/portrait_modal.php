<!-- Image modal -->
<div class="ui modal" id="image_modal">
  <div class="header">
    Last opp et portrettbilde
  </div>
  <div class="content">
    <div id="uploadPortraitLoader" class="ui inverted dimmer">
      <div class="ui large text loader">Gjør klart bildet...</div>
    </div>
    <div class="ui grid">
      <div class="ui warning message">
        Merk at bildet må være et tydelig portrettbilde av deg selv. Et ugyldig bilde vil kunne koste deg 50 kroner ekstra i administrasjonsavgift
      </div>
      <div class="row">
        <div class="four wide computer eight wide mobile column">
          <label for="file" class="ui icon button"><i class="file image outline icon"></i>Velg bilde</label>
          <input type="file" id="file" style="display:none" onchange="readURL(this);" />
        </div>
      </div>
      <div class="row">
        <div class="four wide computer eight wide mobile column" >
          <div class="image content" id="crop_container">
          </div>
        </div>
        <div class="four wide computer eight wide mobile column" >
          <div id="portraitPreview" class="img-preview preview-lg image content"></div>
        </div>
      </div>
      <div class="row">
          <div id="rotatePreviewIcons" style="display:none;" class="four wide computer eight wide mobile column"  >
            <button class="ui icon button big" onclick="rotatePreview(90);"><img src="<?php echo ROOT_URL; ?>/img/rotate_right.png" alt="Roter høyre" style="width:25px;margin:-5px;" /></button>
            <button class="ui icon button big" onclick="rotatePreview(-90);"><img src="<?php echo ROOT_URL; ?>/img/rotate_left.png" alt="Roter venstre" style="width:25px;margin:-5px;" /></button>
          </div>
      </div>
    </div>

  </div>
  <div class="actions">
    <div class="ui button cancel">Avbryt</div>
    <div class="ui blue button" onclick="confirmPortrait()">Ferdig</div>
  </div>
</div>  <!-- /image modal -->