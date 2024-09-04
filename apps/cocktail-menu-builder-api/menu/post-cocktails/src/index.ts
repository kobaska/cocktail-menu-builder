import { PostMenuCocktailResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { fetchCocktailByIdFromTheCocktailDB } from '@cocktail-menu-builder/domain/gateways/cocktail/thecocktaildb';
import { addCocktailToMenuS3 } from '@cocktail-menu-builder/domain/gateways/menu/s3';
import { addCocktailToMenu } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { sendResponse } from '@cocktail-menu-builder/helpers/lambda';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validateBody } from './validate-body';

export async function handler(
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> {
  try {
    const cocktail = validateBody(event.body);
  
    const updatedCocktail = await addCocktailToMenu({
      cocktail,
      addCocktailToMenuImplementor: addCocktailToMenuS3,
      fetchCocktailByIdImplementor: fetchCocktailByIdFromTheCocktailDB
    });
  
    return sendResponse<PostMenuCocktailResBody>({
      statusCode: 200,
      body: updatedCocktail
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