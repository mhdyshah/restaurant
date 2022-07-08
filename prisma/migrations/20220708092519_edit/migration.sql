/*
  Warnings:

  - You are about to drop the column `productId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_productId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
