//var request = require('request');


function addVideo(){
    var windowTitle= document.title;
    var video = document.createElement('video');
        video.src = 'testResource/1.mp4';
        video.autoplay = true;

    if (windowTitle=='Mentor Toolbar'){
        var newContainer = document.createElement('div');
        newContainer.id = 'container_';
                //$(newContainer).addClass("video-box embed-responsive embed-responsive-4by3");
        $(newContainer).addClass("video-box");
        
        $(video).addClass("embed-responsive-item");
        
        newContainer.appendChild(video);
        var container=document.getElementById("screenBox");                
        container.appendChild(newContainer);      
        video.id="ninjaScreen";
        addCanvasZone();
        showMentorFeedbackZone();
    }
    else{

        video.id = 'localScreen';
        var container=document.getElementById("localScreenBox");
        
	    container.appendChild(video);
    }
}


function highlight(){
   var c=document.getElementById("myCanvas");
   var ctx=c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.moveTo(20,10);
    ctx.lineTo(100,150);
    ctx.closePath();
    ctx.stroke();
    c.textContent='changed';
}
