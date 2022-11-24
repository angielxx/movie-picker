$(document).ready(function () {
    if ($(this).width() < 769) { $('body').addClass('body-small') } else { $('body').removeClass('body-small') }
    $('.fullscreen-link').on('click', function () { var ibox = $(this).closest('div.ibox'); var button = $(this).find('i'); $('body').toggleClass('fullscreen-ibox-mode'); button.toggleClass('fa-expand').toggleClass('fa-compress'); ibox.toggleClass('fullscreen'); setTimeout(function () { $(window).trigger('resize'); }, 100); }); $('.check-link').on('click', function () { var button = $(this).find('i'); var label = $(this).next('span'); button.toggleClass('fa-check-square').toggleClass('fa-square-o'); label.toggleClass('todo-completed'); return false; }); $('.navbar-minimalize').on('click', function () { $("body").toggleClass("mini-navbar"); SmoothlyMenu(); }); $('.tooltip-demo').tooltip({ selector: "[data-toggle=tooltip]", container: "body" }); function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61; $(".sidebar-panel").css("min-height", heightWithoutNavbar + "px"); var navbarheight = $('nav.navbar-default').height(); var wrapperHeight = $('#page-wrapper').height(); if (navbarheight > wrapperHeight) { $('#page-wrapper').css("min-height", navbarheight + "px"); }
        if (navbarheight < wrapperHeight) { $('#page-wrapper').css("min-height", $(window).height() + "px"); }
        if ($('body').hasClass('fixed-nav')) { if (navbarheight > wrapperHeight) { $('#page-wrapper').css("min-height", navbarheight + "px"); } else { $('#page-wrapper').css("min-height", $(window).height() - 60 + "px"); } }
    }
    fix_height(); $(window).scroll(function () { if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) { $('#right-sidebar').addClass('sidebar-top'); } else { $('#right-sidebar').removeClass('sidebar-top'); } }); $(window).bind("load resize scroll", function () { if (!$("body").hasClass('body-small')) { fix_height(); } }); $("[data-toggle=popover]").popover();
}); $(window).bind("resize", function () { if ($(this).width() < 769) { $('body').addClass('body-small') } else { $('body').removeClass('body-small') } }); $(document).ready(function () {
    if (localStorageSupport()) {
        var collapse = localStorage.getItem("collapse_menu"); var fixedsidebar = localStorage.getItem("fixedsidebar"); var fixednavbar = localStorage.getItem("fixednavbar"); var boxedlayout = localStorage.getItem("boxedlayout"); var fixedfooter = localStorage.getItem("fixedfooter"); var body = $('body'); if (fixedsidebar == 'on') { body.addClass('fixed-sidebar'); }
        if (collapse == 'on') { if (body.hasClass('fixed-sidebar')) { if (!body.hasClass('body-small')) { body.addClass('mini-navbar'); } } else { if (!body.hasClass('body-small')) { body.addClass('mini-navbar'); } } }
        if (fixednavbar == 'on') { $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top'); body.addClass('fixed-nav'); }
        if (boxedlayout == 'on') { body.addClass('boxed-layout'); }
        if (fixedfooter == 'on') { $(".footer").addClass('fixed'); }
    }
}); function localStorageSupport() { return (('localStorage' in window) && window['localStorage'] !== null) }
function animationHover(element, animation) { element = $(element); element.hover(function () { element.addClass('animated ' + animation); }, function () { window.setTimeout(function () { element.removeClass('animated ' + animation); }, 2000); }); }