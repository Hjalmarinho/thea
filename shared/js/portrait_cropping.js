// Display selected image in image-modal and update the cropper.
function readURL(input)
{
  if (input.files && input.files[0])
  {
    var reader = new FileReader();
    reader.onload = function (e) {
    if ($("#crop_container").html().trim().length == 0)
    {
      // First time cropper is loaded.
      $("#crop_container").html('<img id="portrait_crop" style="max-width:200px; image-orientation: from-image;" alt="Portrettbilde" src="' + e.target.result + '" />');

      $("#portrait_crop").cropper({
        aspectRatio: 3 / 4,
        preview: ".img-preview",
        moveable: false,
        zoomable: false,
        responsive: false
      });

      $("#rotatePreviewIcons").show();
    }
    else
    {
      $("#portrait_crop").cropper('replace', e.target.result);
    }

    $("#uploadPortraitLoader").removeClass("active");
  };

  var file = input.files[0];
  var imageType = /image.*/;
  if (file.type.match(imageType))
  {
    $("#uploadPortraitLoader").addClass("active");
      reader.readAsDataURL(file);
    }
    else
    {
      console.log("Unsupported file type.");
    }
  }
}

// Rotate the image in cropping.
function rotatePreview(amount)
{
  $("#portrait_crop").cropper('rotate', amount);
}
