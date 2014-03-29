
$(document).ready(function() {
    initialisation();
});

function initialisation() {

    var stage = document.getElementById('stage');
    
    menuContainer = document.createElement('div');
    menuContainer.id = 'menu_container';
    menuContainer.style.position = 'relative';
    stage.appendChild(menuContainer);
    menuContainer.style.width = stage.style.width;
    menuContainer.style.height = stage.style.height;

    /* 9 */
    var no = document.createElement('a');
    no.className = 'menu_item';
    no.id = '9';
    no.textContent = "9";
    no.setAttribute('href', 'game.php');
    no.setAttribute('onclick', "javascript:storeAnswer('9')");
    no.style.textDecoration = "none";
    no.style.color = "rgb(179, 179, 179)";
    menuContainer.appendChild(no);
    
    /* 8 */
    var yes = document.createElement('a');
    yes.className = 'menu_item';
    yes.id = '8';
    yes.textContent = "8";
    yes.setAttribute('href', 'game.php');
    yes.setAttribute('onclick', "javascript:storeAnswer('8')");
    yes.style.textDecoration = "none";
    yes.style.color = "rgb(179, 179, 179)";
    menuContainer.appendChild(yes);
}

function storeAnswer(answer) {
    $.ajax({
           type: 'POST',
           url: 'server/set_checkquestion.php?answer='+answer,
           dataType: 'json',
           async: false
       });

}