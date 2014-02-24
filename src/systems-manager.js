var EventEmitter = require('./event-emitter');

var SystemsManager = function(){
    if(SystemsManager.prototype.hasOwnProperty('_singleton')){
        return SystemsManager.prototype._singleton;
    }
    SystemsManager.prototype._singleton = this;

    EventEmitter.call(this);
    this._systems = {};
};

SystemsManager.prototype = Object.create(EventEmitter.prototype);

SystemsManager.prototype.register = function(system){

    if (this._systems.hasOwnProperty(system.identifier)){
        throw new Error('System has already been registered');
    }
    
    this._systems[system.identifier] = system;
    this.emit('systemRegistered', system);

};

SystemsManager.prototype.unregister = function(sys_str){
    if (sys_str instanceof String || typeof sys_str == "string"){
        if (!this._systems.hasOwnProperty(sys_str)){
            throw new Error('System has not been registered');
        }

        var system = this._systems[sys_str];
        delete this._systems[sys_str];
        this.emit('systemUnregistered', system);

    } else if (sys_str instanceof Object && sys_str.identifier){

        if (!this._systems.hasOwnProperty(sys_str.identifier)){
            throw new Error('System has not been registered');
        }

        delete this._systems[sys_str.identifier];
        this.emit('systemUnregistered', sys_str);

    }

};

SystemsManager.prototype.getSystem = function(system){
    if(this._systems.hasOwnProperty(system)){
        return this._systems[system];
    } else {
        return null;
    }
};

SystemsManager.prototype.unregisterAll = function(){

    for(var system in this._systems){
        this.emit('systemUnregistered', this._systems[system]);
        delete this._systems[system];
    }

    this._systems = {};

};

module.exports = new SystemsManager();
