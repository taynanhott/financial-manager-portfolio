/*
  Warnings:

  - You are about to drop the column `user` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Collect` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Subcategory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "user",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Collect" DROP COLUMN "user",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "user",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Subcategory" DROP COLUMN "user",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collect" ADD CONSTRAINT "Collect_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
