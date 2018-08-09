const constants = require('config');
const baseRole = require('role.base');
const upgraderRole = require('role.upgrader');

const PATH_STYLE_TO_WORK = constants.PATH_STYLE_TO_WORK();

let roleBuilder = {
    role: 'builder',

    build: function (creep) {
        let constructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
        if (constructionSite == null) {
            baseRole.depositResourceAtTarget(creep)
        } else {
            let build = creep.build(constructionSite);
            if (build === ERR_NOT_IN_RANGE) {
                creep.moveTo(constructionSite, PATH_STYLE_TO_WORK);
            } else if (build === ERR_INVALID_TARGET) {
                console.log('kwaal')
            } else {
                if (constants.isShowRolesEnabled()) {
                    creep.say('B');
                }
            }
        }
    },
    /** @param {Creep} creep **/
    performAction: function (creep) {
        if (creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            // creep.say('harvesting');
        }
        if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
            // creep.say('building');
        }

        if (creep.memory.building) {
            this.build(creep);
        } else {
            upgraderRole.performAction(creep);
        }
    }
};

module.exports = roleBuilder;