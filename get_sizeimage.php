<?php
    $image = $_GET['image'];
    list($width, $height) = getimagesize($image);
    $array = array($width, $height);
    echo json_encode($array);
?>


