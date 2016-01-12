<?php

ignore_user_abort(true);
$content = file_get_contents(__DIR__ . "/../settings.json");
$jsonObject = json_decode($content);

function join_paths()
{
  $paths = array();

  foreach (func_get_args() as $arg)
  {
    if ($arg !== '') { $paths[] = $arg; }
  }

  return preg_replace('#/+#','/',join('/', $paths));
}

$source = filter_input(INPUT_GET, 'source');
$name = filter_input(INPUT_GET, 'name');
if (is_null($source))
  die('Missing "source".');
else if (is_null($name))
  die('Missing "name".');

$path = join_paths($jsonObject->backend->file_store->directory, 'temp', $source);
if (!file_exists($path))
  die('File not found.');

header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename="' . $name . '"');
header('Expires: 0');
header('Cache-Control: must-revalidate');
header('Pragma: public');
header('Content-Length: ' . filesize($path));
readfile($path);
unlink($path);

die();