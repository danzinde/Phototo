<?php
    require 'dbconfig.php';
    
    class User {
        function checkUser($uid, $username, $hometown, $picture, $mw_id) 
        {
            $query = mysql_query("SELECT participant_ID, mw_ID FROM `participant` WHERE facebook_ID = '$uid'") or die(mysql_error());
            $result = mysql_fetch_row($query);
            if (!empty($result)) {
                # User is already present
                if (!empty($result[1])) {
                    # Check if was already paid
                    $query = mysql_query('SELECT count(payment_ID) FROM payment WHERE participant_ID = "'.$result[0].'"') or die(mysql_error());
                    $payment = mysql_fetch_array($query);
                    if ($payment == "6") {
                        return "null";
                    } 
                }
            } else {
                if (empty($mw_id)) {
                    #user not present. Insert a new Record
                    $query = mysql_query("INSERT INTO participant(participant_ID, facebook_ID, username, hometown, picture, mw_ID, score, checkQuestion, didTraining) VALUES ('', $uid, '$username', '$hometown', '$picture', null, '0', null, '0')") or die(mysql_error());
                } else {
                    # user not present. Check how many mws we have
                    $query = mysql_query('select count(mw_ID) as mws from participant where mw_ID is not null') or die(mysql_error());
                    $mws = mysql_fetch_row($query)[0];
                    # Check if the mw already exists
                    $query = mysql_query("SELECT * FROM `participant` WHERE mw_ID = '$mw_id'");
                    $result = mysql_fetch_array($query);
                    
                    if ($mws >= 270 || !empty($result)) {
                        return "null";
                    } else {
                        #user not present. Insert a new Record
                        $query = mysql_query("INSERT INTO participant(participant_ID, facebook_ID, username, hometown, picture, mw_ID, score, checkQuestion, didTraining) VALUES ('', $uid, '$username', '$hometown', '$picture', '$mw_id', '0', null, '0')") or die(mysql_error());
                        
                        $query = mysql_query("SELECT * FROM `participant` WHERE facebook_ID = '$uid'");
                        $result = mysql_fetch_array($query);
                        return $result;
                    }
                }
            }
        }
    }
?>