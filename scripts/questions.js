var anscorrect, indcorrect, score;

function createExcellent() {
    
    $('#overlay, #overlay-back').fadeIn(-1); 
    $("#overlay").append('<p id="title">Excellent!</p>');
    $("#overlay").append('<p id="leave">(Click to close)</p>');
    
    $("#overlay").addClass("begin");
        
    $("#overlay").click(function() {
        var $this = $(this);
        if ($this.hasClass("begin")) {
            // already been clicked once, hide it
            $("#title").remove();
            $("#leave").remove();
            $('#overlay, #overlay-back').fadeOut(); 
            $this.hide();
            
            setTimeout(function() {
                $('#outside').addClass('actionwrapper');
                $('#left').attr('data-anim','left');
                $('#right').attr('data-anim','right');
                
                 $('#left').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', 
                                function(e) {
                                    setTimeout("window.location.replace('final.php');", 2000);
                                });
            }, 500);
        } 
    });
    $('#overlay, #overlay-back').fadeIn(); 
}

function createAnswers(data) {
    
    for (var i=0;i<4;i++) {
        if (data[i].answerCorrect == '1') {
            indcorrect = i;
            anscorrect = data[i].answer;
            break;
        }
    }
    
    var stage = document.getElementById('stage');
    
    menuContainer = document.createElement('div');
    menuContainer.id = 'menu_container';
    menuContainer.style.position = 'relative';
    stage.appendChild(menuContainer);
    menuContainer.style.width = stage.style.width;
    menuContainer.style.height = stage.style.height;

    /* Answer A */
    var ansA = document.createElement('div');
    ansA.className = 'menu_item';
    ansA.id = 'ans1';
    ansA.style.lineHeight = "39px";
    ansA.textContent = data[0].answer;
    ansA.style.marginTop = "20px";
    ansA.style.color = "rgb(255, 255, 255)";
    menuContainer.appendChild(ansA);
    
    /* Answer B */
    var ansB = document.createElement('div');
    ansB.className = 'menu_item';
    ansB.id = 'ans2';
    ansB.style.lineHeight = "45px";
    ansB.textContent = data[1].answer;
    ansB.style.marginTop = "20px";
    ansB.style.color = "rgb(255, 255, 255)";
    menuContainer.appendChild(ansB);
    
    /* Answer C */
    var ansC = document.createElement('div');
    ansC.className = 'menu_item';
    ansC.id = 'ans3';
    ansC.style.lineHeight = "45px";
    ansC.textContent = data[2].answer;
    ansC.style.marginTop = "20px";
    ansC.style.color = "rgb(255, 255, 255)";
    menuContainer.appendChild(ansC);
    
    /* Answer D */
    var ansD = document.createElement('div');
    ansD.className = 'menu_item';
    ansD.id = 'ans4';
    ansD.style.lineHeight = "45px";
    ansD.style.marginTop = "20px";
    ansD.textContent = data[3].answer;
    ansD.style.color = "rgb(255, 255, 255)";
    menuContainer.appendChild(ansD);
   
    ifCorrect();
}

function ifCorrect() {

    $('.menu_item').click(function() {
        var aux = "click-once";
        var ansId = $(this).attr("id");
        
        if ($(this).text() != anscorrect && !($('#'+ansId).hasClass("click-once"))) {
            $('#'+ansId).addClass('wrongAns');
            $('#ans'+(indcorrect+1)).addClass('rightAns');
            
        } else if ($(this).text() == anscorrect && !($('#'+ansId).hasClass("click-once"))) {
            $(this).addClass('rightAns');
            
             $.ajax({ 
                type: "POST", 
                url: 'server/set_score.php?score='+(parseInt(score,10)+10), 
                dataType: "json", 
                async: false
            });
        }
        
        $('.menu_item').addClass('click-once');
        $('#score').css('display','none');
        
        setTimeout("window.location.replace('final.php');", 2000);
    });  
    
}

function createScore(data) {
    score = data;
    $('#value').text(score);
}

$(document).ready(function() {  
    $.getJSON('server/get_answers.php', createAnswers);
    $.getJSON('server/get_score.php', createScore);
    createExcellent();
});