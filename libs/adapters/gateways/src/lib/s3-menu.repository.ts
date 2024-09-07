import { IMenuRepository } from '@cocktail-menu-builder/application/repositories';
import { Cocktail, Menu } from '@cocktail-menu-builder/domain/entities';
import S3, { GetObjectOutput, GetObjectRequest } from 'aws-sdk/clients/s3';

export class S3MenuRepository implements IMenuRepository {
  public async get(): Promise<Menu> {
    const s3 = new S3();

    const params: GetObjectRequest = {
      Bucket: process.env['COCKTAIL_DB_S3_BUCKET_NAME'] || '',
      Key: 'menu.json',
    };
    const file: GetObjectOutput = await s3.getObject(params).promise();

    return JSON.parse((file.Body as Buffer).toString('utf8')) as Menu;
  }

  public async addCocktail(cocktail: Cocktail): Promise<Cocktail> {
    const menu = await this.get();

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
      Bucket: process.env['COCKTAIL_DB_S3_BUCKET_NAME'] || '',
      Key: 'menu.json',
      Body: JSON.stringify(menu),
      ContentType: 'application/json',
    }).promise();

    return cocktail;
  }

  public async removeCocktail(cocktailId: Cocktail['id']): Promise<void> {
    const menu = await this.get();

    // Find the index of the cocktail in the menu
    const index = menu.cocktails.findIndex(c => c.id === cocktailId);

    if (index === -1) {
      return;
    }

    // If the cocktail is in the menu, remove it
    menu.cocktails.splice(index, 1);

    const s3 = new S3();

    await s3.putObject({
      Bucket: process.env['COCKTAIL_DB_S3_BUCKET_NAME'] || '',
      Key: 'menu.json',
      Body: JSON.stringify(menu),
      ContentType: 'application/json',
    }).promise();
  }
}

