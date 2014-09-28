$(function() {
    var pageData = {
        'title': 'PK结果',
        'back_url': 'http://www.baidu.com',
    };

    initHeader(pageData);
    initMenu();
    initCloud();
    bindEvents();

    cloudDown();

    initPage();

    
});
$(window).on('load', function() {
    // testCountUp();
    showCorrect(20);
    showTime(500);
    showCombo(11);
    showTotal(2960);
    animeSocial();
});
function dummyAnimate(sel, sAnim, func) {
    var $sel = $(sel);
    $sel.addClass(sAnim);
    var wait = setTimeout(function() {
        $sel.removeClass(sAnim);
    }, 1300);
    if (func instanceof Function) {
        $sel.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', func);
    };
}
function showCorrect(n) {
    setTimeout(function() {
        $('.correct').html(n).removeClass('hidden');
        dummyAnimate('.correct', 'animated fadeIn');
    }, 200);
}
function showTime(n) {
    setTimeout(function() {
        $('.time').html(n).removeClass('hidden');
        dummyAnimate('.time', 'animated fadeIn');
    }, 1200);
    
}
function showCombo(n) {
    setTimeout(function() {
        $('.combo').html(n).removeClass('hidden');
        dummyAnimate('.combo', 'animated fadeIn');
    }, 2200);
}
function showTotal(n) {
    setTimeout(function() {
        $('.total').removeClass('hidden');
        totalCountUp();
    }, 3200);
}
function animeSocial(n) {
    setTimeout(function() {
        dummyAnimate('.btns a:last', 'animated tada');
    }, 5200);
}
function initPage() {
    $('.btns a:last').on('click', function() {
        $('.overlay').removeClass('hidden');
        dummyAnimate('.shares', 'animated bounceInUp');
        return false;
    });
    $('.overlay').on('click', function() {
        
        dummyAnimate('.shares', 'animated bounceOutDown', function() {
            $('.overlay').addClass('hidden');
        });

        return false;
    });

    $('.shares_wrapper').on('click', function(e) {
        e.stopPropagation();
    });

    $.getScript('http://v3.jiathis.com/code/jia.js',function(){
        
    }) ;
}

function totalCountUp() {
    var options = {
      useEasing : true, 
      useGrouping : true, 
      separator : ',', 
      decimal : '.' 
    }
    var demo = new countUp($('.total').get(0), 0, 3690, 0, 2, options);
    demo.start();
}