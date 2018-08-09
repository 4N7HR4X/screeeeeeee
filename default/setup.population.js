module.exports = {
    'harvester': {
        bodyTiers: [
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
            }
        ],
        count: 3
    },
    'builder': {
        bodyTiers: [
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
            }
        ],
        count: 3
    },
    'upgrader': {
        bodyTiers: [
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
            }
        ],
        count: 3
    },
    'pathfinder': {
        bodyTiers: [
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
            }
        ],
        count: 3
    },
    'repairer': {
        bodyTiers: [
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
            }
        ],
        count: 3
    },
    maxTier: 2
};