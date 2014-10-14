$(function() {
    var pageData = {
        'title': 'PK结果',
        'back_url': 'index.html',
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
    var o = store.get('hjKxccResult');
    //o = {correct: this.correct,  duration: this.duration, combo: this.maxCombo};
    console.log('get hjKxccResult:---correct:'+o.correct+', duration:'+o.duration+',combo:'+o.maxCombo);
    var correntNum = o.correct * 100;
    var durationNum = 300 - o.duration;
    var maxComboNum = o.maxCombo * 10;
    var totalNum = correntNum + durationNum + maxComboNum;
    showResult();
    showCorrect(correntNum);
    showTime(durationNum);
    showCombo(maxComboNum);
    showTotal(totalNum);
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
        totalCountUp(n);
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

function totalCountUp(n) {
    var options = {
      useEasing : true, 
      useGrouping : true, 
      separator : ',', 
      decimal : '.' 
    }
    var total = new countUp($('.total').get(0), 0, n, 0, 2, options);
    total.start();
}