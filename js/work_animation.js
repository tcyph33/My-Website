// ANIMATION FOR WORK.HTML

// Hover effects for work container
$(function() {
	$(".image:first-child").mouseenter(ShowFirstChildLink);
    $(".imageOverlay:first-child").mouseleave(HideFirstChildLink);
    $(".image:last-child").mouseenter(ShowLastChildLink);
    $(".imageOverlay:last-child").mouseleave(HideLastChildLink);
});

function ShowFirstChildLink()
{
    $(".image:first-child").css("transform", "scale(1.1) skewX(-55.98deg)");
    $(".WorkContainerOverlay").show();
    $(".imageOverlay:first-child").show();
}

function HideFirstChildLink()
{
    // The skew value is the same as in the work.css
    $(".image:first-child").css("transform", "skewX(-55.98deg)");
    $(".WorkContainerOverlay").hide();
    $(".imageOverlay:first-child").hide();
}

function ShowLastChildLink()
{
    $(".image:last-child").css("transform", "scale(1.1) skewX(-55.98deg)");
    $(".WorkContainerOverlay").show();
    $(".imageOverlay:last-child").show();
}

function HideLastChildLink()
{
    // The skew value is the same as in the work.css
    $(".image:last-child").css("transform", "skewX(-55.98deg)");
    $(".WorkContainerOverlay").hide();
    $(".imageOverlay:last-child").hide();
}
