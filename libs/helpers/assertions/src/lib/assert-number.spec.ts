import { CustomError } from '@cocktail-menu-builder/helpers/error-handlers';
import { assertNumber } from './assert-number';

describe('assertNumber', () => {
  it(
    'should fail when key does not exist',
    () => {
      let errorThrown = false;
      const userMessage = 'Something is required.';

      try {
        assertNumber({
          object: { count: 1 },
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
    'should pass when value is a number',
    () => {
      expect(
        assertNumber({
          object: { count: 1 },
          property: 'count',
        })
      ).toBe(1);
    },
  );

  describe('when user message is provided', () => {
    it(
      'should fail when value is not a number',
      () => {
        let errorThrown = false;
        const userMessage = 'Invalid count.';
  
        try {
          assertNumber({
            object: { count: true },
            property: 'count',
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
          assertNumber({
            object: { count: true },
            property: 'count',
          }
          );
        } catch (err) {
          expect(err).toBeInstanceOf(CustomError);
  
          if (!(err instanceof CustomError)) {
            fail('Expected error to be an instance of CustomError');
          }
  
          errorThrown = true;
  
          expect(err.message).toEqual('Invalid count provided');
          expect(err.status).toEqual(400);
        }
  
        expect(errorThrown).toEqual(true);
      },
    );
  });
});
