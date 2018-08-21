const roles = require('setup.population');

module.exports = function () {
    Creep.prototype.performAction = function () {
        let roleAction = roles[this.memory.role].action;
        if (roleAction !== undefined) {
            roleAction.performAction(this);
        }
    };
};