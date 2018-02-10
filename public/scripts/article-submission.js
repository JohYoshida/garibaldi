$(function() {
  // Alert panel starts hidden
  $(".alert").hide();

  // Alert user if article is submitted without a title
  $("form.article-form").submit(function(event) {
    // Make sure alert panel is empty
    $(".alert").empty();

    // Get the value of the title field
    var title = $(".article-title").val();
    // Prevent form submission and add a message to the alert panel
    if (!title) {
      event.preventDefault();
      $('.alert').slideDown().append("<p>Title is required!</p>");
    }
  });
});
