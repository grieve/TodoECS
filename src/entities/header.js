var _ = require('lodash');
var BaseEntity = require('./base');
var DomComponent = require('../components/dom');
var TemplateComponent = require('../components/template');
var NewTodoEntity = require('./new-todo');


var HeaderEntity = function(config){

    var defaults = {
        container: "",
    };

    BaseEntity.call(this);
    this.config = _.extend(defaults, config);

    this.section = new DomComponent({
        container: this.config.container,
        tagName: "header",
        tagID: "header",
        domEvents: {
            'ready': _.bind(this.onReady, this)
        }
    });

    this.template = new TemplateComponent({
        template: require('../templates/header.hbs')
    });

    this.addComponent(this.section);
    this.addComponent(this.template);

};

HeaderEntity.prototype = Object.create(BaseEntity.prototype);

HeaderEntity.prototype.onReady = function(){
    this.newTodo = new NewTodoEntity({container: this.section.el });
    // bubble up new todo event
    this.newTodo.on('todo.create', _.bind(this.emit, this));
};

module.exports = HeaderEntity;
