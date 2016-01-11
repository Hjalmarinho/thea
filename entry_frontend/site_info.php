<?php

// Read the root url from settings file.
$content = file_get_contents(__DIR__ . "/../settings.json");
$jsonObject = json_decode($content);
define('ROOT_URL', $jsonObject->frontend->entry_frontend_base_url);
