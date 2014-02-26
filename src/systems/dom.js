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
        if(component.config.tagID){
            component._el.setAttribute('id', component.config.tagID);
        }
        component.addEventListener = _.bind(component._el.addEventListener, component._el);
        _.each(component.config.className.split(' '), function(cls){
            if (cls){
                component._el.classList.add(cls);
            }
        });
        if (component.config.container){
            if (component.config.container instanceof Element){
                component.config.container.appendChild(component._el);
            } else if (typeof component.config.container == "string") {
                var container = $(component.config.container);
                if (container.length > 0){
                    container[0].appendChild(component._el);
                    component.config.container = container;
                }
            }
        }
        _.each(component.config.domEvents, function(listener, evt){
            setTimeout(function(){
                if (evt == "ready"){
                    listener();
                 } else {
                    evt = evt.split(' ');
                    var eventName = evt[0];
                    var target = $(evt[1], component._el);
                    if (target.length > 0){
                        target = target[0];
                    } else {
                        target = component._el;
                    }

                    target.addEventListener(eventName, listener);
                }
            }, 100);
        });
    });

    Object.defineProperty(component, 'el', {
        get: function(){ return component._el },
        set: function(){
            component._elContent = content;
            component._isDirty = true;
        }
    });

    component.select = function(selector){
        return component._el.querySelector(selector);
    };

    component.entity.on('content.update', function(evt, content){
        component._elContent = content;
        component._isDirty = true;
    });
    BaseSystem.prototype.register.call(this, component);

};

DomSystem.prototype.unregister = function(component){
    BaseSystem.prototype.unregister.call(this, component);
    component.config.container.removeChild(component._el);
    delete component._el;
    delete component;
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

