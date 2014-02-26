var _ = require('lodash');
var $ = require('sizzle');
var fastdom = require('fastdom');

var BaseComponent = require('./base');

var DomComponent = function(config){

    var defaults = {
        autoRegister: true,
        system: 'DomSystem',
        container: '',
        tagName: 'div',
        className: ''
    };

    BaseComponent.call(this, config);
    this.config = _.extend(defaults, config);
    this._isDirty = true;
};

DomComponent.prototype = Object.create(BaseComponent.prototype);
module.exports = DomComponent;
