var menuContainer, gScore = 0;

// TODO: maybe change the way it appears
function createMenu() {
    
    menuContainer = document.createElement('div');
    menuContainer.id = 'menu_container';
    menuContainer.style.position = 'relative';
    stage.appendChild(menuContainer);
    menuContainer.style.width = stage.style.width;
    menuContainer.style.height = stage.style.height;

    // pop up about
    createAbout();
    
    // pop up stats
    createStats();
    
    /* About Button */
    var aboutButton = document.createElement('a');
    aboutButton.className = 'menu_item';
    aboutButton.id = 'aboutButton';
    aboutButton.style.width = "193px";
    aboutButton.style.height = "45px";
    aboutButton.style.lineHeight = "45px";
    aboutButton.style.top = "330px";
    aboutButton.style.left = "50%";
    aboutButton.style.marginLeft = "-100px";
    aboutButton.setAttribute('onclick', "javascript:sendPopUp('about')");
    aboutButton.textContent = "about";
    aboutButton.style.border = "2px solid rgb(134, 205, 77)";   
    aboutButton.style.color = "rgb(255, 255, 255)";
    aboutButton.style.background = "rgb(134, 205, 77)";
    menuContainer.appendChild(aboutButton);
    
    if (g_useFacebook) {

        /* Play Button */
        var playButton = document.createElement('a');
        playButton.className = 'menu_item';
        playButton.id = 'playButton';
        playButton.style.width = "193px";
        playButton.style.height = "45px";
        playButton.style.lineHeight = "39px";
        playButton.style.top = "270px";
        playButton.style.left = "50%"; 
        playButton.style.marginLeft = "-100px";
        playButton.setAttribute('href', url);
        playButton.textContent = "play";
        playButton.style.border = "2px solid rgb(0, 186, 251)";
        playButton.style.color = "rgb(255, 255, 255)";
        playButton.style.textDecoration = "none";
        playButton.style.background = "rgb(0, 186, 251)";
        menuContainer.appendChild(playButton);
        
        /* Invite Button */
        var inviteButton = document.createElement('a');
        inviteButton.className = 'menu_item';
        inviteButton.id = 'inviteButton';
        inviteButton.style.width = "193px";
        inviteButton.style.height = "45px";
        inviteButton.style.lineHeight = "45px";
        inviteButton.style.top = "450px";
        inviteButton.style.left = "50%";
        inviteButton.style.marginLeft = "-100px";
        inviteButton.setAttribute('onclick', 'javascript:sendInvite()');
        inviteButton.textContent = "invite";
        inviteButton.style.border = "2px solid rgb(221, 32, 103)";
        inviteButton.style.color = "rgb(255, 255, 255)";
        inviteButton.style.background = "rgb(221, 32, 103)";
        menuContainer.appendChild(inviteButton);
        
        /* Share Button */
        var inviteButton = document.createElement('a');
        inviteButton.className = 'menu_item';
        inviteButton.id = 'shareButton';
        inviteButton.style.width = "193px";
        inviteButton.style.height = "45px";
        inviteButton.style.lineHeight = "45px";
        inviteButton.style.top = "510px";
        inviteButton.style.left = "50%";
        inviteButton.style.marginLeft = "-100px";
        inviteButton.setAttribute('onclick', 'javascript:sendShare()');
        inviteButton.textContent = "share";
        inviteButton.style.border = "2px solid #FFD200";
        inviteButton.style.color = "rgb(255, 255, 255)";
        inviteButton.style.background = "#FFD200";
        menuContainer.appendChild(inviteButton);
    
        /* Stats Button */
        var statsButton = document.createElement('a');
        statsButton.className = 'menu_item';
        statsButton.id = 'statsButton';
        statsButton.style.width = "193px";
        statsButton.style.height = "45px";
        statsButton.style.lineHeight = "45px";
        statsButton.style.top = "390px";
        statsButton.style.left = "50%";
        statsButton.style.marginLeft = "-100px";
        statsButton.setAttribute('onclick', "javascript:sendPopUp('stats')");
        statsButton.textContent = "stats";
        statsButton.style.border = "2px solid rgb(253, 134, 0)";
        statsButton.style.color = "rgb(255, 255, 255)";
        statsButton.style.background = "rgb(253, 134, 0)";
        menuContainer.appendChild(statsButton);
        
        FB.getLoginStatus(function(response) {
            if (response.status == 'connected') {
                gPlayerFBID = response.authResponse.userID;
                welcomePlayer(gPlayerFBID);
            }
        });
    

    } else {
        welcomePlayer(g_useFacebook);
    }

  function welcomePlayer(uid) {

      var welcomeMsgContainer = document.createElement('div');
      welcomeMsgContainer.id = 'welcome_msg_container';
      menuContainer.appendChild(welcomeMsgContainer);

      if (g_useFacebook) {
          FB.api('/me?fields=first_name', function(response) {
                    var welcomeMsg = document.createElement('h1');
                    var welcomeMsgStr = 'Welcome, ' + response.first_name + '!';
                    welcomeMsg.innerHTML = welcomeMsgStr;
                    welcomeMsg.id = 'welcome_msg';
                    welcomeMsgContainer.appendChild(welcomeMsg);
    
                    var imageURL = 'https://graph.facebook.com/' + uid + '/picture?width=256&height=256';
                    var profileImage = document.createElement('img');
                    profileImage.setAttribute('src', imageURL);
                    profileImage.id = 'welcome_img';
                    profileImage.setAttribute('height', '148px');
                    profileImage.setAttribute('width', '148px');
                    welcomeMsgContainer.appendChild(profileImage);
          });
      } else {
          var welcomeMsg = document.createElement('h1');
          var welcomeMsgStr = 'Welcome!'
          welcomeMsg.innerHTML = welcomeMsgStr;
          welcomeMsg.id = 'welcome_msg';
          welcomeMsgContainer.appendChild(welcomeMsg);
          
          var instMsg = document.createElement('h1');
          var instMsgStr = 'Please login with your Facebook account.';
          instMsg.innerHTML = instMsgStr;
          instMsg.id = 'welcome_msg';
          welcomeMsgContainer.appendChild(instMsg);
    }
  }  
}

