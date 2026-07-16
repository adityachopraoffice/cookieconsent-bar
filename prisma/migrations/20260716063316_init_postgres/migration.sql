-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" TIMESTAMP(3),
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "accountOwner" BOOLEAN NOT NULL DEFAULT false,
    "locale" TEXT,
    "collaborator" BOOLEAN DEFAULT false,
    "emailVerified" BOOLEAN DEFAULT false,
    "refreshToken" TEXT,
    "refreshTokenExpires" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopSettings" (
    "id" SERIAL NOT NULL,
    "shop" TEXT NOT NULL,
    "bannerText" TEXT NOT NULL DEFAULT 'We use cookies to improve your experience.',
    "privacyPolicyUrl" TEXT NOT NULL DEFAULT '',
    "acceptButtonText" TEXT NOT NULL DEFAULT 'Accept',
    "declineButtonText" TEXT NOT NULL DEFAULT 'Decline',
    "bgColor" TEXT NOT NULL DEFAULT '#000000',
    "textColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "buttonColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "buttonTextColor" TEXT NOT NULL DEFAULT '#000000',
    "position" TEXT NOT NULL DEFAULT 'bottom',

    CONSTRAINT "ShopSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShopSettings_shop_key" ON "ShopSettings"("shop");
