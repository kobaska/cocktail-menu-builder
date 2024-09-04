import { PostMenuCocktailResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { removeCocktailFromMenu } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { removeCocktailFromMenuS3 } from '@cocktail-menu-builder/domain/gateways/menu/s3';
import { assertString } from "@cocktail-menu-builder/helpers/assertions";
import { sendResponse } from '@cocktail-menu-builder/helpers/lambda';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export async function handler(
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> {
  try {
    const cocktailId = assertString({
      object: event.pathParameters,
      property: 'cocktailId',
      required: true,
    });
    
    await removeCocktailFromMenu({
      cocktailId,
      removeCocktailFromMenuImplementor: removeCocktailFromMenuS3
    });
  
    return sendResponse<PostMenuCocktailResBody>({
      statusCode: 204,
      body: undefined
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