ALTER TABLE "Subjects" DROP CONSTRAINT "PK_Subjects";

ALTER TABLE "Subjects" ADD COLUMN "Id" INTEGER NOT NULL DEFAULT 0;
-- For SQL Server, use the following line instead:
-- ALTER TABLE "Subjects" ADD "Id" INT IDENTITY(1,1) NOT NULL;

ALTER TABLE "Subjects" ADD CONSTRAINT "PK_Subjects" PRIMARY KEY ("Id");
