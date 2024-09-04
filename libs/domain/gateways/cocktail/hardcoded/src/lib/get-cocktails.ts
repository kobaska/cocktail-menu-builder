import { GetCocktailsImplementor } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { HARD_CODED_COCKTAILS } from './hard-coded-cocktails';

export const getCocktailsFromHardcode: GetCocktailsImplementor = async ({ ingredient }) => {
  return HARD_CODED_COCKTAILS.filter(cocktail => cocktail.ingredients
    .map(i => i.toLowerCase())
    .includes(ingredient.toLowerCase())
  )
    .map(cocktail => ({
      id: cocktail.id,
      name: cocktail.label
    }));
}

