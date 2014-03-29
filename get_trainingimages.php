<?php
    require 'server/config/dbconfig.php';
    $uid = $_COOKIE['oauth_id'];  
    
    $query = mysql_query('SELECT didTraining FROM participant where facebook_ID = "'.$uid.'"') or die(mysql_error());
    $result = mysql_fetch_row($query)[0];
        
    if ($result == 1) {
        echo json_encode(null);
    } else {
        $imagesDir = './images/training/';
        $images = glob($imagesDir . '*.jpg', GLOB_BRACE);
        echo json_encode($images);
    }
?>



    