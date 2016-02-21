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
    var item_to_delete = find_where("id", id, todos);
    var spot = todos.indexOf(item_to_delete);
    if (spot === -1) {
      alert("can't find");
      return; 
    }
    todos.splice(todos.indexOf(item_to_delete), 1);
    console.log("id to delete: " + id);
    console.log(todos);
    render();
  });

  function find_where(key, value, collection) {
    var match;
    for(var i = 0; i < collection.length; i++) {
      if (collection[i][key] === +value) {
        match = collection[i];
      }
    }
    return match;
  }

  // Add list button
  $("#add-list").on("click", function(e) {
    e.preventDefault();
  });

 // Handlebars

  var templates = {},
      todos = [];
      Todo.created = 0;

  function Todo(params) {
      Todo.created++;
      localStorage.setItem("Todo_created", Todo.created);
      this.name = params.name;
      this.date = "No date yet";
      this.id = Todo.created;
      todos.push(this);
      console.log("Created todos: " + Todo.created);
  }



  $("[type='x-handlebars-template']").each(function(template) {
    var $template = $(this);
    templates[$template.attr("id")] = Handlebars.compile($template.html());
  });

  function render() {
    $("#current_todos").html(templates.current_todos({todos: todos}));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadTodos() {
    if (localStorage.getItem("todos")) {
      todos = JSON.parse(localStorage.getItem("todos"));
    };

    if (localStorage.getItem("Todo_created")) {
      Todo.created = +localStorage.getItem("Todo_created");
    }
  }

  function init() {
    loadTodos();
    render();
    console.log("rendered!");
    console.log(todos);
  }

  init();










});
