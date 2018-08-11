const config = require('config');
let towerControl = {
    run: function () {
        let towers = Game.rooms.E12S19.find(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER
        });

        for (let tower of towers) {
            let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target !== null) {
                console.log(target);
                if(config.isShowTowerDebugEnabled()) {
                    console.log('attacking');
                }
                tower.attack(target);
            } else {
                target = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: (s) => (s.hits < s.hitsMax) && (tower.pos.getRangeTo(s))});
                if (target !== null) {
                    if(config.isShowTowerDebugEnabled()) {
                        console.log('repairing structure');
                    }
                    tower.repair(target);
                } else {
                    target = tower.pos.findClosestByRange(FIND_MY_CREEPS, {filter: (s) => (s.hits < s.hitsMax) && (tower.pos.getRangeTo(s))});
                    if (target !== null) {
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