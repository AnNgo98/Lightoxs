var buttons = document.getElementsByTagName('button');

$(document).ready(function () {
    $(Window).scrollTop(0);
    //$(document).on('resize', Resize);
    $(".image-galery .next").click(function () {
        var pos = $(".image-galery").scrollLeft();
        $(".image-galery").animate({ scrollLeft: pos + 250 }, 5);
    });
    $(".image-galery .prev").click(function () {
        var pos = $(".image-galery").scrollLeft();
        $(".image-galery").animate({ scrollLeft: pos - 250 }, 5);
    });
    var pressed = false;
    var pos;
    var pointX = undefined;
    $(".image-galery").mousedown(function (e) {
        pressed = true;
        pointX = e.pageX;
        pos = $(this).scrollLeft();
        return false;
    });
    $(document).mouseup(function () {
        pressed = false;
    });
    $(document).mousemove(function (e) {
        if (pressed === true) {
            var dx = pointX - e.pageX;
            $(".image-galery").animate({ scrollLeft: pos + dx }, 5);
            return false;
        }
    });
    var currentHeight = $(".header3").height();

    $("#mobile-menu > .navbar-nav").on("click", function (e) {
        var curr = $(e.target);
        var parrent = curr.parent();
        if (parrent.hasClass("has-dropdown-menu")) {

            var child = parrent.children(".dropdown-menu");
            if (parrent.hasClass("toggled")) {
                parrent.toggleClass("toggled");
                child.slideUp();
            } else {
                parrent.toggleClass("toggled");
                child.slideToggle(300);
            }

        }
    });

    var event = $(".main-menu-mobile").find("a");
    event.click(function () {
        if ($(".main-menu-mobile").hasClass("active")) {
            $("#mobile-menu").slideUp();
            $("#mobile-menu").removeClass("fixed");
            $(".main-menu-mobile").toggleClass("active");

        } else {
            $(".main-menu-mobile").toggleClass("active");
            $("#mobile-menu").slideToggle(320);
            if ($("header").hasClass("fixed")) {
                $("#mobile-menu").toggleClass("fixed");
            }
        }
    });
    // ===== Scroll to Top ==== 
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 1000) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function () {      // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0                       // Scroll to top of body
        }, 500);
    });
});


// Sticky Header
window.onscroll = function () { myFunction(); };

var header = document.getElementById("StickyHeader");
var body = document.getElementById("stickyBody");
if (header != null) {
    var sticky = header.offsetTop;
}
//var product1 = document.getElementById("ani_product3");

function myFunction() {

    if (window.pageYOffset >= sticky) {
        header.classList.remove("StickyHeader");
        header.classList.add("sticky");
        body.classList.add("stickyBody");
    } else {
        if (header != null) {
            header.classList.remove("sticky");
            body.classList.remove("stickyBody");
            header.classList.add("StickyHeader");
        }
    }
}

// Initiate the wowjs animation library
new WOW().init();



/// scroll down

function smoothScroll(target) {

    $("#main-menu-mobile").click();

    var scrollContainer = target;
    do { //find scroll container
        scrollContainer = scrollContainer.parentNode;
        if (!scrollContainer) return;
        scrollContainer.scrollTop += 1;
    } while (scrollContainer.scrollTop == 0);

    var targetY = 0;
    do { //find the top of target relatively to the container
        if (target == scrollContainer) break;
        targetY += target.offsetTop;
    } while (target = target.offsetParent);

    targetY -= 120;

    scroll = function (c, a, b, i) {
        i++; if (i > 30) return;
        c.scrollTop = a + (b - a) / 30 * i;
        setTimeout(function () { scroll(c, a, b, i); }, 10);
    }
    // start scrolling
    scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}



// pagination for News
$(document).ready(function () {
    $("#pagenum1").click(function () {
        $("#page1").show();
        $("#page2").hide();
        $("#page3").hide();
        $("#page4").hide();
        $("#pagenum1").addClass("active");
        $("#pagenum2").removeClass("active");
        $("#pagenum3").removeClass("active");
        $("#pagenum4").removeClass("active");
        $("html, body").animate({scrollTop: 0}, 1000);
    });
    $("#pagenum2").click(function () {
        $("#page1").hide();
        $("#page2").show();
        $("#page3").hide();
        $("#page4").hide();
        $("#pagenum1").removeClass("active");
        $("#pagenum2").addClass("active");
        $("#pagenum3").removeClass("active");
        $("#pagenum4").removeClass("active");
        $("html, body").animate({scrollTop: 0}, 1000);
    });
    $("#pagenum3").click(function () {
        $("#page1").hide();
        $("#page2").hide();
        $("#page3").show();
        $("#page4").hide();
        $("#pagenum1").removeClass("active");
        $("#pagenum2").removeClass("active");
        $("#pagenum3").addClass("active");
        $("#pagenum4").removeClass("active");
        $("html, body").animate({scrollTop: 0}, 1000);
    });
    $("#pagenum4").click(function () {
        $("#page1").hide();
        $("#page2").hide();
        $("#page3").hide();
        $("#page4").show();
        $("#pagenum1").removeClass("active");
        $("#pagenum2").removeClass("active");
        $("#pagenum3").removeClass("active");
        $("#pagenum4").addClass("active");
        $("html, body").animate({scrollTop: 0}, 1000);
    });
});