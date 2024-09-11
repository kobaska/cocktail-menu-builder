import { IMenuRepository } from '@cocktail-menu-builder/application/repositories';
import { Cocktail, Menu } from '@cocktail-menu-builder/domain/entities';

export class InMemoryMenuRepository implements IMenuRepository {
  private menu: Menu = {
    cocktails: [],
  };

  public async get(): Promise<Menu> {
    return this.menu;
  }

  public async addCocktail(cocktail: Cocktail): Promise<Cocktail> {
    // check if the cocktail is already in the menu
    const index = this.menu.cocktails.findIndex(c => c.id === cocktail.id);

    // If the cocktail is in the menu, update it
    if (index > -1) {
      this.menu.cocktails[index] = cocktail;
    } else {
      this.menu.cocktails.push(cocktail);
    }

    return cocktail;
  }

  public async removeCocktail(cocktailId: Cocktail['id']): Promise<void> {
    // Find the index of the cocktail in the menu
    const index = this.menu.cocktails.findIndex(c => c.id === cocktailId);

    if (index === -1) {
      return;
    }

    // If the cocktail is in the menu, remove it
    this.menu.cocktails.splice(index, 1);
  }
}

