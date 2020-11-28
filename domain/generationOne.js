const { getRandomInt } = require('../infrastructure/helpers');

// Constants
const ONE_TARGET = 1;
const SEVERAL_TARGETS = 0.75;
const WEATHER = 1;
const BADGE = 1;
const CRITICAL = 1;
const RANDOM_BASE = 255;
const RANDOM_MIN = 217;
const RANDOM_MAX = 255;
const STAB = 1;
const BURN = 1;
const OTHER = 1;

const getTarget = (targets = 1) => targets === 1 ? ONE_TARGET : SEVERAL_TARGETS;

const getWeather = () => WEATHER;

const getBadge = () => BADGE;

const getCritical = () => CRITICAL;

const getRandom = () => {
    const random = getRandomInt(RANDOM_MIN, RANDOM_MAX);
    return random / RANDOM_BASE;
};

const getSTAB = () => STAB;

const getDamageRelation = (damageRelations, key, id) => damageRelations[key].find( d => d.name === id);

const getType = (moveOfAttackingPokemon, typesOfTargetPokemon) => {
    let typeDamage = 1;
    for (typeOfTargetPokemon of typesOfTargetPokemon) {
        const no_damage_to = getDamageRelation(moveOfAttackingPokemon.damageRelations, 'no_damage_to', typeOfTargetPokemon);
        if (no_damage_to) {
            typeDamage *= 0;
            continue;
        };
        const half_damage_to = getDamageRelation(moveOfAttackingPokemon.damageRelations, 'half_damage_to', typeOfTargetPokemon);
        if (half_damage_to) {
            typeDamage *= 0.5;
            continue;
        };
        const double_damage_to = getDamageRelation(moveOfAttackingPokemon.damageRelations, 'double_damage_to', typeOfTargetPokemon);
        if (double_damage_to) {
            typeDamage *= 2;
            continue;
        };
    }
    return typeDamage;
};

const getBurn = () => BURN;

const getOther = () => OTHER;

const getModifier = (moveOfAttackingPokemon, typesOfTargetPokemon) => {
    return {
        target: getTarget(),
        weather: getWeather(),
        badge: getBadge(),
        critical: getCritical(),
        random: getRandom(),
        STAB: getSTAB(),
        type: getType(moveOfAttackingPokemon, typesOfTargetPokemon),
        burn: getBurn(),
        other: getOther()
    }
}

module.exports = {
    getModifier,
    getTarget,
    getWeather,
    getBadge,
    getCritical,
    getRandom,
    getSTAB,
    getType,
    getBurn,
    getOther
};