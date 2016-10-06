<?php
/*
  This little script/page will force pages to reload when
  the user presses the back button.
*/

// Any valid date in the past
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");

// Always modified right now
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");

// HTTP/1.1
header("Cache-Control: private, no-store, max-age=0, no-cache, must-revalidate, post-check=0, pre-check=0");

// HTTP/1.0
header("Pragma: no-cache");
