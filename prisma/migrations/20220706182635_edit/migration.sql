/*
  Warnings:

  - You are about to drop the column `userId` on the `products` table. All the data in the column will be lost.
  - Added the required column `productId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
