import { GetCocktailsReqQuery, GetCocktailsResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';

export async function getCocktails(
  {
    getCocktailsImplementor,
    query: { ingredient }
  }: {
    query: GetCocktailsReqQuery;
    getCocktailsImplementor: GetCocktailsImplementor;
  }
): Promise<GetCocktailsResBody> {
  const cocktails = await getCocktailsImplementor({ ingredient });

  return {
    data: cocktails.map(cocktail => ({
      id: cocktail.id,
      name: cocktail.name,
      price: null
    })),
  };
}

export type GetCocktailsImplementor = (data: {
  ingredient?: string
}) => Promise<
  Pick<Cocktail,
    | 'id'
    | 'name'
  >[]
>;