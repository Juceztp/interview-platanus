const getPokemonToAttack = (round, pokemonA, pokemonB) => round % 2 ? pokemonB : pokemonA;

const getPokemonToDefend = (round, pokemonA, pokemonB) => round % 2 ? pokemonA : pokemonB;

const getWinner = (pokemonA, pokemonB) => {
    if (pokemonA.name === 'ditto' && pokemonB.name === 'ditto') return pokemonA;
    return pokemonA.hp <= 0 ? pokemonB : pokemonB.hp <= 0 ? pokemonA : false
};

const getChampion = (participants) => participants.length === 1 ? participants[0] : false;

module.exports = {
    getPokemonToAttack,
    getPokemonToDefend,
    getWinner,
    getChampion
};