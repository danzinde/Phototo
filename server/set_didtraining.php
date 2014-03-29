<?php
    require 'config/dbconfig.php';
    $uid = $_COOKIE['oauth_id'];

    $query = mysql_query('UPDATE participant SET didTraining = 1 WHERE facebook_ID = "'.$uid.'"') or die(mysql_error());
?>