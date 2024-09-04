import { GetMenuResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { Menu } from '@cocktail-menu-builder/domain/entities/cocktail';

export async function getMenu(
  {
    getMenuImplementor,
  }: {
    getMenuImplementor: GetMenuImplementor;
  }
): Promise<GetMenuResBody> {
  try {
    return getMenuImplementor();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch menu');
  }
}

/**
 * Implementor for getting cocktails should filter the cocktails based on the ingredient provided.
 */
export type GetMenuImplementor = () => Promise<Menu>;