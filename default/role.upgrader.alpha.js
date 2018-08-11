const constants = require('config');
const baseRole = require('role.base');

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
            this.depositResourceAtTarget(creep);
        } else {
            baseRole.extractResource(creep);
        }
    },
    depositResourceAtTarget: function (creep) {
        let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_LINK ) &&
                    (structure.energy < structure.energyCapacity)
            }
        });
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, constants.PATH_STYLE_TO_WORK());
        } else {
            if (constants.isShowRolesEnabled()) {
                creep.say('D');
            }
        }
    }
};

module.exports = roleUpgrader;