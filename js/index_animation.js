// ANIMATION FOR INDEX.HTML

//Animation for verse and reference
$(function() {
	var objectPosition = $('#interests').offset().top - window.innerHeight;
    var eventOccured = false;
    $(window).scroll(function(){

 		var currentPosition = $(window).scrollTop();
 		if( currentPosition > objectPosition && eventOccured == false){
     		eventOccured = true;
            start_anim_verse();
 		}
	});
});

function start_anim_verse(){
    $('.bible_stuff').addClass('start');
}



//Animation for descriptions
$(function() {
	var objectPosition = $('#footer').offset().top - window.innerHeight;
    var eventOccured = false;
    $(window).scroll(function(){

 		var currentPosition = $(window).scrollTop();
 		if( currentPosition > objectPosition && eventOccured == false){
     		eventOccured = true;
            start_anim();
 		}
	});
});

function start_anim(){
    $('.descriptionpara').addClass('start');
}
