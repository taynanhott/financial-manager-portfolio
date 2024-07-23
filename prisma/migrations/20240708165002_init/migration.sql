-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" INTEGER NOT NULL,
    "subcategory" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "user" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);
