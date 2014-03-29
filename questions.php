<?php
    session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Phototo | Questions</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      <link href="scripts/questions-style.css" rel="stylesheet" type="text/css">
      
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js"></script>
      
      <script src="scripts/jquery.jCounter-0.1.4.js"></script> 
      
      <!-- fonts -->
      <link href='https://fonts.googleapis.com/css?family=Dosis' rel='stylesheet' type='text/css'>
      
      <script src="scripts/questions.js"></script>
      <script type="text/javascript">
        window.history.forward();
        function noBack() { window.history.forward(); }
      </script>
  </head>
  <body onload="noBack();"
    onpageshow="if (event.persisted) noBack();" onunload="">
      <div id="fb-root"></div>
      <script src="//connect.facebook.net/en_US/all.js"></script>

      <div id="overlay-back"></div> 
         <div id="overlay"></div>
      <div id="topbar">
          <h1 id="question">What did you see in the last image?</h1>
      </div>
      <div id="stage" ></div>
      <div id="score">
          <p id="value"></p>
          <div id="life"></div>
          <div id="outside" class="timer wrapper" >
              <div id="left" class="timer circle"></div>
              <div id="right" class="timer circle"></div>
          </div>
      </div>
  </body>
</html>
