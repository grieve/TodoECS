var _ = require('lodash');
var fastdom = require('fastdom');

var BaseSystem = require('./base');

var TemplateSystem = function(config){

    var defaults = {
        autoRegister: true,
        autoStart: true,
        updateInterval: 16,
    };

    BaseSystem.call(this);
    this.config = _.extend(defaults, config);

};

TemplateSystem.prototype = Object.create(BaseSystem.prototype);

TemplateSystem.prototype.identifier = "TemplateSystem";

TemplateSystem.prototype.register = function(component){
    if (!component.hasOwnProperty('context') && !component.context){
        throw new Error("Component is not renderable, missing 'context' property");
    }
    if (!component.hasOwnProperty('template') && !component.template){
        throw new Error("Component is not renderable, missing 'template' property");
    }

    BaseSystem.prototype.register.call(this, component);
};

TemplateSystem.prototype.update = function(){
    BaseSystem.prototype.update.call(this);
    _.each(this.components, function(component){
        if (component._isDirty){
            console.log(component.context);
            component.rendered = component.template(component.context);
            component.entity.emit('content.update', component.rendered);
            component._isDirty = false;
        }
    });
};

module.exports = TemplateSystem;

