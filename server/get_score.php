<?php
    require 'config/dbconfig.php';
    $uid = $_COOKIE['oauth_id'];

    $query = mysql_query('SELECT score FROM participant WHERE facebook_ID = "'.$uid.'"') or die(mysql_error());
    $result = mysql_fetch_row($query);
    echo json_encode($result);
?>