function createStats() {
    // popup
    var popup = document.createElement('div');
    popup.id = 'stats';
    popup.style.display = "none";
   
    // close x
    var boxclose = document.createElement('a');
    boxclose.id = 'closestats';
    boxclose.className = "boxclose";
    boxclose.setAttribute('onclick', "javascript:sendPopUp('stats')");
    
    // text
    var statsbox = document.createElement('div');
    var statstitle = document.createElement('h1');
    
    statsbox.style.width = "100%";
    statsbox.style.height = "70%";   
    statsbox.style.margin = "0px auto";  
    
    statstitle.textContent = "stats";
    statstitle.style.fontSize = "45px";
    statstitle.style.marginTop = "20px";
    statstitle.style.marginBottom = "20px";
    
    // scroll
    var statscroll = document.createElement('div');
    statscroll.id = 'inner-content-div-stats';
    statsbox.appendChild(statscroll);
    popup.appendChild(boxclose);
    popup.appendChild(statstitle);
    popup.appendChild(statsbox);
    
    /* inStats Button */
    var inStatsButton = document.createElement('div');
    inStatsButton.id = 'inStatsButton';
    inStatsButton.addClass = 'click-once';
    inStatsButton.setAttribute('onclick', "javascript:addContent()");
    popup.appendChild(inStatsButton);
    
    menuContainer.appendChild(popup);
    $.getJSON('server/get_stats.php', createContentPhotos);
}

function addContent(){
    
    $('#stats-table').remove();
    
    if ($('#inStatsButton').hasClass('click-once')) {
        $('#inStatsButton').removeClass('click-once');
        $.getJSON('server/get_stats.php', createContentPhotos);
    } else {
        $('#inStatsButton').addClass('click-once');
        $.getJSON('server/get_statsextra.php', createContentMore);
    }
}

function createContentPhotos(data) {
    // stats content
    var numColor = 2;
    var j = 1;
    var numElem;
    
    $('#inStatsButton').text("friends");
        
    var statsId = $('#inner-content-div-stats');
    statsId.append('<table id="stats-table"></table>');
    
    if (data == null) {
        numElem = 0;
        $('#stats-table').append('<tr id=row0 class="color'+j+' stats-row"></tr>');
        $('#row0').append('<td>Go play with your buddies first!</td>');
    } else {
        numElem = data.length;
    }
    
    for (var i = 0; i < numElem; i++) {
        
        if (j > numColor) {
            j = 1;
        } 
        
        var trId = 'row'+i;
        $('#stats-table').append('<tr id='+trId+' class="color'+(j++)+' stats-row"></tr>')
        $('#'+trId).append('<td><img class="mini" src="./images/dataset/'+data[i].imageName+'"/></td>');
        $('#'+trId).append('<td>'+data[i].scoreMean+'<span class="text-format"> stars</span></td>');
        $('#'+trId).append('<td>'+data[i].pplVoted+'<span class="text-format"> people graded</span></td>');
        $('#'+trId).append('<td class="white"><div class="white-bg"></div>'+
                           ''+data[i].stillToVote+'<span class="text-format"> left to grade</span></td>'); 
 
    }  

}

