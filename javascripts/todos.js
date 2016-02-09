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
    var $menu = $("#menu");

    $menu.animate({width: "toggle"});
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

  // Add button
  $("#add-button").on("click", function(e) {
    e.preventDefault();
  });

  // Add list button
  $("#add-list").on("click", function(e) {
    e.preventDefault();
  });


  // Handlebars

  var lists = [
    {
      title: "02/16",
      todos: [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
        "Item 7",
        "Item 8",
        "Item 10"
      ]
    },
    {
      title: "03/16",
      todos: [
        "Cool 1",
        "Cool 2",
        "Cool 3",
        "Cool 4",
        "Cool 5",
        "Cool 6",
        "Cool 7",
        "Cool 8",
        "Cool 10"
      ]
    },
    {
      title: "04/16",
      todos: [
        "Third 1",
        "Third 2",
        "Third 3",
        "Third 4",
        "Third 5",
        "Third 6",
        "Third 7",
        "Third 8",
        "Third 10"
      ]
    }
  ];
  var current_todo = lists[0];
  var current_todo_items = current_todo.todos


  var completed_lists = [];

  var temp = Handlebars.compile($("#all-todos-template").html());
  var temp2 = Handlebars.compile($("#current-todo-template").html());

  $("#all-todos").html(temp({lists: lists}));

  $("#all-todos").on("click", "li", function(e) {
    e.preventDefault();
    var current = $("#all-todos li").index(this);
    current_todo = lists[current];
    current_todo_items = current_todo.todos;
    $("#current-todo").html(temp2({todo: current_todo, lists: current_todo.todos}));

  });





});
