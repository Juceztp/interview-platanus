const announceWelcome = () => {
    console.log('');
    console.log('INICIANDO EL TORNEO...');
}

const announcePokemonSelection = () => {
    console.log('LOS MAESTROS POKEMONES ESTÁN ELIGIENDO SU POKEMON...');
}

const announceSelectedPokemon = (alias) => {
    console.log(`Elegido: ${alias}`);
}

const announceStage = (stage) => {
    console.log('');
    console.log(`ROUND ${stage} ##############################################################`);
}

const announceChampion = (champion) => {
    console.log('');
    console.log('##############################################################');
    console.log(`GANADOR ${champion}`);
    console.log('##############################################################');
}

const announceBattleResult = (participantA, participantB, winner) => {
    console.log('');
    console.log(`BATALLA: ${participantA} VS ${participantB}`);
    console.log(`GANADOR: ${winner}`);
}

module.exports = {
    announceWelcome,
    announcePokemonSelection,
    announceSelectedPokemon,
    announceStage,
    announceChampion,
    announceBattleResult
}