const config = require('config');
let towerControl = {
    run: function () {

        let room = Game.rooms.E12S19;

        const linkFrom = room.lookForAt('structure', 10, 17)[0];

        if (config.isShowTowerDebugEnabled()) {
            console.log(linkFrom);
        }

        const linkTo = linkFrom.pos.findInRange(FIND_MY_STRUCTURES, 30, {
            filter: (s) => s.structureType === STRUCTURE_LINK && s !== linkFrom
        })[0];

        console.log(linkTo);
        linkFrom.transferEnergy(linkTo);

        let creep = linkTo.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (c) => c.memory.role === config.ROLE_UPGRADER_BETA()
        });

        console.log(creep);

        // linkTo.transferEnergy(creep, creep.energyCapacity - creep.energyAvailable);
        creep.withdraw(linkTo, RESOURCE_ENERGY, creep.energyCapacity - creep.energyAvailable);
    }
};
module.exports = towerControl;