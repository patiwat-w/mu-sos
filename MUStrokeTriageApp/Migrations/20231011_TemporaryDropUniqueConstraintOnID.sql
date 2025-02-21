ALTER TABLE "SubjectInformation" DROP CONSTRAINT "PK_SubjectInformation";

ALTER TABLE "SubjectInformation" ALTER COLUMN "ID" DROP NOT NULL;
