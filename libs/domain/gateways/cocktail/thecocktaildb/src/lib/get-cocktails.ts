import { GetCocktailsImplementor } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { THECOCKTAILDB_BASE_URL, THECOCKTAILDB_TOKEN } from './constants';
import { TheCocktailDBCocktails } from './types';
import { tranformCocktailToEntityModel } from './tranform-cocktail-to-entity-model';

export const getCocktailsFromTheCocktailDB: GetCocktailsImplementor = async ({ ingredient }) => {

  const response = await fetch(
    `${THECOCKTAILDB_BASE_URL}/filter.php?i=${ingredient}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        // NOTE: This is a test token, if we were to replace this, use a secure way to store it and retrieve it(e.g. AWS SSM)
        Authorization: `Bearer ${THECOCKTAILDB_TOKEN}`,
      }
    },
  );

  const cocktails = await response.json() as TheCocktailDBCocktails;

  return cocktails.drinks.map(tranformCocktailToEntityModel);
}

