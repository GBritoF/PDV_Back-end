/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `clientes` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `produtos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "clientes" DROP CONSTRAINT "clientes_usuario_id_fkey";

-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_usuario_id_fkey";

-- AlterTable
ALTER TABLE "clientes" DROP COLUMN "usuario_id";

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "usuario_id";
