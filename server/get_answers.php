<?php
    require 'config/dbconfig.php';
    $uid = $_COOKIE['oauth_id'];  
    
    $query = mysql_query('SELECT answer, answerCorrect FROM answer left join image on image.image_ID=answer.image_ID left join participant_image on participant_image.image_ID=image.image_ID left join participant on participant_image.participant_ID=participant.participant_ID where participant.facebook_ID = "'.$uid.'" ORDER BY participant_image_id DESC LIMIT 0, 4') or die(mysql_error());

    while($row = mysql_fetch_assoc($query)){
         $result[] = $row;
    }
    // still not finished
    echo json_encode($result);
?>