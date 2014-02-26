var _ = require('lodash');
var $ = require('sizzle');
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

DomSystem.prototype.identifier = "DomSystem";

DomSystem.prototype.register = function(component){

    fastdom.write(function(){
        component._el = document.createElement(component.config.tagName);
        _.each(component.config.className.split(' '), function(cls){
            if (cls){
                component._el.classList.add(cls);
            }
        });
        if (component.config.container){
            var container = $(component.config.container);
            if (container.length > 0){
                container[0].appendChild(component._el);
            }
        }
        if(component.config.domReady){
            setTimeout(component.config.domReady, 100);
        }
    });

    component.entity.on('content.update', function(evt, content){
        component._elContent = content;
        component._isDirty = true;
    });
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

