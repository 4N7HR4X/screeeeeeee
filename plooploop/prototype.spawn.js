
module.exports = function () {
    let creepSetup = require('setup.population');
    StructureSpawn.prototype.createCustomCreep = function (role, energy) {
        // let numberOfParts = Math.min(Math.floor(energy / 200), config.getMaxSize(role));

        let body = creepSetup[role].body;
        // for (let i = 0; i < numberOfParts; i++) {
        //     body.push(WORK);
        // }
        // for (let i = 0; i < numberOfParts; i++) {
        //     body.push(MOVE);
        // }
        // for (let i = 0; i < numberOfParts; i++) {
        //     body.push(CARRY);
        // }
        return this.createCreep(body, undefined, {role: role});
    };
    StructureSpawn.prototype.sayEnergy= function() {
        
    }
};