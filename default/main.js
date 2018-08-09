require('prototype.spawn')();

let populationControl = require('process.population');
let colonyActionControl = require('process.colony_action');

let doSuicideProtocol = false;

module.exports.loop = function () {
    if (doSuicideProtocol) {
        let suicide = require('suicide_protocol');
        suicide.run();
    } else {
        populationControl.run();
        colonyActionControl.run();
    }

};