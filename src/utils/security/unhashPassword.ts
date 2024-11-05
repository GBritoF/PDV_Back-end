import * as bcrypt from 'bcrypt';

export default async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  const compare = await bcrypt.compare(password, hashedPassword);
  return compare;
}
