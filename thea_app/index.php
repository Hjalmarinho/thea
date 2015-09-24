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
		<script src="js/user.js"></script>

		<?php
		$file = basename($_SERVER["SCRIPT_FILENAME"], ".php");
		echo "<script src='js/" . $file . ".js'></script>";	    
		?>
		
		 <style type="text/css">
		    body {
		      background-color: #f4f4f4;
		    }
		    body > .grid {
		      height: 100%;
		    }
		    .image {
		      margin-top: -100px;
		    }
		    .column {
		      max-width: 450px;
		    }
		  </style>

	</head>
	<body>

		<div class="ui middle aligned center aligned grid">
			<div class="column">
				<h2 class="ui image header">
						Velkommen til Thea 2.0
				</h2>
				<form class="ui large form">
					<div class="ui stacked segment">
						<div class="field">
							<div class="ui left icon input">
								<i class="user icon"></i>
								<input type="text" name="email" id="email" placeholder="E-post">
							</div>
						</div>
						<div class="field">
							<div class="ui left icon input">
								<i class="lock icon"></i>
								<input type="password" name="password" id="password" placeholder="Passord">
							</div>
						</div>
						<div class="ui fluid large blue button" onclick="doLogin();">Logg inn</div>
					</div>

					<div class="ui error message"></div>

				</form>
			</div>
		</div>

	</body>
</html>