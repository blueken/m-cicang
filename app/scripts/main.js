function initHeader(pageData) {
	'use strict';
	var ratio = 0.5
	var stand_height = 416 * ratio;
	var stand_width = 640 * ratio;

	pageData = pageData ? pageData : {};

	$.get('inc_header.html', function (tmpl) {

		_.defaults(pageData, {
			'title': 'Default title',
			'back_url': '',
			'down_url': 'http://m.hujiang.com/app/cichang/'
		});
		var header_html = _.template(tmpl, pageData);
		$('header').html(header_html);
		dealSpriteSheet();

		$('.btn_menu').click(toggleMenu);
	});
}

function toggleMenu() {
	var menu = $('.btn_menu');
	var menuContent = $('.menu_content');
	var bOn = parseInt($('.menu_content').css('top')) > 0;
	if (bOn) {
		menu.removeClass('btn_menu_on');
		menuContent.animate({
			top: '-50%'
		});

		$('#for_menu').remove();
	}
	else {
		menu.addClass('btn_menu_on');
		menuContent.animate({
			top: '9.56%'
		});

		$('<div class="overlay" style="display:block" id="for_menu" onclick="toggleMenu()"></div>').appendTo($('.ratio'));
	}
	console.log('work well!');
}

function initCloud() {
	'use strict';

	var cloud_b_stand_h = 135 * 1;
	var cloud_f_stand_h = 135 * 1;


	var clouds_bg_h_by_width = $('.ratio').width() * (920 / 640) * ((416 + 135 + 135) / 920);
	var clouds_bg_h_by_height = $('.ratio').height() * ((416 + 135 + 135) / 920);
	var clouds_bg_actua_h = Math.min(clouds_bg_h_by_width, clouds_bg_h_by_height);
	$('.clouds').css('height', clouds_bg_actua_h);


	var ratio = clouds_bg_actua_h / (551);
	ratio = (ratio > 1) ? 1 : ratio; // not larger than 1 ,or may see white edge
	var cloud_b_actua_h = cloud_b_stand_h * ratio;
	var cloud_f_actua_h = cloud_f_stand_h * ratio;


	$('.cloud_b').css('height', cloud_b_actua_h * 1.2);
	$('.cloud_f').css('height', cloud_f_actua_h);
}

function initMenu(menuData) {
	'use strict';
	var stand_height = 416 * 0.5;
	var stand_width = 640 * 0.5;

	menuData = menuData ? menuData : {};

	$.get('inc_menu.html', function (tmpl) {

		_.defaults(menuData, {
			'title': 'Default title',
			'back_url': '',
			'down_url': 'http://m.hujiang.com/app/cichang/'
		});
		var header_html = _.template(tmpl, menuData);
		$('.menu_content').html(header_html);

		judgeLogged();
		bindDownload();
		dealSpriteSheet();
	});
}

function judgeLogged() {
	//var data = { "UserId" : 0 , "UserName" : null , "Avatar" : null, "ToKen": "" };
	$.get('http://beta.mci.hujiang.com/Services/UserInfo.ashx?ts=' + Math.random(), function (data) {
		if ((typeof (data) === 'undefined') || (data.UserId === 0)) {
			//unlogin
			$('#unlogged').attr('class', 'login');
			$('#logged').attr('class', 'login hidden');
		}
		else {
			//login
			var $container = $('#logged').find('.container');
			$container.find('.portrait').find('img').attr('src', data.Avatar);
			$container.find('h3').html(data.UserName);
			$('#logged').attr('class', 'login');
			$('#unlogged').attr('class', 'login hidden');
		}

		if (window.store) {
			store.set('hjKxccUserInfo', data);
		};
	}, 'JSON');

	if (getParam('menu') === 'y') {
		//show menu
		$('.btn_menu').click();
	}
}

function cloudDown(percent) {
	'use strict';
	var p = percent ? percent : '0%';
	$('.clouds').css('bottom', p);
	$('.clouds').show();
}

function bindEvents() {
	'use strict';
	$(window).on('resize', function () {
		initCloud();
	});
}

