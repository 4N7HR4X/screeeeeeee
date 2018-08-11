const constants = require('config');
const baseRole = require('role.base');

const CONVERT_TO_BETA = true;

let roleUpgrader = {
    role: 'upgrader',

    /** @param {Creep} creep
     * @deprecated
     * **/
    performAction: function (creep) {
        if (CONVERT_TO_BETA) {
            creep.memory.role = constants.ROLE_UPGRADER_BETA();
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