function createContentMore(data) {
    // stats content
    var numColor = 2;
    var j = 1;
    var numElem;
    
    $('#inStatsButton').text("photos");
    
    var statsId = $('#inner-content-div-stats');
    statsId.append('<table id="stats-table"></table>');
    
    if (data == null) {
        numElem = 0;
        $('#stats-table').append('<tr id=row0 class="color'+j+' stats-row"></tr>');
        $('#row0').append('<td>Go play with your buddies first!</td>');
    } else {
        numElem = data.length;
    }
    
    for (var i = 0; i < numElem; i++) {
        
        if (j > numColor) {
            j = 1;
        } 
        
        var trId = 'row'+i;
        $('#stats-table').append('<tr id='+trId+' class="color'+(j++)+' stats-row"></tr>');
        $('#'+trId).append('<td><img class="people" src="'+data[i].picture+'"/></td>');
        $('#'+trId).append('<td>'+data[i].score+'<span class="text-format"> points</span></td>');
        $('#'+trId).append('<td>'+data[i].imgVoted+'<span class="text-format"> photos graded</span></td>');
        $('#'+trId).append('<td class="white"><div class="white-bg"></div>'+
                           ''+data[i].imgStillToVote+'<span class="text-format"> still to grade</span></td>');   
    }  
}

function createAbout() {
    // popup
    var popup = document.createElement('div');
    popup.id = 'about';
    popup.style.display = "none";
   
    // close x
    var boxclose = document.createElement('a');
    boxclose.id = 'closeabout';
    boxclose.className = "boxclose";
    boxclose.setAttribute('onclick', "javascript:sendPopUp('about')");
    
    // text
    var aboutbox = document.createElement('div');
    var abouttitle = document.createElement('h1');
    var aboutinst = document.createElement('h1');
    
    aboutbox.id = "aboutbox";
    aboutbox.style.width = "94%";
    aboutbox.style.height = "74%";   
    
    abouttitle.textContent = "about";
    abouttitle.style.fontSize = "45px";
    abouttitle.style.marginTop = "20px";
    abouttitle.style.marginBottom = "20px";
    
    // scroll
    var aboutscroll = document.createElement('div');
    aboutscroll.id = 'inner-content-div-about';
    
    aboutbox.appendChild(aboutscroll);
    
    popup.appendChild(boxclose);
    popup.appendChild(abouttitle);
    popup.appendChild(aboutbox);
    
    menuContainer.appendChild(popup);
    
    $('#inner-content-div-about').append('<p>THIS RELEASE IS ONLY COMPATIBLE WITH GOOGLE CHROME!</p>');
    
    $('#inner-content-div-about').append('<br><p>Do “Instagram” filters make images prettier? Phototo was developed to investigate this and find out how the beauty of an image changes with different photographic filters.</p>');

    $('#inner-content-div-about').append('<br><p>You will see 5 sets of 4 images and we will ask you to give each image a score based on how beautiful you find it.</p>');

    $('#inner-content-div-about').append('<br><p>If you want to change the score of one of the images you can still drag it back to the main container where the images were in the first place or to the new score you would like to give it.</p>');
    
    $('#inner-content-div-about').append('<br><p>This experiment is divided in two parts:</p>');

    $('#inner-content-div-about').append('<br><p>(1) a TRAINING session to get you acquainted with the task and</p>');
    $('#inner-content-div-about').append('<br><p>(2) the main EXPERIMENT where your scores will be recorded.</p>');

    $('#inner-content-div-about').append('<br><p>This experiment is part of a scientific study on image aesthetics and using social networks for research. For more information, you can contact me via the message button.</p>');

    $('#inner-content-div-about').append('<br><p>Thank you for taking part in this gamified experiment!</p><br><br>');
    
     $('#inner-content-div-about').scroll(function() {
       if($('#inner-content-div-about').scrollTop() + $('#inner-content-div-about').height() > ($('#inner-content-div-about')[0].scrollHeight - 5) && $('#about').hasClass('begin')) {
           $('#about').removeClass("begin");    
           $('#closeabout').show();
               
       }
    });

}

// TODO: maybe change the way it appears
function sendInvite() {

    FB.ui({method: 'apprequests',
           title: 'Come and play Phototo!',
           message: 'I just played Phototo! Check it out!',
    }, fbCallback);

}

function createShare(data) {
    gScore = data[0];
}

function sendShare() {
    if (gScore) {
        FB.ui({ method: 'feed',
            link: 'https://apps.facebook.com/phototo_tud/',
            caption: 'I just got ' + gScore + ' points! Can you beat me?',
            picture: 'http://ii.tudelft.nl/~isabel/phototo_tud/images/logo.jpg',
            name: "Checkout this awesome game!"
        }, fbCallback);
    }
}

// TODO: maybe change the way it appears
function sendPopUp(windowname) {
    
    $('#'+windowname).fadeToggle();
        
     $('#inner-content-div-'+windowname).slimScroll({
        color: '#000',
        size: '12px',
        height: 'auto',
        alwaysVisible: true
    });
}

function fbCallback(response) {
    console.log(response);
}