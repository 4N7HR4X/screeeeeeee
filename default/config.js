const DEBUG = true;
const SHOW_POPULATION = true;
const SHOW_RESOURCES = true;
const SHOW_ROLES = true;

const HARVESTER = 'harvester';
const BUILDER = 'builder';
const UPGRADER = 'upgrader';
const PATHFINDER = 'pathfinder';
const REPAIRER = 'repairer';

const HARVESTER_COUNT = 4;
const BUILDER_COUNT = 3;
const UPGRADER_COUNT = 3;
const PATHFINDER_COUNT = 0;
const REPAIRER_COUNT = 2;
const DEFAULT_COUNT = 1;

const DEFAULT_MAX_SIZE = 0;
const HARVESTER_MAX_SIZE = DEFAULT_MAX_SIZE + 2;
const BUILDER_MAX_SIZE = DEFAULT_MAX_SIZE + 3;
const UPGRADER_MAX_SIZE = DEFAULT_MAX_SIZE + 2;
const PATHFINDER_MAX_SIZE = DEFAULT_MAX_SIZE + 0;
const REPAIRER_MAX_SIZE = DEFAULT_MAX_SIZE + 2;

const COLOR_STROKE_WORK = '#ffffff';
const COLOR_STROKE_COLLECT = '#ffaa00';

const config = {
    isDebugEnabled: function () {
        return DEBUG;
    },
    isShowPopulationEnabled: function () {
        return SHOW_POPULATION;
    },
    isShowResourcesEnabled: function () {
        return SHOW_RESOURCES;
    },
    isShowRolesEnabled: function () {
        return SHOW_ROLES;
    },
    getMinimumCreepCount: function (role) {
        switch (role) {
            case HARVESTER:
                return HARVESTER_COUNT;
            case BUILDER:
                return BUILDER_COUNT;
            case UPGRADER:
                return UPGRADER_COUNT;
            case PATHFINDER:
                return PATHFINDER_COUNT;
            case REPAIRER:
                return REPAIRER_COUNT;
            default:
                return DEFAULT_COUNT;
        }
    },
    /**
     * @return {string}
     */
    ROLE_BUILDER: function () {
        return BUILDER;
    },
    /**
     * @return {string}
     */
    ROLE_UPGRADER: function () {
        return UPGRADER;
    },
    /**
     * @return {string}
     */
    ROLE_HARVESTER: function () {
        return HARVESTER;
    },
    /**
     * @return {string}
     */
    ROLE_PATHFINDER: function () {
        return PATHFINDER;
    },
    /**
     * @return {string}
     */
    ROLE_REPAIRER: function () {
        return REPAIRER;
    },
    PATH_STYLE_TO_COLLECT: function () {
        return {visualizePathStyle: {stroke: COLOR_STROKE_COLLECT}};
    },
    PATH_STYLE_TO_WORK: function () {
        return {visualizePathStyle: {stroke: COLOR_STROKE_WORK}};
    },
    getMaxSize: function (role) {
        switch (role) {
            case HARVESTER:
                return HARVESTER_MAX_SIZE;
            case BUILDER:
                return BUILDER_MAX_SIZE;
            case UPGRADER:
                return UPGRADER_MAX_SIZE;
            case PATHFINDER:
                return PATHFINDER_MAX_SIZE;
            case REPAIRER:
                return REPAIRER_MAX_SIZE;
            default:
                return DEFAULT_MAX_SIZE;
        }
    }
};
module.exports = config;