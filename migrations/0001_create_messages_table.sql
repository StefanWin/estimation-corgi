-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "suggestedBy" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false
);
