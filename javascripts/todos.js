$(function() {

/////////////
// Events
/////////////

// hightlight date
  $("#dates").on("click", "li", function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.closest("ul").find(".active").removeClass("active");
    $(this).addClass("active");
  });

  // Toggle date_menu
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
    fadeOutModal();
  });

  // Show input to change date
  $("#modal_container").on("dblclick", ".add_date", function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.html(templates.edit_date(current_todo));
  });

  // Save Todo Date
  $("#modal_container").on("click", ".save", function(e) {
    e.preventDefault()
    var $this = $(this),
        new_value = $(".add_date > input").val();

    findWhere("id", current_todo.id, todos).date = new_value ;
    $("#modal_container").html(templates.modal(current_todo));
    fadeOutModal();
    render();
  });

  // Mark Todo as complete in modal
  $("#modal_container").on("click", ".mark_as_complete", function(e) {
    e.preventDefault();
    var $id = $("#modal").attr("data-id"),
        item = findWhere("id", $id, todos);
     item.checked = !item.checked;
    $("#current_todos").find("#" + $id).attr("checked", "checked");
    saveLocalStorage();
    fadeOutModal();
    render();
    console.log(item);
  });

  // Add new Todo
  $("#current_todos").on("click", "#add_button", function(e) {
    e.preventDefault();
    var input = $("#new_todo_input").val();
    new Todo({name: input});
    render();
  });

  // Show modal
  $("#current_todos").on("click", ".modal_launcher", function(e) {
    var $id = $(this).next(".trash_can").attr("data-id");
    $("#modal, #modal_bg").fadeIn();
    current_todo = findWhere("id", $id, todos);
    showModal(current_todo);
  });

  // Delete Todo
  $("#current_todos").on("click", ".trash_can", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id"),
        item_to_delete = findWhere("id", id, todos),
        spot = todos.indexOf(item_to_delete);
    if (spot === -1) {
      alert("can't find");
      return;
    }
    todos.splice(todos.indexOf(item_to_delete), 1);
    render();
  });

  // Check box changes 'checked' attribute of Todo
  $("#current_todos").on("click", "[type='checkbox']", function(e) {
    var $this = $(this),
        $id = $this.attr("data-id"),
        item = findWhere("id", $id, todos);
        item.checked = !item.checked;
        saveLocalStorage();
        render();
  });

  // Find object in collection
  function findWhere(key, value, collection) {
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
      current_todo,
      dates = [{name: "12/25", todos: []}];
      Todo.created = 0;

  function Todo(params) {
      Todo.created++;
      this.name = params.name;
      this.date = undefined;
      this.id = Todo.created;
      this.body = "";
      this.checked = false;
      todos.push(this);
      saveLocalStorage();
      console.log("Created todos: " + Todo.created);
  }


  // Compile Handlebars tempaltes
  $("[type='x-handlebars-template']").each(function(template) {
    var $template = $(this);
    templates[$template.attr("id")] = Handlebars.compile($template.html());
  });

  // Render HTML in #current_todos
  function render() {
    var sorted = sortedTodos(todos);
    $("#current_todos").html(templates.current_todos({todos: sorted}));
  }

  // Load information from localStorage
  function loadTodos() {
    if (localStorage.getItem("todos")) {
      todos = JSON.parse(localStorage.getItem("todos"));
    };

    if (localStorage.getItem("Todo_created")) {
      Todo.created = +localStorage.getItem("Todo_created");
    }
  }

  // Save items to localStorage
  function saveLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("Todo_created", Todo.created);
  }


  // Fill in Modal
  function showModal(current_todo) {
    $("#modal_container").html(templates.modal(current_todo));
  }

  function fadeOutModal() {
    $("#modal, #modal_bg").fadeOut();
  }

  function sortedTodos(array){
    var uncomplete = [],
        complete = [];
    for(var i = 0; i < todos.length; i++) {
      if (todos[i].checked) {
        complete.push(todos[i]);
      } else {
        uncomplete.push(todos[i]);
      }
    }
    return uncomplete.concat(complete);
  }


  function updateDates() {
    $("#dates").html(templates.dates({dates: dates}))
  }

  Handlebars.registerPartial("date", $("#date").html());

  // Load page
  function init() {
    loadTodos();
    updateDates();
    render(sortedTodos());
  }


  init();










});
