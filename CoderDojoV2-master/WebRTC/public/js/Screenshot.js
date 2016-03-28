/*
******************************************************************************************
This file is for static feedback including: 
  capture sharing screen box
  initialize canvas for containing captured image
  add function buttons on canvas
******************************************************************************************
*/

var ratio;
var ctx;

/*
*********************************************
when start screen sharing, edit zone which contains 
    'take screenshot' button is added under sharing window
**********************************************
*/   
function addCanvasZone(){
        var CanvasZone = document.getElementById('CanvasZone');
        if (CanvasZone==null){
           CanvasZone = document.createElement('div'); 
           CanvasZone.id="CanvasZone"; 
           console.log("Add CanvasZone");
        }   
        $('#screenBox').append(CanvasZone);
        
    }
    
 /*
*********************************************
adjust canvas resolution to provide high quality
    screenshot
**********************************************
*/    
function PIXEL_RATIO() {
    var ctx1 = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx1.webkitBackingStorePixelRatio ||
              ctx1.mozBackingStorePixelRatio ||
              ctx1.msBackingStorePixelRatio ||
              ctx1.oBackingStorePixelRatio ||
              ctx1.backingStorePixelRatio || 1;
    console.log("ratio:"+ dpr / bsr);
    return dpr / bsr;
}


function createHiDPICanvas(can, w, h) {
    ratio = PIXEL_RATIO(); 
    can.width = w * ratio;
    can.height = h * ratio;
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
}


/*
*********************************************
take screenshot when button is clicked
**********************************************
*/           
var screenshot=function(){

        var video = document.getElementById("ninjaScreen");
          // create canvas to hold image
        var canvas = document.createElement('canvas');
        var w=$(document).width()*0.25;
        var h=w*(video.videoHeight/video.videoWidth);
        //var w=$('#screenBox').width();
        //var h=$('#screenBox').height();
          //Create canvas with the device resolution.
        createHiDPICanvas(canvas, w, h);
        canvas.id="myCanvas"; 
        ctx = canvas.getContext("2d");
        ctx.mozImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        
        
          //draw screenshot into canvas
        ctx.drawImage(video ,0,0,video.videoWidth,video.videoHeight,0,0,canvas.width/ratio,canvas.height/ratio);
        createCanvasZone(canvas,ctx,video);
        console.log(' video width: '+ video.videoWidth+" height: "+ video.videoHeight);	
		console.log('done');
        canvas.textContent=canvas.toDataURL("img/png");
        //console.log(canvas.textContent);
      }

/*
*********************************************
add buttons (send, clear and close) to canvas
**********************************************
*/
function createCanvasZone(canvas,ctx,video){
    
    var BtnZone = document.createElement('div');
    BtnZone.id="canvasBtnZone";
    
    var clear_btn = document.createElement('input');
        clear_btn.type = "button";
        clear_btn.id = 'clearCanvas';
        clear_btn.className = "canvas_btn";
        clear_btn.value='Clear';
        clear_btn.onclick=function(){clearArea(ctx)};
        
    var close_btn = document.createElement('input');
        close_btn.type = "button";
        close_btn.className = "canvas_btn";
        close_btn.id = 'closeCanvas';
        close_btn.value='Close';
        close_btn.onclick=function(){BtnZone.remove();};
    

    
    var send_btn = document.createElement('input');
        send_btn.type = "button";
        send_btn.id = 'sendscreenShot';
        send_btn.className = "canvas_btn";
        send_btn.value='Send screenshot';
        send_btn.onclick=function(){sendScreenshot()};
        
   
    $('#CanvasZone').append(BtnZone);
    $('#canvasBtnZone').append(clear_btn);
    $('#canvasBtnZone').append(close_btn);
    $('#canvasBtnZone').append(send_btn);    
    $('#canvasBtnZone').append(canvas);  
    
    InitThis(ratio,canvas,video);
}	  


