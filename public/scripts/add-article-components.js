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
  $("form").on("click", "button.remove-component", function() {
    $(this).parent().remove();
  });
});

function insertHeader() {
  $("<section></section>").insertBefore(".article-submit")
  .append("<button class='remove-component' type='button'>Remove Header</button>")
  .append("<input type='text' name='header' placeholder='header'>")
  .append("<input type='hidden' name='component' value='h'>");
}

function insertParagraph() {
  $("<section></section>").insertBefore(".article-submit")
  .append("<button class='remove-component' type='button'>Remove Paragraph</button>")
  .append("<textarea name='paragraph' rows='8' cols='80'></textarea>")
  .append("<input type='hidden' name='component' value='p'>");
}

let imageCount = 1;
function insertImage() {
  $("<section></section>").insertBefore(".article-submit")
  .append("<button class='remove-component' type='button'>Remove Image</button>")
  .append("<input type='file' name='image_" + imageCount + "' placeholder='image'>")
  .append("<input type='hidden' name='component' value='i'>");
  imageCount++;
}
