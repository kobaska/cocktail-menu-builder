import { CustomError } from '@cocktail-menu-builder/helpers/error-handlers';
import { assertString } from './assert-string';

describe('assertString', () => {
  it(
    'should fail when key does not exist',
    () => {
      let errorThrown = false;
      const userMessage = 'Something is required.';

      try {
        assertString({
          object: { sport: 'football' },
          property: 'something',
          userMessage,
        }
        );
      } catch (err) {
        expect(err).toBeInstanceOf(CustomError);

        if (!(err instanceof CustomError)) {
          fail('Expected error to be an instance of CustomError');
        }

        errorThrown = true;

        expect(err.message).toEqual(userMessage);
        expect(err.status).toEqual(400);
      }

      expect(errorThrown).toEqual(true);
    },
  );

  it(
    'should pass when value is a string',
    () => {
      expect(
        assertString({
          object: { sport: 'football' },
          property: 'sport',
        })
      ).toBe('football');
    },
  );

  describe('when user message is provided', () => {
    it(
      'should fail when value is not a string',
      () => {
        let errorThrown = false;
        const userMessage = 'Invalid sport.';
  
        try {
          assertString({
            object: { sport: true },
            property: 'sport',
            userMessage,
          }
          );
        } catch (err) {
          expect(err).toBeInstanceOf(CustomError);
  
          if (!(err instanceof CustomError)) {
            fail('Expected error to be an instance of CustomError');
          }
  
          errorThrown = true;
  
          expect(err.message).toEqual(userMessage);
          expect(err.status).toEqual(400);
        }
  
        expect(errorThrown).toEqual(true);
      },
    );
  });

  describe('when user message is not provided', () => {
    it(
      'should fail when value is not a string',
      () => {
        let errorThrown = false;
  
        try {
          assertString({
            object: { sport: true },
            property: 'sport',
          }
          );
        } catch (err) {
          expect(err).toBeInstanceOf(CustomError);
  
          if (!(err instanceof CustomError)) {
            fail('Expected error to be an instance of CustomError');
          }
  
          errorThrown = true;
  
          expect(err.message).toEqual('Invalid sport provided');
          expect(err.status).toEqual(400);
        }
  
        expect(errorThrown).toEqual(true);
      },
    );
  });
});
