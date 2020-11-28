const apiPokemon = require('../applications/pokemon');
const Pokemon = require('./pokemon');
const caster = require('./caster');
const tournament = require('./tournament');
const { getRandomInt } = require('../infrastructure/helpers');

//CONSTANTS
const GENERATION = {
    label: 'I',
    offset: 1,
    limit: 155
};
const TOTAL_PARTICIPANTS = 8;

const run = async (totalParticipants = TOTAL_PARTICIPANTS, generation = GENERATION) => {
    caster.announceWelcome();
    if (generation.label !== 'I' || generation.offset > 155 || generation.limit > 155) throw new Error('Only supports generation I :(');
    if (totalParticipants !== 8) throw new Error('1 participant is missing');
    const pokemon = [];
    caster.announcePokemonSelection();
    while(pokemon.length !== totalParticipants) {
        const randomId = getRandomInt(generation.offset, generation.limit);
        const pokemonGenerationOne = await apiPokemon.getOnePokemonOfGeneration(randomId, generation);
        const poke = new Pokemon({ ...pokemonGenerationOne, ...{ index: pokemon.length + 1 } });
        await poke.init(generation.label);
        pokemon.push(poke);
        caster.announceSelectedPokemon(poke.alias);
    }
    return tournament.start(pokemon);
}

module.exports = { run }