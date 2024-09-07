import { ICocktailRepository } from '@cocktail-menu-builder/application/repositories';
import { Cocktail } from '@cocktail-menu-builder/domain/entities';
import { THECOCKTAILDB_BASE_URL, THECOCKTAILDB_TOKEN } from './constants';
import { tranformCocktailToEntityModel } from './tranform-cocktail-to-entity-model';
import { TheCocktailDBCocktails } from './types';

export class TheCocktailDBCocktailRepository implements ICocktailRepository {
    async find(id: string): Promise<Pick<Cocktail, 'id' | 'name'> | null> {
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
    
        if (cocktails.drinks.length) {
          return tranformCocktailToEntityModel(cocktails.drinks[0]);
        }
      } catch (error) {
        // Do nothing
      }
    
      return null;
    }

    async get(ingredient: string): Promise<Pick<Cocktail, 'id' | 'name'>[]> {
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
    
      try {
        // When no cocktails are found, the API returns no body
        const cocktails = await response.json() as TheCocktailDBCocktails;
        return cocktails.drinks.map(tranformCocktailToEntityModel);
      } catch (error) {
        return [];
      }
    }
}


