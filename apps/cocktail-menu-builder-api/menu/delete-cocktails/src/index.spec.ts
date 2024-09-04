import { removeCocktailFromMenu } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { APIGatewayEvent } from 'aws-lambda';
import { handler } from './index';

jest.mock('@cocktail-menu-builder/domain/gateways/menu/s3', () => ({
  removeCocktailFromMenuS3: jest.fn(),
}));

jest.mock('@cocktail-menu-builder/domain/use-cases/cocktail', () => ({
  removeCocktailFromMenu: jest.fn(),
}));


describe('DELETE /menu/cocktails/{cocktail_id}', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fail when cocktailId is not provided', async () => {
    const event = {
      pathParameters: {},
    } as unknown as  APIGatewayEvent;

    const response = await handler(event);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual(JSON.stringify({ message: 'cocktailId is required' }));
  });


  it('should pass when cocktailId is provided', async () => {
    (removeCocktailFromMenu as jest.Mock).mockResolvedValue(undefined);

    const event = {
      pathParameters: {
        cocktailId: '1',
      },
    } as unknown as APIGatewayEvent;

    const response = await handler(event);

    expect(response.statusCode).toEqual(204);
    expect(response.body).toEqual('');
  });

  it('should fail when function throws an error', async () => {
    (removeCocktailFromMenu as jest.Mock).mockRejectedValue(new Error('Failed to remove cocktails'));

    const event = {
      pathParameters: {
        cocktailId: '1',
      },
    } as unknown as APIGatewayEvent;

    const response = await handler(event);

    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual(JSON.stringify({
      message: 'Failed to remove cocktails'
    }));
  });
});