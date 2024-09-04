import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';
import { FetchCocktailByIdImplementor } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { HARD_CODED_COCKTAILS } from './hard-coded-cocktails';

export const fetchCocktailByIdFromHardcode: FetchCocktailByIdImplementor = async (id: Cocktail['id']) => {
  const cocktail = HARD_CODED_COCKTAILS.find(cocktail => cocktail.id === id) || null;

  return cocktail ? {
    id: cocktail.id,
    name: cocktail.label,
    price: null
  } : null;
}

