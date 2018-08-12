const harvesterRole = require('role.harvester');
const harvesterAlphaRole = require('role.harvester.alpha');
const builderRole = require('role.builder');
const upgraderRole = require('role.upgrader');
const upgraderAlphaRole = require('role.upgrader.alpha');
const upgraderBetaRole = require('role.upgrader.beta');
const pathfinderRole = require('role.pathfinder');
const repairerRole = require('role.repairer');

const HARVESTER = harvesterRole.role;
const HARVESTER_ALPHA = harvesterAlphaRole.role;
const BUILDER = builderRole.role;
const UPGRADER = upgraderRole.role;
const UPGRADER_ALPHA = upgraderAlphaRole.role;
const UPGRADER_BETA = upgraderBetaRole.role;
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
            case HARVESTER_ALPHA:
                harvesterAlphaRole.performAction(creep);
                break;
            case BUILDER:
                builderRole.performAction(creep);
                break;
            case UPGRADER:
                upgraderRole.performAction(creep);
                break;
            case UPGRADER_ALPHA:
                upgraderAlphaRole.performAction(creep);
                break;
            case UPGRADER_BETA:
                upgraderBetaRole.performAction(creep);
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