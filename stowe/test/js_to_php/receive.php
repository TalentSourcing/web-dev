<?php

$json_str = json_decode($_GET['obj']);

$file = fopen("output.txt", "w") or die("unable to open file!");
fwrite($file, $json_str->name . "\n");
fwrite($file, $json_str->age);
fclose($file);

echo "Success";
// echoing can be used to send response data!  Would be retrieve in js through xmlhttp.responseText
// in the callback function

?>