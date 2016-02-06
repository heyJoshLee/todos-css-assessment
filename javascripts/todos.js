$(function() {


// Events

  // hightlight current todo

  $(".all-todos").on("click", "li", function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.closest("ul").find(".active").removeClass("active");
    $(this).addClass("active");
  });

  // mark as complete
  // toggle class would add class, but not remove class
  $(".current-todo").on("click", "label", function(e) {
    var $this = $(this);
      $this.parent("li").addClass("complete");

  });



  // Toggle menu
  $("#menu-icon").on("click", function() {
    $("#menu").animate({width: "toggle"});
  });

  $(".close-button, .modal-bg").on("click", function() {
    $(".modal, .modal-bg").fadeOut();
  });

  $(".open-button").on("click", function(e) {
    e.preventDefault();
    $(".modal, .modal-bg").fadeIn();
  });

});
