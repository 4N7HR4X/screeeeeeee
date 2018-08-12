const config = require('config');
let towerControl = {
    run: function () {

        let room = Game.rooms.E12S19;

        let towers = room.find(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER
        });
        for (let tower of towers) {
            let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target !== null) {
                if (config.isShowTowerDebugEnabled()) {
                    console.log('attacking', target);
                }
                tower.attack(target);
            } else /*{
                target = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: (s) => (s.hits < s.hitsMax)/!* && (tower.pos.getRangeTo(s) < 10)*!/});
                if (target !== null) {
                    if (config.isShowTowerDebugEnabled()) {
                        console.log('repairing', target);
                    }
                    tower.repair(target);
                } else*/ {
                target = tower.pos.findClosestByRange(FIND_MY_CREEPS, {filter: (s) => (s.hits < s.hitsMax)/* && (tower.pos.getRangeTo(s) < 10)*/});
                if (target !== null) {
                    if (config.isShowTowerDebugEnabled()) {
                        console.log('repairing', target);
                    }
                    tower.heal(target);
                } else {
                    if (config.isShowTowerDebugEnabled()) {
                        console.log('doing foggol');
                    }
                }
                /*
                                }*/
            }
        }

    }
};
module.exports = towerControl;