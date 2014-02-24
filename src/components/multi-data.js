var _ = require('lodash');

var EventEmitter = require('../event-emitter');
var BaseComponent = require('./base');

var ModelObject = function(properties){
    var model = this;
    model._data = {};
    _.each(properties, function(value, prop){
        if (value instanceof Function){
            model._data[prop] = value();
        } else {
            model._data[prop] = value;
        }
        Object.defineProperty(model, prop, {
            get: function(){
                model.emit('getAttr', model, prop);
                return model._data[prop];
            },
            set: function(val){
                model._data[prop] = val;
                model.emit('setAttr', model, prop, val);
            }
        });
    });
    EventEmitter.call(model);
};

ModelObject.prototype = Object.create(EventEmitter.prototype);

ModelObject.prototype.delete = function(){
    this.emit('delete', this);
};

var MultiDataComponent = function(config){
    var defaults = {
        properties: {}
    };

    BaseComponent.call(this);
    this.config = _.extend(defaults, config);
    this.model = [];
};

MultiDataComponent.prototype = Object.create(BaseComponent.prototype);

MultiDataComponent.prototype.create = function(properties){
    var model = new ModelObject(_.extend(this.config.properties, properties));
    model.on('getAttr', _.bind(this.onModelGet, this));
    model.on('setAttr', _.bind(this.onModelSet, this));
    model.on('delete', _.bind(this.onModelDelete, this));
    this.model.push(model);
    this.entity.emit('dataUpdated', this.model);
};

MultiDataComponent.prototype.onModelGet = function(model, prop){
};

MultiDataComponent.prototype.onModelSet = function(model, prop, value){
    this.entity.emit('dataUpdated', this.model, prop, value);
};

MultiDataComponent.prototype.onModelDelete = function(model){
    var idx = this.models.indexOf(model);
    if (idx != -1){
        this.models.splice(idx, 1);
    }
};

module.exports = MultiDataComponent;
