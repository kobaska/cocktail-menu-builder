import { APIGatewayProxyResult } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sendResponse<T extends Record<string, any>>({
  statusCode,
  body,
  headers,
}: {
  statusCode: number;
  headers?: Record<string, string>;
  body?: T;
}): APIGatewayProxyResult {
  return {
    statusCode,
    body: body ? JSON.stringify(body) : '',
    headers: headers || {
      'Content-Type': 'application/json',
    },
  };
}
