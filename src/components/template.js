var _ = require('lodash');
var BaseComponent = require('./base');


var TemplateComponent = function(config){
    var defaults = {
        template: "",
        templateFile: "",
        templateFunction: function(){ return ""; },
        compiled: function(){ return ""; },
        rendered: "",
        ignoreDataUpdates: false
    };

    BaseComponent.call(this);
    this.config = _.extend(defaults, config);

    if (this.config.templateFile){
        this.config.template = require(this.config.templateFile);
    }

    if (this.config.template instanceof Function){
        this.config.compiled = this.config.template;
    } else {
        this.config.compiled = this.config.templateFunction(this.config.template);
    }
};

TemplateComponent.prototype = Object.create(BaseComponent.prototype);

TemplateComponent.prototype.handleDataUpdate = function(evt, data){
    this.data = data;
    this.render();
};

TemplateComponent.prototype.render = function(){
    this.config.rendered = this.config.compiled({data: this.data});
    this.entity.emit('contentUpdated', this.config.rendered);
};

TemplateComponent.prototype.onAdd = function(entity){
    BaseComponent.prototype.onAdd.call(this, entity);
    if (!this.config.ignoreDataUpdates){
        this.entity.on('dataUpdated', _.bind(this.handleDataUpdate, this));
    }
    this.render();
};

module.exports = TemplateComponent;
