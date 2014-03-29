var myImages = [];
var imgWidth, imgHeight, imgHeightAlone;
var training, training2, typeFile, count, question = null; 
var start, elapsed, imageTooBig, observe = false;

$(document).ready(function() {  
    $.getJSON('server/get_winner.php', isWinner);
});

function needsTraining(data) {

    if (data == null) {
        // experiment
        $.getJSON('server/get_images.php', fillimages);
        training = false;
        begin();
    } else {
        // training
        training = true;
        fillimages(data);
        begin();
    }
}

function isWinner(data) {
    if (data == '360') {
        var url = "final.php";  
        window.location.replace(url);
    } else {
        count = 0;
        $.getJSON('get_trainingimages.php', needsTraining);
    }
}


function begin() {
    $("#instruction").text('Give each image a score based on how beautiful you find it');
    
    if (training == true) {    
        $("#overlay").append('<img id="one" src="./images/arrow1.png"/>'+
                             '<p id="inst1">1 - Follow the instructions above</p>');
        $("#overlay").append('<p id="inst2">2 - Click on each image to enlarge and inspect it carefully</p>'+ 
                             '<img id="two" src="./images/arrow2.png"/>');
        $("#overlay").append('<p id="inst3">3 - Score an image by dragging it to one of the boxes below</p>'+
                             '<img id="three" src="./images/arrow3.png"/>');
        $("#overlay").append('<img id="four" src="./images/arrow4.png"/>'+
                             '<p id="inst4">4 - To undo, drag the image back out of the box</p>');       
        $("#overlay").addClass("instructions");
        
        // already been clicked once, hide it
        $("#overlay").unbind("click");
        $("#overlay").click(function() {
                var $this = $(this);
                    if ($this.hasClass("instructions")) {
                        
                        setTimeout(function(){ 
                    
                            $("#inst1").remove();
                            $("#inst2").remove();
                            $("#inst3").remove();
                            $("#inst4").remove();
                            
                            $("#one").remove();
                            $("#two").remove();
                            $("#three").remove();
                            $("#four").remove();
                        
                            $('#overlay').removeClass('instructions').addClass('training'); 
                            if ($('#title').length == 0 ) {
                                $("#overlay").append('<p id="title">The training will start!</p>');
                            }
                              
                        }, 3000);
                        
                    } else if ($this.hasClass("training")) {
                    
                        $("#title").remove();
                        $("#inst5").hide();
                        
                        $('#overlay, #overlay-back').fadeOut(); 
                        $("#instruction").text('Click on each image to enlarge and inspect it carefully');
                        $('#score_bar').hide();
                    }
        });  
    } else {
        
        $("#overlay").append('<p id="title">The experiment will start!</p>');

        $("#overlay").unbind("click");
        $("#overlay").click(function() {
            $("#title").remove();
            $("#inst5").hide();
            $('#overlay, #overlay-back').fadeOut(); 
            $("#instruction").text('Click on each image to enlarge and inspect it carefully');
            $('#score_bar').hide();
        });
    }
    $("#end").append('<p id="inst5">(Click anywhere to close)</p>');
    $('#overlay, #overlay-back').fadeIn(); 
}

function fillimages(data) {
    var item;
    
    if (data == 'win') {
        
        var url = "final.php";  
        window.location.replace(url);
        return;
        
    } else if (training == true && count == 0) {
        item = data[0];
        training2 = data[4];
        
    } else if (training == true) {
        item = training2;
        
    } else {
        var i = Math.floor(Math.random()*data.length);
        item = './images/dataset/'+data[i].imageName;
        question = data[i].question;
    }
    
    var cases = [
    	'Hefe.jpg',
    	'Earlybird.jpg',
    	'XProII.jpg',
    ];
            
    $.getJSON('get_sizeimage.php?image='+item, getSize);

    myImages[0] = item;
    
    if (item.indexOf('MarkDekker_') >= 0 || item.indexOf('Google_') >= 0 || training == true) {
        typeFile = '.jpg';
    } else {
        typeFile = '.bmp';
    }
  
    str = item.split(typeFile); 

    myImages[1] = str[0] + cases[0];
    myImages[2] = str[0] + cases[1];
    myImages[3] = str[0] + cases[2];

    shuffle(myImages);
}

