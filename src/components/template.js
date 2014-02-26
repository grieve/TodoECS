var _ = require('lodash');
var BaseComponent = require('./base');


var TemplateComponent = function(config){
    var defaults = {
        autoRegister: true,
        system: "TemplateSystem",
        template: "",
        compiled: function(){ return ""; },
        rendered: ""
    };

    BaseComponent.call(this);
    this.config = _.extend(defaults, config);

    this.template = this.config.template;
    this.context = {};
    this._isDirty = true;
};

TemplateComponent.prototype = Object.create(BaseComponent.prototype);

module.exports = TemplateComponent;
