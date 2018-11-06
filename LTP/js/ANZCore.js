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
    /*    $(window).scroll(function () {
            var sticky = $('header'),
                scroll = $(window).scrollTop();
    
            if (scroll >= 150 && sticky.hasClass("fixed")) {
                $(".header3").addClass("animation");
                $("#mobile-menu").addClass("fixed");
            }
            if (scroll >= 70 && !sticky.hasClass("fixed")) {
    
                sticky.addClass('fixed')
                // sticky.css("display", "none");
    
            }
            if (scroll < 70 && sticky.hasClass("fixed")) {
                sticky.removeClass('fixed');
                $("#mobile-menu").removeClass("fixed");
    
            }
        });
        */

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
/*
function ANZCore() {
    this.RenderPartial = function () {
        setTimeout(function a() {
            if (particlesJS === 'undefined') {
                setTimeout(a, 100);
            } else {
                particlesJS.load('particles-js', '/Scripts/paritcals.json', function () {
                    // console.log('callback - particles.js config loaded');
                });
            }
        }, 100);
    };
}
*/
// var ANZ = new ANZCore();


// Sticky Header
window.onscroll = function () { myFunction(); };

var header = document.getElementById("StickyHeader");
var body = document.getElementById("stickyBody");
var sticky = header.offsetTop;
//var product1 = document.getElementById("ani_product3");

function myFunction() {
    if (window.pageYOffset >= sticky) {
        header.classList.add("sticky");
        body.classList.add("stickyBody");
    } else {
        if (header != null) {
            header.classList.remove("sticky");
            body.classList.remove("stickyBody");
        }
    }

    //if (window.pageYOffset + $(window).height() >= product1.offsetTop) {
    //    product1.classList.add("slideInLeft");
    //    document.getElementById("ani_product4").classList.add("slideInLeft");
    //    document.getElementById("ani_innojector").classList.add("slideInUp");
    //    document.getElementById("ani_product_logo").classList.add("slideInRight");
    //}
}


//$(window).ready(function () {
//    if (window.outerHeight >= product1.offsetTop) {
//        product1.classList.add("slideInLeft");
//        document.getElementById("ani_product4").classList.add("slideInLeft");
//        document.getElementById("ani_innojector").classList.add("bounceInDown");
//        document.getElementById("ani_product_logo").classList.add("slideInRight");
//    }
//});


/***** Back To Top *****/

// Initiate the wowjs animation library
new WOW().init();


