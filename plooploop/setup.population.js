const creeps = {
    'harvester': {
        tiers: [
            [WORK, MOVE, CARRY],
            [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY]
        ],
        count: HARVESTER_COUNT
    },
    'builder': {
        tiers: [
            [WORK, MOVE, CARRY],
            [WORK, WORK, WORK, MOVE, MOVE, CARRY, CARRY, CARRY]
        ],
        count: BUILDER_COUNT
    },
    'upgrader': {
        tiers: [
            [WORK, MOVE, MOVE, CARRY],
            [WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY]
        ],
        count: UPGRADER_COUNT
    },
    'pathfinder': {
        tiers: [
            [WORK, MOVE, MOVE, CARRY],
            [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY]
        ],
        count: PATHFINDER_COUNT
    },
    'repairer': {
        tiers: [
            [WORK, MOVE, MOVE, CARRY],
            [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY]
        ],
        count: REPAIRER_COUNT
    }
};

module.exports = creeps;