function getSize(data) {
    var a, b, size;
    var iW = data[0];
    var iH = data[1];
    
    a = Math.round((iW-100)/100);
    b = Math.round(iH/100);
    imageTooBig = false;

    if (iW == iH) {
        // width > height
        size = 'class="squared"';
        
    } else if (a == b || iW < iH) {
        size = 'class="portrait"';
        imageTooBig = true;
        
    } else if (iW > iH) {
        size = 'class="landscape"';
    }

    placeImages(size);
}

function setImgClick(draggableId) {
    
    $('img').click(function() {
        // first time this is clicked, mark it
        var smallImage = $(this);
        var largeReference = smallImage.attr('src');
        $("#overlay").append('<img id="largeImage" src=""/>');
        $("#largeImage").attr('src',largeReference);
        
        if (imageTooBig == true) {
            $("#largeImage").addClass('large');
        }
        
        $("#overlay").addClass("clicked-once");
        $("#inst5").show();
        
        $("#overlay").unbind("click");
        $("#overlay").click(function() {
            var $this = $(this);
            if ($this.hasClass("clicked-once")) {
                // already been clicked once, hide it
                $("#largeImage").remove();
                $("#inst5").hide();
                if ($("#title").length != 0) {
                    // it exists
                    $("#title").remove();
                }
                $('#overlay, #overlay-back').fadeOut(); 
                
                if (!$("#image1").hasClass('start') && !$("#image2").hasClass('start') && 
                    !$("#image3").hasClass('start') && !$("#image4").hasClass('start') && observe == true) {
                    var elapsed_ms = new Date() - start; 
                    elapsed = Math.round(elapsed_ms / 1000);
                    setSize();
                    dragAllowed(); 
                    observe = false;
                }
            }
        });
         
        if ($(this).hasClass('start')) {
            $(this).removeClass('start');
            
        }
        $('#overlay, #overlay-back').fadeIn(); 
    });   
    start = new Date();
}

function setSize() {
    
    var a = $('#image1').width();
    var d = $('#image1').height();
    
    imgWidth = a/2;
    imgHeight = d;
    imgHeightAlone = 15;
}

function dragAllowed() {
    
    setImgDrag();
    
    setDraggable('img', imgHeight, imgWidth);
    
    $('#topbar').addClass('putback');
    $('#img_container').addClass('putback');
    $('#end').addClass('putback');
    $('#bad').addClass('putback');
    $('#excellent').addClass('putback');
    
    setImgDrop();
    $('#score_bar').show();
    $("#instruction").text('Score an image by dragging it to one of the boxes below');
}

function setImgDrag() {
    
    var containmentTop = $("#gameboard").offset().top;
    var containmentBottom = ($("#gameboard").outerHeight() +  $("#gameboard").offset().top - $('img').outerHeight()) ;
    var containmentRight =  ($("#gameboard").outerWidth() +  $("#gameboard").offset().left - $('img').outerWidth());
    var containmentLeft = $("#gameboard").offset().left;
    
    $('img').draggable({ cursor: "move",
                        opacity: 0.5,
                        scroll: false,
                        refreshPositions: true,
                        zIndex: 100,
                        revert: function(event, ui) {
                            $(this).data("uiDraggable").originalPosition = {
                                top : 0,
                                left : 0
                            };
                            if (!($("#score_bar").find($(this)).length != 0)) {
                                $(this).removeClass('mini');
                            }
                            return !event;
                        },
                        containment: [containmentLeft,containmentTop,containmentRight,containmentBottom],
                        stack: "div",
                        start: function(event, ui) {
                            $(this).addClass('mini');
                        }
                       });  
}

