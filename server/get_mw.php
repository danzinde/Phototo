<?php
    require 'config/dbconfig.php';
    $uid = $_COOKIE['oauth_id'];  

    $query = mysql_query('select mw_ID, count(participant_image_id) as images, participant.participant_ID from participant left join participant_image on participant_image.participant_ID=participant.participant_ID where participant.facebook_ID ="'.$uid.'"') or die(mysql_error());
    $arr = mysql_fetch_row($query);
    $mw_id = $arr[0];
    $images = $arr[1];
    $participant_id = $arr[2];

    if ($mw_id != null) {
        $campaign_nr = floor(intval($images)/4/5);
        $salt = "SDFHe3g";
        $payment_code = sha1($mw_id+$campaign_nr+$salt);
        
        $query = mysql_query("INSERT INTO payment(payment_ID, paymentCode, participant_ID, campaign_nr) VALUES ('', '$payment_code', '$participant_id', '$campaign_nr')") or die(mysql_error());
        echo json_encode($payment_code);
    } else {
        echo json_encode(null);
    }
?>