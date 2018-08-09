let constants = require('config');
let populationConfig = require('setup.population');

const ROLE_HARVESTER = constants.ROLE_HARVESTER();
const ROLE_BUILDER = constants.ROLE_BUILDER();
const ROLE_UPGRADER = constants.ROLE_UPGRADER();
const ROLE_PATHFINDER = constants.ROLE_PATHFINDER();
const ROLE_REPAIRER = constants.ROLE_REPAIRER();

/*
const HARVESTER_ENERGY_COST = 200 * constants.getMaxSize(ROLE_HARVESTER);
const BUILDER_ENERGY_COST = 200 * constants.getMaxSize(ROLE_BUILDER);
const UPGRADER_ENERGY_COST = 200 * constants.getMaxSize(ROLE_UPGRADER);
const PATHFINDER_ENERGY_COST = 200 * constants.getMaxSize(ROLE_PATHFINDER);
const REPAIRER_ENERGY_COST = 200 * constants.getMaxSize(ROLE_REPAIRER);
*/

let energyCapacity = Game.spawns.Spawn1.room.energyCapacityAvailable;
let energyAvailable = Game.spawns.Spawn1.room.energyAvailable;

let minimumHarvesterCount = populationConfig.harvester.count;
let minimumBuilderCount = populationConfig.builder.count;
let minimumUpgraderCount = populationConfig.upgrader.count;
let minimumPathFinderCount = populationConfig.pathfinder.count;
let minimumRepairerCount = populationConfig.repairer.count;

let livingHarvesters = this.getLivingCreepCount(ROLE_HARVESTER);
let livingUpgraders = this.getLivingCreepCount(ROLE_UPGRADER);
let livingBuilders = this.getLivingCreepCount(ROLE_BUILDER);
let livingPathFinders = this.getLivingCreepCount(ROLE_PATHFINDER);
let livingRepairers = this.getLivingCreepCount(ROLE_REPAIRER);

let populationProcessor = {
    run: function () {
        this.cleanDeadCreeps();
        this.managePopulation();
    },

    spawnCreepIfPossible: function () {
        let name = undefined;
        let roleSpawned = undefined;
        if (livingHarvesters < minimumHarvesterCount) {
            roleSpawned = ROLE_HARVESTER;
            name = this.spawnCreep(roleSpawned, energyCapacity);
            if (name === ERR_NOT_ENOUGH_ENERGY && livingHarvesters === 0) {
                name = this.spawnCreep(roleSpawned, energyAvailable);
            }
        } else if (livingUpgraders < minimumUpgraderCount) {
            roleSpawned = ROLE_UPGRADER;
            name = this.spawnCreep(roleSpawned, energyCapacity);
        } else if (livingRepairers < minimumRepairerCount) {
            roleSpawned = ROLE_REPAIRER;
            name = this.spawnCreep(roleSpawned, energyCapacity);
        } else if (livingPathFinders < minimumPathFinderCount) {
            roleSpawned = ROLE_PATHFINDER;
            name = this.spawnCreep(roleSpawned, energyCapacity);
        } else if (livingBuilders < minimumBuilderCount) {
            roleSpawned = ROLE_BUILDER;
            name = this.spawnCreep(roleSpawned, energyCapacity);
        } else {
            // roleSpawned = ROLE_BUILDER;
            // name = this.spawnCreep(roleSpawned, energyCapacity);
        }
        return {name, roleSpawned};
    },

    managePopulation: function () {
        let {name, roleSpawned} = this.spawnCreepIfPossible();

        if (constants.isShowPopulationEnabled()) {
            console.log(livingHarvesters, '/', minimumHarvesterCount, 'harvesters |',
                livingUpgraders, '/', minimumUpgraderCount, 'upgraders |',
                livingRepairers, '/', minimumRepairerCount, 'repairers |',
                livingPathFinders, '/', minimumPathFinderCount, 'pathfinders |',
                livingBuilders, '/', minimumBuilderCount, 'builders');
        }
        if (constants.isShowResourcesEnabled()) {
            console.log(energyAvailable, '/', energyCapacity, 'energy')
        }

        if (!(name < 0)) {
            if (name === undefined) {
                if (constants.isDebugEnabled()) {
                    console.log('not spawning');
                }

            } else {
                if (constants.isShowPopulationEnabled()) {
                    console.log('spawning new', roleSpawned, ':', name);
                }
            }
        } else {
            switch (name) {
                case ERR_NOT_ENOUGH_ENERGY:
                    if (constants.isDebugEnabled()) {
                        console.log('not enough energy to spawn', roleSpawned);
                    }
                    break;
                case ERR_BUSY:
                    let spawning = Game.spawns.Spawn1.spawning;
                    if (constants.isDebugEnabled()) {
                        console.log('already', spawning === undefined ? 'busy' : 'spawning ' + spawning.name);
                    }
                    break;
            }
        }
    },

    cleanDeadCreeps: function () {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
                if (constants.isDebugEnabled()) {
                    console.log("clearing old creeper:", name);
                }
            }
        }
    },

    getLivingCreepCount: function (role) {
        return _.sum(Game.creeps, (creep) => creep.memory.role === role);
    },

    spawnCreep: function (role, energy) {
        return Game.spawns.Spawn1.createCustomCreep(role, energy);
    }
};

module.exports = populationProcessor;