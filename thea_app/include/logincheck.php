<?php
$curl = curl_init();
 
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_URL => 'http://localhost:8080/thea-backend/v1/users/login'
));
 
$response = curl_exec($curl);
curl_close($curl);
 
$response_obj = json_encode($response);
if ($response_obj->data->logged_in !== true)
{
  header('location: http://google.no');
  die;
}
?>