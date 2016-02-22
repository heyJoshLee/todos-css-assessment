$(function() {

/////////////
// Events
/////////////

// hightlight date
  $("#dates").on("click", "li", function(e) {
    e.preventDefault();
    var $this = $(this),
        date = $this.find("a").html();
    $this.closest("ul").find(".active").removeClass("active");
    $(this).addClass("active");
    current_date = date;
    console.log("current date is : " + current_date);
    loadTodosByDate(date);
  });

  // hightlight all_todos_button
  $("#menu").on("click", "#all_todos_button", function(e) {
    e.preventDefault();
    var $this = $(this),
        date = $this.html();
      $this.closest("ul").find(".active").removeClass("active");
      $(this).addClass("active");
      current_date = "All Todos";
      render();
  })

  // Toggle date_menu
  $("#menu_icon").on("click", function(e) {
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
        new_value = $(".add_date > input").val(),
        item = findWhere("id", current_todo.id, todos) ;

    item.date = new_value;
    $("#modal_container").html(templates.modal(current_todo));
    createNewDate(item);
    fadeOutModal();
    renderDates();
    saveLocalStorage();
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
    renderDates();
    render();
  });

  // Add new Todo
  $("#current_todos").on("click", "#add_button", function(e) {
    e.preventDefault();
    var input = $("#new_todo_input").val();
    new Todo({name: input});

    $("#menu").find(".active").removeClass("active");
    $("h1#all_todos_button").addClass("active");

    $(this).addClass("active");
    renderDates();
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
        spot = todos.indexOf(item_to_delete),
        date_to_check = item_to_delete.date;
    if (spot === -1) {
      alert("can't find");
      return;
    }
    checkToDeleteDate(date_to_check);

    todos.splice(todos.indexOf(item_to_delete), 1);
    saveLocalStorage();
    renderDates();
    render();
  });

  // Check box changes 'checked' attribute of Todo
  $("#current_todos").on("click", "[type='checkbox']", function(e) {
    var $this = $(this),
        $id = $this.attr("data-id"),
        item = findWhere("id", $id, todos);
        item.checked = !item.checked;
        saveLocalStorage();
        renderDates();
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

 // Handlebars

  var templates = {},
      todos = [],
      current_todo,
      dates = [];
      Todo.created = 0,
      current_date = "Title";

  function Todo(params) {
      Todo.created++;
      this.name = params.name;
      this.date = undefined;
      this.id = Todo.created;
      this.body = "";
      this.checked = false;
      todos.push(this);
      saveLocalStorage();
  }

  function loadTodosByDate(date) {
    var todosByDate = findManyWhere("date", date, todos);
    console.log(incompleteItems(todosByDate));
    $("#current_todos").html(templates.current_todos({todos: sortedArray(todosByDate), list_name: date, todos_length: incompleteItems(todosByDate).length}));
  }

  function incompleteItems(array) {
    var arr = [];

    for(var i = 0; i < array.length; i++) {
      if (!array[i].checked) {
        arr.push(array[i]);
      }
    }

    return arr;
  }

  function findManyWhere(key, value, collection) {
    var matches = [];
    for(var i = 0; i < collection.length; i++) {
      if (collection[i][key] === value) {
        matches.push(collection[i]);
      }
    }
    return matches;
  }

  // Compile Handlebars tempaltes
  $("[type='x-handlebars-template']").each(function(template) {
    var $template = $(this);
    templates[$template.attr("id")] = Handlebars.compile($template.html());
  });

  Handlebars.registerPartial("date", $("#date").html());

  // Render HTML in #current_todos
  function render() {
    var sorted = sortedArray(todos);
    $("#current_todos").html(templates.current_todos({todos: sorted, list_name: current_date, todos_length: incompleteItems(sorted).length}));
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

  function loadDates() {
    if (localStorage.getItem("dates")) {
      dates = JSON.parse(localStorage.getItem("dates"));
    } else {
      dates = []
    }
  }

  // Save items to localStorage
  function saveLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("dates", JSON.stringify(dates));
    localStorage.setItem("Todo_created", Todo.created);
  }


  function checkToDeleteDate(d) {
    if (dates.indexOf(d) === -1) {
      return false;
    } else {
      if (findManyWhere("date", d, todos).length === 1) {
        console.log("section to splice: " + dates.indexOf(d));
        dates.splice(dates.indexOf(d), 1);
      }
    }
  }


  function renderDates() {
    $("#dates").html(templates.dates({dates: dates, incomplete_items: incompleteItems(todos).length }));
  }


  // Fill in Modal
  function showModal(current_todo) {
    $("#modal_container").html(templates.modal(current_todo));
  }

  function allDatesIn(array) {
    var allDates = [];
    for(var i = 0; i < array.length; i++) {
      var dateToAdd = array[i].date
      if (allDates.indexOf(dateToAdd) === -1) {
        allDates.push(dateToAdd);
      }
    }
    return allDates;
  }

  function fadeOutModal() {
    $("#modal, #modal_bg").fadeOut();
  }

  function sortedArray(array){
    var incomplete = [],
        complete = [];
    for(var i = 0; i < array.length; i++) {
      if (todos[i].checked) {
        complete.push(array[i]);
      } else {
        incomplete.push(array[i]);
      }
    }
    return incomplete.concat(complete);
  }




  // Load page
  function init() {
    loadTodos();
    loadDates();
    renderDates();
    render();
  }

  function createNewDate(todo) {
      // if date doesn't exsist
    if (dates.indexOf(todo.date) === -1) {
      dates.push(todo.date);
    }
  }
  init();










});
