import { InMemoryMenuRepository } from './in-memory-menu.repository';

describe('InMemoryMenuRepository', () => {
  describe('get', () => {
    it('should return empty menu when there are no cocktails', async () => {
      const repository = new InMemoryMenuRepository();

      const menu = await repository.get();

      expect(menu).toEqual({
        cocktails: []
      });
    });

    it('should return cocktails when they exist in menu', async () => {
      const repository = new InMemoryMenuRepository();

      // Add cocktails to menu
      const cocktail1 = { id: '11007', name: 'Margarita', price: 10 };
      const cocktail2 = { id: '11014', name: 'Bloody Mary', price: 12 };
      await repository.addCocktail(cocktail1);
      await repository.addCocktail(cocktail2);

      const menu = await repository.get();

      expect(menu).toEqual({
        cocktails: [
          cocktail1,
          cocktail2
        ]
      });
    });
  });

  describe('addCocktail', () => {
    it('should add cocktail to menu if it does not exist', async () => {
      const repository = new InMemoryMenuRepository();

      const cocktail = { id: '11007', name: 'Margarita', price: 10 };
      await repository.addCocktail(cocktail);

      const menu = await repository.get();

      expect(menu).toEqual({
        cocktails: [cocktail]
      });
    });

    it('should update cocktail in menu if it exists', async () => {
      const repository = new InMemoryMenuRepository();

      const cocktail = { id: '11007', name: 'Margarita', price: 10 };
      await repository.addCocktail(cocktail);

      const menu = await repository.get();

      expect(menu).toEqual({
        cocktails: [cocktail]
      });

      const updatedCocktail = { ...cocktail, name: 'Margarith(Happy Hour)',price: 5 };

      await repository.addCocktail(updatedCocktail);

      const updatedMenu = await repository.get();

      expect(updatedMenu).toEqual({
        cocktails: [updatedCocktail]
      });
    });
  });

  describe('removeCocktail', () => {
    it('should remove cocktail from menu if it exists', async () => {
      const repository = new InMemoryMenuRepository();

      const cocktail = { id: '11007', name: 'Margarita', price: 10 };
      await repository.addCocktail(cocktail);

      const menu = await repository.get();

      expect(menu).toEqual({
        cocktails: [cocktail]
      });

      await repository.removeCocktail(cocktail.id);

      const updatedMenu = await repository.get();

      expect(updatedMenu).toEqual({
        cocktails: []
      });
    });

    it('should not throw error when cocktail does not exist in the menu', async () => {
      const repository = new InMemoryMenuRepository();

      const cocktail = { id: '11007', name: 'Margarita', price: 10 };
      await repository.addCocktail(cocktail);

      const menu = await repository.get();

      expect(menu).toEqual({
        cocktails: [cocktail]
      });

      await repository.removeCocktail('0');

      const updatedMenu = await repository.get();

      expect(updatedMenu).toEqual({
        cocktails: [cocktail]
      });
    });
  });
});