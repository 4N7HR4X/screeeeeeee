module.exports = {
    run: function () {
        Game.creeps.forEach((creep) => {
            console.log(creep, Game.creeps[creep].suicide());
        });
    }
};