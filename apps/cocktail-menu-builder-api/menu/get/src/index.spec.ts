import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';
import { getMenuS3 } from '@cocktail-menu-builder/domain/gateways/menu/s3';
import { getMenu } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { APIGatewayEvent } from 'aws-lambda';
import { handler } from './index';


jest.mock('@cocktail-menu-builder/domain/gateways/menu/s3', () => ({
  getMenuS3: jest.fn(),
}));

jest.mock('@cocktail-menu-builder/domain/use-cases/cocktail', () => ({
  getMenu: jest.fn(),
}));

describe('GET /menu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should pass when cocktailId is provided', async () => {
    const menu = {
      cocktails: [
        {
          id: '1',
          name: 'Margarita',
          price: null,
        }
      ],
    };

    (getMenu as jest.Mock).mockResolvedValue(menu);

    const response = await handler();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(menu));
  });

  it('should fail when function throws an error', async () => {
    (getMenu as jest.Mock).mockRejectedValue(new Error('Failed to get menu'));

    const response = await handler();

    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual(JSON.stringify({
      message: 'Failed to get menu'
    }));
  });
});