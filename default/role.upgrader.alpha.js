const constants = require('config');
const baseRole = require('role.base');

const PATH_STYLE_TO_WORK = constants.PATH_STYLE_TO_WORK();

// this one is the miner.
let roleUpgrader = {
    role: 'upgrader.alpha',

    /** @param {Creep} creep **/
    performAction: function (creep) {
        if (creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
        }
        if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.upgrading) {
            //find link. deposit energy.

        } else {
            baseRole.extractResource(creep);
        }
    }
};

module.exports = roleUpgrader;