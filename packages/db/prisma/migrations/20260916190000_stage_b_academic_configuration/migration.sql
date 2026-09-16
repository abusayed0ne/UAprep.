-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'CLOSED');

-- CreateEnum
CREATE TYPE "EvidenceStatus" AS ENUM ('DRAFT', 'APPROVED', 'STALE', 'SUPERSEDED');

-- CreateEnum
CREATE TYPE "EvidenceConfidence" AS ENUM ('VERIFIED', 'PROBABLE', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "EvidenceTier" AS ENUM ('A_OFFICIAL_CURRENT', 'B_OFFICIAL_SUPPORTING', 'C_VERIFIED_COMMUNICATION', 'D_RESEARCH_LEAD');

-- CreateEnum
CREATE TYPE "EvidenceClaimStatus" AS ENUM ('DRAFT', 'APPROVED', 'STALE', 'SUPERSEDED');

-- CreateEnum
CREATE TYPE "PatternStatus" AS ENUM ('DRAFT', 'UNDER_REVIEW', 'CHANGES_REQUESTED', 'APPROVED', 'PUBLISHED', 'STALE', 'SUPERSEDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('RESEARCH_BRIEF', 'DRAFT', 'SUBMITTED', 'AUTO_CHECK_FAILED', 'IN_REVIEW', 'REVISION_REQUIRED', 'ANSWER_VALIDATION', 'FAIRNESS_REVIEW', 'RIGHTS_REVIEW', 'APPROVAL_PENDING', 'APPROVED_FOR_PILOT', 'PILOTING', 'APPROVED_PRODUCTION', 'QUARANTINED', 'RETIRED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "RightsStatus" AS ENUM ('UNKNOWN', 'INTERNAL_ORIGINAL', 'LICENSED', 'OPEN_LICENSE_VERIFIED', 'PUBLIC_DOMAIN_VERIFIED', 'REFERENCE_ONLY', 'REJECTED');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('ASSIGNED', 'IN_PROGRESS', 'SUBMITTED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ValidationDecision" AS ENUM ('MATCH', 'DISAGREEMENT', 'INVESTIGATION_REQUIRED');

-- CreateEnum
CREATE TYPE "ReviewDecision" AS ENUM ('APPROVED', 'REVISION_REQUIRED', 'REJECTED', 'ESCALATED');

-- CreateEnum
CREATE TYPE "ApprovalDecision" AS ENUM ('APPROVED_FOR_PILOT', 'APPROVED_PRODUCTION', 'REJECTED', 'REVISION_REQUIRED');

-- CreateEnum
CREATE TYPE "MockVersionStatus" AS ENUM ('DRAFT', 'VALIDATING', 'READY', 'PUBLISHED', 'RETIRED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('INITIATED', 'VALIDATED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AttemptStatus" AS ENUM ('CREATED', 'IN_PROGRESS', 'SUBMISSION_PENDING', 'SUBMITTED', 'SCORING', 'AWAITING_MANUAL_MARKING', 'SCORED', 'RELEASED', 'RESCORE_PENDING', 'EXPIRED');

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "priceId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerTxnId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'INITIATED',
    "validatedAt" TIMESTAMP(3),
    "providerPayload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entitlement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "Entitlement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentTarget" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "programId" TEXT,
    "intake" TEXT,
    "examDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TenantMembership" (
    "tenantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TenantMembership_pkey" PRIMARY KEY ("tenantId","userId")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "mfaVerified" BOOLEAN NOT NULL DEFAULT false,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleBinding" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "scope" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoleBinding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isDemo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceSource" (
    "id" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "claimType" TEXT NOT NULL,
    "tier" "EvidenceTier" NOT NULL,
    "sourceType" TEXT NOT NULL,
    "sourceReference" TEXT NOT NULL,
    "snapshotHash" TEXT,
    "observedAt" TIMESTAMP(3) NOT NULL,
    "effectiveAt" TIMESTAMP(3),
    "confidence" "EvidenceConfidence" NOT NULL DEFAULT 'UNVERIFIED',
    "status" "EvidenceStatus" NOT NULL DEFAULT 'DRAFT',
    "researcherId" TEXT NOT NULL,
    "verifierId" TEXT,
    "nextReviewAt" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "EvidenceSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvidenceClaim" (
    "id" TEXT NOT NULL,
    "evidenceSourceId" TEXT NOT NULL,
    "programId" TEXT,
    "intake" TEXT,
    "claimType" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "status" "EvidenceClaimStatus" NOT NULL DEFAULT 'DRAFT',
    "effectiveFrom" TIMESTAMP(3),
    "effectiveUntil" TIMESTAMP(3),
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "EvidenceClaim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmissionPattern" (
    "id" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AdmissionPattern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdmissionPatternVersion" (
    "id" TEXT NOT NULL,
    "patternId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "status" "PatternStatus" NOT NULL DEFAULT 'DRAFT',
    "intake" TEXT,
    "effectiveFrom" TIMESTAMP(3),
    "effectiveUntil" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "AdmissionPatternVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatternEvidence" (
    "patternVersionId" TEXT NOT NULL,
    "evidenceSourceId" TEXT NOT NULL,

    CONSTRAINT "PatternEvidence_pkey" PRIMARY KEY ("patternVersionId","evidenceSourceId")
);

-- CreateTable
CREATE TABLE "PatternProgram" (
    "patternVersionId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,

    CONSTRAINT "PatternProgram_pkey" PRIMARY KEY ("patternVersionId","programId")
);

-- CreateTable
CREATE TABLE "PatternSection" (
    "id" TEXT NOT NULL,
    "patternVersionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "questionType" TEXT NOT NULL,
    "questionCount" INTEGER NOT NULL,
    "marks" DECIMAL(10,3) NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "wrongPenalty" DECIMAL(10,3) NOT NULL DEFAULT 0,
    "calculatorPolicy" TEXT,
    "passRule" JSONB,
    "subjectId" TEXT,

    CONSTRAINT "PatternSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subtopic" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Subtopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningObjective" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "subtopicId" TEXT,
    "code" TEXT,
    "statement" TEXT NOT NULL,

    CONSTRAINT "LearningObjective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "canonicalCode" TEXT NOT NULL,
    "status" "QuestionStatus" NOT NULL DEFAULT 'RESEARCH_BRIEF',
    "setterId" TEXT NOT NULL,
    "currentVersionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionVersion" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "objectiveId" TEXT NOT NULL,
    "questionType" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "stem" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "studentExplanation" TEXT NOT NULL,
    "commonMistake" TEXT,
    "shortcut" TEXT,
    "intendedDifficulty" TEXT NOT NULL,
    "targetTimeSeconds" INTEGER NOT NULL,
    "marks" DECIMAL(10,3) NOT NULL,
    "wrongPenalty" DECIMAL(10,3) NOT NULL DEFAULT 0,
    "sourceType" TEXT NOT NULL,
    "provenance" JSONB NOT NULL,
    "contentSourceId" TEXT,
    "rightsStatus" "RightsStatus" NOT NULL DEFAULT 'UNKNOWN',
    "officialQuestion" BOOLEAN NOT NULL DEFAULT false,
    "normalizedHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentSource" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "rightsStatus" "RightsStatus" NOT NULL DEFAULT 'UNKNOWN',
    "copyrightOwner" TEXT,
    "licenseReference" TEXT,
    "licenseExpiresAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContentSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionAssignment" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "setterId" TEXT NOT NULL,
    "questionId" TEXT,
    "universityPatternId" TEXT,
    "subjectId" TEXT NOT NULL,
    "topicId" TEXT,
    "learningObjectiveId" TEXT,
    "numberRequired" INTEGER NOT NULL,
    "difficultyMix" JSONB NOT NULL,
    "questionType" TEXT NOT NULL,
    "targetTimeSeconds" INTEGER,
    "deadlineAt" TIMESTAMP(3),
    "instructions" TEXT,
    "status" "AssignmentStatus" NOT NULL DEFAULT 'ASSIGNED',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" TEXT NOT NULL,
    "questionVersionId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionReview" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "reviewType" TEXT NOT NULL,
    "decision" "ReviewDecision" NOT NULL,
    "questionVersionId" TEXT NOT NULL,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerValidation" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "questionVersionId" TEXT NOT NULL,
    "validatorId" TEXT NOT NULL,
    "independentAnswer" JSONB NOT NULL,
    "reasoning" TEXT NOT NULL,
    "decision" "ValidationDecision" NOT NULL,
    "setterKeyRevealedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnswerValidation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionApproval" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "questionVersionId" TEXT NOT NULL,
    "approverId" TEXT NOT NULL,
    "decision" "ApprovalDecision" NOT NULL,
    "checklist" JSONB NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionApproval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionLintResult" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "questionVersionId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "field" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionLintResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionWorkflowEvent" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "fromStatus" "QuestionStatus" NOT NULL,
    "toStatus" "QuestionStatus" NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionWorkflowEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RightsReview" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "status" "RightsStatus" NOT NULL,
    "questionVersionId" TEXT NOT NULL,
    "evidence" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RightsReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mock" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blueprintId" TEXT NOT NULL,

    CONSTRAINT "Mock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockBlueprint" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "patternVersionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MockBlueprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockBlueprintSection" (
    "id" TEXT NOT NULL,
    "blueprintId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "subjectId" TEXT,
    "requiredCount" INTEGER NOT NULL,
    "totalMarks" DECIMAL(10,3) NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "topicCoverage" JSONB NOT NULL,
    "difficultyDistribution" JSONB NOT NULL,
    "allowedQuestionTypes" TEXT[],
    "exposureLimit" INTEGER NOT NULL,
    "randomizationPolicy" JSONB NOT NULL,
    "explanationsRequired" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "MockBlueprintSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockVersion" (
    "id" TEXT NOT NULL,
    "mockId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "patternVersionId" TEXT NOT NULL,
    "scoringPolicyVersionId" TEXT NOT NULL,
    "blueprintId" TEXT NOT NULL,
    "status" "MockVersionStatus" NOT NULL DEFAULT 'DRAFT',
    "validationHash" TEXT,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "MockVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockSection" (
    "id" TEXT NOT NULL,
    "mockVersionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "totalMarks" DECIMAL(10,3) NOT NULL,

    CONSTRAINT "MockSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockItem" (
    "id" TEXT NOT NULL,
    "mockSectionId" TEXT NOT NULL,
    "questionVersionId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "MockItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MockValidationReport" (
    "id" TEXT NOT NULL,
    "mockVersionId" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL,
    "issues" JSONB NOT NULL,
    "inputHash" TEXT NOT NULL,
    "validatedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockValidationReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoringPolicyVersion" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "policyKey" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "rules" JSONB NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "ScoringPolicyVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attempt" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "mockVersionId" TEXT NOT NULL,
    "scoringPolicyVersionId" TEXT NOT NULL,
    "startKey" TEXT NOT NULL,
    "status" "AttemptStatus" NOT NULL DEFAULT 'CREATED',
    "startedAt" TIMESTAMP(3),
    "deadlineAt" TIMESTAMP(3),
    "submittedAt" TIMESTAMP(3),

    CONSTRAINT "Attempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttemptSnapshot" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "patternVersionId" TEXT NOT NULL,
    "scoringPolicyVersionId" TEXT NOT NULL,
    "questionOrder" JSONB NOT NULL,
    "optionOrder" JSONB NOT NULL,
    "reviewPolicy" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttemptSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttemptAnswer" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "questionVersionId" TEXT NOT NULL,
    "operationId" TEXT NOT NULL,
    "revision" INTEGER NOT NULL,
    "response" JSONB NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttemptAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttemptEvent" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttemptEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttemptScore" (
    "id" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "total" DECIMAL(12,3) NOT NULL,
    "details" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttemptScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionScore" (
    "id" TEXT NOT NULL,
    "scoreId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "total" DECIMAL(12,3) NOT NULL,
    "details" JSONB NOT NULL,

    CONSTRAINT "SectionScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreRevision" (
    "id" TEXT NOT NULL,
    "scoreId" TEXT NOT NULL,
    "previousTotal" DECIMAL(12,3) NOT NULL,
    "revisedTotal" DECIMAL(12,3) NOT NULL,
    "reason" TEXT NOT NULL,
    "approverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScoreRevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreEvent" (
    "id" TEXT NOT NULL,
    "scoreId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScoreEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionReport" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "questionVersionId" TEXT NOT NULL,
    "attemptId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "details" TEXT,
    "status" TEXT NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemStatistic" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "questionVersionId" TEXT NOT NULL,
    "sampleSize" INTEGER NOT NULL,
    "correctCount" INTEGER NOT NULL,
    "incorrectCount" INTEGER NOT NULL,
    "skipCount" INTEGER NOT NULL,
    "facility" DECIMAL(8,5),
    "discrimination" DECIMAL(8,5),
    "medianResponseTime" INTEGER,
    "optionDistribution" JSONB NOT NULL,
    "analysisStatus" TEXT NOT NULL,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemStatistic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditEvent" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "actorId" TEXT,
    "eventType" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "correlationId" TEXT NOT NULL,
    "summary" JSONB,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeatureFlag" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "configuration" JSONB,

    CONSTRAINT "FeatureFlag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_slug_key" ON "Tenant"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Product_tenantId_code_key" ON "Product"("tenantId", "code");

-- CreateIndex
CREATE INDEX "Order_tenantId_userId_createdAt_idx" ON "Order"("tenantId", "userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_provider_providerTxnId_key" ON "Payment"("provider", "providerTxnId");

-- CreateIndex
CREATE UNIQUE INDEX "Entitlement_userId_productId_orderId_key" ON "Entitlement"("userId", "productId", "orderId");

-- CreateIndex
CREATE INDEX "Subscription_userId_status_idx" ON "Subscription"("userId", "status");

-- CreateIndex
CREATE INDEX "StudentTarget_tenantId_studentId_idx" ON "StudentTarget"("tenantId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentTarget_studentId_universityId_programId_intake_key" ON "StudentTarget"("studentId", "universityId", "programId", "intake");

-- CreateIndex
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

-- CreateIndex
CREATE INDEX "Session_userId_expiresAt_idx" ON "Session"("userId", "expiresAt");

-- CreateIndex
CREATE INDEX "RoleBinding_tenantId_role_idx" ON "RoleBinding"("tenantId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "RoleBinding_userId_tenantId_role_key" ON "RoleBinding"("userId", "tenantId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "University_tenantId_slug_key" ON "University"("tenantId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Program_universityId_name_key" ON "Program"("universityId", "name");

-- CreateIndex
CREATE INDEX "EvidenceSource_universityId_status_idx" ON "EvidenceSource"("universityId", "status");

-- CreateIndex
CREATE INDEX "EvidenceClaim_evidenceSourceId_status_idx" ON "EvidenceClaim"("evidenceSourceId", "status");

-- CreateIndex
CREATE INDEX "EvidenceClaim_programId_intake_idx" ON "EvidenceClaim"("programId", "intake");

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionPattern_universityId_name_key" ON "AdmissionPattern"("universityId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "AdmissionPatternVersion_patternId_version_key" ON "AdmissionPatternVersion"("patternId", "version");

-- CreateIndex
CREATE INDEX "PatternProgram_programId_idx" ON "PatternProgram"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "PatternSection_patternVersionId_position_key" ON "PatternSection"("patternVersionId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_tenantId_slug_key" ON "Subject"("tenantId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_subjectId_slug_key" ON "Topic"("subjectId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subtopic_topicId_slug_key" ON "Subtopic"("topicId", "slug");

-- CreateIndex
CREATE INDEX "Question_tenantId_status_idx" ON "Question"("tenantId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Question_tenantId_canonicalCode_key" ON "Question"("tenantId", "canonicalCode");

-- CreateIndex
CREATE INDEX "QuestionVersion_normalizedHash_idx" ON "QuestionVersion"("normalizedHash");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionVersion_questionId_version_key" ON "QuestionVersion"("questionId", "version");

-- CreateIndex
CREATE INDEX "ContentSource_tenantId_rightsStatus_idx" ON "ContentSource"("tenantId", "rightsStatus");

-- CreateIndex
CREATE UNIQUE INDEX "ContentSource_tenantId_name_key" ON "ContentSource"("tenantId", "name");

-- CreateIndex
CREATE INDEX "QuestionAssignment_tenantId_setterId_status_idx" ON "QuestionAssignment"("tenantId", "setterId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionOption_questionVersionId_position_key" ON "QuestionOption"("questionVersionId", "position");

-- CreateIndex
CREATE INDEX "QuestionReview_questionId_reviewType_idx" ON "QuestionReview"("questionId", "reviewType");

-- CreateIndex
CREATE INDEX "AnswerValidation_questionId_createdAt_idx" ON "AnswerValidation"("questionId", "createdAt");

-- CreateIndex
CREATE INDEX "QuestionApproval_questionId_createdAt_idx" ON "QuestionApproval"("questionId", "createdAt");

-- CreateIndex
CREATE INDEX "QuestionLintResult_questionId_questionVersionId_idx" ON "QuestionLintResult"("questionId", "questionVersionId");

-- CreateIndex
CREATE INDEX "QuestionWorkflowEvent_questionId_createdAt_idx" ON "QuestionWorkflowEvent"("questionId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Mock_tenantId_name_key" ON "Mock"("tenantId", "name");

-- CreateIndex
CREATE INDEX "MockBlueprint_tenantId_active_idx" ON "MockBlueprint"("tenantId", "active");

-- CreateIndex
CREATE UNIQUE INDEX "MockBlueprint_tenantId_name_key" ON "MockBlueprint"("tenantId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "MockBlueprintSection_blueprintId_position_key" ON "MockBlueprintSection"("blueprintId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "MockVersion_mockId_version_key" ON "MockVersion"("mockId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "MockSection_mockVersionId_position_key" ON "MockSection"("mockVersionId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "MockItem_mockSectionId_position_key" ON "MockItem"("mockSectionId", "position");

-- CreateIndex
CREATE INDEX "MockValidationReport_mockVersionId_createdAt_idx" ON "MockValidationReport"("mockVersionId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ScoringPolicyVersion_tenantId_policyKey_version_key" ON "ScoringPolicyVersion"("tenantId", "policyKey", "version");

-- CreateIndex
CREATE INDEX "Attempt_tenantId_studentId_idx" ON "Attempt"("tenantId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Attempt_studentId_startKey_key" ON "Attempt"("studentId", "startKey");

-- CreateIndex
CREATE UNIQUE INDEX "AttemptSnapshot_attemptId_key" ON "AttemptSnapshot"("attemptId");

-- CreateIndex
CREATE UNIQUE INDEX "AttemptAnswer_attemptId_operationId_key" ON "AttemptAnswer"("attemptId", "operationId");

-- CreateIndex
CREATE UNIQUE INDEX "AttemptAnswer_attemptId_questionVersionId_revision_key" ON "AttemptAnswer"("attemptId", "questionVersionId", "revision");

-- CreateIndex
CREATE INDEX "AttemptEvent_attemptId_createdAt_idx" ON "AttemptEvent"("attemptId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "AttemptScore_attemptId_key" ON "AttemptScore"("attemptId");

-- CreateIndex
CREATE UNIQUE INDEX "SectionScore_scoreId_sectionId_key" ON "SectionScore"("scoreId", "sectionId");

-- CreateIndex
CREATE INDEX "ScoreEvent_scoreId_createdAt_idx" ON "ScoreEvent"("scoreId", "createdAt");

-- CreateIndex
CREATE INDEX "QuestionReport_questionId_status_idx" ON "QuestionReport"("questionId", "status");

-- CreateIndex
CREATE INDEX "QuestionReport_studentId_createdAt_idx" ON "QuestionReport"("studentId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStatistic_questionVersionId_key" ON "ItemStatistic"("questionVersionId");

-- CreateIndex
CREATE INDEX "AuditEvent_tenantId_createdAt_idx" ON "AuditEvent"("tenantId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditEvent_resourceType_resourceId_idx" ON "AuditEvent"("resourceType", "resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "FeatureFlag_tenantId_key_key" ON "FeatureFlag"("tenantId", "key");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entitlement" ADD CONSTRAINT "Entitlement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entitlement" ADD CONSTRAINT "Entitlement_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entitlement" ADD CONSTRAINT "Entitlement_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTarget" ADD CONSTRAINT "StudentTarget_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTarget" ADD CONSTRAINT "StudentTarget_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantMembership" ADD CONSTRAINT "TenantMembership_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TenantMembership" ADD CONSTRAINT "TenantMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleBinding" ADD CONSTRAINT "RoleBinding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "University" ADD CONSTRAINT "University_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceSource" ADD CONSTRAINT "EvidenceSource_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceClaim" ADD CONSTRAINT "EvidenceClaim_evidenceSourceId_fkey" FOREIGN KEY ("evidenceSourceId") REFERENCES "EvidenceSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvidenceClaim" ADD CONSTRAINT "EvidenceClaim_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionPattern" ADD CONSTRAINT "AdmissionPattern_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdmissionPatternVersion" ADD CONSTRAINT "AdmissionPatternVersion_patternId_fkey" FOREIGN KEY ("patternId") REFERENCES "AdmissionPattern"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternEvidence" ADD CONSTRAINT "PatternEvidence_patternVersionId_fkey" FOREIGN KEY ("patternVersionId") REFERENCES "AdmissionPatternVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternEvidence" ADD CONSTRAINT "PatternEvidence_evidenceSourceId_fkey" FOREIGN KEY ("evidenceSourceId") REFERENCES "EvidenceSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternProgram" ADD CONSTRAINT "PatternProgram_patternVersionId_fkey" FOREIGN KEY ("patternVersionId") REFERENCES "AdmissionPatternVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternProgram" ADD CONSTRAINT "PatternProgram_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternSection" ADD CONSTRAINT "PatternSection_patternVersionId_fkey" FOREIGN KEY ("patternVersionId") REFERENCES "AdmissionPatternVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatternSection" ADD CONSTRAINT "PatternSection_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subtopic" ADD CONSTRAINT "Subtopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningObjective" ADD CONSTRAINT "LearningObjective_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningObjective" ADD CONSTRAINT "LearningObjective_subtopicId_fkey" FOREIGN KEY ("subtopicId") REFERENCES "Subtopic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionVersion" ADD CONSTRAINT "QuestionVersion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionVersion" ADD CONSTRAINT "QuestionVersion_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "LearningObjective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionVersion" ADD CONSTRAINT "QuestionVersion_contentSourceId_fkey" FOREIGN KEY ("contentSourceId") REFERENCES "ContentSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentSource" ADD CONSTRAINT "ContentSource_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAssignment" ADD CONSTRAINT "QuestionAssignment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAssignment" ADD CONSTRAINT "QuestionAssignment_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionVersionId_fkey" FOREIGN KEY ("questionVersionId") REFERENCES "QuestionVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionReview" ADD CONSTRAINT "QuestionReview_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerValidation" ADD CONSTRAINT "AnswerValidation_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionApproval" ADD CONSTRAINT "QuestionApproval_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionLintResult" ADD CONSTRAINT "QuestionLintResult_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionWorkflowEvent" ADD CONSTRAINT "QuestionWorkflowEvent_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RightsReview" ADD CONSTRAINT "RightsReview_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mock" ADD CONSTRAINT "Mock_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mock" ADD CONSTRAINT "Mock_blueprintId_fkey" FOREIGN KEY ("blueprintId") REFERENCES "MockBlueprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockBlueprint" ADD CONSTRAINT "MockBlueprint_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockBlueprint" ADD CONSTRAINT "MockBlueprint_patternVersionId_fkey" FOREIGN KEY ("patternVersionId") REFERENCES "AdmissionPatternVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockBlueprintSection" ADD CONSTRAINT "MockBlueprintSection_blueprintId_fkey" FOREIGN KEY ("blueprintId") REFERENCES "MockBlueprint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockVersion" ADD CONSTRAINT "MockVersion_mockId_fkey" FOREIGN KEY ("mockId") REFERENCES "Mock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockVersion" ADD CONSTRAINT "MockVersion_patternVersionId_fkey" FOREIGN KEY ("patternVersionId") REFERENCES "AdmissionPatternVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockVersion" ADD CONSTRAINT "MockVersion_scoringPolicyVersionId_fkey" FOREIGN KEY ("scoringPolicyVersionId") REFERENCES "ScoringPolicyVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockSection" ADD CONSTRAINT "MockSection_mockVersionId_fkey" FOREIGN KEY ("mockVersionId") REFERENCES "MockVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockItem" ADD CONSTRAINT "MockItem_mockSectionId_fkey" FOREIGN KEY ("mockSectionId") REFERENCES "MockSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockItem" ADD CONSTRAINT "MockItem_questionVersionId_fkey" FOREIGN KEY ("questionVersionId") REFERENCES "QuestionVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockValidationReport" ADD CONSTRAINT "MockValidationReport_mockVersionId_fkey" FOREIGN KEY ("mockVersionId") REFERENCES "MockVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_mockVersionId_fkey" FOREIGN KEY ("mockVersionId") REFERENCES "MockVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attempt" ADD CONSTRAINT "Attempt_scoringPolicyVersionId_fkey" FOREIGN KEY ("scoringPolicyVersionId") REFERENCES "ScoringPolicyVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptSnapshot" ADD CONSTRAINT "AttemptSnapshot_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptAnswer" ADD CONSTRAINT "AttemptAnswer_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptEvent" ADD CONSTRAINT "AttemptEvent_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttemptScore" ADD CONSTRAINT "AttemptScore_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "Attempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionScore" ADD CONSTRAINT "SectionScore_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "AttemptScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreRevision" ADD CONSTRAINT "ScoreRevision_scoreId_fkey" FOREIGN KEY ("scoreId") REFERENCES "AttemptScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionReport" ADD CONSTRAINT "QuestionReport_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStatistic" ADD CONSTRAINT "ItemStatistic_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditEvent" ADD CONSTRAINT "AuditEvent_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
