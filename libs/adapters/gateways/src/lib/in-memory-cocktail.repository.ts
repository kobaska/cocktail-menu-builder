import { ICocktailRepository } from '@cocktail-menu-builder/application/repositories';
import { Cocktail } from '@cocktail-menu-builder/domain/entities';
import { HARD_CODED_COCKTAILS } from './hard-coded-cocktails';

export class InMemoryCocktailRepository implements ICocktailRepository {
  private cocktails = HARD_CODED_COCKTAILS;

  public async get(ingredient: string): Promise<Pick<Cocktail, 'id' | 'name'>[]> {
    return this.cocktails
      .filter(c =>
        c.ingredients
          .map(i => i.toLowerCase())
          .includes(ingredient.toLowerCase())
      );
  }

  public async find(cocktailId: Cocktail['id']): Promise<Pick<Cocktail, 'id' | 'name'> | null> {
    const cocktail = HARD_CODED_COCKTAILS.find(cocktail => cocktail.id === cocktailId);

    return cocktail ? {
      id: cocktail.id,
      name: cocktail.name
    } : null;
  }
}

