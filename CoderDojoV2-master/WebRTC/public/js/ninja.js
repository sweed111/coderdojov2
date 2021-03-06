var chatPanel = document.getElementById("chatPanel");
var avatarBox = document.getElementById("imgAvatar");
var nameField = document.getElementById("ninjaName");
var mentorField = document.getElementById("mentorName");

var firstPhase = document.getElementById("chatFirstPhase");
var secondPhase = document.getElementById("chatSecondPhase");
var thirdPhase = document.getElementById("chatThirdPhase");

var opts = {};
opts.localCamBox = document.getElementById("localCamBox");
opts.remoteCamBox = document.getElementById("remoteCamBox");
opts.screenBox = document.getElementById("localScreenBox");

var firstPhaseButton = document.getElementById("firstPhaseButton");
var firstPhaseText = document.getElementById("firstPhaseText");

var secondPhaseButton = document.getElementById("secondPhaseButton");
var shareButton = document.getElementById("shareButton");
var finishButton = document.getElementById("finishButton");

var socket = io();
var webrtc;
var tempRoom;

/*
	Function to handle the receiving of ice server info.
	This the data packet should be exactly what is returned by xirsys concerning ICE connection details. Hence, all the data will be in the data.d field.
*/
function handleIceServers_N(data) {
	console.log(data);
	console.log(data.d);
	webrtc = webrtcInit(data.d, opts);
}

function firstPhaseClick() {
	socket.emit('requestHelp', {ninja: getParameterByName('user')});
	$(firstPhaseButton).hide();
	$(firstPhaseText).text('You are waiting in queue to be helped');
}

/*	Function to handle the changing of room.
	The data should include fields defining the name of the room and the name of ninja who will be joining 
*/
function handleRoomChange_N (data) {
	console.log('Changing to room: ' + data.room);
	tempRoom = data.room;
	$(mentorField).text(data.mentor);
	$(firstPhase).hide();
	$(secondPhase).show();
	$(opts.localCamBox).empty();
	$(chatWindow).empty();
	webrtc.startLocalVideo();
}

function shareButtonClick() {
	$(shareButton).text('Change Shared Window')
    if ($(shareButton).text()=='Change Shared Window'){
        webrtc.stopScreenShare();
    }
	
    console.log("click button");
	webrtc.shareScreen(function (err) {
		if (err) {
			console.log('Share Screen Error: ',err);
			$(shareButton).text('Share Window')
		}
	});
    showNinjaFeedbackZone();
}

function showNinjaFeedbackZone(){
    $('div#Ninja-feedback-options').insertAfter('#localScreen');
    $('div#Ninja-feedback-options').css('display','block');
    
      
}

function secondPhaseClick() {
	$(firstPhase).hide();
	$(secondPhase).hide();
	$(shareButton).text('Share Window')
	$(thirdPhase).show();
	document.getElementById("localCamBox").childNodes[0].muted = true;
	room = tempRoom;
	webrtc.testReadiness();
}

function handleMentorDisconnect (data) {
	webrtc.leaveRoom();
	webrtc.stopLocalVideo();
	webrtc.stopScreenShare();
	$(firstPhase).show();
	$(secondPhase).hide();
	$(thirdPhase).hide();
	$(firstPhaseButton).show();
	$(firstPhaseText).text("To chat with the mentor, click on 'Chat' button");
	alert("Oops! Some rogue ninja seems to have messed with something and disconnected your mentor.");
}

function finishChatClick() {
	$(firstPhase).show();
	$(secondPhase).hide();
	$(thirdPhase).hide();
	$(firstPhaseButton).show();
	$(firstPhaseText).text("To chat with the mentor, click on 'Chat' button");
	webrtc.leaveRoom();
	webrtc.stopLocalVideo();
	webrtc.stopScreenShare();
	socket.emit('leaving', {});
}

window.onbeforeunload = function(){
	if (webrtc) {
		webrtc.stopLocalVideo();
		webrtc.leaveRoom();
		webrtc.connection.disconnect();
		webrtc = null;
	}
}

var oldWidth=$(window).width();
var oldHeight=$(window).height();

$('#chatWindow').on('click','img.fancybox',function(){
    var newWidth=window.screen.width*0.5;
    var newHeight=window.screen.height;
    window.resizeTo(newWidth,newHeight);
});

$('body').on('click','#fancybox-close',function(){
    window.resizeTo(oldWidth,oldHeight);
});

$('#enlargeButton').on('click',function(){
    var newWidth=window.screen.width*0.5;
    var newHeight=window.screen.height;
    window.resizeTo(newWidth,newHeight);
});
$('#shrinkButton').on('click',function(){
    window.resizeTo(oldWidth,oldHeight);
});

socket.on('iceServers',handleIceServers_N);
firstPhaseButton.onclick = firstPhaseClick;
socket.on('changeRoom', handleRoomChange_N);
shareButton.onclick = shareButtonClick;
secondPhaseButton.onclick = secondPhaseClick;
socket.on('otherDisconnect', handleMentorDisconnect);
finishButton.onclick = finishChatClick;

socket.on('test_addVideo', addVideo);

$.ajax({
	dataType: "json",
	error: function(jqXHR, textStatus, errorThrow) {
		alert('AHHHH');
	},
	success: function(data, textStatus, jqXHR) {
		$(nameField).text(data.pseudonym);
		socket.emit('iceRequest',{ninja : data.pseudonym});
	},
	type: "GET",
	url: "/users/signed_in"
});

$(localCamBox).hide();
$(firstPhase).show();
$(secondPhase).hide();
$(thirdPhase).hide();
$(nameField).text(getParameterByName('user'));
$('#collapseTwo').hide();
//$('#collapseTwo').collapse("hide");
//socket.emit('iceRequest', {ninja : getParameterByName('user')});



