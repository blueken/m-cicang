function init_header() {
	var stand_height = 416 * 0.5;
	var stand_width = 640 * 0.5;

	var ratio = $(window).width() / stand_width;

	$.get("header.html",function(tmpl) {
        var pageData = {"title":"开心词场", "back_url":"", "down_url":"http://www.yahoo.com"};
        _.defaults(pageData, {"title":"开心词场", "back_url":"", "down_url":"http://www.yahoo.com"});
        var header_html = _.template(tmpl,pageData);
        $("header").html(header_html);
    });


    // $("header").css("height", 45*ratio);
    // $("header").css("line-height", 45*ratio+"px");
}
function init_cloud() {
	var stand_height = 416 * 0.5;
	var stand_width = 640 * 0.5;

	var ratio = $(window).width() / stand_width;
	var cloud_height = ratio * stand_height;

	var cloud_b_stand_h = 135 * 0.5;
	var cloud_f_stand_h = 135 * 0.5;
	var cloud_b_actua_h = cloud_b_stand_h * ratio;
	var cloud_f_actua_h = cloud_f_stand_h * ratio;

	$(".cloud_b").css("height", cloud_b_actua_h);
	$(".cloud_f").css("height", cloud_f_actua_h);

	//var cloud_y = $(window).width() * (920 / 640) * (504/920);
	// $(".cloud_b").css("bottom", cloud_y-1*cloud_b_actua_h);
	// $(".cloud_f").css("bottom", cloud_y-1*cloud_f_actua_h);

	var clouds_bg_actua_h = $(window).width() * (920 / 640) * ((416+135)/920);
	$(".clouds").css("height", clouds_bg_actua_h); 
}

