const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const addQuizQuery = async (name, description, status) => {
    try {
        return await prisma.quiz.create({
            data: {
                name,
                description,
                status
            }
        })
    } catch (err) {
        console.error(err);
        return null;
    };
}

const addQuizQuestion = async (quizId, questions) => {
    try {
        return await prisma.quizQuestion.create({
            data: {
                quizId,
                questions: questions
            }
        })
    } catch (err) {
        console.error(err);
        return null;
    };
};

const deleteQuizQuery = async (id) => {
    try {
        const deletedQuiz = await prisma.quiz.delete({
            where: { id }
        });
        return deletedQuiz;
    } catch (err) {
        console.error(err);
        return null;
    }
};

const getQuizBatchQuery = async (status, id, skip, limit) => {
    try {
        let statusList = ['draft', 'publish'];
        if (status) {
            statusList = [status];
        }
        let object = {
            status: {
                in: statusList
            }
        }
        if (id) {
            object = {
                ...object,
                id: {
                    equals: Number(id)
                },
            }
        }
        return await prisma.quiz.findMany({
            where: object,
            include: {
                quizQuestion: true
            },
            skip,
            take: limit
        });
    } catch (err) {
        console.error(err);
        return [];
    };
}

module.exports = {
    addQuizQuery,
    addQuizQuestion,
    deleteQuizQuery,
    getQuizBatchQuery
};