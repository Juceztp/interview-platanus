const referee = require('./Referee');
const caster = require('./caster');

const getBattlesForStage = (items) => new Array(Math.ceil(items.length / 2))
    .fill()
    .map(_ => items.splice(0, 2))
    .map(p => ({ pokemonA: p[0], pokemonB: p[1] }));

const doBattle = (pokemonA, pokemonB) => {
    let round = 0;
    while(true) {
        const winner = referee.getWinner(pokemonA, pokemonB);
        if (winner) return winner;
        const attackingPokemon = referee.getPokemonToAttack(round, pokemonA, pokemonB);
        const defenderPokemon = referee.getPokemonToDefend(round, pokemonA, pokemonB);
        const damage = attackingPokemon.attackToPokemon(defenderPokemon);
        defenderPokemon.defendFromAttack(damage);
        round++;
    }
}

recoverHPFromPokemon = (pokemon) => pokemon.map(poke => poke.recover());

const getWinnersOfStage = (battles) => {
    const winners = [];
    for(const battle of battles) {
        const winner = doBattle(battle.pokemonA, battle.pokemonB);
        caster.announceBattleResult(battle.pokemonA.alias, battle.pokemonB.alias, winner.alias);
        winners.push(winner);
    }
    return winners;
}

const start = (participatingPokemon) => {
    let stage = 1;
    let pokemon = [...participatingPokemon];
    while (true) {
        caster.announceStage(stage);
        recoverHPFromPokemon(pokemon);
        const battles = getBattlesForStage(pokemon);
        pokemon = getWinnersOfStage(battles);
        const champion = referee.getChampion(pokemon);
        if (champion) {
            caster.announceChampion(champion.alias);
            return champion;
        }
        stage++;
    }
}

module.exports = {
    start
}