function dealSpriteSheet() {
	if (!dealSpriteSheet.cando) {
		dealSpriteSheet.cando = 0.5;
		return;
	}
	else {
		dealSpriteSheet.cando = 1;
	}

	var winWidth = $(window).width();

	if (winWidth <= 320) {
		scaleAllSS('.sprite', 0.45);
	}
	else if (winWidth <= 370) {
		scaleAllSS('.sprite', 0.6);
	}
	else if (winWidth <= 420) {
		scaleAllSS('.sprite', 0.62);
	}
	else if (winWidth <= 470) {
		scaleAllSS('.sprite', 0.8);
	}
	else if (winWidth <= 550) {
		scaleAllSS('.sprite', 0.9);
	}
	else if (winWidth <= 601) {
		scaleAllSS('.sprite', 0.95);
	}
	else {
		scaleAllSS('.sprite', 1);
	}

}

function scaleAllSS(sel, ratio) {
	$(sel).each(function (i, v) {
		scaleSS(this, ratio);
	});
	setTimeout(function () {
		$(sel).show();
	}, 20);
}

function scaleSS(domobj, ratio) {
	//scale sprite sheet element
	$obj = $(domobj);
	if ($obj.hasClass('boy')) {
		return;
	}
	if ($obj.hasClass('anonymous')) {
		ratio = 0.7;
	}
	var widthSpriteSheet = parseInt($obj.css('background-size').split(' ')[0]);
	var heightSpriteSheet = parseInt($obj.css('background-size').split(' ')[1]);
	var spritePosX = parseInt($obj.css('background-position').split(' ')[0]);
	var spritePosY = parseInt($obj.css('background-position').split(' ')[1]);

	var widthSprite = parseInt($obj.css('width'));
	var heightSprite = parseInt($obj.css('height'));
	console.log(widthSpriteSheet, heightSpriteSheet, spritePosX, spritePosY, widthSprite, heightSprite);

	var backgroundSizeNew = Math.ceil(widthSpriteSheet * ratio) + 'px ' + Math.ceil(heightSpriteSheet * ratio) + 'px';
	$obj.css('background-size', backgroundSizeNew);
	var backgroundPosNew = Math.ceil(spritePosX * ratio) + 'px ' + Math.ceil(spritePosY * ratio) + 'px';
	$obj.css('background-position', backgroundPosNew);
	var widthSpriteNew = Math.ceil(widthSprite * ratio) + 'px ';
	$obj.css('width', widthSpriteNew);
	var heightSpriteNew = Math.ceil(heightSprite * ratio) + 'px ';
	$obj.css('height', heightSpriteNew);
	$obj.css('display', 'inline-block');

}

function getUserAvatar(uid) {
	uid = uid.toString();
	var uidLen = uid.length;
	if (uidLen < 4) {
		var a = 4 - uidLen;
		for (var i = a - 1; i >= 0; i--) {
			uid = '0' + uid;
		};
	};
	var p0 = 200; //48, 96 , 200
	var p1 = uid.substring(uid.length - 2, uid.length - 4);
	var p2 = uid.substring(uid.length, uid.length - 2);
	var p3 = uid;
	var result = 'http://i2.hjfile.cn/f' + p0 + '/' + p1 + '/' + p2 + '/' + p3 + '.jpg';
	return result;
}

