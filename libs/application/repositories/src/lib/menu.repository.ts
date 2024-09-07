import { Cocktail, Menu } from '@cocktail-menu-builder/domain/entities';

export interface IMenuRepository {
  get(): Promise<Menu>;
  addCocktail(cocktail: Cocktail): Promise<Cocktail>;
  removeCocktail(id: Cocktail['id']): Promise<void>;
}