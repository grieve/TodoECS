var _ = require('lodash');

var BaseComponent = require('./base');

var DataComponent = function(config){
    var defaults = {
        properties: {}
    };

    BaseComponent.call(this);
    this.config = _.extend(defaults, config);
};

DataComponent.prototype = Object.create(BaseComponent.prototype);

DataComponent.prototype.get = function(attr){
    return this._model[attr];
};

DataComponent.prototype.set = function(attr, value){
    this._model[attr] = value;
    this.emit('update', this._model);
};

DataComponent.prototype.onAdd = function(entity){
    var component = this;
    this._model = _.extend(this.config.properties);

    this.attributes = new Object();
    _.each(component.config.properties, function(value, prop){
        Object.defineProperty(component.attributes, prop, {
            get: function(){ return component.get(prop); },
            set: function(value){ component.set(prop, value); },
        });
    });

    BaseComponent.prototype.onAdd.call(this, entity);
    this.emit('update', this._model);
};

module.exports = DataComponent;
