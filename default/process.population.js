let constants = require('config');
let populationConfig = require('setup.population');

const HARVESTER = constants.ROLE_HARVESTER();
const BUILDER = constants.ROLE_BUILDER();
const UPGRADER = constants.ROLE_UPGRADER();
const PATHFINDER = constants.ROLE_PATHFINDER();
const REPAIRER = constants.ROLE_REPAIRER();

let populationProcessor = {
    run: function () {
        this.cleanDeadCreeps();
        this.managePopulation();
    },

    managePopulation: function () {
        let name = undefined;
        let energyCapacity = Game.spawns.Spawn1.room.energyCapacityAvailable;
        let energyAvailable = Game.spawns.Spawn1.room.energyAvailable;


        let harvester = populationConfig.harvester;
        let builder = populationConfig.builder;
        let upgrader = populationConfig.upgrader;
        let pathfinder = populationConfig.pathfinder;
        let repairer = populationConfig.repairer;

        let minimumHarvesterCount = harvester.count;
        let minimumBuilderCount = builder.count;
        let minimumUpgraderCount = upgrader.count;
        let minimumPathFinderCount = pathfinder.count;
        let minimumRepairerCount = repairer.count;

        let livingHarvesters = this.getLivingCreepCount(HARVESTER);
        let livingUpgraders = this.getLivingCreepCount(UPGRADER);
        let livingBuilders = this.getLivingCreepCount(BUILDER);
        let livingPathFinders = this.getLivingCreepCount(PATHFINDER);
        let livingRepairers = this.getLivingCreepCount(REPAIRER);

        let roleSpawned = undefined;

        if (livingHarvesters < minimumHarvesterCount) {
            // if we don't have at least the minimum harvesters, spawn one at current energy level
            roleSpawned = HARVESTER;
            // name = this.spawnCreep(roleSpawned, energyCapacity);

            // if (name === ERR_NOT_ENOUGH_ENERGY) {
            //     if (livingHarvesters < 2) {
            name = this.spawnCreep(roleSpawned, energyAvailable);
            // }
            // if (livingBuilders < 1) {
            //     roleSpawned = BUILDER;
            //     name = this.spawnCreep(roleSpawned, energyAvailable);
            // }
            // }

        } else if (livingUpgraders < minimumUpgraderCount) {
            roleSpawned = UPGRADER;
            name = this.spawnCreep(roleSpawned, energyCapacity);
            if (name === ERR_NOT_ENOUGH_ENERGY) {
                if (livingBuilders < 1) {
                    roleSpawned = BUILDER;
                    name = this.spawnCreep(roleSpawned, 600);
                }
            }
        } else if (livingRepairers < minimumRepairerCount) {
            roleSpawned = REPAIRER;
            name = this.spawnCreep(roleSpawned, energyCapacity);
            if (name === ERR_NOT_ENOUGH_ENERGY) {
                if (livingBuilders < 1) {
                    roleSpawned = BUILDER;
                    name = this.spawnCreep(roleSpawned, 400);
                } else if (livingRepairers < 2) {
                    roleSpawned = REPAIRER;
                    name = this.spawnCreep(roleSpawned, 600);
                }
            }
        } else if (livingPathFinders < minimumPathFinderCount) {
            roleSpawned = PATHFINDER;
            name = this.spawnCreep(roleSpawned, energyCapacity);
        } else if (livingBuilders < minimumBuilderCount) {
            roleSpawned = BUILDER;
            name = this.spawnCreep(roleSpawned, energyCapacity);
        } else {
            // roleSpawned = ROLE_BUILDER;
            // name = this.spawnCreep(roleSpawned, energyCapacity);
        }
        if (constants.isShowPopulationEnabled()) {
            console.log(livingHarvesters, '/', minimumHarvesterCount, 'harvesters(', harvester.tiers.length - 1, ') |',
                livingUpgraders, '/', minimumUpgraderCount, 'upgraders(', upgrader.tiers.length - 1, ') |',
                livingRepairers, '/', minimumRepairerCount, 'repairers(', repairer.tiers.length - 1, ') |',
                livingPathFinders, '/', minimumPathFinderCount, 'pathfinders(', pathfinder.tiers.length - 1, ') |',
                livingBuilders, '/', minimumBuilderCount, 'builders(', builder.tiers.length - 1, ')');
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