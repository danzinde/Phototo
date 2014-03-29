<?php
    require 'config/dbconfig.php';
    $uid = $_COOKIE['oauth_id'];
    $score = $_GET['score'];

    $query = mysql_query('UPDATE participant SET score = "'.$score.'" WHERE facebook_ID = "'.$uid.'"') or die(mysql_error());
?>