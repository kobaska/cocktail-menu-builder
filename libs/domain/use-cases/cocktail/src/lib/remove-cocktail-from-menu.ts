import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';

export async function removeCocktailFromMenu(
  {
    cocktailId,
    removeCocktailFromMenuImplementor,
  }: {
    cocktailId: Cocktail['id']
    removeCocktailFromMenuImplementor: RemoveCocktailFromMenuImplementor;
  }
): Promise<void> {
  try {
    await removeCocktailFromMenuImplementor(cocktailId);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to remove cocktail from menu. Please try again later.');
  }
}

export type RemoveCocktailFromMenuImplementor = (id: Cocktail['id']) => Promise<void>;