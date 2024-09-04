import { CustomError } from "@cocktail-menu-builder/helpers/error-handlers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assertNumber<T extends Record<string, any>>({ 
  object,
  property,
  userMessage,
}: {
  /** Object to check for key */
  object: T,
  /** Name of property to test */
  property: string,
  /** Message to return if property is not a number */
  userMessage?: string,
}): number {
  if (!object || !(property in object) ) {
    throw new CustomError(userMessage || `${property} is required`, 400);
  }

  if (!isNaN(object[property]) && typeof object[property] === 'number') {
    return object[property];
  }

  throw new CustomError(userMessage || `Invalid ${property} provided`, 400);
}
