const roles = require('setup.population');

module.exports = function () {
    Creep.prototype.performAction = function () {
        let action = roles[this.memory.role].action;
        if (action !== null) {
            action.performAction(this);
        }
    };
};