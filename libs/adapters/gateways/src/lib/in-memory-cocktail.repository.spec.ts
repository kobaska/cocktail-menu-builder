import { InMemoryCocktailRepository } from './in-memory-cocktail.repository';

describe('InMemoryCocktailRepository', () => {
  describe('get', () => {
    it('should return matching cocktails for ingredient', async () => {
      const repository = new InMemoryCocktailRepository();

      const cocktails = await repository.get('salt');

      expect(cocktails).toMatchObject([
        {
          id: "11007",
          name: "Margarita"
        },
        {
          id: "11014",
          name: "Bloody Mary",
        }
      ]);
    });

    it('should return empty list when no cocktails are found', async () => {
      const repository = new InMemoryCocktailRepository();

      const cocktails = await repository.get('nothing');

      expect(cocktails).toEqual([]);
    });
  });

  describe('find', () => {
    it('should return cocktail for id when it exists', async () => {
      const repository = new InMemoryCocktailRepository();

      const cocktail = await repository.find('11007');

      expect(cocktail).toEqual({
        id: "11007",
        name: "Margarita"
      });
    });

    it('should return null when no cocktail is found for id', async () => {
      const repository = new InMemoryCocktailRepository();

      const cocktail = await repository.find('0');

      expect(cocktail).toBeNull();
    });
  });
});