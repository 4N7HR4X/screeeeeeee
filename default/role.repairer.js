const constants = require('config');
const baseRole = require('role.base');
const builderRole = require('role.builder');

const PATH_STYLE_TO_WORK = constants.PATH_STYLE_TO_WORK();

let roleRepairer = {
    role: 'repairer',

    repair: function (creep) {
        let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => (s.hits < s.hitsMax) && (s.structureType !== STRUCTURE_WALL)
        });
        console.log(structure);
        if (structure !== null) {
            let repair = creep.repair(structure);
            if (repair === ERR_NOT_IN_RANGE) {
                // creep.say('moving');
                creep.moveTo(structure, PATH_STYLE_TO_WORK);
            } else if (repair === ERR_INVALID_TARGET) {
                // creep.say('⚙️');
            } else {
                if (constants.isShowRolesEnabled()) {
                    creep.say('R');
                }
            }
        } else {
            builderRole.performAction(creep);
        }
    },
    /** @param {Creep} creep **/
    performAction: function (creep) {
        if (creep.memory.repairing && creep.carry.energy === 0) {
            creep.memory.repairing = false;
            // creep.say('harvesting');
        }
        if (!creep.memory.repairing && creep.carry.energy === creep.carryCapacity) {
            creep.memory.repairing = true;
            // creep.say('repairing');
        }

        if (creep.memory.repairing) {
            this.repair(creep);
        } else {
            baseRole.extractResource(creep);
        }
    }
};
module.exports = roleRepairer;