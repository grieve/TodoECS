var DomSystem = require('./systems/dom');
var FormEntity = require('./entities/form');
var RecordTableEntity = require('./entities/record-table');

var systems = {
    dom: new DomSystem()
};

var entity;
var formEntity = new FormEntity({
    container: 'main',
    template: require('./templates/form.hbs'),
    fields: {
        'measure': ""
    },
    onSubmit: function(data){
        entity.data.create(data);
    }
});
entity = new RecordTableEntity();
