
module.exports = function () {
    StructureSpawn.prototype.createCustomCreep = function (role, energy) {
        let populationConfig = require('setup.population');
        let maxTier = populationConfig.maxTier;

        let numberOfParts = Math.min(Math.floor(energy / 200), maxTier);
        let bodyForRole = populationConfig[role].bodyTiers[numberOfParts];
        console.log(bodyForRole);

        let body = [];
        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(MOVE);
        }
        for (let i = 0; i < numberOfParts; i++) {
            body.push(CARRY);
        }
        return this.createCreep(body, undefined, {role: role});
    };
    StructureSpawn.prototype.sayEnergy= function() {
        
    }
};