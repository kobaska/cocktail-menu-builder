import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';
import { getCocktails } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { APIGatewayEvent } from 'aws-lambda';
import { handler } from './index';

const cocktails: Cocktail[] =[
  {
    id: '1',
    name: 'Margarita',
    price: null,
  }
];

jest.mock('@cocktail-menu-builder/domain/gateways/cocktail/thecocktaildb', () => ({
  getCocktailsFromTheCocktailDB: jest.fn(),
}));

jest.mock('@cocktail-menu-builder/domain/use-cases/cocktail', () => ({
  getCocktails: jest.fn(),
}));


describe('GET /cocktails?ingredient={ingredient}', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fail when ingredient is not provided', async () => {
    const event = {
      queryStringParameters: {},
    } as unknown as  APIGatewayEvent;

    const response = await handler(event);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual(JSON.stringify({ message: 'Ingredient is required' }));
  });


  it('should pass when ingredient is provided', async () => {
    (getCocktails as jest.Mock).mockResolvedValue(cocktails);

    const event = {
      queryStringParameters: {
        ingredient: 'vodka',
      },
    } as unknown as APIGatewayEvent;

    const response = await handler(event);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(cocktails));
  });

  it('should fail when function throws an error', async () => {
    (getCocktails as jest.Mock).mockRejectedValue(new Error('Failed to fetch cocktails'));

    const event = {
      queryStringParameters: {
        ingredient: 'vodka',
      },
    } as unknown as APIGatewayEvent;

    const response = await handler(event);

    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual(JSON.stringify({
      message: 'Failed to fetch cocktails'
    }));
  });
});