const getModifier = (
    { target, weather, badge, critical, random, STAB, type, burn, other }
) => target * weather * badge * critical * random * STAB * type * burn * other;
    
const getDamage = (attackingPokemon, defenderPokemon, modifier) => {
    const levelDamage = (2 * attackingPokemon.level / 5) + 2;
    const powerDamage = (attackingPokemon.power * attackingPokemon.attack) / defenderPokemon.defense;
    const modifierDamage = getModifier(modifier);
    return (((levelDamage * powerDamage) / 50) +2) * modifierDamage;
}

module.exports = {
    getDamage,
    getModifier
};