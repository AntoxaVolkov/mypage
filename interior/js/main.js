$(function () {
    var $btnNav = $('.nav__gamb');
    var $nav = $('.nav__wrapper')
    $btnNav.click(function (ev) {
        $nav.toggleClass('nav__wrapper--open');
    })
});