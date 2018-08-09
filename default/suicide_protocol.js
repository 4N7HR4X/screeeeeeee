module.exports = {
    run: function () {
        for (let creep in Game.creeps) {
            console.log(creep, Game.creeps[creep].suicide());
        }
    }
};