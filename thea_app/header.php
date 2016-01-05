<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Thea 2.0</title>

		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.8/semantic.min.js"></script>

		<script>
		<?php
			// Include shared code
			require_once(__DIR__ . "/site_info.php");
			require_once(__DIR__ . "/../shared/js/shared.js");
			require_once(__DIR__ . "/../shared/js/api_handler.js");
		?>
		</script>

		<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.8/semantic.min.css" />

		<script src="js/jquery.tablesort.min.js"></script>
		<link rel="stylesheet" type="text/css" href="css/style.css" />

		<?php // Include React ?>
		<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script> -->
		<script src="js/react.js"></script>
		<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script> -->
		<script src="js/JSXTransformer.js"></script>
		<?php // Include shared javascript ?>
		<script src="js/shared.js"></script>
		<?php
			// Include page specific js 
			$file = basename($_SERVER["SCRIPT_FILENAME"], ".php");
			echo "<script src='js/" . $file . ".js'></script>";	    
		?>


	</head>
	<body>
		<div class="ui sidebar inverted vertical menu">
		  	<?php require 'include/menu.php';?>
		</div>
		<!--
		<div class="ui black big launch right button" id="menubutton">
			<i class="content icon"></i>
			<span class="text">Menu</span>
		</div>-->
		<div class="pusher">
			  	
		  	<div class="ui grid">
		  		<div class="computer only three wide column full height" style="min-height:100vh;" >
					<div class="ui vertical inverted sticky menu" >
						<?php require 'include/menu.php';?>
					</div>
		  		</div>	  

					<div class="ui thirteen wide column margin-top-30 fade-in" id="context">
