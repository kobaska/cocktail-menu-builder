import { Menu } from '@cocktail-menu-builder/domain/entities/cocktail';
import { GetMenuImplementor } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import S3, { GetObjectOutput, GetObjectRequest } from 'aws-sdk/clients/s3';

export const getMenuS3: GetMenuImplementor = async () => {
  const s3 = new S3();

  const params: GetObjectRequest = {
    Bucket: 'cocktail-storage',
    Key: 'menu.json',
  };
    const file: GetObjectOutput = await s3.getObject(params).promise();
  
    return JSON.parse((file.Body as Buffer).toString('utf8')) as Menu;
}

