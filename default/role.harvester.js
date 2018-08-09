const baseRole = require('role.base');

let roleHarvester = {
    role: 'harvester',

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