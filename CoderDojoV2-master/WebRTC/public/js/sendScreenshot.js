/*
******************************************************************************************
This file is for static feedback including: 
  send out screenshot
******************************************************************************************
*/

function sendScreenshot(){
	    var canvas= document.getElementById("myCanvas");
	    if (!canvas){
		 console.log(' Canvas Null!');
	    }
		var image = canvas.toDataURL("img/png");
        
          // inform server to broadcast message
		socket.emit('screenshot', {image: image, name: getParameterByName('user'),url:"/img/mentor.png"});
		
          // append image to chat window
		var img = "<img style='width:25px;' src='/img/mentor.png'>";
		var snapshot= "<img style='width:30%;' class='fancybox' src='"+image+"'>";		
		var input = "<p>"+img+""+snapshot +"</p>";
		$(chatWindow).append(input);
		$(message).val('');
		chatWindow.scrollTop = chatWindow.scrollHeight;
        
          // start drawing when mouse is pressed down
        add_ZoomIn();
        var canvasZone= document.getElementById("canvasBtnZone");
		canvasZone.remove();

      }
