const app = require('../domain/app');

jest.setTimeout(60000);

describe('Pruebas de integración', () => {

    describe('DADO: Un torneo pokemon de 8 pokemones', () => {

        describe('CUANDO: todos los pokemones son Dittos', () => {
            it('ENTONCES: el ganador debería ser un Ditto', async () => {
                const GENERATION = { label: 'I', offset: 132, limit: 132 };
                const champion = await app.run(8, GENERATION);
                expect(champion.name).toBe('ditto');
            });
        });

        describe('CUANDO: todos los pokemones no son de la primera generación', () => {
            it('ENTONCES: el torneo no inicia ya que solo se soporta la generación I (1-155)', async () => {
                try {
                    const GENERATION = { label: 'I', offset: 156, limit: 200 };
                    await app.run(8, GENERATION);
                } catch (error) {
                    expect(error.message).toBe('Only supports generation I :(');
                }
            });
        });

        describe('CUANDO: solo hay 7 pokemones participando', () => {
            it('ENTONCES: el torneo no inicia ya que la cantidad de participantes debe ser 8', async () => {
                try {
                    const GENERATION = { label: 'I', offset: 1, limit: 155 };
                    await app.run(7, GENERATION);
                } catch (error) {
                    expect(error.message).toBe('1 participant is missing');
                }
            });
        });

        describe('CUANDO: solo hay 7 pokemones', () => {
            it('ENTONCES: el torneo no inicia ya que la cantidad de pokemones participantes debe ser un número par', async () => {
                try {
                    const GENERATION = { label: 'I', offset: 1, limit: 155 };
                    await app.run(7, GENERATION);
                } catch (error) {
                    expect(error.message).toBe('1 participant is missing');
                }
            });
        });

        describe('CUANDO: Hay 8 pokemones aleatorios', () => {
            it('ENTONCES: el torneo debería terminar con un ganador', async () => {
                const GENERATION = { label: 'I', offset: 1, limit: 155 };
                const champion = await app.run(8, GENERATION);
                expect(champion.name).not.toBeNull();
            });
            it('ENTONCES: el torneo debería terminar con un ganador', async () => {
                const GENERATION = { label: 'I', offset: 1, limit: 155 };
                const champion = await app.run(8, GENERATION);
                expect(champion.name).not.toBeNull();
            });
        });

    });
    
})
