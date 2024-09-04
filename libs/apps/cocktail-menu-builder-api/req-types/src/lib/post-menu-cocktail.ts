import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';

export type PostMenuCocktailReqBody = {
  id: string;
  name?: string;
  price?: number;
};

export type PostMenuCocktailResBody = Cocktail;