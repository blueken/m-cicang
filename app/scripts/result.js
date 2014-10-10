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
    showResult();
    showCorrect(20);
    showTime(500);
    showCombo(11);
    showTotal(2960);
    animeSocial();
});


function showResult() {
    setTimeout(function() {
        $('.winorlose').removeClass('hidden');
        dummyAnimate('.winorlose', 'animated zoomIn');
    }, 100);
}
function showCorrect(n) {
    setTimeout(function() {
        $('.correct').html(n).removeClass('hidden');
        dummyAnimate('.correct', 'animated fadeIn');
    }, 1500);
}
function showTime(n) {
    setTimeout(function() {
        $('.time').html(n).removeClass('hidden');
        dummyAnimate('.time', 'animated fadeIn');
    }, 2500);
    
}
function showCombo(n) {
    setTimeout(function() {
        $('.combo').html(n).removeClass('hidden');
        dummyAnimate('.combo', 'animated fadeIn');
    }, 3500);
}
function showTotal(n) {
    setTimeout(function() {
        $('.total').removeClass('hidden');
        totalCountUp();
    }, 4500);
}
function animeSocial(n) {
    setTimeout(function() {
        dummyAnimate('.btns a:last', 'animated tada');
        
    }, 6500);
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
    var total = new countUp($('.total').get(0), 0, 3690, 0, 2, options);
    total.start();
}