import prisma from '../config/prisma';
import { TUserProps, TUserUpdatedPassProps } from '../types/TUser';

export default class User {
  readonly id: number;
  nome: string;
  email: string;
  senha: string;
  emailVerified?: Boolean;
  confirmationToken?: String;
  createdAt?: Date;

  constructor(props: TUserProps) {
    this.id = props.id as number;
    this.nome = props.nome;
    this.email = props.email;
    this.senha = props.senha;
    this.emailVerified = props.emailVerified;
    this.confirmationToken = props.confirmationToken;
    this.createdAt = props.createdAt;
  }

  async create(user: TUserProps) {
    return await prisma.usuarios.create({
      data: {
        nome: user.nome,
        email: user.email,
        senha: user.senha,
      },
    });
  }

  static async findEmail(email: string) {
    return await prisma.usuarios.findUnique({
      where: { email: email },
    });
  }

  static async findById(id: number) {
    return await prisma.usuarios.findUnique({
      where: { id: id },
    });
  }

  static async findAndReturnId(email: string) {
    if (!email) {
      throw new Error('Email is required');
    }

    return await prisma.usuarios.findUnique({
      where: { email: email },
      select: { id: true },
    });
  }

  async addConfirmEmailToken(id: number, confirmationToken: string) {
    return await prisma.usuarios.update({
      where: { id: id },
      data: { confirmationToken: confirmationToken },
    });
  }

  static async findConfirmEmailToken(token: string) {
    return await prisma.usuarios.findUnique({
      where: { confirmationToken: token },
      select: { emailVerified: true },
    });
  }

  static async checkIsConfirmed(id: number) {
    const check = await prisma.usuarios.findUnique({
      where: { id },
      select: {
        emailVerified: true,
      },
    });
    if (!check) {
      return null;
    }
    return check.emailVerified;
  }

  static async updateEmailConfirmationData(token: string) {
    await prisma.usuarios.update({
      where: { confirmationToken: token },
      data: {
        emailVerified: true,
      },
    });
  }

  static async checkCurrentUsr(id: number) {
    const currentUsr = await prisma.usuarios.findUnique({
      where: { id: id },
      select: {
        email: true,
        senha: true,
      },
    });

    if (!currentUsr) {
      return null;
    }

    return currentUsr;
  }

  static async updatePassword(email: string, prop: TUserUpdatedPassProps) {
    return await prisma.usuarios.update({
      where: { email: email },
      data: { senha: prop.senha },
    });
  }
}
