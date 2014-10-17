function initHeader(pageData) {
	'use strict';
	var stand_height = 416 * 0.5;
	var stand_width = 640 * 0.5;

	pageData = pageData ? pageData : {};

	$.get('inc_header.html', function(tmpl) {

		_.defaults(pageData, {
			'title': 'Default title',
			'back_url': '',
			'down_url': 'http://m.hujiang.com/android/HJWordGames.apk'
		});
		var header_html = _.template(tmpl, pageData);
		$('header').html(header_html);

		$('.btn_menu').click(function() {
			var menu = $('.btn_menu');
			var menuContent = $('.menu_content');
			var bOn = parseInt($('.menu_content').css('top')) > 0;
			if (bOn) {
				menu.removeClass('btn_menu_on');
				menuContent.animate({
					top: '-50%'
				});

				$('#for_menu').remove();
			} else {
				menu.addClass('btn_menu_on');
				menuContent.animate({
					top: '9.56%'
				});

				$('<div class="overlay" id="for_menu" onclick="hideMenu()"></div>').appendTo($('.ratio'));
			}
		});
	});
}
function hideMenu() {
	$('.btn_menu').click();
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

	$.get('inc_menu.html', function(tmpl) {

		_.defaults(menuData, {
			'title': 'Default title',
			'back_url': '',
			'down_url': 'http://www.default.com'
		});
		var header_html = _.template(tmpl, menuData);
		$('.menu_content').html(header_html);

		judgeLogged();
		bindDownload();
	});
}

function judgeLogged() {
	//var data = { "UserId" : 0 , "UserName" : null , "Avatar" : null };
	$.get('http://beta.mci.hujiang.com/Services/UserInfo.ashx', function(data) {
        if ((typeof(data) === 'undefined') || (data.UserId === 0)) {
        	//unlogin
        	$('#unlogged').attr('class', 'login');
        	$('#logged').attr('class', 'login hidden');
        } else {
        	//login
        	var $container = $('#logged').find('.container');
        	$container.find('.portrait').find('img').attr('src', data.Avatar);
        	$container.find('h3').html(data.UserName);
        	$('#logged').attr('class', 'login');
        	$('#unlogged').attr('class', 'login hidden');
        }

        if (store) {
        	store.set('hjKxccUserInfo', data);
        };
    },'JSON');

	if (getParam('menu') === 'y') {
		//show menu
		$('.btn_menu').click();
	}
}

function cloudDown(percent) {
	'use strict';
	var p = percent ? percent : '-33%';
	$('.clouds').css('bottom', p);
}

function bindEvents() {
	'use strict';
	$(window).on('resize', function() {
		initCloud();
	});

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
	var wait = setTimeout(function() {
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
String.prototype.getBytesLength = function() {
	return this.replace(/[^\x00-\xff]/gi, "--").length;
}

function autoAddEllipsis(pStr, pLen) {

	var _ret = cutString(pStr, pLen);
	var _cutFlag = _ret.cutflag;
	var _cutStringn = _ret.cutstring;

	if ("1" == _cutFlag) {
		return _cutStringn + "...";
	} else {
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
			} else {
				_lenCount += 1;
			}

			if (_lenCount > pLen) {
				_cutString = pStr.substring(0, i);
				_ret = true;
				break;
			} else if (_lenCount == pLen) {
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
		} else {
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

function bindDownload() {
	$('#download').on('click', function() {
		if (isIOS()) {
			$(this).attr('href', 'https://itunes.apple.com/cn/app/id828189113');
		} else {
			$(this).attr('href', 'http://m.hujiang.com/android/HJWordGames.apk');
		}
	});
}

var Passport = function() {
	return {
		GetLoginSource: function(langs) {
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
		Login: function(flag) {
			var langs = 'kxcc';
			var source = Passport.GetLoginSource(langs);
			var url = "http://pass.hujiang.com/m/login/?source=" + source + "&url=" + encodeURIComponent(window.location.href);
			if (flag != "" && flag != undefined) {
				url = "http://pass.hujiang.com/m/login/?source=" + source + "&url=" + encodeURIComponent(window.location.href.split("#")[0] + "#" + flag);
			}
			location.href = url;
		},
		Signup: function() {
			var langs = 'kxcc';
			var source = Passport.GetLoginSource(langs);
			location.href = "http://pass.hujiang.com/m/signup/?source=" + source + "&url=" + encodeURIComponent(window.location.href);
		},
		Logout: function() {
			var langs = 'kxcc';
			var source = Passport.GetLoginSource(langs);
			location.href = "http://pass.hujiang.com/m/logout.aspx?source=" + source + "&url=" + encodeURIComponent(window.location.href);
		}
	}
}();


window.addEventListener("load",function() {
    // Set a timeout...
    setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);
});