-- CreateTable
CREATE TABLE "FailedJob" (
    "id" SERIAL NOT NULL,
    "to" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "attemptCount" INTEGER NOT NULL,
    "failedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FailedJob_pkey" PRIMARY KEY ("id")
);
