-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AVAILABLE', 'NOTAVAILABLE');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FASTFOOD', 'SEAFOOD', 'GRILLEDFOOD', 'STEWEDFOOD', 'DIETFOOD', 'VEGETARIANFOOD', 'SALAD', 'BEVERAGES');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'GENERALMANAGER', 'ASSISTANTMANAGER', 'WAITER', 'WAITRESS', 'FASTFOODCOOK', 'CHEF', 'KITCHENMANAGER', 'DISHWASHERWORKER', 'CASHIER', 'RESTAURANTCOUNTER', 'SERVER', 'BUSSER', 'BARBACK', 'ACCOUNTANTS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "fullName" TEXT,
    "phone" INTEGER NOT NULL,
    "address" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL DEFAULT 'Admin',
    "updatedBy" TEXT DEFAULT 'Admin',
    "deletedBy" TEXT,
    "authCode" INTEGER,
    "introCode" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'FASTFOOD',
    "status" "Status" NOT NULL DEFAULT 'NOTAVAILABLE',
    "price" INTEGER DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL DEFAULT 'Admin',
    "updatedBy" TEXT DEFAULT 'Admin',
    "deletedBy" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "imageLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL DEFAULT 'Admin',
    "updatedBy" TEXT DEFAULT 'Admin',
    "deletedBy" TEXT,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Table_id_key" ON "Table"("id");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
