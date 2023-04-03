/*
  Warnings:

  - You are about to drop the column `commentId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `sharedId` on the `post` table. All the data in the column will be lost.
  - Added the required column `postId` to the `post_comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaFilename` to the `post_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `post_shared` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `post_with_products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post_comment" DROP CONSTRAINT "post_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "post_shared" DROP CONSTRAINT "post_shared_id_fkey";

-- DropIndex
DROP INDEX "post_commentId_key";

-- DropIndex
DROP INDEX "post_sharedId_key";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "commentId",
DROP COLUMN "sharedId";

-- AlterTable
ALTER TABLE "post_comment" ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "post_media" ADD COLUMN     "mediaFilename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "post_shared" ADD COLUMN     "postId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "post_with_products" ADD COLUMN     "postId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "post_comment" ADD CONSTRAINT "post_comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_shared" ADD CONSTRAINT "post_shared_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
