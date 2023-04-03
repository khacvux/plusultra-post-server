/*
  Warnings:

  - The primary key for the `post_media` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `post_media` table. All the data in the column will be lost.
  - You are about to drop the column `mediaFilename` on the `post_media` table. All the data in the column will be lost.
  - Added the required column `mediaKey` to the `post_media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post_media" DROP CONSTRAINT "post_media_pkey",
DROP COLUMN "id",
DROP COLUMN "mediaFilename",
ADD COLUMN     "mediaKey" TEXT NOT NULL,
ADD CONSTRAINT "post_media_pkey" PRIMARY KEY ("mediaKey");
