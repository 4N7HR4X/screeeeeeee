const config = require('config');
let towerControl = {
    run: function () {
        let towers = Game.rooms.E12S19.find(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER
        });

        for (let tower of towers) {
            let target = tower.pos.findInRange(FIND_HOSTILE_CREEPS, 10);
            if (target !== undefined) {
                console.log(target);
                if(config.isShowTowerDebugEnabled()) {
                    console.log('attacking');
                }
                tower.attack(target);
            } else {
                target = tower.pos.findInRange(FIND_MY_STRUCTURES, 10, {filter: (s) => s.hits < s.hitsMax});
                if (target !== undefined) {
                    if(config.isShowTowerDebugEnabled()) {
                        console.log('repairing structure');
                    }
                    tower.repair(target);
                } else {
                    target = tower.pos.findInRange(FIND_MY_CREEPS, 10, {filter: (s) => s.hits < s.hitsMax});
                    if (target !== undefined) {
                        if(config.isShowTowerDebugEnabled()) {
                            console.log('repairing creep');
                        }
                        tower.repair(target);
                    } else {
                        if(config.isShowTowerDebugEnabled()) {
                            console.log('doing foggol');
                        }
                    }

                }
            }
        }

    }
};
module.exports = towerControl;