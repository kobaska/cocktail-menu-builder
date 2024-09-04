import { CustomError } from "@cocktail-menu-builder/helpers/error-handlers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assertNumber<T extends Record<string, any>>({ 
  object,
  property,
  userMessage,
  required,
  requiredMessage,
}: {
  /** Object to check for key */
  object: T,
  /** Name of property to test */
  property: string,
  /** Message to return if property is not a string */
  userMessage?: string,
  /** Message to return if property is required but not present */
  required?: boolean;
  requiredMessage?: string,
}): number {
  if (required && !(property in object)) {
    throw new CustomError(requiredMessage || `${property} is required`, 400);
  }

  if (object[property] && typeof object[property] === 'number') {
    return object[property];
  }

  throw new CustomError(userMessage || `Invalid ${property} provided`, 400);
}
