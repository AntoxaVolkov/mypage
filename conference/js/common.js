$(document).ready(function() {

	$(".btn_top_nav").click(function(){
		$(this).next().addClass("open-nav");
	});
	$(".btn_top_nav_close").click(function(){
		$(this).parent().parent().removeClass("open-nav");
	});

	var amenu = $(".agenda_block ul li .block");
	$(".agenda_block .block h4").click(function(){
		amenu.removeClass("active");
		$(this).parent().addClass("active");
	});

});