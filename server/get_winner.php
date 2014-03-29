<?php
    require 'config/dbconfig.php';
    $uid = $_COOKIE['oauth_id'];  
    
    $query = mysql_query('SELECT count(imageName) FROM image left join participant_image on participant_image.image_ID=image.image_ID left join participant on participant.participant_ID=participant_image.participant_ID WHERE participant.facebook_ID = "'.$uid.'"') or die(mysql_error());
    $result = mysql_fetch_row($query)[0];
    echo $result;
?>