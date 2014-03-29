<?php
    session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Phototo | Game</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      <link href="scripts/game-style.css" rel="stylesheet" type="text/css">
      
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js"></script>
      
      <script src="scripts/jquery.jCounter-0.1.4.js"></script> 
      
      <!-- fonts -->
      <link href='https://fonts.googleapis.com/css?family=Dosis' rel='stylesheet' type='text/css'>
      
      <script src="scripts/game.js"></script>
      <script type="text/javascript">
        window.history.forward();
        function noBack() { window.history.forward(); }
      </script>
  </head>
  <body onload="noBack();"
    onpageshow="if (event.persisted) noBack();" onunload="">
      <div id="fb-root"></div>
      <script src="//connect.facebook.net/en_US/all.js"></script>
      <div id="topbar">
          <h1 id="instruction"></h1>
      </div>
      <div id="gameboard">
        <div id="overlay-back"></div> 
        <div id="overlay"></div> 
          <div id="img_container"> 
              <div id="mainTop"></div> 
              <div id="mainBottom"></div> 
          </div>  
          <div id="score_container"> 
              <div id="score_bar"> 
                  <h1 id="bad">Bad</h1>
                  <div id="box1" class="scorebox">
                      <div id="score1">
                        <div id="top1"></div> 
                        <div id="bottom1"></div> 
                      </div>
                  </div>
                  <div id="box2" class="scorebox">
                      <div id="score2">
                        <div id="top2"></div> 
                        <div id="bottom2"></div> 
                      </div>
                  </div>
                  <div id="box3" class="scorebox">
                      <div id="score3">
                        <div id="top3"></div> 
                        <div id="bottom3"></div> 
                      </div>
                  </div>
                  <div id="box4" class="scorebox">
                      <div id="score4">
                        <div id="top4"></div> 
                        <div id="bottom4"></div> 
                      </div>
                  </div>
                  <div id="box5" class="scorebox">
                      <div id="score5">
                        <div id="top5"></div> 
                        <div id="bottom5"></div> 
                      </div>
                  </div>
                  <h1 id="excellent">Excellent</h1>
              </div> 
          </div>  
      </div>
      <div id="end"></div>
  </body>
</html>