function checkIfAllScored() {

    if (training != true) {
        var scores = [];
        for (var i=0;i<4;i++) {
            var aux = $('#image'+(i+1)).parent().attr('id');
            scores[i] = aux.substr(aux.length - 1); 
            myImages[i] = myImages[i].split('/dataset/')[1]; 
        }
    }
    
    $("#image1").remove();
    $("#image2").remove();
    $("#image3").remove();
    $("#image4").remove();

    if ($("#overlay").hasClass("training") && count == 0) {
        count++;
        fillimages("0");
        $("#instruction").text('Click on each image to enlarge and inspect it carefully');
        $('#score_bar').hide();
        
    } else if ($("#overlay").hasClass("training") && count == 1) {
        
        $.getJSON('server/get_images.php', fillimages);
        count = 0;
        $("#overlay").removeClass("training");
        
        $("#overlay").append('<p id="title">The experiment will start!</p>');
        $("#inst5").show();
        
        $("#overlay").unbind("click");
        $("#overlay").click(function() { 
            // already been clicked once, hide it
            $("#title").remove();
            $("#inst5").hide();
            $('#overlay, #overlay-back').fadeOut();     
            $("#instruction").text('Click on each image to enlarge and inspect it carefully');
            $('#score_bar').hide();
        });
        
        $.ajax({
           type: 'POST',
           url: 'server/set_didtraining.php?',
           dataType: 'json',
           async: false
       });

        training = false;
        $('#overlay, #overlay-back').fadeIn(); 
        
    } else if (count < 5) {
        count++;
        var images = null;
        
        $.ajax({ 
            type: "POST", 
            url: 'server/set_imagesscores.php?images=' + myImages.join(',') + '&scores=' + scores.join(',') +'&time='+elapsed, 
            dataType: "json", 
            async: false
        });
        
        if (question != null) {
            var url = "questions.php";  
            window.location.replace(url);
        } else {
            if (count == 4) {
                $.getJSON('server/get_images.php?question=yes', fillimages);
                
            } else {
                $.getJSON('server/get_images.php', fillimages);
            }
            
            $("#instruction").text('Click on each image to enlarge and inspect it carefully');
            $('#score_bar').hide();
        }
        
    } 
}

function setScoreBoxDrop(draggableId, num) {
    var element = $("#"+draggableId).detach();
    
    if (draggableId == 'image1') {
                  
        if ($("#top"+num).has("#image2").length != 0) {
            // it exists
            var element2 = $("#image2").detach();
            $("#top"+num).append(element);
            $("#top"+num).append(element2);
            
            if (!($("#image1").hasClass('right-side-space'))) {
                $("#image1").addClass('right-side-space')
            }
        } else {
            $("#top"+num).append(element);
            $("#image1").removeClass('right-side-space'); 
        }
        setDraggable('#image2', imgHeightAlone, imgWidth);
    } else if (draggableId == 'image2') {
        
        $("#top"+num).append(element);
        
        if ($("#top"+num).has("#image1").length != 0) {
            // it exists
            $("#image1").addClass('right-side-space'); 
        } else {
            $("#image1").removeClass('right-side-space'); 
        }
        setDraggable('#image1', imgHeightAlone, imgWidth);
    } else if (draggableId == 'image3') {
        
        if ($("#bottom"+num).has("#image4").length != 0) {
            // it exists
            var element2 = $("#image4").detach();
            $("#bottom"+num).append(element);
            $("#bottom"+num).append(element2);
            
            if (!($("#image3").hasClass('right-side-space'))) {
                $("#image3").addClass('right-side-space');
            }
        } else{
            $("#bottom"+num).append(element);
            $("#image3").removeClass('right-side-space'); 
        }
        setDraggable('#image4', imgHeightAlone, imgWidth);
    } else if (draggableId == 'image4') {
        
        $("#bottom"+num).append(element);
        
        if ($("#bottom"+num).has("#image3").length != 0) {
            // it exists
            $("#image3").addClass('right-side-space'); 
        } else {
            $("#image3").removeClass('right-side-space'); 
        }
        setDraggable('#image3', imgHeightAlone, imgWidth);
    }
    
    // disable
    setDraggable('#'+draggableId, 25, 25);
    $('#'+draggableId).attr('style', 'position: relative;');
    $('#'+draggableId).off('click');
    
    setTimeout(function() {
        if ($("#score_bar").find("#image1").length != 0 && $("#score_bar").find("#image2").length != 0 && 
            $("#score_bar").find("#image3").length != 0 && $("#score_bar").find("#image4").length != 0) {
            checkIfAllScored(); 
        }
    }, 3000);

}

