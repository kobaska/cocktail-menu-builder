import { RemoveCocktailFromMenuUseCase } from './remove-cocktail-from-menu.use-case';

describe('RemoveCocktailFromMenuUseCase', () => {
  it('should resolve when cocktail removal succeeds', async () => {
    const useCase = new RemoveCocktailFromMenuUseCase({
      get: jest.fn(),
      addCocktail: jest.fn(),
      removeCocktail: jest.fn().mockResolvedValue(void 1),
    });

    await expect(useCase.execute('1')).resolves.not.toThrow();
  });
});
