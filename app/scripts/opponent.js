$(function () {
    var pageData = {
        'title': 'PK',
        'back_url': 'javascript:history.back()',
    };

    initHeader(pageData);
    initMenu();
    initCloud();
    bindEvents();
    cloudDown('-8%');

    getUserData();
    getOppData();

});

function getUserData() {
    // { "UserId" : 0 , "UserName" : null , "Avatar" : null };
    var data = store.get('hjKxccUserInfo');
    if (data && (data.UserId > 0)) {
        $('.photo').attr('src', data.Avatar);
        $('.user_name').html(data.UserName);
    };
}

function getOppData() {
    //{'BookId':bookid, 'UserName':uname, 'UserId':uid}
    var hjKxccSocial = store.get('hjKxccSocial');
    var bid = store.get('hjKxccBookid');
    var UserId = '1000000';
    var UserName = '';

    if (hjKxccSocial) {
        //has hjKxccSocial, from social share page
        UserName = hjKxccSocial.UserName || '我的好友';
        UserId = hjKxccSocial.UserId || '1000000';
        var UserScore = hjKxccSocial.UserScore;
        var correntNum = Math.floor(UserScore / 100);


        searching(false);

        var data = {
            "UserId": UserId,
            "UserName": "我的好友",
            "BookId": bid,
            "PKUserId": 0,
            "IsWin": false,
            "MatchTime": 150000,
            "WordCount": 15,
            "RightWordCount": correntNum,
            "Score": 50,
            "WrongWords": "010101010101010",
            "IsMockup": false
        };

        saveOppData(data);
    }
    else {
        //not from social share page
        searching(true);
        var url = 'http://beta.mci.hujiang.com/Services/PKUserInfo.ashx?bookid=' + bid + '&userid=' + UserId + '&ts=' + Math.random();
        $.get(url, function (data) {
            // data = {
            //     "UserId": 25710160,
            //     "UserName": "AirSky_Ten",
            //     "BookId": 10232,
            //     "PKUserId": 0,
            //     "IsWin": false,
            //     "MatchTime": 135925,
            //     "WordCount": 15,
            //     "RightWordCount": 6,
            //     "Score": 40,
            //     "WrongWords": "010100000000000",
            //     "IsMockup": false
            // };

            saveOppData(data);
        }, 'JSON');
    }



}

function saveOppData(data) {
    console.log('MatchTime:' + data.MatchTime);
    console.log('RightWordCount:' + data.RightWordCount);
    console.log('Score:' + data.Score);

    store.set('hjKxccData', data);
}

function centerAnonymous(n) {
    var w = $('.anonymous').width();
    var z = $('.anonymous').css('zoom');
    var mr = parseInt($('.opp_info>ul>li').css('margin-right'));
    var n = n || 3;
    var offset = $(window).width() * 0.5 - ((n + 0.5) * w * z + n * mr);

    // $('.opp_info').animate({
    //     left: offset + 'px',
    // }, {
    //     duration: 3000
    // });

    $('.opp_info').find('ul').css('left', offset + 'px').end().show();
}

