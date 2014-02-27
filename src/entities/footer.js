var _ = require('lodash');
var BaseEntity = require('./base');
var DomComponent = require('../components/dom');
var TemplateComponent = require('../components/template');

var FooterEntity = function(config){

    var defaults = {
        container: "",
    };

    BaseEntity.call(this);
    this.config = _.extend(defaults, config);

    this.section = new DomComponent({
        container: this.config.container,
        tagName: "footer",
        tagID: "footer",
        domEvents: {
            'ready': _.bind(this.onReady, this)
        }
    });

    this.template = new TemplateComponent({
        template: require('../templates/footer.hbs')
    });

    this.addComponent(this.section);
    this.addComponent(this.template);

};

FooterEntity.prototype = Object.create(BaseEntity.prototype);

FooterEntity.prototype.onReady = function(){
};

module.exports = FooterEntity;
