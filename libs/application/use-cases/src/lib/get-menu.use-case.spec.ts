import { GetMenuUseCase } from './get-menu.use-case';

describe('GetMenuUseCase', () => {
  it('should work when cocktails are returned', async () => {
    const cocktails = [
      {
        id: 'filteredId',
        name: 'filteredName',
        price: 10
      }
    ];

    const useCase = new GetMenuUseCase({
      get: jest.fn().mockResolvedValue(cocktails),
      addCocktail: jest.fn(),
      removeCocktail: jest.fn(),
    });

    expect(await useCase.execute()).toEqual(cocktails);
  });
});

