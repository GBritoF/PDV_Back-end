export default function cpfValidFormat(cpf: string) {
  return !!cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
}
