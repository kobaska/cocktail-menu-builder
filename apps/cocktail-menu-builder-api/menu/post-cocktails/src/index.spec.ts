import { APIGatewayEvent } from 'aws-lambda';
import { handler } from './index';
import { addCocktailToMenu } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { CustomError } from '@cocktail-menu-builder/helpers/error-handlers';

jest.mock('@cocktail-menu-builder/domain/use-cases/cocktail', () => ({
  addCocktailToMenu: jest.fn(),
}));

describe('POST /menu/cocktails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when invalid body is provided', () => {
    it('should fail when invalid json body is provided', async () => {
      const event = {
        body: 1,
      } as unknown as  APIGatewayEvent;
  
      const response = await handler(event);
  
      expect(response.statusCode).toEqual(400);
      expect(response.body).toEqual(JSON.stringify({ message: 'Invalid JSON' }));
    });

    it('should fail when invalid id is provided', async () => {
      const event = {
        body: JSON.stringify({ id: true }),
      } as unknown as  APIGatewayEvent;
  
      const response = await handler(event);
  
      expect(response.statusCode).toEqual(400);
      expect(response.body).toEqual(JSON.stringify({ message: 'Invalid id provided' }));
    });
  });


  it('should pass when valid body is provided', async () => {
    
    const cocktail = {
      id: '1',
      name: 'Margarita',
      price: 10,
    };
    
    (addCocktailToMenu as jest.Mock).mockResolvedValue(cocktail);

    const event = {
      body: JSON.stringify(cocktail),
    } as unknown as APIGatewayEvent;

    const response = await handler(event);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(cocktail));
  });

  it('should fail when function throws an error', async () => {
    (addCocktailToMenu as jest.Mock).mockRejectedValue(new CustomError('Failed to add cocktail', 404));

    const event = {
      body: JSON.stringify({ id: '1' }),
    } as unknown as APIGatewayEvent;

    const response = await handler(event);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual(JSON.stringify({
      message: 'Failed to add cocktail'
    }));
  });
});