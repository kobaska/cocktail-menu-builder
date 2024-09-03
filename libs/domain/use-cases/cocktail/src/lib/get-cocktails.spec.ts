import { getCocktails } from './get-cocktails';

describe('domainUseCasesCocktail', () => {
  it('should work', () => {
    // TODO
    getCocktails({
      getCocktailsImplementor: async () => [],
      query: {
        ingredient: 'query'
      }
    });
  });
});
