/*
  Warnings:

  - You are about to drop the column `couponId` on the `Cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_couponId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "couponId",
ADD COLUMN     "couponCode" TEXT;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_couponCode_fkey" FOREIGN KEY ("couponCode") REFERENCES "Coupon"("code") ON DELETE SET NULL ON UPDATE CASCADE;
