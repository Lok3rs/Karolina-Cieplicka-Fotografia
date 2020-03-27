// Welcome page slider
$(".carousel").carousel({
  interval: 3500
});
// Changing nav color when scrolling down, reset if it's on top
// check if navbar is on top, if not- change color
$(window).on("scroll", () => {
  const navbar = $(".navbar");
  navbar.position().top == 0
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
