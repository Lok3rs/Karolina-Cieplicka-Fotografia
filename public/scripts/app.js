// Welcome page slider
$(".carousel").carousel({
  interval: 3500
});
// Changing nav color when scrolling down, reset if it's on top
// check if navbar is on top, if not- change color
$(window).on("scroll", () => {
  const navbar = $(".navbar");
  $(window).scrollTop() == 0
    ? navbar.css("background-color", "")
    : navbar.css("background-color", "rgba(243, 236, 228, 0.5)");
});
// Add hover effect on gallery list
const appSpan = `<span class="gallery-enter d-flex align-items-center justify-content-center">Wejdź</span>`;

$(".gallery-link").mouseover(function() {
  $(this).addClass("gallery-enter-hover");
  $(this).append(appSpan);
});

$(".gallery-link").mouseout(function() {
  $(this).removeClass("gallery-enter-hover");
  $(this)
    .find("span")
    .text("");
});
// Same on gallery ellements
$(".gallery-thumbnail-link").mouseover(function() {
  $(this).addClass("gallery-enter-hover");
});

$(".gallery-thumbnail-link").mouseout(function() {
  $(this).removeClass("gallery-enter-hover");
  $(this).find("span");
});

// Blog content displaying properly
const blogContent = $(".blog-content");
const blogText = blogContent.text();

blogContent.html(blogText);

// Proper display of substring on list of blox (without html tags)
const subcontent = $(".content-sub");

for (let content of subcontent) {
  let text = $(content).text();
  $(content).html(text);
  let actual = $(content).text();
  $(content).text(actual);
}
