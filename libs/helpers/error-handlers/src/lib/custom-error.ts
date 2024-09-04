export class CustomError<T = unknown> extends Error {
  constructor(
    public override readonly  message: string, 
    public readonly status: number, 
    public readonly data?: T, 
  ) {
      super(message);

      // Set the prototype explicitly.
      Object.setPrototypeOf(this, CustomError.prototype);
  }
}
