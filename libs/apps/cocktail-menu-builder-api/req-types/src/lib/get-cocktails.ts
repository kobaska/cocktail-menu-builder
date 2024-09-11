import { Cocktail } from '@cocktail-menu-builder/domain/entities';

export type GetCocktailsReqQuery = {
  ingredient?: string;
}

export type GetCocktailsResBody = CocktailBody[];

type CocktailBody = Pick<Cocktail,
  | 'id'
  | 'name'> & {
    price: null;
  }