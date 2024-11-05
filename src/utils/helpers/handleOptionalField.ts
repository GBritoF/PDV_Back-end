export function handleOptionalField(field?: string): string {
  return field ?? 'EMPTY';
}
