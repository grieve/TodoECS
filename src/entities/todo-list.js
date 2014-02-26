var _ = require('lodash');
var BaseEntity = require('./base');
var DomComponent = require('../components/dom');
var DataComponent = require('../components/data');
var TemplateComponent = require('../components/template');

var TodoEntity = require('./todo');


var TodoListEntity = function(config){

    var defaults = {
        container: "",
    };

    BaseEntity.call(this);
    this.config = _.extend(defaults, config);

    this.list = new DomComponent({
        container: this.config.container,
        tagName: 'ul',
        tagID: 'todo-list',
        domEvents: {
            'ready': _.bind(this.onReady, this)
        }
    });


    this.addComponent(this.list);
    this.todos = [];

};

TodoListEntity.prototype = Object.create(BaseEntity.prototype);

TodoListEntity.prototype.onReady = function(){
};

TodoListEntity.prototype.newTodo = function(todo){
    var entity = new TodoEntity({container: this.list.el, todo: todo});
    entity.on('destroy', _.bind(this.removeTodo, this));
    this.todos.push(entity);
};

TodoListEntity.prototype.removeTodo = function(todo){
    console.log(todo);
    for (var idx = 0; idx < this.todos.length; idx++){
        if (this.todos[idx] == todo){
            break;
        }
    }
    if (idx < this.todos.length){
        this.todos.splice(idx, 1);
    }
};

TodoListEntity.prototype.toggleAll = function(state){
    for (var idx = 0; idx < this.todos.length; idx++){
        this.todos[idx].setToggled(state);
    }
};



module.exports = TodoListEntity;

