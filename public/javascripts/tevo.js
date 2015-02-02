$(function () {

  // TOOLTIPS
  $('[data-toggle=tooltip]').tooltip();
  // POPOVERS
  $('[data-toggle=popover]').popover();

  $('.dropdown-toggle').dropdown()

  // SETUP LOGIN SUBMENU ///////////////////////////////////////////////////

  // Constants.
  var SUBNAV_HEIGHT = 50;
  var ANIMATION_SPEED = 250; // milliseconds
  var DISSAPPEAR_AFTER = 5000; // milliseconds


  // Grab subMenu & body & loginButton.
  var $subMenu = $('#loginSubMenu');
  var $body = $('body');
  var $loginButton = $('#loginButton');

  var originalBodyMargin = parseInt($body.css('marginTop'));
  // The timeout function for resetting subMenu.
  var resetTimeout = null;

  var appear = function () {
    $subMenu.animate({
      height: SUBNAV_HEIGHT + 'px'
    }, ANIMATION_SPEED);

    $body.animate({
      marginTop: (originalBodyMargin + SUBNAV_HEIGHT) + 'px'
    }, ANIMATION_SPEED);
  };

  var dissappear = function () {
    $subMenu.animate({
      height: '0px'
    }, ANIMATION_SPEED);

    $body.animate({
      marginTop: originalBodyMargin + 'px'
    }, ANIMATION_SPEED);
  };

  var onLoginClick = function (e) {
    appear();
    resetDissappearTimer();
  };

  var resetDissappearTimer = function () {
    if (resetTimeout) {
      clearTimeout(resetTimeout);
    }
    resetTimeout = setTimeout(dissappear, DISSAPPEAR_AFTER);
  };

  $subMenu.on('mousemove', resetDissappearTimer);
  $loginButton.on('click', onLoginClick);

});