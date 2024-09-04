import { getCocktails } from './get-cocktails';

describe('getCocktails', () => {
  it('should work when no cocktails are returned', async () => {
    const cocktails = await getCocktails({
      getCocktailsImplementor: async () => [],
      ingredient: 'query'
    });

    expect(cocktails).toEqual([]);
  });

  it('should work when cocktails are returned', async () => {
    const cocktails = await getCocktails({
      getCocktailsImplementor: async ({ ingredient }) => {
        if (ingredient === 'query') {
          return [{
            id: 'filteredId',
            name: 'filteredName'
          }];
        } else {
          return [{
            id: 'id',
            name: 'name'
          }];
        }
      },
      ingredient: 'query'
    });

    expect(cocktails).toEqual([{
      id: 'filteredId',
      name: 'filteredName',
      price: null
    }]);
  });

  it('should not leak internal error information', async () => {
    await expect(
      getCocktails({
        getCocktailsImplementor: async () => {
          throw new Error('Invalid database password');
        },
        ingredient: 'query'
      })).rejects.toThrow('Failed to fetch cocktails');
  });
});
