import { APIGatewayEvent, Context } from 'aws-lambda';
import serverless from 'serverless-http';
import { ApiServer } from './server';

let server;

export async function handler(event: APIGatewayEvent, context: Context): Promise<Object> {
  if (!server) {
    server = ApiServer.run({
      port: 3000,
    });
  }

  const handler = serverless(server);

  return handler(event, context);
}