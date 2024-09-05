import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';
import { CustomError } from '@cocktail-menu-builder/helpers/error-handlers';

export async function addCocktailToMenu(
  {
    cocktail,
    addCocktailToMenuImplementor,
    fetchCocktailByIdImplementor
  }: {
    cocktail: Partial<Cocktail> & Pick<Cocktail, 'id'>;
    addCocktailToMenuImplementor: AddCocktailToMenuImplementor;
    fetchCocktailByIdImplementor: FetchCocktailByIdImplementor;
  }
): Promise<Cocktail> {
  let persistedCocktail: Pick<Cocktail, 'id' | 'name'> | null;

  try {
    persistedCocktail = await fetchCocktailByIdImplementor(cocktail.id);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch cocktail by id');
  }


  if (!persistedCocktail) {
    throw new CustomError('Cocktail for provided id not found', 404);
  }

  const formattedCocktail: Cocktail = {
    id: cocktail.id,
    name: cocktail.name || '',
    // If price is omitted, it should remain null.
    price: cocktail.price || null,
  };

  // If the cocktail does not have a name, use the persisted cocktail's name
  if (!formattedCocktail.name) {
    formattedCocktail.name = persistedCocktail.name;
  }

  try {
    return await addCocktailToMenuImplementor(formattedCocktail);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add cocktail to menu');
  }
}

export type AddCocktailToMenuImplementor = (cocktail: Cocktail) => Promise<Cocktail>;
export type FetchCocktailByIdImplementor = (id: Cocktail['id']) => Promise<Pick<Cocktail, 'id' | 'name'> | null>;