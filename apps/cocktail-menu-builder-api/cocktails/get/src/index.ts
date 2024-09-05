import { GetCocktailsResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { getCocktailsFromTheCocktailDB } from '@cocktail-menu-builder/domain/gateways/cocktail/thecocktaildb';
import { getCocktails } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { assertString } from "@cocktail-menu-builder/helpers/assertions";
import { sendResponse } from '@cocktail-menu-builder/helpers/lambda';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function handler(
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> {
  try {
    const ingredient = assertString({
      object: event.queryStringParameters,
      property: 'ingredient',
      userMessage: 'Ingredient is required'
    });
    
    const cocktails = await getCocktails({
      getCocktailsImplementor: getCocktailsFromTheCocktailDB,
      ingredient,
    });

    return sendResponse<GetCocktailsResBody>({
      statusCode: 200,
      body: cocktails,
      headers: {
        // Not to be used in production if the data is sensitive
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return sendResponse({
      statusCode: err.status || 500,
      body: {
        message: err.message
      }
    });
  }
}