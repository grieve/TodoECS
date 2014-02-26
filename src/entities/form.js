var $ = require('sizzle');
var _ = require('lodash');
var BaseEntity = require('./base');
var DomComponent = require('../components/dom');
var DataComponent = require('../components/data');
var TemplateComponent = require('../components/template');


var FormEntity = function(config){
    var defaults = {
        container: "",
        className: "",
        template: "",
        fields: {},
        onSubmit: function() {}
    };

    BaseEntity.call(this);
    this.config = _.extend(defaults, config);

    this.form = new DomComponent({
        container: this.config.container,
        tagName: "form",
        classname: this.config.className,
        domReady: _.bind(this.domReady, this)
    });

    this._data = new DataComponent({
        properties: this.config.fields
    });

    this.template = new TemplateComponent({
        template: this.config.template
    });

    this.addComponent(this.form);
    this.addComponent(this._data);
    this.addComponent(this.template);

};

FormEntity.prototype = Object.create(BaseEntity.prototype);

FormEntity.prototype.domReady = function(){
    this.bindFields();
};

FormEntity.prototype.bindFields = function(){
    var entity = this;
    entity.inputs = {};
    _.each(entity.config.fields, function(value, field){
        var input = $('[name="' + field + '"]', entity.form._el);
        if (input.length > 0){
            entity.inputs[field] = input[0];
            input[0].addEventListener('keydown', _.bind(entity.handleInputChange, entity));
        }
    });
};


FormEntity.prototype.handleInputChange = function(evt){
    if (evt.keyCode == 13){
        evt.preventDefault();
        this.data[evt.target.name] = evt.target.value;
        this.config.onSubmit(this._data.model);
        _.each(this.inputs, function(input){
            input.value = "";
        });
    }
};

module.exports = FormEntity;
