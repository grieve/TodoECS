var EventEmitter = function(){

    this.listeners = {};

};

EventEmitter.prototype.on = function(event, callback){

    if(!this.listeners.hasOwnProperty(event)){
        this.listeners[event] = [];
    }
    this.listeners[event].push(callback);

};

EventEmitter.prototype.off = function(evt_cb, callback){
    if (evt_cb instanceof Function) {
        for(var event in this.listeners){
            for(var i = 0; i < this.listeners[event].length; ++i){
                if (this.listeners[event][i] == evt_cb){
                    break;
                }
            }
            this.listeners[event].splice(i, 1);
        }
    } else if (evt_cb instanceof String || typeof evt_cb == "string") {
        if(callback === undefined){
            this.listeners[evt_cb] = [];
        } else {
            for(var j = 0; j < this.listeners[evt_cb].length; ++j){
                if (this.listeners[evt_cb][j] == callback){
                    break;
                }
            }
            this.listeners[evt_cb].splice(j, 1);
        }
    }
};

EventEmitter.prototype.emit = function(event){
    if(this.listeners.hasOwnProperty(event)){
        for(var i = 0; i < this.listeners[event].length; ++i){
            try {
                this.listeners[event][i].apply(null, arguments);
            } catch (e) {
                if (console && console.error) {
                    console.error(e);
                }
            }
        }
    }

};

module.exports = EventEmitter;
