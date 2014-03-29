<?php
    require 'config/dbconfig.php';
    $uid = $_COOKIE['oauth_id'];
    $images = explode(",", $_GET['images']);
    $scores = explode(",", $_GET['scores']);
    $time = $_GET['time'];
//    echo json_encode(array('images'=>$images,'scores'=>$scores));

    $query = mysql_query('SELECT participant_ID FROM participant WHERE facebook_ID = "'.$uid.'"') or die(mysql_error());
    $participant_id = mysql_fetch_row($query)[0];

    $images_id = [];
    $increment = [];
    for ($x=0;$x<4;$x++) {
        $query = mysql_query('SELECT image_ID, pplVoted FROM image WHERE imageName = "'.$images[$x].'"') or die(mysql_error());
        while($row = mysql_fetch_assoc($query)){
             $result[] = $row;
            
        }
    }

    for ($x=0;$x<4;$x++) {
        $query = mysql_query('UPDATE image SET pplVoted = "'.(++$result[$x]['pplVoted']).'" WHERE image_ID = "'.$result[$x]['image_ID'].'"') or die(mysql_error());
    }

    for ($x=0;$x<4;$x++) {
        $query = mysql_query('INSERT INTO participant_image(participant_image_ID, participant_ID, image_ID, time, score) VALUES ("", "'.$participant_id.'", "'.$result[$x]['image_ID'].'", "'.$time.'", "'.$scores[$x].'")') or die(mysql_error());
    }
?>