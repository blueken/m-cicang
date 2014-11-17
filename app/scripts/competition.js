$(function () {
    var pageData = {
        'title': '第 1 题',
        'back_url': 'javascript:tryQuit()',
    };
    gComp = new Competition();
    gBlood = new BloodSystem();
    initHeader(pageData);
    initMenu();
    initCloud();
    bindEvents();
    bindQuitEvents();
    cloudDown('-33%');

    getUserData();
    getOppInfo();
    getQuestions();


});

function bindQuitEvents() {
    $('.confirm').on('click', function () {
        document.location = 'index.html';
    });
    $('.cancel').on('click', function () {
        $('.overlay').hide();
    });
}

function getUserData() {
    // { "UserId" : 0 , "UserName" : null , "Avatar" : null };
    var data = store.get('hjKxccUserInfo');
    if (data && (data.UserId > 0)) {
        $('.me').attr('src', data.Avatar);
        $('.my_name').html(data.UserName);
    };
}

function getOppInfo() {
    // hjKxccData = {"UserId":25710160,"UserName":"AirSky_Ten","BookId":10232,"PKUserId":0,"IsWin":false,"MatchTime":135925,"WordCount":15,"RightWordCount":6,"Score":40,"WrongWords":"010100000000000","IsMockup":false};
    var hjKxccData = store.get('hjKxccData');
    $('.his_name').html(hjKxccData.UserName);
    $('.him').attr('src', hjKxccData.Avatar);
}

function getQuestions() {
    // var data = {"result":[{"question":"She [____ed] some sugar to her tea.","pro":null,"audio":null,"correctOption":2,"options":["position","VCD","add","gesture"]},{"question":"Radio and television are important means of ____.","pro":null,"audio":null,"correctOption":2,"options":["gesture","president","communication","mad"]},{"question":"VCD","pro":"viːsiː'diː","audio":"http://c1.g.hjfile.cn/yuliao/word/36/c4876ba42dddc92376b8ee5e686e7441.mp3","correctOption":1,"options":["v. 管理，负责","n. 影碟光盘","adj. 发疯的，生气的","n. 位置，职位，立场"]},{"question":"position","pro":"pə'zɪʃən","audio":"http://d1.g.hjfile.cn/voice/voice2/p/position.mp3","correctOption":2,"options":["v. 取消，废除；使…停止，使…作废；","n. 蝴蝶","n. 位置，职位，立场","n. 交流； 通信"]},{"question":"adj. 顺利的；光滑的；平稳的","pro":null,"audio":null,"correctOption":1,"options":["president","smooth","wolf","communication"]},{"question":"president","pro":"'prezidәnt","audio":"http://d1.g.hjfile.cn/voice/voice2/p/president.mp3","correctOption":0,"options":["n. 总统，主席","n. 同意，一致，协定，协议","n. 狼","n. 位置，职位，立场"]},{"question":"butterfly","pro":"ˈbʌtərˌflaɪ","audio":"http://c1.g.hjfile.cn/yuliao/word/-16/6ab4c2e2fa53e7591e98c2ebc71bc7c3.mp3","correctOption":1,"options":["n. 政策，方针","n. 蝴蝶","n. 交流； 通信","v. 取消，废除；使…停止，使…作废；"]},{"question":"n. 同意，一致，协定，协议","pro":null,"audio":null,"correctOption":3,"options":["cancel","wolf","policy","agreement"]},{"question":"policy","pro":"'pɒləsi","audio":"http://c1.g.hjfile.cn/yuliao/word/-177/e43e636db6f90d79bfc0262fd6ae222a.mp3","correctOption":1,"options":["v. 取消，废除；使…停止，使…作废；","n. 政策，方针","n. 交流； 通信","n. 劳动(Am labor)"]},{"question":"He made a rude ____ at his friend.","pro":null,"audio":null,"correctOption":2,"options":["communication","agreement","gesture","cancel"]},{"question":"adj. 发疯的，生气的","pro":null,"audio":null,"correctOption":2,"options":["labour","smooth","mad","gesture"]},{"question":"It takes a lot of ____ to build a railway.","pro":null,"audio":null,"correctOption":2,"options":["smooth","butterfly","labour","add"]},{"question":"v. 管理，负责","pro":null,"audio":null,"correctOption":0,"options":["manage","butterfly","cancel","VCD"]},{"question":"The heavy workload forced me to ____ the camping trip.","pro":null,"audio":null,"correctOption":2,"options":["agreement","VCD","cancel","communication"]},{"question":"n. 狼","pro":null,"audio":null,"correctOption":3,"options":["gesture","add","labour","wolf"]}],"responseStatus":{"errorCode":"","message":null,"stackTrace":null,"errors":null}};
    // var bid = getParam('bid');
    var bid = store.get('hjKxccBookid');
    bid = bid ? bid : 10441;
    var url = 'http://beta.mci.hujiang.com/Services/PKQuestion.ashx?bookid=' + bid + '&ts=' + Math.random();
    $.get(url, function (data) {
        _.extend(gComp, {
            'data': data
        });
        gComp.total = data.result.length;
        gComp.start();

        var quesStr = '';
        _.each(data.result, function (v, k) {
            var maxBytes = 38;
            var quesBytes = v.question.getBytesLength();
            var fs = maxBytes / quesBytes;
            if (quesBytes < maxBytes) {
                fs = 5;
            }
            else {
                fs = 4;
            }
            var fsstr = 'style="font-size:' + fs + 'rem"';
            var tmp = _.template('<section class="question"><h2 ' + fsstr + '><span class="hvmiddle"><%=question%></span></h2><ul>');
            var sectionStr = tmp(v);

            _.each(v.options, function (o, i) {
                var alpha = 'A';
                var arr = ['A', 'B', 'C', 'D'];
                alpha = arr[i];
                var cstring = '<span class="vmiddle sign hidden">' + (i == v.correctOption ? '√' : '×') + '</span>';
                sectionStr += '<li><a href="javascript:void(0)" onclick="answer(this, ' + k + ',' + i + ',' + v.correctOption + ')"><span class="circle vmiddle"><b>' + alpha + '</b></span><span class="answer vmiddle">' + o + '</span>' + cstring + '</a></li>';
            });
            sectionStr += '<li style="display:none"><a href="javascript:void(0)" onclick="answer(this, ' + k + ',4,' + v.correctOption + ')"><span class="circle"><b>E</b></span><span class="answer vmiddle">不认识</span></a></li>';
            sectionStr += '</ul></section>';
            quesStr += sectionStr;
        });

        $('.questions').html(quesStr);



    }, 'JSON');


}

