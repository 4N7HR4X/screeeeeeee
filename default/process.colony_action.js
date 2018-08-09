const harvesterRole = require('role.harvester');
const upgraderRole = require('role.upgrader');
const builderRole = require('role.builder');
const pathfinderRole = require('role.pathfinder');

const repairerRole = require('role.repairer');

const constants = require('config');

const ROLE_HARVESTER = constants.ROLE_HARVESTER();
const ROLE_BUILDER = constants.ROLE_BUILDER();
const ROLE_UPGRADER = constants.ROLE_UPGRADER();
const ROLE_PATHFINDER = constants.ROLE_PATHFINDER();
const ROLE_REPAIRER = constants.ROLE_REPAIRER();

let colony = {
    run: function() {
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            this.performCreepAction(creep);
        }
    },
    performCreepAction: function (creep) {
        switch (creep.memory.role) {
            case ROLE_HARVESTER:
                harvesterRole.performAction(creep);
                break;
            case ROLE_UPGRADER:
                upgraderRole.performAction(creep);
                break;
            case ROLE_BUILDER:
                builderRole.performAction(creep);
                break;
            case ROLE_PATHFINDER:
                pathfinderRole.performAction(creep);
                break;
            case ROLE_REPAIRER:
                repairerRole.performAction(creep);
                break;
        }
    }
};

module.exports = colony;