import { sendResponse } from './send-response';

describe('sendResponse', () => {
  it('should work when no body or headers are passed in', () => {
    const res = sendResponse({ statusCode: 200 });

    expect(res).toEqual({
      statusCode: 200,
      body: '',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  it('should work when no body or headers are passed in', () => {
    const res = sendResponse({ statusCode: 200,
      body: {
        test: 'test'
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
     });

    expect(res).toEqual({
      statusCode: 200,
      body: '{"test":"test"}',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  });
});