// #img_container
function putBackDrop(draggableId) {
    var element = $("#"+draggableId).detach();
    
    if (draggableId == 'image1') {

        if ($("#mainTop").has("#image2").length != 0 ) {
            // it exists
            var element2 = $("#image2").detach();
            $("#mainTop").append(element);
            $("#mainTop").append(element2);
            
            if (!($("#image1").hasClass('right-side-space'))) {
                $("#image1").addClass('right-side-space')
            }
            
            setDraggable('#image2', imgHeight, imgWidth);
            setDraggable('#'+draggableId, imgHeight, imgWidth);
        } else {
            $("#mainTop").append(element);
            $("#image1").removeClass('right-side-space'); 
            setDraggable('#'+draggableId, imgHeightAlone, imgWidth);
        }
    } else if (draggableId == 'image2') {
        
        $("#mainTop").append(element);
        
        if ($("#mainTop").has("#image1").length != 0) {
            // it exists
            $("#image1").addClass('right-side-space'); 
            
            setDraggable('#image1', imgHeight, imgWidth);
            setDraggable('#'+draggableId, imgHeight, imgWidth);
        } else {
            setDraggable('#'+draggableId, imgHeightAlone, imgWidth);
        }
        
    } else if (draggableId == 'image3') {
        
        if ($("#mainBottom").has("#image4").length != 0 ) {
            // it exists
            var element2 = $("#image4").detach();
            $("#mainBottom").append(element);
            $("#mainBottom").append(element2);
            
            if (!($("#image3").hasClass('right-side-space'))) {
                $("#image3").addClass('right-side-space')
            }
            
            setDraggable('#image4', imgHeight, imgWidth);
            setDraggable('#'+draggableId, imgHeight, imgWidth);
        } else {
            $("#mainBottom").append(element);
            $("#image3").removeClass('right-side-space'); 
            setDraggable('#'+draggableId, imgHeightAlone, imgWidth);
        }
    } else if (draggableId == 'image4') {
        
        $("#mainBottom").append(element);
        
        if ($("#mainBottom").has("#image3").length != 0) {
            // it exists
            $("#image3").addClass('right-side-space'); 
            
            setDraggable('#image3', imgHeight, imgWidth);
            setDraggable('#'+draggableId, imgHeight, imgWidth);
        } else {
            setDraggable('#'+draggableId, imgHeightAlone, imgWidth);
        }
    }
    
    // enable click
    $('#'+draggableId).removeClass('mini');
    $('#'+draggableId).attr('style', 'position: relative;');
    setImgClick(draggableId);
    
}

function setImgDrop() {
    $('.scorebox').droppable({ tolerance: "pointer",
                                drop: function( event, ui ) {
                                    var draggableId = ui.draggable.attr("id");
                                    var droppableId = $(this).attr("id");
                                    var num = droppableId.split('box')[1];
                                    
                                    if (draggableId == 'image1' || draggableId == 'image2' || 
                                        draggableId == 'image3' || draggableId == 'image4') {
        
                                        setScoreBoxDrop(draggableId, num);
                                    }
                                }
                              });
    
    $('.putback').droppable({ tolerance: "pointer", 
                                    drop: function( event, ui ) {
                                        var draggableId = ui.draggable.attr("id");
                                         
                                        if (draggableId == 'image1' || draggableId == 'image2' || 
                                            draggableId == 'image3' || draggableId == 'image4') {
                                                putBackDrop(draggableId);
                                        }
                                    }
                                  }); 
}

function placeImages(size) {
   
    $('#mainTop').append('<img id="image1" '+size+' src="'+myImages[0]+'"/>');
    $('#mainTop').append('<img id="image2" '+size+' src="'+myImages[1]+'"/>');
    
    $('#mainBottom').append('<img id="image3" '+size+' src="'+myImages[2]+'"/>');
    $('#mainBottom').append('<img id="image4" '+size+' src="'+myImages[3]+'"/>');
    
    $('#image1').addClass('right-side-space');
    $('#image3').addClass('right-side-space');
    
    setImgClick("");    
     
    $('img').addClass('start');
    observe = true;
}

function setDraggable(elem, setHeight, setWidth) { 
    
    var containmentTop = $("#gameboard").offset().top;
    var containmentBottom = ($("#gameboard").outerHeight() +  $("#gameboard").offset().top - setHeight) ;
    var containmentRight =  ($("#gameboard").outerWidth() +  $("#gameboard").offset().left - setWidth);
    var containmentLeft = $("#gameboard").offset().left;
    
    $(elem).draggable( "option", "cursorAt", {top: setHeight, left: setWidth});
    $(elem).draggable( "option", "containment", [containmentLeft,containmentTop,containmentRight,containmentBottom]);
    $(elem).draggable( "option", "revert", function(event, ui) {
                            $(this).data("uiDraggable").originalPosition = {
                                top : 0,
                                left : 0
                            };   
                            if (!($("#score_bar").find($(this)).length != 0)) {
                                $(this).removeClass('mini');
                            }
                            return !event;
                        });
}   

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
