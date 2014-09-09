function initHeader() {
	var stand_height = 416 * 0.5;
	var stand_width = 640 * 0.5;

	var ratio = $(window).width() / stand_width;

	$.get('header.html', function(tmpl) {
		var pageData = {
			'title': '开心词场',
			'back_url': '',
			'down_url': 'http://www.yahoo.com'
		};
		_.defaults(pageData, {
			'title': '开心词场',
			'back_url': '',
			'down_url': 'http://www.yahoo.com'
		});
		var header_html = _.template(tmpl, pageData);
		$('header').html(header_html);
	});


	// $('header').css('height', 45*ratio);
	// $('header').css('line-height', 45*ratio+'px');
}

function initCloud() {
	document.title = Math.random();
	var cloud_b_stand_h = 135 * 1;
	var cloud_f_stand_h = 135 * 1;


	var clouds_bg_h_by_width = $(".ratio").width() * (920 / 640) * ((416 + 135) / 920);
	var clouds_bg_h_by_height = $(".ratio").height() * ((416+135) / 920);
	var clouds_bg_actua_h = Math.min(clouds_bg_h_by_width, clouds_bg_h_by_height);
	$('.clouds').css('height', clouds_bg_actua_h);


	var ratio = clouds_bg_actua_h / (551);
	var cloud_b_actua_h = cloud_b_stand_h * ratio;
	var cloud_f_actua_h = cloud_f_stand_h * ratio;

	$('.cloud_b').css('height', cloud_b_actua_h);
	$('.cloud_f').css('height', cloud_f_actua_h);
}

function bindEvents() {
	$(window).on('resize', function() {
		initCloud();
	});
}