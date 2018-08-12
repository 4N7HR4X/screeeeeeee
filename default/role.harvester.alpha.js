const baseRole = require('role.base');
const constants = require('config');

const PATH_STYLE_TO_WORK = constants.PATH_STYLE_TO_WORK();

let roleHarvester = {
    role: 'harvester.alpha',

    /** @param {Creep} creep **/
    performAction: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            baseRole.extractResource(creep);
        } else {
            this.depositResourceAtTarget(creep);
        }
    },
    depositResourceAtTarget: function (creep) {
        let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType === STRUCTURE_TOWER) &&
                    (structure.energy < structure.energyCapacity)
            }
        });
        if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, PATH_STYLE_TO_WORK);
        } else {
            if (constants.isShowRolesEnabled()) {
                creep.say('D');
            }
        }
    }
};

module.exports = roleHarvester;