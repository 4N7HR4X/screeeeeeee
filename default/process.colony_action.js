let colony = {
    run: function () {
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            creep.performAction();
        }
    }
};

module.exports = colony;