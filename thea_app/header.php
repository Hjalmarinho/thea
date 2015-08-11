<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Hello React</title>
	    <?php // Include Jquery; ?>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<link rel="stylesheet" href="css/style.css"></link>
	    <?php // Include Semantic UI ?>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.min.js"></script>
		<!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.min.css"></link> -->
	    <?php // Include React ?>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/JSXTransformer.js"></script>
		<?php // Include shared javascript ?>
		<script src="js/shared.js"></script>
		<?php // Include page specific js ?>
	    <?php

		$file = basename($_SERVER["SCRIPT_FILENAME"], ".php");
	    	echo "<script src='js/" . $file . ".js'></script>";	    ?>
	</head>
	<body>
	<div class="container">
	<div class="ui grid">
		<div class="three wide column">

			<?php require 'include/menu.php';?>
		</div>
		<div class="thirteen wide column">