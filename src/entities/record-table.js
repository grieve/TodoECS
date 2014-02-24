var _ = require('lodash');

var BaseEntity = require('./base');
var DomComponent = require('../components/dom');
var MultiDataComponent = require('../components/multi-data');
var TemplateComponent = require('../components/template');

var RecordTable = function(){
    BaseEntity.call(this);

    this.table = new DomComponent({
        container: 'main',
        tagName: 'table',
        className: 'table table-striped'
    });

    this.data = new MultiDataComponent({
        properties: {
            measure: "Default Name",
            created: function() { return new Date(); }
        }
    });

    this.template = new TemplateComponent({
        template: require('../templates/table.hbs')
    });

    this.addComponent(this.table);
    this.addComponent(this.data);
    this.addComponent(this.template);

};

RecordTable.prototype = Object.create(BaseEntity.prototype);

module.exports = RecordTable;
