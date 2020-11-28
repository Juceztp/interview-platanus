const apiPokemon = require('../applications/pokemon');
const damageCalculation = require('./calculation');
const generationOne = require('./generationOne');
const { getRandomInt } = require('../infrastructure/helpers');

// Constants
const LEVEL = 1;
const MAX_MOVE = 4;
const MOVE_TRANSFORM = 144;

class Pokemon {

    constructor (pokemon) {
        this.name = pokemon.name;
        this.types = [];
        this.moves = pokemon.moves;
        pokemon.stats.map(s => this[s.stat.name] = s.base_stat);
        pokemon.types.map(t => this.types.push(t.type.name));
        this.alias = `${pokemon.name} [Maestro #${pokemon.index}]`;
        this.level = LEVEL;
    }

    async init(generation) {
        this.originalHP = this.hp;
        this.getModifier = this.getModifierByGeneration(generation);
        this.learnedMoves = await this.getFourMovesForLearn();
        this.originalMovesLearned = this.learnedMoves;
    }

    async getFourMovesForLearn() {
        const moves = [];
        while(moves.length !== MAX_MOVE && moves.length !== this.moves.length) {
            const moveIndex = getRandomInt(0, this.moves.length - 1);
            if (!this.moves[moveIndex] || moves.find(m => m.name === this.moves[moveIndex].move.name)) continue;
            const move = await apiPokemon.getUrl(this.moves[moveIndex].move.url);
            const moveType = await apiPokemon.getUrl(move.type.url);
            moves.push({
                id: move.id,
                name: move.name,
                power: move.power || 1,
                type: move.type.name,
                damageRelations: moveType.damage_relations
            });
        }
        return moves;
    }

    defendFromAttack(damage) {
        return this.hp -= damage;
    }

    attackToPokemon(defenderPokemon) {
        const moveIndex = getRandomInt(0, this.learnedMoves.length - 1);
        let moveOfAttackingPokemon = this.learnedMoves[moveIndex];
        if (this.isMoveTransform(moveOfAttackingPokemon.id)) {
            this.learnedMoves = defenderPokemon.learnedMoves;
            moveOfAttackingPokemon = this.learnedMoves[moveIndex];
        }
        const modifier = this.getModifier(moveOfAttackingPokemon, defenderPokemon.types);
        return damageCalculation.getDamage({ ...this, ...{ power: moveOfAttackingPokemon.power }}, defenderPokemon, modifier);
    }

    recover() {
        this.learnedMoves = this.originalMovesLearned;
        this.hp = this.originalHP;
    }

    getModifierByGeneration(generation) {
        if (generation !== 'I') throw new Error('Only supports generation I :(');
        return generationOne.getModifier;
    }

    isMoveTransform(moveId) {
        return moveId === MOVE_TRANSFORM;
    }

}

module.exports = Pokemon;