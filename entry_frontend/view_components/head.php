<!-- Standard Meta -->
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

<!-- Site Properities -->
<title>Påmelding | SL Tromsø 2016</title>

<!-- Include jQuery  -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

<!-- Include jCrop -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-jcrop/0.9.12/js/jquery.Jcrop.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-jcrop/0.9.12/css/jquery.Jcrop.min.css" />

<!-- Include semantic UI -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.8/semantic.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.8/semantic.min.css" />

<!-- Include custom css -->
<link rel="stylesheet" type="text/css" href="css/style.css">

<!-- Include custom js -->
<script>
  <?php
    /*
     * This might look a bit hacky...
     * But we have to do it this way since the following files are outside of the domain.
     */
    require_once(__DIR__ . "/../../shared/js/api_handler.js");
    require_once(__DIR__ . "/../../shared/js/shared.js");
  ?>
</script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/validation.js"></script>

<!-- Include google analytics -->
<?php include_once(__DIR__ . "/../analytics.php"); ?>
