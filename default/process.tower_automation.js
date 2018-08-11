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

        /*
                let towers = room.find(FIND_MY_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_TOWER
                });

                for (let tower of towers) {
                    let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                    if (target !== null) {
                        console.log(target);
                        if (config.isShowTowerDebugEnabled()) {
                            console.log('attacking');
                        }
                        tower.attack(target);
                    } else {
                        target = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: (s) => (s.hits < s.hitsMax) && (tower.pos.getRangeTo(s) < 10)});
                        if (target !== null) {
                            if (config.isShowTowerDebugEnabled()) {
                                console.log('repairing structure');
                            }
                            tower.repair(target);
                        } else {
                            target = tower.pos.findClosestByRange(FIND_MY_CREEPS, {filter: (s) => (s.hits < s.hitsMax) && (tower.pos.getRangeTo(s) < 10)});
                            if (target !== null) {
                                if (config.isShowTowerDebugEnabled()) {
                                    console.log('repairing creep');
                                }
                                tower.repair(target);
                            } else {
                                if (config.isShowTowerDebugEnabled()) {
                                    console.log('doing foggol');
                                }
                            }

                        }
                    }
                }*/

    }
};
module.exports = towerControl;