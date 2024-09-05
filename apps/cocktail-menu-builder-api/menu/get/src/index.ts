import { GetMenuResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { getMenuS3 } from '@cocktail-menu-builder/domain/gateways/menu/s3';
import { getMenu } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { sendResponse } from '@cocktail-menu-builder/helpers/lambda';
import { APIGatewayProxyResult } from 'aws-lambda';

export async function handler(): Promise<APIGatewayProxyResult> {
  try {
    const menu = await getMenu({
      getMenuImplementor: getMenuS3
    });
  
    return sendResponse<GetMenuResBody>({
      statusCode: 200,
      headers: {
        // Not to be used in production if the data is sensitive
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: menu,
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