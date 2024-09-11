import { Cocktail } from '@cocktail-menu-builder/domain/entities';

export type PostMenuCocktailReqBody = {
  id: string;
  name?: string;
  price?: number;
};

export type PostMenuCocktailResBody = Cocktail;