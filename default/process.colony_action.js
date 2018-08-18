let colony = {
    run: function () {
        let civilianCreeps = Game.creeps.filter((name) => Game.creeps[name].memory.military_unit === false);
        for (let name in civilianCreeps) {
            let creep = Game.creeps[name];
            creep.performAction();
        }
    }
};

module.exports = colony;