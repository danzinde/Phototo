<?php
    session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Phototo | Final</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      <link href="scripts/final-style.css" rel="stylesheet" type="text/css">
      
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js"></script>
      
      <script src="scripts/jquery.jCounter-0.1.4.js"></script> 
      
      <!-- fonts -->
      <link href='https://fonts.googleapis.com/css?family=Dosis' rel='stylesheet' type='text/css'>
      
      <script src="scripts/final.js"></script>
      <script type="text/javascript">
        window.history.forward();
        function noBack() { window.history.forward(); }
      </script>
  </head>
  <body onload="noBack();"
    onpageshow="if (event.persisted) noBack();" onunload="">
      <div id="fb-root"></div>
      <script src="//connect.facebook.net/en_US/all.js"></script>
         <div id="overlay"></div>
      <div id="topbar">
          <h1 id="question"></h1>
      </div>
      <div id="stage"></div>
  </body>
</html>
      