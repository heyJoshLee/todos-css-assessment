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
  $(document).on("click", "#close_button, #modal_bg", function(e) {
    e.preventDefault();
    $("#modal, #modal_bg").fadeOut();
  });

  $("#modal_container").on("dblclick", ".add_date", function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.html(templates.edit_date(current_todo));
    console.log("Come add the date");
  });

  $("#modal_container").on("click", ".save", function(e) {
    e.preventDefault()
    var $this = $(this);
    var new_value = $(".add_date > input").val();
    console.log(new_value)
    find_where("id", current_todo.id, todos).date = new_value ;
    $("#modal_container").html(templates.modal(current_todo));
    $("#modal, #modal_bg").fadeOut();
    render();
  });


  // Add button
  $("#current_todos").on("click", "#add_button", function(e) {
    e.preventDefault();
    var input = $("#new_todo_input").val();
    new Todo({name: input});
    render();
  });

  $("#current_todos").on("click", ".modal_launcher", function(e) {
    var $id = $(this).next(".trash_can").attr("data-id");
    $("#modal, #modal_bg").fadeIn();
    current_todo = find_where("id", $id, todos);
    console.log("current todo:  " + current_todo.name);
    showModal(current_todo);
  })

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
      todos = [],
      current_todo;
      Todo.created = 0;

  function Todo(params) {
      Todo.created++;
      localStorage.setItem("Todo_created", Todo.created);
      this.name = params.name;
      this.date = undefined;
      this.id = Todo.created;
      this.body = "";
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

  function showModal(current_todo) {
    $("#modal_container").html(templates.modal(current_todo));
    console.log("fill in modal with " + current_todo);
  }


  init();










});
