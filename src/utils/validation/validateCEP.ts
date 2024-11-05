export default function validateCEP(cep: string) {
  cep = cep.replace(/[^\d]/g, '');

  return cep.length === 8;
}
