import { removeCocktailFromMenu } from './remove-cocktail-from-menu';

describe('removeCocktailFromMenu', () => {
  it('should resolve when cocktails removal succeeds', async () => {
    await expect(removeCocktailFromMenu({
      cocktailId: '1',
      removeCocktailFromMenuImplementor: async () => Promise.resolve(void 1)
    })).resolves.not.toThrow();
  });

  it('should not leak internal error information', async () => {
    await expect(
      removeCocktailFromMenu({
        cocktailId: '1',
        removeCocktailFromMenuImplementor: async () => {
          throw new Error('Invalid database password');
        },
      })).rejects.toThrow('Failed to remove cocktail from menu. Please try again later.');
  });
});
