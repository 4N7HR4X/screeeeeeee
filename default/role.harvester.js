const baseRole = require('role.base');

let roleHarvester = {

    /** @param {Creep} creep **/
    performAction: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            baseRole.extractResource(creep);
        } else {
            baseRole.depositResourceAtTarget(creep);
        }
    }
};

module.exports = roleHarvester;