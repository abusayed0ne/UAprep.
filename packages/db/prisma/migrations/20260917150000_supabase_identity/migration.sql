ALTER TABLE "User"
ADD COLUMN "authProvider" TEXT,
ADD COLUMN "authSubject" TEXT;

CREATE UNIQUE INDEX "User_authProvider_authSubject_key"
ON "User"("authProvider", "authSubject");
