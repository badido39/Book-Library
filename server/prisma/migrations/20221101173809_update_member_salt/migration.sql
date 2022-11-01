/*
  Warnings:

  - You are about to drop the column `hashSalt` on the `Member` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Member" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "username" TEXT NOT NULL,
    "hash" TEXT NOT NULL
);
INSERT INTO "new_Member" ("createdAt", "hash", "id", "updatedAt", "username") SELECT "createdAt", "hash", "id", "updatedAt", "username" FROM "Member";
DROP TABLE "Member";
ALTER TABLE "new_Member" RENAME TO "Member";
CREATE UNIQUE INDEX "Member_username_key" ON "Member"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
