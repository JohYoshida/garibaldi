$(function() {
  $(".add-header").click(function() {
    insertHeader();
  });
  $(".add-paragraph").click(function() {
    insertParagraph();
  });
  $(".add-image").click(function() {
    insertImage();
  });
  $("form").on("click", "button.remove", function() {
    $(this)
      .parent()
      .remove();
  });
});

function insertHeader() {
  $("<section></section>")
    .appendTo("#components")
    .append("<input type='text' name='header' placeholder='header'>")
    .append("<input type='hidden' name='component' value='h'>")
    .append("<button class='remove' type='button'>Remove Header</button>");
}

function insertParagraph() {
  $("<section></section>")
    .appendTo("#components")
    .append("<textarea name='paragraph' rows='8' cols='80'></textarea>")
    .append("<input type='hidden' name='component' value='p'>")
    .append("<button class='remove' type='button'>Remove Paragraph</button>");
}

let imageCount = 1;
function insertImage() {
  $("<section></section>")
    .appendTo("#components")
    .append("<input type='file' name='images' placeholder='image'>")
    .append("<input type='hidden' name='component' value='i'>")
    .append("<button class='remove' type='button'>Remove Image</button>");
  imageCount++;
}
