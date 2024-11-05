import prisma from '../config/prisma';
import { TCliente } from '../types/TCliente';

export class Clients {
  readonly id: number | undefined;
  nome: string;
  email: string;
  cpf: string;
  cep?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;

  constructor(props: TCliente) {
    this.id = props.id;
    this.nome = props.nome;
    this.email = props.email;
    this.cpf = props.cpf;
    this.cep = props.cep;
    this.rua = props.rua;
    this.numero = props.numero;
    this.bairro = props.bairro;
    this.cidade = props.cidade;
    this.estado = props.estado;
  }

  static async create(
    nome: string,
    email: string,
    cpf: string,
    cep: string,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
  ) {
    const client = await prisma.clientes.create({
      data: {
        nome,
        email,
        cpf,
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado,
      },
    });
    return client;
  }

  static async findCPF(cpf: string) {
    const find = await prisma.clientes.findUnique({
      where: { cpf: cpf },
    });
    if (!find) {
      return null;
    }
    return find.cpf;
  }

  static async findCpfAndCompareId(cpf: string, id: number) {
    const findCpf = await prisma.clientes.findFirst({
      where: {
        cpf: cpf,
        id: id,
      },
    });

    return !!findCpf;
  }

  static async findEmail(email: string) {
    const find = await prisma.clientes.findUnique({
      where: { email: email },
    });
    if (!find) {
      return null;
    }
    return find.email;
  }

  static async findEmailAndCompare(email: string, id: number) {
    const findEmail = await prisma.clientes.findFirst({
      where: {
        email: email,
        id: id,
      },
    });

    return !!findEmail;
  }

  static async findClientById(id: number) {
    const find = await prisma.clientes.findUnique({
      where: { id: id },
    });
    if (!find) {
      return null;
    }
    return find;
  }

  static async nonMandatoryIsEmpty(id: number) {
    const find = await prisma.clientes.findFirst({
      where: {
        id: id,
        OR: [
          { cep: 'EMPTY' },
          { rua: 'EMPTY' },
          { numero: 'EMPTY' },
          { bairro: 'EMPTY' },
          { cidade: 'EMPTY' },
          { estado: 'EMPTY' },
        ],
      },
    });

    return !!find;
  }

  static async updateClient(
    id: number,
    nome: string,
    email: string,
    cpf: string,
    cep: string,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    estado: string,
  ) {
    const checkCPF = await this.findCpfAndCompareId(cpf, id);
    const checkEmail = await this.findEmailAndCompare(email, id);

    const dataToUpdate: {
      nome: string;
      email?: string;
      cpf?: string;
      cep: string;
      rua: string;
      numero: string;
      bairro: string;
      cidade: string;
      estado: string;
    } = {
      nome,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado,
    };

    if (!checkCPF) {
      dataToUpdate.cpf = cpf;
    }

    if (!checkEmail) {
      dataToUpdate.email = email;
    }

    return await prisma.clientes.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  static async listAll() {
    const findAll = await prisma.clientes.findMany();
    if (!findAll || findAll.length === 0) {
      return false;
    }
    return findAll;
  }

  static async detail(id: number) {
    const find = await prisma.clientes.findUnique({
      where: { id: id },
      select: {
        id: true,
        nome: true,
        email: true,
        cpf: true,
        cep: true,
        rua: true,
        numero: true,
        bairro: true,
        cidade: true,
        estado: true,
      },
    });
    return find;
  }
}
