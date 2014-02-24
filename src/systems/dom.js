var _ = require('lodash');
var fastdom = require('fastdom');

var BaseSystem = require('./base');

var DomSystem = function(config){

    var defaults = {
        autoRegister: true,
        autoStart: true,
        updateInterval: 16,
        viewCanvas: null
    };

    BaseSystem.call(this);
    this.config = _.extend(defaults, config);

};

DomSystem.prototype = Object.create(BaseSystem.prototype);

DomSystem.prototype.identifier = "DOM";

DomSystem.prototype.register = function(component){
    if (!component.hasOwnProperty('_el') && !component._el){
        throw new Error("Component is not renderable, missing '_el' property");
    }

    BaseSystem.prototype.register.call(this, component);
};

DomSystem.prototype.update = function(){
    BaseSystem.prototype.update.call(this);
    _.each(this.components, function(component){
        if (component._isDirty){
            fastdom.write(function(){
                component._el.innerHTML = component._elContent;
            });
            component._isDirty = false;
            component.entity.emit('domRendered', component);
        }
    });
};

module.exports = DomSystem;

