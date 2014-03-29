<?php
    require 'config/dbconfig.php';

    $query = mysql_query('SELECT distinct picture, participant.score, count(participant_image.participant_id) as imgVoted, (360-count(participant_image.participant_id)) as imgStillToVote from participant left join participant_image on participant.participant_ID=participant_image.participant_ID where participant.score > 0 group by participant.participant_id order by participant.score desc') or die(mysql_error());
    while($row = mysql_fetch_assoc($query)){
         $result[] = $row;
    }

    echo json_encode($result);
?>