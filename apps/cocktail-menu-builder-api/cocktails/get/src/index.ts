import { GetCocktailsResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { getCocktailsFromHardcode } from '@cocktail-menu-builder/domain/gateways/cocktail/hardcoded';
import { getCocktails } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { sendResponse } from '@cocktail-menu-builder/helpers/lambda';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function handler(
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> {
  try {
    const cocktails = await getCocktails({
      getCocktailsImplementor: getCocktailsFromHardcode,
      ingredient: event.queryStringParameters?.ingredient,
    });

    return sendResponse<GetCocktailsResBody>({
      statusCode: 200,
      body: cocktails
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