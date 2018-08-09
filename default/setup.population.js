const creeps = {
    'harvester': {
        tiers: [
            [WORK, MOVE, CARRY],
            [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY]
        ],
        count: 3
    },
    'builder': {
        tiers: [
            [WORK, MOVE, CARRY],
            [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY]
        ],
        count: 3
    },
    'upgrader': {
        tiers: [
            [WORK, MOVE, MOVE, CARRY],
            [WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY]
        ],
        count: 3
    },
    'pathfinder': {
        tiers: [
            [WORK, MOVE, MOVE, CARRY],
            [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY]
        ],
        count: 0
    },
    'repairer': {
        tiers: [
            [WORK, MOVE, MOVE, CARRY],
            [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY]
        ],
        count: 3
    }
};

module.exports = creeps;