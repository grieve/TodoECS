var _ = require('lodash');
var $ = require('sizzle');
var fastdom = require('fastdom');

var BaseComponent = require('./base');

var DomComponent = function(config){

    var defaults = {
        autoRegister: true,
        system: 'DOM',
        container: '',
        tagName: 'div',
        className: ''
    };

    BaseComponent.call(this, config);
    this.config = _.extend(defaults, config);

    var component = this;
    component._el = {};
    fastdom.write(function(){
        component._el = document.createElement(component.config.tagName);
        if (component.config.container){
            var cont = $(component.config.container);
            if (cont.length > 0){
                cont[0].appendChild(component._el);
            }
        }
        if (component.config.domReady){
            setTimeout(component.config.domReady, 100);
        }
    });
    _.each(component.config.className.split(' '), function(cls){
        if (cls){
            fastdom.write(function(){
                component._el.classList.add(cls);
            });
        }
    });

    this._isDirty = true;
    this._elContent = "";
};

DomComponent.prototype = Object.create(BaseComponent.prototype);

DomComponent.prototype.onAdd = function(entity){
    var component = this;
    entity.on('contentUpdated', function(evt, content){
        component.setContent(content);
    });

    BaseComponent.prototype.onAdd.call(this, entity);
};

DomComponent.prototype.setContent = function(content){
    this._elContent = content;
    this._isDirty = true;
};

module.exports = DomComponent;
