/*
******************************************************************************************
This file is for general feedback including: 
  bind fancybox features to sent screenshot in chat window (zoom-in feature)
  when the session is finished, hide feedback zone and reset pointing icons position
******************************************************************************************
*/

/*
*********************************************
bind fancybox features to sent screenshot in chat window (zoom-in feature)
this is mainly completed by fancybox built-in functions
**********************************************
*/
 function add_ZoomIn(){
        var addToAll = false;
        var gallery = false;
        var titlePosition = 'inside';
        $(addToAll ? 'img' : 'img.fancybox').each(function(){
            var $this = $(this);
            var title = $this.attr('title');
            var src = $this.attr('data-big') || $this.attr('src');
            var a = $('<a href="#" class="fancybox"></a>').attr('href', src).attr('title', title);
            $this.wrap(a);
        });
        if (gallery)
            $('a.fancybox').attr('rel', 'fancyboxgallery');
        $('a.fancybox').fancybox({
            titlePosition: titlePosition,
            type: 'image'
        });
 }
 
/*
*********************************************
when the session is finished, hide feedback zone and reset pointing icons position
**********************************************
*/
function hideFeedbackZone(){
    $('div.feedback-options').insertAfter('.afterscreen');
    $('div.feedback-options').css('display','none');
    $('.point-icon').css('display','none');
    var NinjaScreen = $('#localScreen').offset();
    var y_distance = $('#localScreen').height();
    var reset_x = NinjaScreen.left+"px";
    var reset_y = y_distance+NinjaScreen.top+"px";
    $('.follower').css({
        'top':reset_x,
        'left':reset_y,
        }); 
} 

