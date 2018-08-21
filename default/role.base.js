const constants = require('config');

const PATH_STYLE_TO_COLLECT = constants.PATH_STYLE_TO_COLLECT();
const PATH_STYLE_TO_WORK = constants.PATH_STYLE_TO_WORK();

const base = {
    role: 'default',
    extractResource: function (creep) {
        let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE); 

        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, PATH_STYLE_TO_COLLECT);
        } else {
            if (constants.isShowRolesEnabled()) {
                creep.say('H');
            }
        }
    },
    depositResourceAtTarget: function (creep) {
        let target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                let numberOfCreepsAlive = _.sum(Game.creeps, () => true);
                return (structure.structureType === STRUCTURE_SPAWN ||
                    (structure.structureType === STRUCTURE_LINK && numberOfCreepsAlive > 9) ||
                    structure.structureType === STRUCTURE_EXTENSION ||
                    structure.structureType === STRUCTURE_TOWER) &&
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
    },
};
module.exports = base;