function answer(o, quesIdx, answerIdx, correntIdx) {
    if (answer.done) {
        return;
    };
    if (answerIdx === correntIdx) {
        //get correct
        gComp.combo(1);
        gComp.nextQuestion(1);
        $(o).addClass('right');
    }
    else {
        //get wrong
        gComp.combo(0);
        gComp.nextQuestion(0);
        showRight(o, correntIdx);
        if (answerIdx === 4) {
            $(o).addClass('selected');
        }
        else {
            $(o).addClass('wrong');
        }
    }
    $(o).find('.sign').removeClass('hidden');
    answer.done = true;
}

function showRight(obj, correntIdx) {
    var rightItem = $(obj).parent().parent().children().eq(correntIdx).find('a');
    rightItem.addClass('right');
    // dummyAnimate(rightItem[0], 'animated tada');
}

function tryQuit() {
    $('.overlay').show();
}

function Competition() {
    this.curr = 1;
    this.total = 1;
    this.correct = 0;
    this.duration = 0;
    this.numCombo = -1;
    this.maxCombo = 0;
    this.questionLimit = 10000; //max time to think
    this.correctShow = 1200; // delay to show next 
    this.questionHandler = null; //questionLimit handler

}
Competition.prototype.combo = function (a) {
    //a = 0, 1, null   0: wrong,  1: right,  null: getCombo

    if (a === 1) {
        //right
        if (this.numCombo <= 0) {
            this.numCombo = 1;
        }
        else {
            //combo
            this.numCombo += 1;
            $('.combo_txt').html('Combo ' + this.numCombo);
            $('.combo').removeClass('hidden')
            dummyAnimate($('.combo')[0], 'animated fadeIn', function () {
                setTimeout(function () {
                    $('.combo').addClass('hidden');
                }, 400);
            });
        }

        if (gBlood) {
            gBlood.Iamright();
        };
    }

    if (this.numCombo > this.maxCombo) {
        this.maxCombo = this.numCombo;
    };

    if (a === 0) {
        //wrong
        this.numCombo = 0;
    }
    return this.numCombo;
}
Competition.prototype.start = function () {
    this.duration = _.now();
    this.questionStart();
}
Competition.prototype.end = function () {
    this.duration = Math.floor((_.now() - this.duration) / 1000);

    store.set('hjKxccResult', {
        correct: this.correct,
        duration: this.duration,
        maxCombo: this.maxCombo
    });
    document.location = 'wait_opp_done.html';
}

