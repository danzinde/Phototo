<?php
    require 'config/dbconfig.php';
    $uid = $_COOKIE['oauth_id'];  

    $query = mysql_query('SELECT COUNT(participant_ID) from participant') or die(mysql_error());
    $numPpl = mysql_fetch_row($query)[0];

    $query = mysql_query('select participant.participant_ID, imageName, pplVoted, TRUNCATE(AVG(participant_image.score),0) as scoreMean, ('.$numPpl.'-pplVoted) as stillToVote from participant_image left join image on image.image_ID=participant_image.image_ID left join participant on participant.participant_ID=participant_image.participant_ID where participant.facebook_ID ="'.$uid.'" group by imageName   order by scoreMean DESC') or die(mysql_error());

    while($row = mysql_fetch_assoc($query)){
         $result[] = $row;
    }

    echo json_encode($result);
?>