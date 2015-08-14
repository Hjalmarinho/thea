<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Thea 2.0</title>
	    <?php // Include Jquery; ?>
		<script src="js/jquery.min.js"></script>
	    <?php // Include Semantic UI ?>
		<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.min.js"></script> -->
		<script src="js/semantic.min.js"></script>
		<script src="js/tablesort.js"></script>
		<link rel="stylesheet" href="css/semantic.min.css"></link>
		<link rel="stylesheet" type="text/css" href="css/style.css" />
	    <?php // Include React ?>
		<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script> -->
		<script src="js/react.js"></script>
		<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script> -->
		<script src="js/JSXTransformer.js"></script>
		<?php // Include shared javascript ?>
		<script src="js/shared.js"></script>
		<?php // Include page specific js ?>
		<script src="js/api_handler.js"></script>

	    <?php
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
		  		<div class="computer only three wide column" >
					<div class="ui vertical inverted menu" >
						<?php require 'include/menu.php';?>
					</div>
		  		</div>	  

					<div class="ui thirteen wide column margin-top-30 fade-in" id="context">
				