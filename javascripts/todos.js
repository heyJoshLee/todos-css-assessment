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
  $("#current_todos").on("click", "#add_button", function(e) {
    e.preventDefault();
    var input = $("#new_todo_input").val();
    new Todo({name: input});
    render();
  });

  $("#current_todos").on("click", ".trash_can", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    delete todos[id - 1];
    console.log(todos);
    render();
  });

  // Add list button
  $("#add-list").on("click", function(e) {
    e.preventDefault();
  });

 // Handlebars

  var templates = {},
      todos = [];

  function Todo(params) {
      Todo.created++;
      this.name = params.name;
      this.date = "No date yet";
      this.id = Todo.created;
      todos.push(this);
      console.log(todos);
      console.log("Created todos: " + Todo.created);
  }

  Todo.created = 0;

  new Todo({name: "Walk the dog"});




  $("[type='x-handlebars-template']").each(function(template) {
    var $template = $(this);
    templates[$template.attr("id")] = Handlebars.compile($template.html());
  });

  function render() {
    $("#current_todos").html(templates.current_todos({todos: todos}));
  }

  function init() {
    render();
    console.log("rendered!");
  }

  init();










});
