export type TProduto = {
  id?: number;
  descricao?: string;
  quantidade_estoque: number;
  valor: number;
  categoria_id: number;
  imagem_url?: string | null;
};
export default TProduto;
