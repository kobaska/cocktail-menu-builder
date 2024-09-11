import { CustomError } from '@cocktail-menu-builder/helpers/error-handlers';
import { AddCocktailToMenuUseCase } from './add-cocktail-to-menu.use-case';

describe('AddCocktailToMenuUseCase', () => {
  it('should fail with 404 when cocktail is not found', async () => {
    const cocktail = { id: '1' };

    try {
      const useCase = new AddCocktailToMenuUseCase(
        {
          addCocktail: jest.fn(),
          get: jest.fn(),
          removeCocktail: jest.fn(),
        },
        {
          find: jest.fn().mockResolvedValue(null),
          get: jest.fn(),
        }
      );

      await useCase.execute(cocktail);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);

      if (!(error instanceof CustomError)) {
        fail('Expected error to be an instance of CustomError');
      }

      expect(error.message).toEqual('Cocktail for provided id not found');
      expect(error.status).toEqual(404);
    }
  });

  it('should pass when cocktail is found', async () => {
    const cocktail = { id: '1', name: 'Margarita' };
    const updatedCocktail = { ...cocktail, name: 'Margarita(Happy Hour)', price: 10 };
    const findMock = jest.fn().mockResolvedValue(cocktail);
    const addCocktailMock = jest.fn().mockResolvedValue(updatedCocktail);

    const useCase = new AddCocktailToMenuUseCase(
      {
        addCocktail: addCocktailMock,
        get: jest.fn(),
        removeCocktail: jest.fn(),
      },
      {
        find: findMock,
        get: jest.fn(),
      }
    );

    expect(
      await useCase.execute(updatedCocktail)
    ).toEqual(updatedCocktail);

    expect(addCocktailMock).toHaveBeenCalledTimes(1);
    expect(addCocktailMock).toHaveBeenCalledWith(updatedCocktail);
  });

  it('should add name when its not provided', async () => {
    const cocktail = { id: '1', name: 'Margarita' };
    const returnedCocktail = { ...cocktail, price: null };
    const findMock = jest.fn().mockResolvedValue(cocktail);
    const addCocktailMock = jest.fn().mockResolvedValue(returnedCocktail);

    const useCase = new AddCocktailToMenuUseCase(
      {
        addCocktail: addCocktailMock,
        get: jest.fn(),
        removeCocktail: jest.fn(),
      },
      {
        find: findMock,
        get: jest.fn(),
      }
    );

    expect(
      await useCase.execute({ id: '1' })
    ).toEqual(returnedCocktail);

    expect(addCocktailMock).toHaveBeenCalledTimes(1);
    expect(addCocktailMock).toHaveBeenCalledWith(returnedCocktail);
  });
});