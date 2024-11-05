import prisma from '../config/prisma';
import { TOrder } from '../types/TOrder';
import { TOrderProduct } from '../types/TOrderProduct';

export class Order {
  readonly id: number;
  readonly cliente_id: number;
  observacao?: string;
  valor_total: number;

  constructor({ id, cliente_id, valor_total, observacao }: TOrder) {
    this.id = id;
    this.cliente_id = cliente_id;
    this.valor_total = valor_total;
    this.observacao = observacao;
  }

  static async createOrder(
    cliente_id: number,
    valor_total: number,
    observacao: string,
    pedido_produtos: TOrderProduct[],
    prisma: any,
  ): Promise<any> {
    const pedidoCriado = await prisma.pedidos.create({
      data: {
        cliente_id,
        observacao,
        valor_total,
        PedidoProdutos: {
          create: pedido_produtos.map((pp) => ({
            produto_id: pp.produto_id,
            quantidade_produto: pp.quantidade_produto,
            valor_produto: pp.valor_produto,
          })),
        },
      },
      include: {
        PedidoProdutos: true,
      },
    });
    return pedidoCriado;
  }

  static async findOrderByClientId(clientID: number) {
    const find = await prisma.pedidos.findMany({
      where: { cliente_id: clientID },
    });
    if (!find) {
      return null;
    }
    return find;
  }

  static async listOrdersByClientId(clientID: number) {
    const findOrders = await prisma.pedidos.findMany({
      where: {
        cliente_id: clientID,
      },
      include: {
        PedidoProdutos: true,
      },
    });
    if (!findOrders) {
      return false;
    }
    return findOrders;
  }

  static async listAllOrders() {
    const findAllOrders = await prisma.pedidos.findMany({
      include: {
        PedidoProdutos: true,
      },
    });
    if (!findAllOrders) {
      return false;
    }
    return findAllOrders;
  }
}
