import { mock } from 'node:test'
import { fetchCocktailByIdFromTheCocktailDB } from './fetch-cocktail-by-id';

describe('fetchCocktailByIdFromTheCocktailDB', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should work when cocktails are returned', async () => {
    mock.method(global, 'fetch', () => {
      return {
        json: () => ({
          drinks: [
            {
              idDrink: '1',
              strDrink: 'Rum and Coke',
            }
          ]
        }), status: 200
      }
    });

    const cocktailMenu = await fetchCocktailByIdFromTheCocktailDB('1');

    expect(cocktailMenu).toEqual({
      id: '1',
      name: 'Rum and Coke',
    });
  });

  it('should return empty list when API does not return a body but returns status 200', async () => {
    mock.method(global, 'fetch', () => {
      return {
        status: 200
      }
    });

    const cocktailMenu = await fetchCocktailByIdFromTheCocktailDB('0');

    expect(cocktailMenu).toBeNull();
  });
});
