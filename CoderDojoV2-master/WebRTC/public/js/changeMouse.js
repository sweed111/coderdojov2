window.onload = function(){   
var target= document.getElementById("follower");
socket.on('RTPointing', function(data) {
/* 	  target.style.scrollX= event.pageX;
	  target.style.scrollY= event.pageY; */

      target.style.left = data.pX + "px";
      target.style.top = data.pY + "px"; 

 });
}