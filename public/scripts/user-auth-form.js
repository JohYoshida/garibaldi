$(function() {
  // Show login form
  $("#login").click(function() {
    $("#login-form").slideToggle();
    $("#register-form").slideUp();
    $(".warning").slideUp();
  });
  // Show registration form
  $("#register").click(function() {
    $("#register-form").slideToggle();
    $("#login-form").slideUp();
    $(".warning").slideUp();
  });
  // Show warnings
  $(".user-submit").click(function(event) {
    // Hide any existing warnings
    $(".username-field").hide();
    $(".password-field").hide();
    // Show username warning
    var username = $("input.username").val();
    if (!username) {
      event.preventDefault();
      $(".username-field").slideDown();
    }
    // Show password warning
    var password = $("input.password").val();
    if (!password) {
      event.preventDefault();
      $(".password-field").slideDown();
    }
  });
});
