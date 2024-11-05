-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "imagem_url" TEXT;

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "observacao" TEXT,
    "valor_total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido_produtos" (
    "id" SERIAL NOT NULL,
    "pedido_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade_produto" INTEGER NOT NULL,
    "valor_produto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "pedido_produtos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_produtos" ADD CONSTRAINT "pedido_produtos_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_produtos" ADD CONSTRAINT "pedido_produtos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
