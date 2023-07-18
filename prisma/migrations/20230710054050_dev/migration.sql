/*
  Warnings:

  - The primary key for the `cart_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sessionId` on the `cart_item` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `discountId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryId` on the `product` table. All the data in the column will be lost.
  - The primary key for the `product_category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `deletedAt` on the `product_category` table. All the data in the column will be lost.
  - You are about to drop the column `desc` on the `product_category` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `product_category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `product_category` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `product_discount` table. All the data in the column will be lost.
  - You are about to drop the column `desc_percent` on the `product_discount` table. All the data in the column will be lost.
  - The primary key for the `product_inventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `product_inventory` table. All the data in the column will be lost.
  - You are about to drop the column `userShopId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `PostLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShoppingSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_shop` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `cart_item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `cart_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `cart_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moneyTypeId` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `product_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `product_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount_percent` to the `product_discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `product_discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `product_discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `product_discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `product_inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingSession" DROP CONSTRAINT "ShoppingSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_category" DROP CONSTRAINT "product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "product_discount" DROP CONSTRAINT "product_discount_id_fkey";

-- DropForeignKey
ALTER TABLE "product_inventory" DROP CONSTRAINT "product_inventory_id_fkey";

-- DropForeignKey
ALTER TABLE "user_shop" DROP CONSTRAINT "user_shop_id_fkey";

-- DropIndex
DROP INDEX "cart_item_productId_key";

-- DropIndex
DROP INDEX "cart_item_sessionId_key";

-- DropIndex
DROP INDEX "product_categoryId_key";

-- DropIndex
DROP INDEX "product_discountId_key";

-- DropIndex
DROP INDEX "product_inventoryId_key";

-- DropIndex
DROP INDEX "user_userShopId_key";

-- DropIndex
DROP INDEX "user_address_userId_key";

-- AlterTable
ALTER TABLE "cart_item" DROP CONSTRAINT "cart_item_pkey",
DROP COLUMN "sessionId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "cart_item_pkey" PRIMARY KEY ("userId", "productId");

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "audience" INTEGER;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "categoryId",
DROP COLUMN "discountId",
DROP COLUMN "inventoryId",
ADD COLUMN     "moneyTypeId" INTEGER NOT NULL,
ADD COLUMN     "sold" INTEGER;

-- AlterTable
ALTER TABLE "product_category" DROP CONSTRAINT "product_category_pkey",
DROP COLUMN "deletedAt",
DROP COLUMN "desc",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "product_category_pkey" PRIMARY KEY ("categoryId", "productId");

-- AlterTable
ALTER TABLE "product_discount" DROP COLUMN "active",
DROP COLUMN "desc_percent",
ADD COLUMN     "discount_percent" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "desc" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product_inventory" DROP CONSTRAINT "product_inventory_pkey",
DROP COLUMN "id",
ADD COLUMN     "productId" INTEGER NOT NULL,
ADD CONSTRAINT "product_inventory_pkey" PRIMARY KEY ("productId");

-- AlterTable
ALTER TABLE "user" DROP COLUMN "userShopId",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "private" BOOLEAN,
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PostLike";

-- DropTable
DROP TABLE "ShoppingSession";

-- DropTable
DROP TABLE "user_shop";

-- CreateTable
CREATE TABLE "follow" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "followerId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_image" (
    "id" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "product_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "money_type" (
    "moneyTypeId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "money_type_pkey" PRIMARY KEY ("moneyTypeId")
);

-- CreateTable
CREATE TABLE "post_like" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_comment_likes" (
    "commentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_comment_likes_pkey" PRIMARY KEY ("commentId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_id_key" ON "cart_item"("id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "user_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_moneyTypeId_fkey" FOREIGN KEY ("moneyTypeId") REFERENCES "money_type"("moneyTypeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_inventory" ADD CONSTRAINT "product_inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_discount" ADD CONSTRAINT "product_discount_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_like" ADD CONSTRAINT "post_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comment_likes" ADD CONSTRAINT "post_comment_likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comment_likes" ADD CONSTRAINT "post_comment_likes_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "post_comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
