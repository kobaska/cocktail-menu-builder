import { tranformCocktailToEntityModel } from './tranform-cocktail-to-entity-model';

describe('tranformCocktailToEntityModel', () => {
  it('should work', () => {
    const cocktail = {
      idDrink: '1',
      strDrink: 'test'
    };

    const result = tranformCocktailToEntityModel(cocktail);

    expect(result).toEqual({
      id: '1',
      name: 'test',
    });
  });
});
