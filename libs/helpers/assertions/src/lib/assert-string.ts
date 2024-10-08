import { CustomError } from "@cocktail-menu-builder/helpers/error-handlers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assertString<T extends Record<string, any>>({
  object,
  property,
  userMessage,
}: {
  /** Object to check for key */
  object: T,
  /** Name of property to test */
  property: string,
  /** Message to return if property is not a string */
  userMessage?: string,
}): string {
  if ((!object || !(property in object))) {
    throw new CustomError(userMessage || `${property} is required`, 400);
  }

  if (object[property] && typeof object[property] === 'string') {
    return object[property];
  }

  throw new CustomError(userMessage || `Invalid ${property} provided`, 400);
}
