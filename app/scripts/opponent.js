$(function() {
    var pageData = {
        'title': 'PK',
        'back_url': 'competition.html',
    };

    initHeader(pageData);
    initMenu();
    initCloud();
    bindEvents();
    cloudDown('-8%');

    getData();
    searching();
});

 function getData() {
    var bid = getParam('bid');
    // $.get('http://beta.mci.hujiang.com/Services/PKUserInfo.ashx?bookid=10232&userid=2203265', function(data) {
        
    // });

    oppData = {"UserId":25710160,"UserName":"AirSky_Ten","BookId":10232,"PKUserId":0,"IsWin":false,"MatchTime":135925,"WordCount":15,"RightWordCount":6,"Score":40,"WrongWords":"010100000000000","IsMockup":false};
    saveOppData(oppData);
}
function saveOppData(data) {
    console.log('MatchTime:'+data.MatchTime);
    console.log('WrongWords:'+data.WrongWords);
    console.log('Score:'+data.Score);
}
function searching() {
    var num = 0;
    var opps = [
        {name: '各位观众', pic: '100.jpg', win: '75%'},
        {name: '中华第一帅', pic: '101.jpg', win: '65%'},
        {name: '和田玉', pic: '102.jpg', win: '78%'},
        {name: '谁来和我比一比', pic: '103.jpg', win: '55%'},
        {name: '绿色稻田', pic: '104.jpg', win: '79%'},
        {name: '恐怖', pic: '105.jpg', win: '85%'},
        {name: '东京爱情', pic: '106.jpg', win: '88%'},
        {name: '纯厚生活', pic: '107.jpg', win: '82%'},
        {name: 'dona', pic: '108.jpg', win: '32%'},
        {name: '优势是什么', pic: '109.jpg', win: '81%'},
        {name: '小河叮咚', pic: '110.jpg', win: '90%'},
    ];
    var oppsshuffle = _.shuffle(opps);
    console.log(oppsshuffle);

    var searchItv = setInterval(function() {
        var w = $('.anonymous').width();
        var z = $('.anonymous').css('zoom');
        var mr = $('.opp_info>ul>li').css('margin-right');
        var step = (w*z) + parseInt(mr);
        $('.opp_info').animate({
            left: '-='+(step)
        });
        num += 1;
        showOpp(oppsshuffle, num);
        if (num == 5) {
            clearInterval(searchItv);
            showPK();
        };
    }, 1500);
}

function showOpp(arr, idx) {
    var name = arr[idx].name;
    var pic = 'images/portrait/' +　arr[idx].pic;
    var win = arr[idx].win;
    $('.selected>img').attr('src', pic);
    $('.selected>.opp_name').html(name);
    $('.selected>.opp_status').html('胜率 ' + win);

}

function showPK() {
    $('.wave_containter').addClass('hidden');
    $('.opp_info').addClass('hidden');
    $('.user_status').addClass('hidden');
    $('.opp_status').addClass('hidden');

    $('.photo').animate({
        left: '35%',
        top: '30%'
    },{
        duration: 1200,
        complete: function() {
            $('.pk').css('opacity', 0).removeClass('hidden').animate({
                opacity: 1
            },
            {
                complete: function() {
                    setTimeout(function() {
                        document.location = 'competition.html';
                    }, 1000);
                    
                }
            });
        }
    });


    $('.user_name').css('position','relative').animate({
        left: '20%',
        top: '-27%'
    },{
        duration: 1200,
        complete: function() {}
    });

    $('.selected').animate({
        top: '65%'
    },{
        duration: 1200,
        complete: function() {}
    });

    $('.selected>img').css('position','relative').animate({
        left: '55%'
    },{
        duration: 1200,
        complete: function() {}
    });

    $('.opp_name').css('position','relative').animate({
        left: '-60%',
        top: '-45%'
    },{
        duration: 1200,
        complete: function() {}
    });


    
    // $('.opp_info').animate({
    //         left: '-='+(step)
    //     });

    // $('.opp_info').animate({
    //         left: '-='+(step)
    //     });

    // $('.opp_info').animate({
    //         left: '-='+(step)
    //     });
}