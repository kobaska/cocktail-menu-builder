import S3, { GetObjectOutput } from 'aws-sdk/clients/s3';
import { S3MenuRepository } from './s3-menu.repository';

const mS3Instance = {
  getObject: jest.fn(),
  putObject: jest.fn(),
};

jest.mock('aws-sdk/clients/s3', () => ({
  ...jest.requireActual('aws-sdk/clients/s3'),
  __esModule: true,
  default: jest.fn(() => mS3Instance),
}));


describe('S3MenuRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should return the menu', async () => {
      const cocktails = [
        {
          id: '11007',
          name: 'Margarita',
          price: 10
        }
      ];

      const s3 = new S3() as jest.Mocked<S3>;
      s3.getObject = jest.fn();
      s3.getObject.mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Body: Buffer.from(JSON.stringify({ cocktails }))
        } as GetObjectOutput)
      } as any);

      const repository = new S3MenuRepository();

      const menu = await repository.get();

      expect(menu).toEqual({ cocktails });
    });
  });

  describe('addCocktail', () => {
    it('should add cocktail to menu if it does not exist', async () => {
      const cocktails = [
        {
          id: '11007',
          name: 'Margarita',
          price: 10
        }
      ];

      const s3 = new S3() as jest.Mocked<S3>;
      s3.getObject = jest.fn();
      s3.getObject.mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Body: Buffer.from(JSON.stringify({ cocktails }))
        } as GetObjectOutput)
      } as any);

      s3.putObject.mockReturnValue({
        promise: jest.fn()
      } as any);

      const repository = new S3MenuRepository();

      const cocktail = { id: '11008', name: 'Margarita', price: 10 };
      await repository.addCocktail(cocktail);

      expect(s3.putObject).toHaveBeenCalledWith({
        Bucket: process.env['COCKTAIL_DB_S3_BUCKET_NAME'],
        Key: 'menu.json',
        Body: JSON.stringify
        ({
          cocktails: [
            ...cocktails,
            cocktail
          ]
        }),
        ContentType: 'application/json'
      });
    });

    it('should update cocktail in menu if it exists', async () => {
      const cocktails = [
        {
          id: '11007',
          name: 'Margarita',
          price: 10
        }
      ];

      const s3 = new S3() as jest.Mocked<S3>;
      s3.getObject = jest.fn();
      s3.getObject.mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Body: Buffer.from(JSON.stringify({ cocktails }))
        } as GetObjectOutput)
      } as any);

      s3.putObject.mockReturnValue({
        promise: jest.fn()
      } as any);

      const repository = new S3MenuRepository();

      const cocktail = { id: '11007', name: 'Margarita (Happy Hour)', price: 5 };
      await repository.addCocktail(cocktail);

      expect(s3.putObject).toHaveBeenCalledWith({
        Bucket: process.env['COCKTAIL_DB_S3_BUCKET_NAME'],
        Key: 'menu.json',
        Body: JSON.stringify
        ({
          cocktails: [
            cocktail
          ]
        }),
        ContentType: 'application/json'
      });
    });
  });

  describe('removeCocktail', () => {
    it('should remove cocktail from menu if it exists', async () => {
      const cocktails = [
        {
          id: '11007',
          name: 'Margarita',
          price: 10
        }
      ];

      const s3 = new S3() as jest.Mocked<S3>;
      s3.getObject = jest.fn();
      s3.getObject.mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Body: Buffer.from(JSON.stringify({ cocktails }))
        } as GetObjectOutput)
      } as any);

      s3.putObject.mockReturnValue({
        promise: jest.fn()
      } as any);

      const repository = new S3MenuRepository();

      await repository.removeCocktail('11007');

      expect(s3.putObject).toHaveBeenCalledWith({
        Bucket: process.env['COCKTAIL_DB_S3_BUCKET_NAME'],
        Key: 'menu.json',
        Body: JSON.stringify({ cocktails: [] }),
        ContentType: 'application/json'
      });
    });

    it('should do nothing if cocktail does not exist', async () => {
      const cocktails = [
        {
          id: '11007',
          name: 'Margarita',
          price: 10
        }
      ];

      const s3 = new S3() as jest.Mocked<S3>;
      s3.getObject = jest.fn();
      s3.getObject.mockReturnValue({
        promise: jest.fn().mockResolvedValue({
          Body: Buffer.from(JSON.stringify({ cocktails }))
        } as GetObjectOutput)
      } as any);

      s3.putObject.mockReturnValue({
        promise: jest.fn()
      } as any);

      const repository = new S3MenuRepository();

      await repository.removeCocktail('11008');

      expect(s3.putObject).not.toHaveBeenCalled();
    });
  });
});
