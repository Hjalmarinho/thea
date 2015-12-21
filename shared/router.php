<?php

function starts_with($haystack, $needle)
{
  // search backwards starting from haystack length characters from the end
  return $needle === "" || strrpos($haystack, $needle, -strlen($haystack)) !== FALSE;
}

$headers = apache_request_headers();
if (!array_key_exists('redirect-source', $headers))
{
  die('Missing source');
}
else if (!array_key_exists('redirect-method', $headers))
{
  die('Missing method');
}

$source = $headers['redirect-source'];
$method = $headers['redirect-method'];

// Get cURL resource
$curl = curl_init();

if ($method == 'post')
{
  curl_setopt($curl, CURLOPT_POST, 1);

  $data = file_get_contents('php://input');
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
}
else if ($method == 'get' || $method == 'rawget')
{
  // No need to set any options here
}
else if ($method == 'put')
{
  $data = file_get_contents('php://input');

  curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT'); 
  curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Length: ' . strlen($data))); 
  curl_setopt($curl, CURLOPT_POSTFIELDS, $data); 
}
else
{
  die('Unsupported method');
}

$request_headers = array();
if (array_key_exists('Authorization', $headers))
  $request_headers[] = 'Authorization: ' . $headers['Authorization'];

if (array_key_exists('Content-Type', $headers))
  $request_headers[] = 'Content-Type: ' . $headers['Content-Type'];

curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_URL, $source);
curl_setopt($curl, CURLOPT_USERAGENT, 'Redirector, sir!');
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

curl_setopt($curl, CURLOPT_HTTPHEADER, $request_headers);
curl_setopt($curl, CURLOPT_VERBOSE, 1);
curl_setopt($curl, CURLOPT_HEADER, 1);

// Send the request & save response to $resp
$resp = curl_exec($curl);
$header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);

// Close request to clear up some resources
curl_close($curl);

// Then, after your curl_exec call:
$header = substr($resp, 0, $header_size);
$body = substr($resp, $header_size);

foreach (explode("\n", $header) as $line)
{
  if (starts_with($line, 'Content-Type'))
  {
    header($line);
  }
}

echo $body;
