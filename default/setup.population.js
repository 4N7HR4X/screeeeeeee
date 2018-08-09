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
            },
            {
                body: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
                cost: 800
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
            },
            {
                body: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
                cost: 800
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
            },
            {
                body: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
                cost: 800
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
            },
            {
                body: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
                cost: 800
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
            },
            {
                body: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
                cost: 800
            }
        ],
        count: 3
    },
    maxTier: 3
};