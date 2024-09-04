import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';
import { AddCocktailToMenuImplementor } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import S3 from 'aws-sdk/clients/s3';
import { getMenuS3 } from './get-menu';

export const addCocktailToMenuS3: AddCocktailToMenuImplementor = async (cocktail: Cocktail) => {
  const menu = await getMenuS3();

  // check if the cocktail is already in the menu
  const index = menu.cocktails.findIndex(c => c.id === cocktail.id);

  // If the cocktail is in the menu, update it
  if (index > -1) {
    menu.cocktails[index] = cocktail;
  } else {
    menu.cocktails.push(cocktail);
  }

  const s3 = new S3();
  await s3.putObject({
    Bucket: 'cocktail-storage',
    Key: 'menu.json',
    Body: JSON.stringify(menu),
    ContentType: 'application/json',
  }).promise();

  return cocktail;
}

