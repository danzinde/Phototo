
var stage, url;

window.onload = function () {
    setTimeout(function () {
    window.scrollTo(0, 1);
    }, 500);
}

// GO!
window.addEventListener('load', function () {
    stage = document.getElementById('stage');
}, true);

// GO in 14ms!
window.addEventListener('load', function () {
  setTimeout(function () {
    init();
  }, 14)
}, true);

function init() {
    $.getJSON('server/get_score.php', createShare);
    createMenu();
    if (url == "check.php") {
        sendPopUp('about');
        $('#about').addClass('begin');
        $('#closeabout').hide(); 
    }
}

function isNewUser(data) {
    if (data[0] == null) {
        // yes
        url = "check.php";   
    } else {
        // no
        url = "game.php";  
    }
}

function BlockMove(event) {
  // Tell Safari not to move the window.
  event.preventDefault() ;
}