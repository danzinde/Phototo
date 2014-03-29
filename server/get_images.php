<?php
    require 'config/dbconfig.php';
    $uid = $_COOKIE['oauth_id'];  
    $question = $_GET['question'];  

    $querywithquestion = 'SELECT question, imageName FROM image where imageName Not in (SELECT imageName FROM image left join participant_image on participant_image.image_ID=image.image_ID left join participant on participant.participant_ID=participant_image.participant_ID WHERE participant.facebook_ID = "'.$uid.'") and question = 1 order by image.pplVoted ASC';
    $querywithoutquestion = 'SELECT question, imageName FROM image where imageName Not in (SELECT imageName FROM image left join participant_image on participant_image.image_ID=image.image_ID left join participant on participant.participant_ID=participant_image.participant_ID WHERE participant.facebook_ID = "'.$uid.'") and question is null and filter_id is null order by image.pplVoted ASC';
    
    if ($question == 'yes') {
        
        $query = mysql_query($querywithquestion) or die(mysql_error());
    
        while($row = mysql_fetch_assoc($query)){
             $result[] = $row;
        }
        if (!empty($result)) {
            // still not finished
            echo json_encode($result);
        } else {
            $query = mysql_query($querywithoutquestion) or die(mysql_error());
            
            while($row = mysql_fetch_assoc($query)){
                 $result[] = $row;
            }
            if (!empty($result)) {
                // still not finished
                echo json_encode($result);
            } else {
                echo json_encode('win');
            }
        }
    } else {
        
        $query = mysql_query($querywithoutquestion) or die(mysql_error());
    
        while($row = mysql_fetch_assoc($query)){
             $result[] = $row;
        }
        if (!empty($result)) {
            // still not finished
            echo json_encode($result);
        } else {
            $query = mysql_query($querywithquestion) or die(mysql_error());
            
            while($row = mysql_fetch_assoc($query)){
                 $result[] = $row;
            }
            if (!empty($result)) {
                // still not finished
                echo json_encode($result);
            } else {
                echo json_encode('win');
            }
        }
    }
?>