var _ = require('lodash');

var EventEmitter = require('../event-emitter');

var BaseEntity = function(opts){

    var defaults = {
        components: []
    };

    EventEmitter.call(this);
    this.components = [];

    opts = opts || {};
    this.opts = _.extend(defaults, opts);

    for(var i = 0; i < this.opts.components.length; i++){
        this.addComponent(this.opts.components[i]);
    }
};

BaseEntity.prototype = Object.create(EventEmitter.prototype);

BaseEntity.prototype.addComponent = function(component){

    for (var i = 0; i <this.components.length; i++){
        if(this.components[i] == component){
            throw new Error('Component already exists');
        }
    }
    component.onAdd(this);
    this.components.push(component);
    this.emit('componentAdded', component);
};

BaseEntity.prototype.removeComponent = function(component){

    for (var i = 0; i < this.components.length; i++){
        if(this.components[i] == component){
            break;
        }
    }
    if (i < this.components.length){
        this.components[i].onRemove();
        this.components.splice(i, 1);
        this.emit('componentRemoved', component);
    } else {
        throw new Error('Component does not exist');
    }

};

module.exports = BaseEntity;
