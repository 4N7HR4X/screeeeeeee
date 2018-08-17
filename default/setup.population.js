module.exports = {
    'harvester': {
        tiers: [
            {
                body: [CARRY, MOVE, CARRY],
                cost: 200
            },
            {
                body: [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
                cost: 400
            },
            {
                body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
                cost: 600
            },
            {
                body: [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                cost: 800
            }
        ],
        count: 2,
        priority: 10,
        tags: ['logistics', 'harvester']
    },'harvester.alpha': {
        tiers: [
            {
                body: [WORK, MOVE, CARRY],
                cost: 200
            }
        ],
        count: 1,
        priority: 10,
        tags: ['logistics', 'harvester', 'tower']
    },
    'builder': {
        tiers: [
            {
                body: [WORK, MOVE, CARRY],
                cost: 200
            },
            {
                body: [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
                cost: 400
            },
            {
                body: [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
                cost: 600
            },
            {
                body: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
                cost: 800
            }
        ],
        count: 3,
        priority: 6,
        tags: ['logistics', 'builder']
    },
    'upgrader': {
        tiers: [
            {
                body: [WORK, MOVE, CARRY],
                cost: 200
            },
            {
                body: [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
                cost: 400
            },
            {
                body: [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
                cost: 600
            },
            {
                body: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
                cost: 800
            }
        ],
        count: 0,
        priority: 8,
        tags: ['logistics', 'upgrader']
    },
    'upgrader.alpha': {
        tiers: [
            {
                body: [WORK, MOVE, CARRY],
                cost: 200
            },
            {
                body: [WORK, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY],
                cost: 400
            },
            {
                body: [WORK, WORK, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                cost: 600
            },
            {
                body: [WORK, WORK, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                cost: 800
            }
        ],
        count: 2,
        priority: 8,
        tags: ['logistics', 'upgrader.alpha', 'miner']
    },
    'upgrader.beta': {
        tiers: [
            {
                body: [WORK, MOVE, CARRY],
                cost: 200
            },
            {
                body: [WORK, WORK, MOVE, CARRY, CARRY, CARRY],
                cost: 400
            },
            {
                body: [WORK, WORK, WORK, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY],
                cost: 600
            }/*,
            {
                body: [WORK, WORK, WORK, WORK, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                cost: 800
            }*/
        ],
        count: 4,
        priority: 8,
        tags: ['logistics', 'upgrader.beta', 'technician']
    },
    'pathfinder': {
        tiers: [
            {
                body: [WORK, MOVE, CARRY],
                cost: 200
            },
            {
                body: [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
                cost: 400
            }/*,
            {
                body: [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
                cost: 600
            },
            {
                body: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
                cost: 800
            }*/
        ],
        count: 0,
        priority: 0,
        tags: ['logistics', 'pathfinder']
    },
    'repairer': {
        tiers: [
            {
                body: [WORK, MOVE, CARRY],
                cost: 200
            },
            {
                body: [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
                cost: 400
            },
            {
                body: [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY],
                cost: 600
            },
            {
                body: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
                cost: 800
            }
        ],
        count: 3,
        priority: 3,
        tags: ['logistics', 'repairer']
    },

    getTierToSpawn: function (role, energy) {
        let returnedTier = null;
        let tiers = this[role].tiers;
        let maxTier = tiers.length - 1;
        for (let tierIndex = 0; tierIndex <= maxTier; tierIndex++) {
            if (energy >= tiers[tierIndex].cost) {
                returnedTier = tiers[tierIndex];
            } else {
                break;
            }
        }
        return returnedTier;
    },

    calculateBodyCost: function (body) {
        return body.reduce(function (cost, part) {
            return cost + BODYPART_COST[part];
        }, 0);
    }
};