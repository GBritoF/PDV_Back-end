export interface PedidoProduto {
  produto_id: number;
  quantidade_produto: number;
}

export interface Pedido {
  cliente_id: number;
  observacao?: string;
  pedido_produtos: PedidoProduto[];
}