function searching(bRandom) {
    setTimeout(function () {
        centerAnonymous(2);
        if (bRandom) {
            //random opponent

            var num = 0;
            var opps = [{
                    name: '各位观众',
                    pic: '100.jpg',
                    win: '75%'
                }, {
                    name: '中华第一帅',
                    pic: '101.jpg',
                    win: '65%'
                }, {
                    name: '和田玉',
                    pic: '102.jpg',
                    win: '78%'
                }, {
                    name: '谁来和我比',
                    pic: '103.jpg',
                    win: '55%'
                }, {
                    name: '绿色稻田',
                    pic: '104.jpg',
                    win: '79%'
                }, {
                    name: '倾国倾城',
                    pic: '105.jpg',
                    win: '85%'
                }, {
                    name: '东京爱情',
                    pic: '106.jpg',
                    win: '88%'
                }, {
                    name: '纯厚生活',
                    pic: '107.jpg',
                    win: '82%'
                }, {
                    name: 'dona',
                    pic: '108.jpg',
                    win: '32%'
                }, {
                    name: '优势是什么',
                    pic: '109.jpg',
                    win: '81%'
                },

                {
                    name: '已成追忆',
                    pic: '111.jpg',
                    win: '66%'
                }, {
                    name: '我想劫个色',
                    pic: '111.jpg',
                    win: '15%'
                }, {
                    name: '为你。变傻',
                    pic: '112.jpg',
                    win: '68%'
                }, {
                    name: '贱人就是矫情',
                    pic: '113.jpg',
                    win: '74%'
                }, {
                    name: '尐安逸丶',
                    pic: '114.jpg',
                    win: '78%'
                }, {
                    name: '旧城·忆 ',
                    pic: '115.jpg',
                    win: '82%'
                }, {
                    name: '自作多情',
                    pic: '116.jpg',
                    win: '86%'
                }, {
                    name: '此生',
                    pic: '117.jpg',
                    win: '82%'
                }, {
                    name: '泛滥的回忆つ',
                    pic: '118.jpg',
                    win: '39%'
                }, {
                    name: '凉心〆',
                    pic: '119.jpg',
                    win: '68%'
                },

                {
                    name: '浑浑噩噩',
                    pic: '122.jpg',
                    win: '90%'
                }, {
                    name: '___静水幽情',
                    pic: '121.jpg',
                    win: '82%'
                }, {
                    name: '坚决不改',
                    pic: '122.jpg',
                    win: '79%'
                }, {
                    name: '℡格桑花开',
                    pic: '123.jpg',
                    win: '51%'
                }, {
                    name: '曾经最掏心',
                    pic: '124.jpg',
                    win: '76%'
                }, {
                    name: '胸小随我爸',
                    pic: '125.jpg',
                    win: '87%'
                }, {
                    name: '吃樱桃的小丸子',
                    pic: '126.jpg',
                    win: '88%'
                }, {
                    name: '街角の风铃',
                    pic: '127.jpg',
                    win: '86%'
                }, {
                    name: '爱是毒',
                    pic: '128.jpg',
                    win: '39%'
                }, {
                    name: '空心空回忆',
                    pic: '129.jpg',
                    win: '91%'
                },

                {
                    name: '已无旧回忆',
                    pic: '133.jpg',
                    win: '70%'
                }, {
                    name: '素锦安年',
                    pic: '131.jpg',
                    win: '64%'
                }, {
                    name: '我会成功',
                    pic: '132.jpg',
                    win: '77%'
                }, {
                    name: '指缝间的阳光',
                    pic: '133.jpg',
                    win: '50%'
                }, {
                    name: '童话里的爱情',
                    pic: '134.jpg',
                    win: '28%'
                }, {
                    name: '请给我个理由',
                    pic: '135.jpg',
                    win: '85%'
                }, {
                    name: '失心的骚年',
                    pic: '136.jpg',
                    win: '84%'
                }, {
                    name: 'IWillBeBack',
                    pic: '137.jpg',
                    win: '86%'
                }, {
                    name: 'Tell Me',
                    pic: '138.jpg',
                    win: '68%'
                }, {
                    name: 'NovemberRain',
                    pic: '139.jpg',
                    win: '80%'
                },
            ];
            var oppsshuffle = _.shuffle(opps);
            showOpp(oppsshuffle, num);

            num += 1;

            var searchItv = setInterval(function () {
                var w = $('.anonymous').width();
                var z = $('.anonymous').css('zoom');
                var mr = $('.opp_info>ul>li').css('margin-right');
                var step = (w * z) + parseInt(mr);
                $('.opp_info').animate({
                    left: '-=' + (step)
                }, {
                    complete: function () {
                        num += 1;
                        showOpp(oppsshuffle, num);
                        if (num == 3) {
                            clearInterval(searchItv);
                            showPK();

                            //inject usrpic to data & store
                            var data = store.get('hjKxccData');
                            // var pic = 'images/portrait/' + 　oppsshuffle[num].pic;
                            var pic = getUserAvatar(data.UserId);
                            _.extend(data, {
                                'Avatar': pic
                            });
                            store.set('hjKxccData', data);
                        };
                    }
                });

            }, 1000);
        }
        else {
            // certain opponent from social
            showOppFromSocial();
            setTimeout(function () {
                showPK();
            }, 2000);
        }
    }, 200);
}

function showOpp(arr, idx) {
    var data = store.get('hjKxccData');
    var name = (idx == 3) ? data.UserName : arr[idx].name;
    var pic = (idx == 3) ? getUserAvatar(data.UserId) : 'images/portrait/' + 　arr[idx].pic;
    var win = arr[idx].win;
    $('.selected>img').attr('src', pic);
    $('.selected>.opp_name').html(name);
    $('.selected>.opp_status').html('胜率 ' + win);
}

function showOppFromSocial() {
    var data = store.get('hjKxccSocial');
    var name = data.UserName || '我的好友';
    var uid = data.UserId || '1000000';
    var pic = getUserAvatar(uid);

    $('.selected>img').attr('src', pic);
    $('.selected>.opp_name').html(name);
    // $('.selected>.opp_status').html('胜率 ' + win);
}

function showPK() {
    $('.wave_containter').addClass('hidden');
    $('.opp_info').addClass('hidden');
    $('.user_status').addClass('hidden');
    $('.opp_status').addClass('hidden');

    $('.photo').animate({
        left: '35%',
        top: '30%'
    }, {
        duration: 1200,
        complete: function () {
            $('.pk').css('opacity', 0).removeClass('hidden').animate({
                opacity: 1
            }, {
                complete: function () {
                    setTimeout(function () {
                        var url = 'competition.html?ts=' + Math.random();
                        document.location = url;
                    }, 1000);

                }
            });
        }
    });


    $('.user_name').css('position', 'relative').animate({
        left: '20%',
        top: '-27%'
    }, {
        duration: 1200,
        complete: function () {}
    });

    $('.selected').animate({
        top: '65%'
    }, {
        duration: 1200,
        complete: function () {}
    });

    $('.selected>img').css('position', 'relative').animate({
        left: '55%'
    }, {
        duration: 1200,
        complete: function () {}
    });

    $('.opp_name').css('position', 'relative').animate({
        left: '-60%',
        top: '-45%'
    }, {
        duration: 1200,
        complete: function () {}
    });

}