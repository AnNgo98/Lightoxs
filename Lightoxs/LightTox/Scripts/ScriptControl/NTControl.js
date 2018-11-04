$(document).ready(function () {
    Resize();
    $("button[data-toggle='dropdown']").click(evtDropdown);
    $(document).on("click", releaseDropdown);
})
function releaseDropdown(e) {
    var doc = $(e.target);
    $("button[data-toggle='dropdown']").each(function (i) {
        var popup = $(".dropdown-menu[aria-labelledby='" + $(this).attr("id") + "']");
        if (($(this).attr("aria-expanded") == "true") && (doc[0] != $(this)[0])) {
            popup.slideUp(300);
            $(this).attr("aria-expanded", false);
            return;
        }
    });
}
function evtDropdown(e) {
    e.preventDefault();
    var id = $(this).attr("id");
    var expand = $(this).attr("aria-expanded");
    var popup = $(".dropdown-menu[aria-labelledby='" + id + "']");
    var wH = $(window).height();
    var wW = $(window).width();
    var dx = $(this).position().top + $(this).outerHeight();
    var dy = $(this).position().left;
    var t, l;
    console.log(expand);
    if (expand == "false") {
        var cur = popup.position();
        if (dx + popup.outerHeight() > wH) {
            t = dx - $(this).outerHeight() - popup.outerHeight() - 5;
        } else {
            t = dx + 5;
        }

        if (dy + popup.outerWidth() > wW) {
            l = dy - $(this).outerWidth() - popup.outerWidth();
        } else {
            l = dy;
        }
        popup.css("top", t);
        popup.css("left", l);
        popup.css("height", "auto");
        $(this).attr("aria-expanded", true);
        $(".dropdown-menu[aria-labelledby='" + id + "']").slideDown(300);
    } else {
        $(".dropdown-menu[aria-labelledby='" + id + "']").slideUp(300);
        $(this).attr("aria-expanded", false);
    }
}
function Resize() {
    $(".btn").mousedown(createRipple);

}
function createRipple(e) {
    e.preventDefault();
    /*
        Note that these next two lines will create a
        NEW ripple element for each click. If this is
        undesirable behavior, try:
        
        * Setting a timeout to delete the element
        * Checking if an element has already been made & reuse it
        * Create an element around line 8 and always reuse it
        * etc.
    */
    $(this).children(".btn-ripple").remove();
    var circle = document.createElement('div');
    this.appendChild(circle);

    var d = Math.max(this.clientWidth * 40 / 100, this.clientHeight * 40 / 100);

    circle.style.width = circle.style.height = d + 'px';

    var p = $(this).offset();


    circle.style.left = e.pageX - p.left - d / 2 + 'px';
    circle.style.top = e.pageY - p.top - d / 2 + 'px';
    circle.classList.add('btn-ripple');
}