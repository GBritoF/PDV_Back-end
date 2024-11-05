import prisma from '../config/prisma';
import TProduto from '../types/TProduct';

export default class Product {
  readonly id: number;
  descricao?: string;
  quantidade_estoque: number;
  valor: number;
  readonly categoria_id: number;

  constructor(props: TProduto) {
    this.id = props.id as number;
    this.descricao = props.descricao;
    this.quantidade_estoque = props.quantidade_estoque;
    this.valor = props.valor;
    this.categoria_id = props.categoria_id;
  }

  static async isDuplicate(descricao: string) {
    const existingProduct = await prisma.produtos.findFirst({
      where: { descricao: descricao },
      select: { id: true, descricao: true }
    });

    if (!existingProduct) {
      return false;
    }

    return existingProduct;
  }

  async create(user: TProduto) {
    return await prisma.produtos.create({
      data: {
        descricao: user.descricao ?? 'EMPTY',
        quantidade_estoque: user.quantidade_estoque,
        valor: user.valor,
        categoria_id: user.categoria_id,
      },
    });
  }

  static async update(
    id: number,
    descricao: string,
    quantidade_estoque: number,
    valor: number,
    categoria_id: number,
  ) {
    const update = await prisma.produtos.update({
      where: { id: id },
      data: {
        descricao,
        quantidade_estoque,
        valor,
        categoria_id,
      },
    });
    return update;
  }

  static async findById(id: number) {
    const find = await prisma.produtos.findUnique({
      where: { id: id },
    });
    if (!find) {
      return null;
    }
    return find;
  }

  static async listById(id: number) {
    const findAll = await prisma.produtos.findMany({
      where: { id: id },
    });
    if (!findAll) {
      return null;
    }
    return findAll;
  }

  static async list() {
    const showAll = await prisma.produtos.findMany();
    return showAll || null;
  }

  static async findByCategory(category: number) {
    const find = await prisma.produtos.findMany({
      where: { categoria_id: category },
      select: {
        id: true,
        descricao: true,
        quantidade_estoque: true,
        valor: true,
        categoria_id: true,
        imagem_url: true,
      },
    });
    return find || null;
  }

  static async isLinkedToOrder(productId: number) {
    const count = await prisma.pedidoProdutos.count({
      where: { produto_id: productId },
    });
    return count > 0;
  }

  static async insertImgOnDb(id: number, url: string) {
    const insert = await prisma.produtos.update({
      where: { id: id },
      data: { imagem_url: url },
    });
    if (!insert) {
      return null;
    }
    return insert;
  }

  static async nullPdtImg(id: number) {
    const insertNull = await prisma.produtos.update({
      where: { id: Number(id) },
      data: { imagem_url: null },
    });
    if (!insertNull) {
      return null;
    }
    return insertNull;
  }

  static async findProductImg(id: number) {
    const find = await prisma.produtos.findUnique({
      where: { id: id },
      select: { imagem_url: true },
    });
    if (!find) {
      return null;
    }
    return find.imagem_url;
  }

  static async delete(id: number) {
    return await prisma.produtos.delete({
      where: {
        id: id,
      },
    });
  }
}
