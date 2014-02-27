var DomSystem = require('./systems/dom');
var TemplateSystem = require('./systems/template');

var NewTodoEntity = require('./entities/new-todo');
var HeaderEntity = require('./entities/header');
var FooterEntity = require('./entities/footer');
var MainEntity = require('./entities/main');

var systems = {
    dom: new DomSystem(),
    template: new TemplateSystem()
};

var header = new HeaderEntity({ container: "#todoapp" });
var main = new MainEntity({ container: "#todoapp" });
var footer = new FooterEntity({ container: "#todoapp" });

header.on('todo.create', function(evt, todo){ main.todoList.newTodo(todo); });

