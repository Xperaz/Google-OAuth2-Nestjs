/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[login]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "Level" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "Machine" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "TotalDraw" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "TotalLose" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "TotalMatch" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "TotalWin" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "ball_color" TEXT DEFAULT '#E0E0E0',
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "bg_color" TEXT[] DEFAULT ARRAY['#918CA9', '#211F2F']::TEXT[],
ADD COLUMN     "cleanSheet" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "intraId" INTEGER,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kind" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "logedFirstTime" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "paddle_color" TEXT DEFAULT '#E0E0E0',
ADD COLUMN     "password" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'offline',
ADD COLUMN     "twoFA" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twoFactorAuthenticationSecret" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");
