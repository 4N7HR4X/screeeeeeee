let colony = {
    run: function () {
        let civilianCreeps = Game.creeps;
        for (let name in civilianCreeps) {
            let creep = Game.creeps[name];
            creep.performAction();
        }
    }
};

module.exports = colony;