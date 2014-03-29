var payment = null;

$(document).ready(function() {  
        $.getJSON('server/get_mw.php', givePayment);
});

function givePayment(data) {
    if (data != null) {
        payment = data; 
        finalMW();
    } else {
        payment = null; 
        $.getJSON('server/get_winner.php', whereToGo);
    }  
}

function whereToGo(data) {
    if (data == '360') {
        final();
    }
    else {
        initialisation();  
    }
}

function initialisation() {
    
    var stage = document.getElementById('stage');
    
    $('#question').text('More images?');
    
    menuContainer = document.createElement('div');
    menuContainer.id = 'menu_container';
    menuContainer.style.position = 'relative';
    stage.appendChild(menuContainer);
    menuContainer.style.width = stage.style.width;
    menuContainer.style.height = stage.style.height;
    
    /* NO */
    var no = document.createElement('a');
    no.className = 'menu_item';
    no.id = 'no';
    no.textContent = "NO";
    no.style.textDecoration = "none";
    no.style.color = "rgb(0, 186, 251)";
    menuContainer.appendChild(no);
    
    $("#no").click(function() {
        location.reload(true);
        window.location = 'index.php';
    });
    
    /* OK */
    var ok = document.createElement('a');
    ok.className = 'menu_item';
    ok.id = 'ok';
    ok.textContent = "OK";
    ok.setAttribute('href', "game.php");
    ok.style.textDecoration = "none";
    ok.style.color = "rgb(0, 186, 251)";
    menuContainer.appendChild(ok);
    
    /* payment code */
    if (payment != null) {
        $("#extra").append('<p id="payment"><br>Save your payment code:  '+payment+'</p>')
    }
}

function final() {
    
    $("body").css("background", "rgb(253, 134, 0)");
    
    $('#overlay').append('<p id="title">Congratulations!</p>');
    $("#overlay").append('<p id="subtitle">You have completed the game!</p>');

    $("#overlay").append('<p id="leave"><br>(Click to close)</p>');
        
    $("#overlay").click(function() {
        location.reload(true);
        window.location = 'index.php';
    });

}

function finalMW() {
    
    $("body").css("background", "rgb(253, 134, 0)");
    
    /* payment code */
    $('#overlay').append('<p id="title">Thanks for participating!</p>');
    $("#overlay").append('<p id="subtitle">Please submit this payment code at Microworkers:</p>');
    $("#overlay").append('<p id="payment"><br>##'+payment+'##</p>');

}
