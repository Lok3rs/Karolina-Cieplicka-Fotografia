$(".carousel").carousel({
  interval: 3500
});

$(window).on("scroll", () => {
  const navbar = $(".navbar");
  navbar.css("background-color", "rgba(227, 168, 125, 0.5)");
  if (navbar.position().top == 0) {
    navbar.css("background-color", "");
  }
});
