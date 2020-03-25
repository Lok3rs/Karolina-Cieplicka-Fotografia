$(".carousel").carousel({
  interval: 3500
});

$(window).on("scroll", () => {
  const navbar = $(".navbar");
  navbar.position().top == 0
    ? navbar.css("background-color", "")
    : navbar.css("background-color", "rgba(243, 236, 228, 0.5)");
});
$(".loadmore").html = "Załaduj więcej";
