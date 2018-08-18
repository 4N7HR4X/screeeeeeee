const roles = require('setup.population');

module.exports = function () {
    Creep.prototype.performAction = function () {
        let action = roles[this.memory.role].action;
        console.log(action);
        if (action !== undefined) {
            action.performAction(this);
        }
    };
};