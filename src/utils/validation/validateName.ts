export default function isValidName(name: string) {
  return !!name.toLowerCase().match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/);
}
