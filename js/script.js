/* Author: Henry Proudlove

*/

var offset = 245;

jQuery.fn.docHeight = function(){
	var o = $(this[0]);
	var oMargin = (o.outerHeight(true) - o.height()) / 2;
	var winHeight = $(window).height();
	o.height(winHeight - offset - oMargin);
}

jQuery.fn.pageNav = function(){
	$(this).click(function(event){
		
		// TOGGLE CURRENT CLASS
		if($(this).hasClass('current') == false){
			$(this).siblings().removeClass('current');
			$(this).addClass('current');
		}
		
		// FIND TARGET
		target = $(this).attr('href');
		animateToTarget(target);
		event.preventDefault();
	});
}

jQuery.fn.secSwitch = function(currentPos){

	var o = $(this);
	var sections = [];
	
	o.each(function(){
		yPos = Math.abs($(this).offset().top - $(window).scrollTop() - offset);
		sections.push(yPos);
		$(this).data('yPos' , yPos);
	});
	
	closestSec = Math.min.apply(null, sections);
	activeSec = o.filter(function() { 
		return $.data(this, "yPos") == closestSec; 
	});
	
	if(activeSec.hasClass('current') == false){
	
		// ADD ACTIVE CLASS TO CURRENT SECTION
		activeSec.siblings().removeClass('current');
		activeSec.addClass('current');
	
		// ADDING ACTIVE SEC ID BODY AND MATCHING NAV ITEM
		currentSec = activeSec.attr('id');
		$('body').removeClass().addClass(currentSec);
		currentNav = $('#site-navigation a').filter(function(index){
			return $(this).attr('href') == '#' + currentSec;
		});
		
		currentNav.siblings().removeClass('current');
		currentNav.addClass('current');
	}
	
}

function animateToTarget(target){
	$('html, body').stop().animate({
		scrollTop: $('section'+target).offset().top - offset
	}, 750,'easeInOutExpo');	
}

$(document).ready(function(){
	$('#main > section.last').docHeight();
	$('#site-navigation a').pageNav();
	$('#site-title a').click(function(event){
		$('#site-navigation a').removeClass('current');
		target = $(this).attr('href');
		animateToTarget(target);
		event.preventDefault();
	});
	$('#main > section').secSwitch();
	$(window).bind('scrollstop', function(){
		$('#main > section').secSwitch();
	});
});

$(window).smartresize(function(){  
	$('section.last').docHeight();
});

$(window).scroll(function(){
	var bPos = ($(this).scrollTop() / 8);
	$('#site-title').css('background-position-y', bPos); 
});


