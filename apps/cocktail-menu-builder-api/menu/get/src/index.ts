import { GetMenuResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { getMenu } from '@cocktail-menu-builder/domain/use-cases/cocktail';
import { sendResponse } from '@cocktail-menu-builder/helpers/lambda';
import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getMenuFromS3 } from '@cocktail-menu-builder/domain/gateways/menu/s3';

export async function handler(
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> {
  const menu = await getMenu({
    getMenuImplementor: getMenuFromS3
  });

  return sendResponse<GetMenuResBody>({
    statusCode: 200,
    body: menu
  });
}