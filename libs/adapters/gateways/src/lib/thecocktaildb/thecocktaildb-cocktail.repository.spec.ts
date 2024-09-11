import {TheCocktailDBCocktailRepository} from './thecocktaildb-cocktail.repository';
import { mock } from 'node:test'

describe('TheCocktailDBCocktailRepository', () => {
  beforeEach(() => {
    mock.reset();
  });

    describe('find', () => {
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
    
        const repository = new TheCocktailDBCocktailRepository();

        const cocktail = await repository.find('1');
    
        expect(cocktail).toEqual({
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
    
        const repository = new TheCocktailDBCocktailRepository();

        const cocktail = await repository.find('0');
    
        expect(cocktail).toBeNull();
      });
    });

    describe('get', () => {
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
    
        const repository = new TheCocktailDBCocktailRepository();
        const cocktails = await repository.get('vodka');
    
        expect(cocktails).toEqual([{
          id: '1',
          name: 'Rum and Coke',
        }]);
      });
    
      it('should return empty list when API does not return a body but returns status 200', async () => {
        mock.method(global, 'fetch', () => {
          return {
            status: 200
          }
        });
    
        const repository = new TheCocktailDBCocktailRepository();
        const cocktails = await repository.get('vodka');
    
        expect(cocktails).toEqual([]);
      });
    });
});