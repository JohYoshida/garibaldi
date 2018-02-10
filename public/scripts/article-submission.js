$(function() {
  $(".alert").hide();
  $("form.article-form").submit(function(event) {
    $(".alert").empty();

    var formData = new FormData(this);
    var title = $(".article-title").val();

    if (!title) {
      event.preventDefault();
      $('.alert').slideDown().append("<p>Title is required!</p>");
    }
  });
});
