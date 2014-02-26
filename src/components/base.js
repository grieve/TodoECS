var _ = require('lodash');

var EventEmitter = require('../event-emitter');
var SysMan = require('../systems-manager');

var BaseComponent = function(config){

    var defaults = {
        autoRegister: true,
        system: "BaseSystem"
    };

    EventEmitter.call(this);

    this.entity = null;
    this.config = _.extend(defaults, config);
};

BaseComponent.prototype = Object.create(EventEmitter.prototype);

BaseComponent.prototype.register = function(){
    var system = SysMan.getSystem(this.config.system);
    if (!system){
        throw new Error('System not found, cannot register');
    }
    system.register(this);
};

BaseComponent.prototype.onAdd = function(entity){
    this.entity = entity;
    if(this.config.autoRegister){
        this.register();
    }
};

BaseComponent.prototype.onRemove = function(){
    console.log(2);
    this.emit('destroy', this);
    console.log(3);
    this.entity = null;
    var system = SysMan.getSystem(this.config.system);
    system.unregister(this);
    delete this;
};

module.exports = BaseComponent;

