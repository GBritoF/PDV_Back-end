import { authMessage } from '../messages/authMessages';

export default async function validateCPF(cpf: string) {
  try {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    const calcDigit = (base: string, weightStart: number) => {
      let sum = 0;
      for (let i = 0; i < base.length; i++) {
        sum += parseInt(base[i]) * (weightStart - i);
      }
      const remainder = sum % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };

    const firstCheckDigit = calcDigit(cpf.slice(0, 9), 10);
    const secondCheckDigit = calcDigit(cpf.slice(0, 9) + firstCheckDigit, 11);

    return (
      firstCheckDigit === parseInt(cpf[9]) &&
      secondCheckDigit === parseInt(cpf[10])
    );
  } catch (error) {
    console.error(authMessage.err.errValidateCPF, error);
    throw new Error(authMessage.err.errValidateCPF);
  }
}
