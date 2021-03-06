require('prototype.spawn')();
require('prototype.creep')();

let populationControl = require('process.population');
let colonyActionControl = require('process.colony_action');
let towerControl = require('process.tower_automation');
let linkControl = require('process.link');

let doSuicideProtocol = false;

module.exports.loop = function () {
    if (doSuicideProtocol) {
        let suicide = require('suicide_protocol');
        suicide.run();
    } else {
        let roomE12S19 = Game.rooms.E12S19;
        populationControl.run();
        colonyActionControl.run();
        towerControl.run();
        linkControl.run(roomE12S19);
    }

};