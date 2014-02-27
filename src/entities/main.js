var _ = require('lodash');
var BaseEntity = require('./base');
var DomComponent = require('../components/dom');
var TemplateComponent = require('../components/template');

var TodoListEntity = require('./todo-list');


var MainEntity = function(config){

    var defaults = {
        container: "",
    };

    BaseEntity.call(this);
    this.config = _.extend(defaults, config);

    this.section = new DomComponent({
        container: this.config.container,
        tagName: "section",
        tagID: "main",
        domEvents: {
            'ready': _.bind(this.onReady, this),
            'click #toggle-all': _.bind(this.toggleAll, this)
        }
    });

    this.template = new TemplateComponent({
        template: require('../templates/main.hbs')
    });

    this.addComponent(this.section);
    this.addComponent(this.template);

};

MainEntity.prototype = Object.create(BaseEntity.prototype);

MainEntity.prototype.onReady = function(){
    this.todoList = new TodoListEntity({ container: this.section.el });
};

MainEntity.prototype.toggleAll = function(evt){
    this.todoList.toggleAll(evt.target.checked);
};

module.exports = MainEntity;
