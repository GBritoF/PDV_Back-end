export default function validateParam(param: string | number) {
  const parsedValue = parseInt(param as string, 10);

  if (isNaN(parsedValue)) {
    return { valid: false, value: null };
  }

  if (parsedValue <= 0) {
    return { valid: false, value: null };
  }

  return { valid: true, value: parsedValue };
}
