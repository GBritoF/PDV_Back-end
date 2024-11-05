import { TOrderProduct } from '../types/TOrderProduct';

export class PedidoProduto {
  readonly id: number;
  readonly pedido_id: number;
  readonly produto_id: number;
  quantidade_produto: number;
  valor_produto: number;

  constructor({
    id,
    pedido_id,
    produto_id,
    quantidade_produto,
    valor_produto,
  }: TOrderProduct) {
    this.id = id;
    this.pedido_id = pedido_id;
    this.produto_id = produto_id;
    this.quantidade_produto = quantidade_produto;
    this.valor_produto = valor_produto;
  }
}
