import { Menu } from '@cocktail-menu-builder/domain/entities/cocktail';

export async function getMenu(
  {
    getMenuImplementor,
  }: {
    getMenuImplementor: GetMenuImplementor;
  }
): Promise<Menu> {
  try {
    return await getMenuImplementor();
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch menu');
  }
}

export type GetMenuImplementor = () => Promise<Menu>;