function getParam(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function dummyAnimate(sel, sAnim, func) {
	var $sel = $(sel);
	$sel.addClass(sAnim);
	var wait = setTimeout(function () {
		$sel.removeClass(sAnim);
	}, 1300);
	if (func instanceof Function) {
		$sel.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', func);
	};
}

function isWeiXin() {
	'use strict';
	var ua = window.navigator.userAgent.toLowerCase();
	var re = /MicroMessenger/gi;
	return re.test(ua);
}
String.prototype.getBytesLength = function () {
	return this.replace(/[^\x00-\xff]/gi, "--").length;
}

function autoAddEllipsis(pStr, pLen) {

	var _ret = cutString(pStr, pLen);
	var _cutFlag = _ret.cutflag;
	var _cutStringn = _ret.cutstring;

	if ("1" == _cutFlag) {
		return _cutStringn + "...";
	}
	else {
		return _cutStringn;
	}
}

function cutString(pStr, pLen) {

	var _strLen = pStr.length;

	var _tmpCode;

	var _cutString;

	var _cutFlag = "1";

	var _lenCount = 0;

	var _ret = false;

	if (_strLen <= pLen / 2) {
		_cutString = pStr;
		_ret = true;
	}

	if (!_ret) {
		for (var i = 0; i < _strLen; i++) {
			if (isFull(pStr.charAt(i))) {
				_lenCount += 2;
			}
			else {
				_lenCount += 1;
			}

			if (_lenCount > pLen) {
				_cutString = pStr.substring(0, i);
				_ret = true;
				break;
			}
			else if (_lenCount == pLen) {
				_cutString = pStr.substring(0, i + 1);
				_ret = true;
				break;
			}
		}
	}

	if (!_ret) {
		_cutString = pStr;
		_ret = true;
	}

	if (_cutString.length == _strLen) {
		_cutFlag = "0";
	}

	return {
		"cutstring": _cutString,
		"cutflag": _cutFlag
	};
}

function isFull(pChar) {
	for (var i = 0; i < pChar.strLen; i++) {
		if ((pChar.charCodeAt(i) > 128)) {
			return true;
		}
		else {
			return false;
		}
	}
}

function isIOS() {
	'use strict';
	var ua = window.navigator.userAgent.toLowerCase();
	var re = /ipad|iphone/gi;
	return re.test(ua);
}

function isXiaomi() {
	'use strict';
	var ua = window.navigator.userAgent.toLowerCase();
	var re = /xiaomi/gi;
	return re.test(ua);
}

function isMobile() {
	var flag = false;
	var agent = navigator.userAgent.toLowerCase();
	var keywords = ["android", "iphone", "ipod", "ipad", "windows phone", "mqqbrowser"];

	if (!(agent.indexOf("windows nt") > -1) || (agent.indexOf("windows nt") > -1 && agent.indexOf("compatible; msie 9.0;") > -1)) {
		if (!(agent.indexOf("windows nt") > -1) && !agent.indexOf("macintosh") > -1) {
			for (var item in keywords) {
				if (agent.indexOf(item) > -1) {
					flag = true;
					break;
				}
			}
		}
	}
	return flag;
}

function bindDownload() {
	$('#download').on('click', function () {
		if (isIOS()) {
			$(this).attr('href', 'https://itunes.apple.com/cn/app/kai-xin-ci-chang3/id635206028?mt=8');
		}
		else {
			$(this).attr('href', 'http://m.hujiang.com/app/cichang/');
		}
	});
}

var Passport = function () {
	return {
		GetLoginSource: function (langs) {
			var source = "m_comp";
			switch (langs) {
			case "en":
				source = "m_en";
				break;
			case "jp":
				source = "m_jp";
				break;
			case "kr":
				source = "m_kr";
				break;
			case "xx":
				source = "m_xx";
				break;
			default:
				source = "m_comp";
				break;
			}
			return source;
		},
		Login: function (flag) {
			var langs = 'kxcc';
			var source = Passport.GetLoginSource(langs);
			var url = "http://pass.hujiang.com/m/login/?source=" + source + "&url=" + encodeURIComponent(window.location.href);
			if (flag != "" && flag != undefined) {
				url = "http://pass.hujiang.com/m/login/?source=" + source + "&url=" + encodeURIComponent(window.location.href.split("#")[0] + "#" + flag);
			}
			location.href = url;
		},
		Signup: function () {
			var langs = 'kxcc';
			var source = Passport.GetLoginSource(langs);
			location.href = "http://pass.hujiang.com/m/signup/?source=" + source + "&url=" + encodeURIComponent(window.location.href);
		},
		Logout: function () {
			var langs = 'kxcc';
			var source = Passport.GetLoginSource(langs);
			location.href = "http://pass.hujiang.com/m/logout.aspx?source=" + source + "&url=" + encodeURIComponent(window.location.href);
		}
	}
}();


window.addEventListener("load", function () {
	// Set a timeout...
	setTimeout(function () {
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);
});