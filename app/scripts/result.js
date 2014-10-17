$(function() {
    var pageData = {
        'title': 'PK结果',
        'back_url': 'index.html',
    };

    initHeader(pageData);
    initMenu();
    initCloud();
    bindEvents();
    bindDownload();

    getUserData();
    cloudDown();

    initPage();

    
});
$(window).on('load', function() {
    // testCountUp();
    var o = store.get('hjKxccResult');
    //o = {correct: this.correct,  duration: this.duration, combo: this.maxCombo};
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

function getUserData() {
    // { "UserId" : 0 , "UserName" : null , "Avatar" : null };
    var data = store.get('hjKxccUserInfo');
    if (data && (data.UserId > 0)) {
        $('.info>img').attr('src', data.Avatar);
        $('.nick').html(data.UserName);
    };
 }
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
        weixinLogin();
        
        return false;
    });
    $('.overlay').on('click', function() {
        
        if (isWeiXin()) {
            dummyAnimate('.winxintips', 'animated bounceOut', function() {
                $('.overlay').addClass('hidden');
                $('.winxintips').addClass('hidden');
                $('.shares').addClass('hidden');
            });
        } else {
            dummyAnimate('.shares', 'animated bounceOutDown', function() {
                $('.overlay').addClass('hidden');
                $('.winxintips').addClass('hidden');
                $('.shares').addClass('hidden');
            });
        }
        

        return false;
    });

    $('.shares_wrapper').on('click', function(e) {
        e.stopPropagation();
    });

    $.getScript('http://v3.jiathis.com/code/jia.js',function(){
        
    }) ;
}
function weixinLogin() {
    if (isWeiXin()) {
        //weixin hide weixin,show tips
        $('.winxintips').removeClass('hidden');
        $('.overlay').removeClass('hidden');
        dummyAnimate('.winxintips', 'animated bounceIn');
    } else {
        // not weixin show shares
        $('.shares').find('li').eq(0).addClass('hidden');
        $('.shares').removeClass('hidden');
        $('.overlay').removeClass('hidden');
        dummyAnimate('.shares', 'animated bounceInUp');
    }
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

function winxinShareDone() {
    $('.overlay').click();
}
// 微信分享到朋友圈的内容和图片的定制
(function () {
 
    // data for weixin
    var dataForWeixin = {
        appId: "",  // 
        imgUrl: "http://m.hujiang.com/MiniSite/CiKu/images/weixin.png",
        imgWidth: "200",
        imgHeight: "200",
        lineLink: "http://beta.mci.hujiang.com/opponent.html?BookId=1234&UserName=小女&UserId=282929&WrongWords=010100001000010&MatchTime=129890",
        shareTitle: "我在开心词场”中秒杀对手！不服来战，等你！",
        descContent: "http://beta.mci.hujiang.com/competition.html?opp=ABC",
        callback: function () { winxinShareDone(); }
    };
 
    var onBridgeReady = function () {
        // 发送给朋友
        WeixinJSBridge.on("menu:share:appmessage", function (argv) {
            WeixinJSBridge.invoke("sendAppMessage", {
                "appid": dataForWeixin.appId,
                "img_url": dataForWeixin.imgUrl,
                "img_width": dataForWeixin.imgWidth,
                "img_height": dataForWeixin.imgHeight,
                "link": dataForWeixin.lineLink,
                "desc": dataForWeixin.descContent,
                "title": dataForWeixin.shareTitle
            }, function (res) { dataForWeixin.callback(); });
        });
 
        // 发送到朋友圈
        WeixinJSBridge.on("menu:share:timeline", function (argv) {
            WeixinJSBridge.invoke("shareTimeline", {
                "appid": dataForWeixin.appId,
                "img_url": dataForWeixin.imgUrl,
                "img_width": dataForWeixin.imgWidth,
                "img_height": dataForWeixin.imgHeight,
                "link": dataForWeixin.lineLink,
                "desc": dataForWeixin.descContent,
                "title": dataForWeixin.shareTitle
            }, function (res) { dataForWeixin.callback(); });
        });
 
        // 分享到微博
        WeixinJSBridge.on("menu:share:weibo", function (argv) {
            WeixinJSBridge.invoke("shareWeibo", {
                "content": dataForWeixin.shareTitle,
                "url": dataForWeixin.lineLink
            }, function (res) { dataForWeixin.callback(); });
        });
 
        // 分享到facebook
        WeixinJSBridge.on("menu:share:facebook", function (argv) {
            WeixinJSBridge.invoke("shareFB", {
                "img_url": dataForWeixin.imgUrl,
                "img_width": dataForWeixin.imgWidth,
                "img_height": dataForWeixin.imgHeight,
                "link": dataForWeixin.lineLink,
                "desc": dataForWeixin.descContent,
                "title": dataForWeixin.shareTitle
            }, function (res) { dataForWeixin.callback(); });
        });
    };
 
    if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
    } else if (document.attachEvent) {
        document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
    }
})();