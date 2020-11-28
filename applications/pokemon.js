const request = require('../infrastructure/https');
const BASE_URL = 'https://pokeapi.co/api/v2';

const getOnePokemon = async (id) => {
    try {
        const url = `${BASE_URL}/pokemon/${id}`;
        return await request.get(url);
    } catch (error) {
        console.log(error);
    }
}

const getOnePokemonOfGeneration = async (id, { offset, limit }) => {
    if (id < offset && id > limit) throw new Error(`pokemon ${id} is not from generation I`);
    return await getOnePokemon(id);
}

const getUrl = async (path) => {
    return await request.get(path);
}

module.exports = {
    getOnePokemon,
    getOnePokemonOfGeneration,
    getUrl
}