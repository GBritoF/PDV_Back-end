export default function isValidCepFormat(cep: string) {
  return !!cep.match(/^\d{5}-\d{3}$/);
}
