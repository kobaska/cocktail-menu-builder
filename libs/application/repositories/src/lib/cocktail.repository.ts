import { Cocktail, Menu } from '@cocktail-menu-builder/domain/entities';

export interface ICocktailRepository {
  get(ingredient: string): Promise<Pick<Cocktail, 'id' | 'name'>[]>;
  find(id: string): Promise<Pick<Cocktail, 'id' | 'name'> | null>;
}