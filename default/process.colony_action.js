const harvesterRole = require('role.harvester');
const builderRole = require('role.builder');
const upgraderRole = require('role.upgrader');
const pathfinderRole = require('role.pathfinder');
const repairerRole = require('role.repairer');

const HARVESTER = harvesterRole.role;
const BUILDER = builderRole.role;
const UPGRADER = upgraderRole.role;
const PATHFINDER = pathfinderRole.role;
const REPAIRER = repairerRole.role;

let colony = {
    run: function () {
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            this.performCreepAction(creep);
        }
    },
    performCreepAction: function (creep) {
        switch (creep.memory.role) {
            case HARVESTER:
                harvesterRole.performAction(creep);
                break;
            case BUILDER:
                builderRole.performAction(creep);
                break;
            case UPGRADER:
                upgraderRole.performAction(creep);
                break;
            case PATHFINDER:
                pathfinderRole.performAction(creep);
                break;
            case REPAIRER:
                repairerRole.performAction(creep);
                break;
            default:
                upgraderRole.performAction(creep);
        }
    }
};

module.exports = colony;