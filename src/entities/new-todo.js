var _ = require('lodash');
var BaseEntity = require('./base');
var DomComponent = require('../components/dom');


var NewTodoEntity = function(config){

    var defaults = {
        container: "",
    };

    BaseEntity.call(this);
    this.config = _.extend(defaults, config);

    this.input = new DomComponent({
        container: this.config.container,
        tagName: "input",
        tagID: "new-todo",
        domEvents: {
            'ready': _.bind(this.onReady, this),
            'keydown': _.bind(this.onKeyDown, this)
        }
    });

    this.addComponent(this.input);

};

NewTodoEntity.prototype = Object.create(BaseEntity.prototype);

NewTodoEntity.prototype.onReady = function(){
    this.input.el.setAttribute('placeholder', "What needs to be done?");
    this.input.el.focus();
};

NewTodoEntity.prototype.onKeyDown = function(evt){
    if (evt.keyCode == 13){
        evt.preventDefault();
        this.emit('todo.create', evt.target.value);
        evt.target.value = "";
    }
};

module.exports = NewTodoEntity;
