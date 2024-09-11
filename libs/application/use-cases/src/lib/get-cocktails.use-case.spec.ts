import { GetCocktailsUseCase } from './get-cocktails.use-case';

describe('GetCocktailsUseCase', () => {
  it('should work when no cocktails are found', async () => {
    const useCase = new GetCocktailsUseCase({
      find: jest.fn(),
      get: jest.fn().mockResolvedValue([]),
    });

    expect(await useCase.execute('rum')).toEqual([]);
  });

  it('should work when cocktails are returned', async () => {
    const cocktails = [{
      id: 'id',
      name: 'name'
    }];

    const useCase = new GetCocktailsUseCase({
      find: jest.fn(),
      get: jest.fn().mockResolvedValue(cocktails),
    });

    expect(await useCase.execute('rum')).toEqual(cocktails.map(cocktail => ({
      ...cocktail,
      price: null
    })));
  });
});
