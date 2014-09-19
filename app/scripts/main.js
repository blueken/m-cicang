function initHeader(pageData) {
	'use strict';
	var stand_height = 416 * 0.5;
	var stand_width = 640 * 0.5;

	pageData = pageData ? pageData : {};

	$.get('inc_header.html', function(tmpl) {
		
		_.defaults(pageData, {
			'title': 'Default title',
			'back_url': '',
			'down_url': 'http://www.default.com'
		});
		var header_html = _.template(tmpl, pageData);
		$('header').html(header_html);

		$('.btn_menu').click(function(){
			var menu = $('.btn_menu');
			var menuContent = $('.menu_content');
			// var bOn = menuContent.hasClass('menu_content_on');
			 var bOn = parseInt($(".menu_content").css("top")) > 0;
			if (bOn) {
				// menuContent.removeClass('menu_content_on').addClass('menu_content_off');
				menu.removeClass('btn_menu_on');
				menuContent.animate({
					top: '-50%'
				});
			} else {
				// menuContent.removeClass('menu_content_off').addClass('menu_content_on');
				menu.addClass('btn_menu_on');
				menuContent.animate({
					top: '9.56%'
				});
			}
		});
	});
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
	var cloud_b_actua_h = cloud_b_stand_h * ratio;
	var cloud_f_actua_h = cloud_f_stand_h * ratio;

	$('.cloud_b').css('height', cloud_b_actua_h);
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

	});
}
function cloudDown(percent) {
	var p = percent ? percent : '-33%';
	$(".clouds").css("bottom", p);
}
function bindEvents() {
	'use strict';
	$(window).on('resize', function() {
		initCloud();
	});

}