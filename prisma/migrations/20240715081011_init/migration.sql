-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('DONE', 'ACTIVE');

-- CreateTable
CREATE TABLE "myTodo" (
    "id" SERIAL NOT NULL,
    "task" TEXT NOT NULL,
    "description" TEXT,
    "status" "TodoStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userEmail" TEXT,

    CONSTRAINT "myTodo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "myTodo" ADD CONSTRAINT "myTodo_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;
