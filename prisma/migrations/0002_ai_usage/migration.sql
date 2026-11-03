CREATE TABLE "AiUsage" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "visitor" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AiUsage_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "AiUsage_createdAt_idx" ON "AiUsage"("createdAt");
CREATE INDEX "AiUsage_kind_visitor_createdAt_idx" ON "AiUsage"("kind", "visitor", "createdAt");
