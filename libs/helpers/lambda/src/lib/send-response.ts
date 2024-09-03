import { APIGatewayProxyResult } from 'aws-lambda';

export function sendResponse<T extends Record<string, any>>({
  statusCode,
  body,
}: {
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: T;
}): APIGatewayProxyResult {
  return {
    statusCode,
    body: body ? JSON.stringify(body) : '',
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
