<?php
    require 'config/dbconfig.php';
    $answer = $_GET['answer'];
    $uid = $_COOKIE['oauth_id'];

    $query = mysql_query('UPDATE participant SET checkQuestion = "'.$answer.'" WHERE facebook_ID = "'.$uid.'"') or die(mysql_error());
?>