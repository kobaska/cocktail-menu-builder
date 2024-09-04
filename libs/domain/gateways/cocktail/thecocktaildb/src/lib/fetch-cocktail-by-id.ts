import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';
import { FetchCocktailByIdImplementor } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { THECOCKTAILDB_BASE_URL, THECOCKTAILDB_TOKEN } from './constants';
import { tranformCocktailToEntityModel } from './tranform-cocktail-to-entity-model';
import { TheCocktailDBCocktails } from './types';

export const fetchCocktailByIdFromTheCocktailDB: FetchCocktailByIdImplementor = async (id: Cocktail['id']) => {
  const response = await fetch(
    `${THECOCKTAILDB_BASE_URL}/lookup.php?i=${id}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        // NOTE: This is a test token, if we were to replace this, use a secure way to store it and retrieve it(e.g. AWS SSM)
        Authorization: `Bearer ${THECOCKTAILDB_TOKEN}`,
      }
    },
  );

  try {
    // When no cocktails are found, the API returns no body
    const cocktails = await response.json() as TheCocktailDBCocktails;

    if (cocktails?.drinks?.length) {
      return tranformCocktailToEntityModel(cocktails.drinks[0]);
    }
  } catch (error) {
    // Do nothing
  }

  return null;
}