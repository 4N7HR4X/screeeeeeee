const constants = require('config');
const baseRole = require('role.base');

const CONVERT_TO_BETA = false;

let roleUpgrader = {
    role: 'upgrader',

    /** @param {Creep} creep
     * @deprecated once Links are built for upgrading -- our idle builders will fall back to this role.
     * **/
    performAction: function (creep) {
        if (CONVERT_TO_BETA) {
            if (creep.memory.role === constants.ROLE_UPGRADER()) {
                creep.memory.role = constants.ROLE_UPGRADER_BETA();
            }
        } else {
            if (creep.memory.upgrading && creep.carry.energy === 0) {
                creep.memory.upgrading = false;
                // creep.say('harvesting');
            }
            if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
                creep.memory.upgrading = true;
                // creep.say('upgrading');
            }

            if (creep.memory.upgrading) {
                const controller = creep.room.controller;
                if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(controller, constants.PATH_STYLE_TO_WORK);
                } else {
                    if (constants.isShowRolesEnabled()) {
                        creep.say('U');
                    }
                }
            } else {
                // if (creep.memory.role === 'builder') {
                //     console.log(creep.memory.working)
                // }
                baseRole.extractResource(creep);
            }
        }
    }
};

module.exports = roleUpgrader;