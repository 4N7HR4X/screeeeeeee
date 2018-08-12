const config = require('config');
let towerControl = {
    run: function (room) {
        // todo find a better way to determine the source link (like proximity to source)
        const linkFrom = room.lookForAt('structure', 10, 17)[0];
        if (config.isShowLinkDebugEnabled()) {
            console.log(linkFrom);
        }
        const linkTo = linkFrom.pos.findInRange(FIND_MY_STRUCTURES, 30, {
            filter: (s) => s.structureType === STRUCTURE_LINK && s !== linkFrom
        })[0];

        if (config.isShowLinkDebugEnabled()) {
            console.log(linkTo);
        }
        linkFrom.transferEnergy(linkTo);
    }
};
module.exports = towerControl;