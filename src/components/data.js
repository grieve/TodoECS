var _ = require('lodash');

var BaseComponent = require('./base');

var DataComponent = function(config){
    var defaults = {
        properties: {}
    };

    BaseComponent.call(this);
    this.config = _.extend(defaults, config);
    this.model = this.config.properties;
};

DataComponent.prototype = Object.create(BaseComponent.prototype);

DataComponent.prototype.getAttr = function(attr){
    return this.model[attr];
};

DataComponent.prototype.setAttr = function(attr, value){
    this.model[attr] = value;
    this.entity.emit('dataUpdated', this.model, attr, value);
};

DataComponent.prototype.onAdd = function(entity){
    var component = this;
    entity.data = {};

    _.each(component.config.properties, function(value, prop){
        Object.defineProperty(entity.data, prop, {
            get: function(){ return component.getAttr(prop); },
            set: function(value){ component.setAttr(prop, value); },
        });
    });
    BaseComponent.prototype.onAdd.call(this, entity);
};

module.exports = DataComponent;
