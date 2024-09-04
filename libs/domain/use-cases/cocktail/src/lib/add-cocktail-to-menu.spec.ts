import { CustomError } from '@cocktail-menu-builder/helpers/error-handlers';
import { addCocktailToMenu } from './add-cocktail-to-menu';

describe('addCocktailToMenu', () => {

  it('should fail when cocktail is not found', async () => {
    const cocktail = { id: '1' };
    const fetchCocktailByIdImplementor = jest.fn().mockResolvedValue(null);

    try {
      await addCocktailToMenu({
        cocktail,
        addCocktailToMenuImplementor: jest.fn(),
        fetchCocktailByIdImplementor,
      });
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
    const fetchCocktailByIdImplementor = jest.fn().mockResolvedValue(cocktail);
    const addCocktailToMenuImplementor = jest.fn().mockResolvedValue(updatedCocktail);

    expect(
      await addCocktailToMenu({
        cocktail: updatedCocktail,
        addCocktailToMenuImplementor,
        fetchCocktailByIdImplementor,
      })
    ).toEqual(updatedCocktail);

    expect(addCocktailToMenuImplementor).toHaveBeenCalledTimes(1);
    expect(addCocktailToMenuImplementor).toHaveBeenCalledWith(updatedCocktail);
  });

  it('should add name when its not provided', async () => {
    const cocktail = { id: '1', name: 'Margarita', price: null };
    const fetchCocktailByIdImplementor = jest.fn().mockResolvedValue(cocktail);
    const addCocktailToMenuImplementor = jest.fn().mockResolvedValue(cocktail);

    expect(
      await addCocktailToMenu({
        cocktail: { id: '1' },
        addCocktailToMenuImplementor,
        fetchCocktailByIdImplementor,
      })
    ).toEqual(cocktail);

    expect(addCocktailToMenuImplementor).toHaveBeenCalledTimes(1);
    expect(addCocktailToMenuImplementor).toHaveBeenCalledWith(cocktail);
  });

  it('should not leak internal error information when fetch fails', async () => {
    await expect(
      addCocktailToMenu({
        cocktail: { id: '1' },
        fetchCocktailByIdImplementor: async () => {
          throw new Error('Invalid database password');
        },
        addCocktailToMenuImplementor: jest.fn().mockResolvedValue(null)
      })).rejects.toThrow('Failed to fetch cocktail by id');
  });

  it('should not leak internal error information when add fails', async () => {
    const cocktail = { id: '1', name: 'Margarita', price: null };
    await expect(
      addCocktailToMenu({
        cocktail: { id: '1' },
        fetchCocktailByIdImplementor: jest.fn().mockResolvedValue(cocktail),
        addCocktailToMenuImplementor: async () => {
          throw new Error('S3 bucket does not exist');
        }
      })).rejects.toThrow('Failed to add cocktail to menu');
  });
});