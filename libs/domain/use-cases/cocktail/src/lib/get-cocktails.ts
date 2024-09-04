import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';

export async function getCocktails(
  {
    getCocktailsImplementor,
    ingredient
  }: {
    ingredient: string;
    getCocktailsImplementor: GetCocktailsImplementor;
  }
): Promise<CocktailResult[]> {
  let cocktails = [];

  try {
    cocktails = await getCocktailsImplementor({ ingredient });

    return cocktails.map(cocktail => ({
      id: cocktail.id,
      name: cocktail.name,
      price: null
    }));
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch cocktails');
  }
}

type CocktailResult = Pick<Cocktail,
  | 'id'
  | 'name'> & {
    price: null;
  };

/**
 * Implementor for getting cocktails should filter the cocktails based on the ingredient provided.
 */
export type GetCocktailsImplementor = (data: {
  ingredient: string
}) => Promise<
  Pick<Cocktail,
    | 'id'
    | 'name'
  >[]
>;