let constants = require('config');
let populationConfig = require('setup.population');

const HARVESTER = constants.ROLE_HARVESTER();
const BUILDER = constants.ROLE_BUILDER();
const UPGRADER = constants.ROLE_UPGRADER();
const UPGRADER_ALPHA = constants.ROLE_UPGRADER_ALPHA();
const UPGRADER_BETA = constants.ROLE_UPGRADER_BETA();
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
        let linksExist = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_LINK
        }) !== undefined;
        if (constants.isDebugEnabled()) {
            console.log('linksExist:', linksExist);
        }

        let harvester = populationConfig.harvester;
        let builder = populationConfig.builder;
        let upgrader = populationConfig.upgrader;
        let upgraderAlpha = populationConfig['upgrader.alpha'];
        let upgraderBeta = populationConfig['upgrader.beta'];
        let pathfinder = populationConfig.pathfinder;
        let repairer = populationConfig.repairer;

        let minimumHarvesterCount = harvester.count;
        let minimumBuilderCount = builder.count;
        let minimumUpgraderCount = upgrader.count;
        let minimumUpgraderAlphaCount = upgraderAlpha.count;
        let minimumUpgraderBetaCount = upgraderBeta.count;
        let minimumPathFinderCount = pathfinder.count;
        let minimumRepairerCount = repairer.count;

        let livingHarvesters = this.getLivingCreepCount(HARVESTER);
        let livingUpgraders = this.getLivingCreepCount(UPGRADER);
        let livingUpgradersAlpha = this.getLivingCreepCount(UPGRADER_ALPHA);
        let livingUpgradersBeta = this.getLivingCreepCount(UPGRADER_BETA);
        let livingBuilders = this.getLivingCreepCount(BUILDER);
        let livingPathFinders = this.getLivingCreepCount(PATHFINDER);
        let livingRepairers = this.getLivingCreepCount(REPAIRER);

        let roleSpawned = undefined;
        let energyToSpend = undefined;

        if (livingHarvesters < minimumHarvesterCount) {
            // if we don't have at least the minimum harvesters, spawn one at current energy level
            roleSpawned = HARVESTER;
            energyToSpend = energyCapacity;
            energyToSpend = populationConfig.getTierToSpawn(roleSpawned, energyToSpend).cost;
            name = this.spawnCreep(roleSpawned, energyToSpend);

            if (name === ERR_NOT_ENOUGH_ENERGY) {
                if (livingHarvesters < 2) {
                    roleSpawned = HARVESTER;
                    // roleSpawned = HARVESTER + '.alpha';
                    energyToSpend = Math.max(400, energyAvailable);
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                    if (livingHarvesters === 0 && name === ERR_NOT_ENOUGH_ENERGY) {
                        roleSpawned = HARVESTER;
                        // roleSpawned = HARVESTER + '.alpha';
                        energyToSpend = 200;
                        name = this.spawnCreep(roleSpawned, energyToSpend);
                    }
                } else if (livingBuilders < 1) {
                    roleSpawned = BUILDER;
                    energyToSpend = energyAvailable;
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                } else if (livingUpgradersBeta < 2) {
                    roleSpawned = UPGRADER_BETA;
                    energyToSpend = Math.max(400, energyAvailable);
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                } else if (livingRepairers < 1) {
                    roleSpawned = REPAIRER;
                    energyToSpend = Math.max(400, energyAvailable);
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                }
            }
        } else if (livingUpgraders < minimumUpgraderCount) {
            roleSpawned = UPGRADER;
            energyToSpend = energyCapacity;
            energyToSpend = populationConfig.getTierToSpawn(roleSpawned, energyToSpend).cost;
            name = this.spawnCreep(roleSpawned, energyToSpend);
            if (name === ERR_NOT_ENOUGH_ENERGY) {
                if (livingBuilders < 1) {
                    roleSpawned = BUILDER;
                    energyToSpend = energyCapacity;
                    energyToSpend = populationConfig.getTierToSpawn(roleSpawned, energyToSpend).cost;
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                } else if (livingUpgraders < 1) {
                    roleSpawned = UPGRADER;
                    energyToSpend = 400;
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                } else if (livingRepairers < 1) {
                    roleSpawned = REPAIRER;
                    energyToSpend = 400;
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                }
            }
        } else if (livingRepairers < minimumRepairerCount) {
            roleSpawned = REPAIRER;
            energyToSpend = energyCapacity;
            energyToSpend = populationConfig.getTierToSpawn(roleSpawned, energyToSpend).cost;
            name = this.spawnCreep(roleSpawned, energyToSpend);
            if (name === ERR_NOT_ENOUGH_ENERGY) {
                if (livingBuilders < 2) {
                    roleSpawned = BUILDER;
                    energyToSpend = 400;
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                } else if (livingRepairers < 1 /*minimumRepairerCount - 1*/) {
                    roleSpawned = REPAIRER;
                    energyToSpend = 400;
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                } else if (livingUpgradersBeta < 4) {
                    roleSpawned = REPAIRER;
                    energyToSpend = 400;
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                }
            }
        } else if (livingPathFinders < minimumPathFinderCount) {
            roleSpawned = PATHFINDER;
            energyToSpend = energyCapacity;
            energyToSpend = populationConfig.getTierToSpawn(roleSpawned, energyToSpend).cost;
            name = this.spawnCreep(roleSpawned, energyToSpend);
        } else if (livingUpgradersBeta < minimumUpgraderBetaCount) {
            roleSpawned = UPGRADER_BETA;
            energyToSpend = energyCapacity;
            energyToSpend = populationConfig.getTierToSpawn(roleSpawned, energyToSpend).cost;
            name = this.spawnCreep(roleSpawned, energyToSpend);
            if (name === ERR_NOT_ENOUGH_ENERGY) {
                if (livingBuilders < 2) {
                    roleSpawned = BUILDER;
                    energyToSpend = 400;
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                } else if (livingRepairers < 2) {
                    roleSpawned = REPAIRER;
                    energyToSpend = 600;
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                }
            }
        } else if (livingBuilders < minimumBuilderCount) {
            roleSpawned = BUILDER;
            energyToSpend = energyCapacity;
            energyToSpend = populationConfig.getTierToSpawn(roleSpawned, energyToSpend).cost;
            name = this.spawnCreep(roleSpawned, energyToSpend);
            if (name === ERR_NOT_ENOUGH_ENERGY) {
                if (livingBuilders < 2) {
                    roleSpawned = BUILDER;
                    energyToSpend = 400;
                    name = this.spawnCreep(roleSpawned, energyToSpend);
                }
            }
        } else if (livingUpgradersAlpha < minimumUpgraderAlphaCount) {
            roleSpawned = UPGRADER_ALPHA;
            energyToSpend = energyCapacity;
            energyToSpend = populationConfig.getTierToSpawn(roleSpawned, energyToSpend).cost;
            name = this.spawnCreep(roleSpawned, energyToSpend);
        } else {
            //todo figure out which creep would be most useful to build
        }
        if (constants.isShowResourcesEnabled()) {
            console.log('|', energyAvailable, '/', energyCapacity, 'energy')
        }
        if (constants.isShowPopulationEnabled()) {
            console.log('|',
                livingHarvesters, '/', minimumHarvesterCount, 'harvesters(', harvester.tiers.length - 1, ') \n|',
                // livingUpgraders, '/', minimumUpgraderCount, 'upgraders(', upgrader.tiers.length - 1, ') \n|',
                livingUpgradersAlpha, '/', minimumUpgraderAlphaCount, 'upgradersAlpha(', upgraderAlpha.tiers.length - 1, ') \n|',
                livingUpgradersBeta, '/', minimumUpgraderBetaCount, 'upgradersBeta(', upgraderBeta.tiers.length - 1, ') \n|',
                livingRepairers, '/', minimumRepairerCount, 'repairers(', repairer.tiers.length - 1, ') \n|',
                livingPathFinders, '/', minimumPathFinderCount, 'pathfinders(', pathfinder.tiers.length - 1, ') \n|',
                livingBuilders, '/', minimumBuilderCount, 'builders(', builder.tiers.length - 1, ') ');
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
                    if (constants.isShowPopulationEnabled()) {
                        console.log('next spawn:', roleSpawned, '@', energyToSpend);
                    }
                    break;
                case ERR_BUSY:
                    let spawning = Game.spawns.Spawn1.spawning;
                    if (constants.isDebugEnabled()) {
                        console.log('already', spawning === undefined ? 'busy' : 'spawning ' + spawning.name);
                    } else if (constants.isShowPopulationEnabled()) {
                        console.log(spawning === undefined ? 'busy' : 'spawning ' + spawning.name);
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