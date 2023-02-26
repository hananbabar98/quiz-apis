const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function Quiz() {
    try {
        await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS quiz (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            status ENUM('draft', 'publish') NOT NULL
          )`;
    } catch (error) {
        console.error(error);
    }
}

async function QuizQuestion() {
    try {
        await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS quizquestion (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            questions JSON NOT NULL,
            quizId INT NOT NULL,
            FOREIGN KEY (quizId) REFERENCES Quiz(id)
        )`;
    } catch (error) {
        console.error(error);
    }
}

Quiz();
QuizQuestion();