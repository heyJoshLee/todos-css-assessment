$(function() {


/////////////
// Events
/////////////


// hightlight current todo
  $("#all-todos").on("click", "li", function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.closest("ul").find(".active").removeClass("active");
    $(this).addClass("active");
  });

  // Toggle menu
  $("#menu-icon").on("click", function(e) {
    e.preventDefault();
    $("#menu").animate({width: "toggle"});
    //$("#menu").fadeToggle();
    //$("#menu").toggleClass("hide");
  });

  // Close modal
  $("#close-button, .modal-bg").on("click", function(e) {
    e.preventDefault();
    $(".modal, .modal-bg").fadeOut();
  });

  // Open modal
  $("#open-button").on("click", function(e) {
    e.preventDefault();
    $(".modal, .modal-bg").fadeIn();
  });

});
