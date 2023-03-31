/*
  Warnings:

  - You are about to drop the column `mediaId` on the `post` table. All the data in the column will be lost.
  - Added the required column `postId` to the `post_media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "post_media" DROP CONSTRAINT "post_media_id_fkey";

-- DropIndex
DROP INDEX "post_mediaId_key";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "mediaId";

-- AlterTable
ALTER TABLE "post_media" ADD COLUMN     "postId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "post_media" ADD CONSTRAINT "post_media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
