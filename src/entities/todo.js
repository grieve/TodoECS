var _ = require('lodash');
var BaseEntity = require('./base');
var DomComponent = require('../components/dom');
var DataComponent = require('../components/data');
var TemplateComponent = require('../components/template');


var TodoEntity = function(config){

    var defaults = {
        container: "",
        task: ""
    };

    BaseEntity.call(this);
    this.config = _.extend(defaults, config);

    this.dom = new DomComponent({
        container: this.config.container,
        tagName: 'li',
        domEvents: {
            'ready': _.bind(this.onReady, this),
            'click .toggle': _.bind(this.toggleDone, this),
            'click .destroy': _.bind(this.destroy, this)
        }
    });

    this.data = new DataComponent({
        properties: {
            task: this.config.task,
            completed: false
        }
    });

    this.data.on('update', _.bind(this.onDataUpdate, this));

    this.template = new TemplateComponent({
        template: require('../templates/todo.hbs')
    });

    this.addComponent(this.dom);
    this.addComponent(this.data);
    this.addComponent(this.template);

};

TodoEntity.prototype = Object.create(BaseEntity.prototype);

TodoEntity.prototype.onReady = function(){
};

TodoEntity.prototype.toggleDone = function(state){
    if(typeof state == "boolean"){
        this.data.attributes.completed = state === true;
    } else {
        this.data.attributes.completed = !this.data.attributes.completed;
    }
}

TodoEntity.prototype.onDataUpdate = function(evt){
    this.template.setAll(this.data._model);
    if (this.dom._el){
        if(this.data.attributes.completed){
            this.dom._el.classList.add('completed');
        } else {
            this.dom._el.classList.remove('completed');
        }
    }
};

module.exports = TodoEntity;

