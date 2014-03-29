<?php
    $mw_id = $_GET['mw_id'];
    
    if (!empty($mw_id)){
        setcookie('mw_id',$mw_id,time() + (86400 * 7));
    } else {
         $mw_id = $_COOKIE['mw_id'];
    }

    require_once 'server/fb-php-sdk/facebook.php';
    require_once 'server/config/fbconfig.php';
    require_once 'server/config/functions.php';

    $facebook = new Facebook(array(
         'appId'  => APP_ID,
         'secret' => APP_SECRET,
         'cookie' => true,
    ));

    $user = $facebook->getUser();
    $app_url = 'http://apps.facebook.com/phototo_tud/';
    $scope = 'user_hometown,publish_actions';
    
    if ($user) {
        try {
            $user_profile = $facebook->api('/me');
            $picture_profile = $facebook->api('/me/?fields=picture.width(100).height(100)');
            
        } catch (FacebookApiException $e) {
            error_log($e);
            $user = null;
        }
        
        if (!empty($user_profile )) {
            $username = $user_profile['name'];
            $uid = $user_profile['id'];
            $hometown = $user_profile['hometown']['name'];
            $picture = $picture_profile['picture']['data']['url'];
            $user = new User();
            $userdata = $user->checkUser($uid, $username, $hometown, $picture, $mw_id);
            if(!empty($userdata)){
                
                if ($userdata == "null") {
                    header('Location: upsi.php');
                } else {
                    session_start();
                    $_SESSION['id'] = $userdata['id'];
                    $_SESSION['oauth_id'] = $uid;
                    $_SESSION['username'] = $userdata['username'];
                    $_SESSION['user_hometown'] = $userdata['user_hometown'];
                    $_SESSION['picture'] = $userdata['picture'];
                }
            } 
            setcookie('oauth_id',$uid,time() + (86400 * 7));
        } else {
            session_start();
        }
    } else {
        $loginUrl = $facebook->getLoginUrl(array(
           'scope' => $scope,
           'redirect_uri' => $app_url,
         ));
        print('<script> top.location.href=\'' . $loginUrl . '\'</script>');
    }
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="https://www.facebook.com/2008/fbml">
  <head>
    <title>Phototo | Menu</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      <link href="scripts/index-style.css" rel="stylesheet" type="text/css">
      
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js"></script>
      
      <script src="scripts/jquery.jCounter-0.1.4.js"></script>
      <script src="scripts/jquery.slimscroll.min.js"></script>
      
      <!-- fonts -->
      <link href='https://fonts.googleapis.com/css?family=Lobster&subset=all' rel='stylesheet' type='text/css'>
      <link href='https://fonts.googleapis.com/css?family=Dosis' rel='stylesheet' type='text/css'>
      <link href='https://fonts.googleapis.com/css?family=Fresca' rel='stylesheet' type='text/css'>
  </head>
  <body>
      <div id="fb-root"></div>
      <script src="//connect.facebook.net/en_US/all.js"></script>
      <script src="scripts/core.js"></script>
      <script src="scripts/index.js"></script>
      <script>
        var appId = '<?php echo $facebook->getAppID() ?>';
        var g_useFacebook = true;
        FB.init({
            appId: appId,
            status: true,
            xfbml: true,
            frictionlessRequests: true,
            cookie: true
        });

        FB.getLoginStatus(function(response) {
            uid = response.authResponse.userID ? response.authResponse.userID : null;
            if (response.status != 'connected') {
                g_useFacebook = false;
            }
        });
        $.getJSON("server/get_checkquestion.php", isNewUser);  
      </script>
      <div id="topbar">
          <div id="logo">Phototo</div>
      </div>
      <div id="stage" ></div>
      <div class="clearfix"> </div>
  </body>
</html>