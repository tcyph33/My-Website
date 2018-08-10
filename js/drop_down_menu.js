var mediaQuery = window.matchMedia("(min-width: 800px)");

//toggle menu for small screens and mobile devices
$("#menu_icon").click(function(){
    $("#drop_menu").stop().slideToggle();
    $(this).toggleClass("upright rotated");
});


//hide drop menu if it is down and window is resized
//to where drop menu is no longer required
function hideDropMenu(){
    if(!mediaQuery.match){
        $("#drop_menu").hide();
        $("#menu_icon").removeClass("rotated");
        $("#menu_icon").addClass("upright");
    }
}

//listen for screen size change
mediaQuery.addListener(hideDropMenu);
