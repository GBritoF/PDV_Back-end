import prisma from '../config/prisma';
import TCategoryProps from '../types/TCategories';

export class Categories {
  readonly id: number;
  descricao: string;

  constructor(props: TCategoryProps) {
    this.id = props.id as number;
    this.descricao = props.descricao;
  }

  static async List() {
    const listAll = await prisma.categorias.findMany();
    if (listAll.length === 0) {
      return false;
    }
    return listAll;
  }

  static async find(categoria_id: number) {
    const find = await prisma.categorias.findUnique({
      where: { id: categoria_id },
    });

    if (!find) {
      return null;
    }

    return find;
  }
}
