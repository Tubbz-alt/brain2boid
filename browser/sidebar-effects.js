/**
 * Created by Stefanie on 14.05.2015.
 */

$(document).ready(function(){
    //hide sidebar
    var sidebar = $('div.sidebar');//more than one
    var sidebarButton =  $('button.sidebar-effect'); //more than one
    var outerWidth = sidebar.outerWidth();
    sidebar.css('right', -outerWidth);

    //fontawesome icon
    var arrow = $('.fa.fa-angle-left');

    /** Show and hide sidebar with animation **/
    sidebarButton.on('click', function(){
        var btn = this;
        var btnIdx;
        sidebarButton.each(function(idx, el){
            if(el === btn){
                btnIdx = idx;
                $(el).parent('.sidebar-show').css('z-index', 10);
            }else{
                $(el).parent('.sidebar-show').css('z-index', 1);
            }
        });
        //which button was clicked?
        //var btnIdx = sidebarButton.index(this);
        var sb = $(sidebar[btnIdx]); //corresponding sidebar
        //hidden sidebar
        if(sb.css('display') === "none"){
            //bring sidebar to front
            sb.css('z-index', 10);
            //unhide sidebar
            sb.show();
            //animate sidebar
            sb.animate({
                right: "0px"
            }, 500, function(){
                //animation complete
            });
            //animate button

            outerWidth = sb.outerWidth();
            $(this).parent().animate({
                right : outerWidth - 2
            }, 510, function(){
                //animation complete
            });

            //rotate font awesome arrow to the right
            $(arrow[btnIdx]).animateRotate(0, 180, 500, 'linear');
        }//showing sidebar
        else {
            //animate sidebar
            outerWidth = sb.outerWidth();
            sb.animate({
                right: - outerWidth +5 + 'px'
            }, 520, function(){
                //animation complete
                sb.hide();//hide sidebar completely
            });

            //animate button
            $(this).parent().animate({
                right : '-10px'
            }, 500, function(){
                //animation complete
            });

            //rotate fa arrow back
            $(arrow[btnIdx]).animateRotate(180, 0, 500, 'linear');
        }
    });

    /*** On Window resize ***/
    $( window ).resize(function() {
        sidebar.each(function(idx, el){
            if($(el).css('right') !== '0px'){
                //hidden sidebar
                outerWidth = $(el).outerWidth();
                $(el).css('right', -outerWidth+'px');
                $(sidebarButton[idx]).parent().css('right', '-10px');
            }else{
                //displaying sidebar
                outerWidth = $(el).outerWidth();
                $(el).css('right', '0px');
                $(sidebarButton[idx]).parent().css('right', $(el).outerWidth() - 12 +'px');
            }
        });

    });
});

//Quelle: http://stackoverflow.com/questions/15191058/css-rotation-cross-browser-with-jquery-animate
$.fn.animateRotate = function(startAngle, endAngle, duration, easing, complete){
    return this.each(function(){
        var elem = $(this);

        $({deg: startAngle}).animate({deg: endAngle}, {
            duration: duration,
            easing: easing,
            step: function(now){
                elem.css({
                    '-moz-transform':'rotate('+now+'deg)',
                    '-webkit-transform':'rotate('+now+'deg)',
                    '-o-transform':'rotate('+now+'deg)',
                    '-ms-transform':'rotate('+now+'deg)',
                    'transform':'rotate('+now+'deg)'
                });
            },
            complete: complete || $.noop
        });
    });
};