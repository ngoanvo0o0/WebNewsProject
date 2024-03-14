export function isBelongToValues<T extends string>(
  value: string,
  enumValues: T[]
): value is T {
  return enumValues.includes(value as T);
}
