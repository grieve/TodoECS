var DomSystem = require('./systems/dom');
var TemplateSystem = require('./systems/template');

var NewTodoEntity = require('./entities/new-todo');
var MainEntity = require('./entities/main');

var systems = {
    dom: new DomSystem(),
    template: new TemplateSystem()
};

var header = new HeaderEntity({ container: "#todoapp" });
var main = new MainEntity({ container: "#todoapp" });
var footer = new FooterEntity({ container: "#todoapp" });
var newTodo = new NewTodoEntity({ container: '#header' });
newTodo.on('todo.create', function(evt, todo){ main.todoList.newTodo(todo); });

