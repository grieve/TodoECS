var _ = require('lodash');
var BaseEntity = require('./base');
var DomComponent = require('../components/dom');
var DataComponent = require('../components/data');
var TemplateComponent = require('../components/template');


var TodoEntity = function(config){

    var defaults = {
        container: "",
        todo: ""
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

    this.template = new TemplateComponent({
        template: require('../templates/todo.hbs')
    });

    this.template.set('todo', this.config.todo);
    this.template.set('done', false);

    this.addComponent(this.dom);
    this.addComponent(this.template);

};

TodoEntity.prototype = Object.create(BaseEntity.prototype);

TodoEntity.prototype.onReady = function(){
};

TodoEntity.prototype.toggleDone = function(evt){
    if(evt.target.checked){
        this.dom.el.classList.add('completed');
    } else {
        this.dom.el.classList.remove('completed');
    }
};

TodoEntity.prototype.setToggled = function(state){
    if (state){
        this.dom.select('.toggle').checked = true;
        this.dom.el.classList.add('completed');
    } else {
        this.dom.select('.toggle').checked = false;
        this.dom.el.classList.remove('completed');
    }

}

module.exports = TodoEntity;

