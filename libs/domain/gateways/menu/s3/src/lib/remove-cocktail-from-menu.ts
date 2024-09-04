import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';
import { RemoveCocktailFromMenuImplementor } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import S3 from 'aws-sdk/clients/s3';
import { getMenuS3 } from './get-menu';

export const removeCocktailFromMenuS3: RemoveCocktailFromMenuImplementor = async (cocktailId: Cocktail['id']) => {
  const menu = await getMenuS3();

  // Find the index of the cocktail in the menu
  const index = menu.cocktails.findIndex(c => c.id === cocktailId);

  if (index === -1) {
    return;
  }

  // If the cocktail is in the menu, remove it
  menu.cocktails.splice(index, 1);

  const s3 = new S3();
  await s3.putObject({
    Bucket: 'cocktail-storage',
    Key: 'menu.json',
    Body: JSON.stringify(menu),
    ContentType: 'application/json',
  }).promise();
}