Competition.prototype.nextQuestion = function (a) {
    //a = 0, 1, null   0: wrong,  1: right,  null: getCombo
    if (a === 0) {
        //wrong
        this.numCombo = 0;
    }
    else if (a === 1) {
        //right
        this.correct += 1;
    }
    else {
        //timeout
        gComp.combo(0);
        console.log('this.curr:' + this.curr + ',' + this.total);
        if (this.curr <= this.total) {
            var o = $('.question').eq(this.curr - 1).find('li>a').eq(4).get(0);
            var correntIdx = this.data.result[this.curr - 1].correctOption;
            $(o).addClass('selected');
            showRight(o, correntIdx);
        };

    }
    this.questionEnd();
    var self = this;
    setTimeout(function () {
        self.curr += 1;
        if (self.curr <= self.total) {
            $(".questions").animate({
                left: "-=100%"
            }, {
                duration: '130',
                complete: function () {
                    answer.done = false;
                }
            });

            var pageName = '第 ' + self.curr + '/' + self.total + ' 题';
            $('.name_txt').html(pageName);
        }
        else {
            self.end();
        }
        self.questionStart();
    }, self.correctShow);

}
Competition.prototype.questionStart = function () {
    var self = this;
    if (self.curr <= self.total) {
        self.questionHandler = setTimeout(function () {
            self.nextQuestion();
        }, self.questionLimit);
    }

}
Competition.prototype.questionEnd = function () {
    var self = this;
    if (self.questionHandler) {
        clearTimeout(self.questionHandler);
    };
    answer.done = true;
}

function BloodSystem() {
    var self = this;
    this.myPercent = 50;

    this.hisData = store.get('hjKxccData');
    this.hisPercent = 50;
    this.hisProgressOriginalWidth = $('.his_progress').width();
    this.hisIdx = 0;
    this.hisAct = this.hisData.WrongWords.split('');
    this.hisItv = this.hisData.MatchTime / this.hisData.WordCount;
    this.hisItvHandler = setInterval(function () {
        self.hisAction();
    }, this.hisItv);

    this.step = this.hisProgressOriginalWidth / this.hisData.WordCount;
}
BloodSystem.prototype.hisAction = function (e) {
    if (this.hisIdx < this.hisData.WordCount) {
        //1:wrong , 0:right
        var act = this.hisAct[this.hisIdx];
        console.log("his action: " + act);
        if (0 === parseInt(act)) {
            //right
            this.Heisright();
        };
        this.hisIdx += 1;
    }
    else {
        console.log("clearInterval: " + this.hisItvHandler);
        clearInterval(this.hisItvHandler);
    }

}
BloodSystem.prototype.Heisright = function (e) {
    // $('.his_progress').animate({
    //     width: '+=' + this.step
    // }, {
    //     duration: 800
    // });

    $('.his_progress').animate({
        width: '+=' + this.step
    }, 800, 'easeInOutBack', function () {})
}
BloodSystem.prototype.Iamright = function (e) {
    // $('.his_progress').animate({
    //     width: '-=' + this.step
    // }, {
    //     duration: 800
    // });

    $('.his_progress').animate({
        width: '-=' + this.step
    }, 800, 'easeInOutBack', function () {})

}