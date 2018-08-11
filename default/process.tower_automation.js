let towerControl = {
    run: function () {
        let towers = Game.rooms.E12S19.find(FIND_MY_STRUCTURES, {
            filter: (s) => s.structureType === STRUCTURE_TOWER
        });

        for (let tower of towers) {
            let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target !== undefined) {
                tower.attack(target);
            } else {
                target = tower.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: (s) => s.hits < s.hitsMax});
                if (target !== undefined) {
                    tower.repair(target);
                } else {
                    target = tower.pos.findClosestByRange(FIND_MY_CREEPS, {filter: (s) => s.hits < s.hitsMax});
                    if (target !== undefined) {
                        tower.repair(target);
                    } else {

                    }

                }
            }
        }

    }
};
module.exports = towerControl;