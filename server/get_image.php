<?php

error_reporting(0);
ini_set('display_errors', 0);


$file_path = $argv[1];

echo getcwd() . "\n";

if (file_exists($file_path)) {
  $image_data = file_get_contents($file_path);
  echo base64_encode($image_data);
} else {
  echo "Error: Image not found.";
}

//ONLY MEANT FOR DEVELOPMENT! DO NOT INCLUDE THIS IN PRODUCTION BUILDS!
if (file_exists($file_path)) {
  ob_start();
  include($file_path);
  ob_end_clean();
  ob_clean();
} 

?>