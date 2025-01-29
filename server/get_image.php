<?php

$file_path = $argv[1];

if (file_exists($file_path)) {
  $image_data = file_get_contents($file_path);
  echo base64_encode($image_data);
} else {
  echo "Error: Image not found.";
}

?>