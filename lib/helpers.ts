import { AssertionError } from "./errors.ts";

export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new AssertionError(`AssertionError: expected value ${value} to be NonNullable.`);
  }
}
