/*
  Warnings:

  - Added the required column `type` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "type" "UserRole" NOT NULL;
