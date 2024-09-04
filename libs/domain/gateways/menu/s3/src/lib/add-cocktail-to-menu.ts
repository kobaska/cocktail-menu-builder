import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';
import { AddCocktailToMenuImplementor } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { getMenuS3 } from './get-menu';
import S3, { GetObjectOutput, GetObjectRequest } from 'aws-sdk/clients/s3';

export const addCocktailToMenuS3: AddCocktailToMenuImplementor = async (cocktail: Cocktail) => {
  const menu = await getMenuS3();

  // NOTE: We are intentionally allowing the same cocktail to be added multiple times
  menu.cocktails.push(cocktail);

  const s3 = new S3();
  await s3.putObject({
    Bucket: 'cocktail-storage',
    Key: 'menu.json',
    Body: JSON.stringify(menu),
    ContentType: 'application/json',
  }).promise();

  return cocktail;
}

