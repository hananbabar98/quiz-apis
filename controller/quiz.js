const { addQuizQuery, addQuizQuestion, deleteQuizQuery, getQuizBatchQuery } = require('../query/quiz');

const addQuiz = async (req, res, next) => {
    try {
        const { name, description, status, questions } = req.body;
        const quiz = await addQuizQuery(name, description, status);
        if (quiz) {
            const quizQuestion = await addQuizQuestion(quiz.id, questions);
            if(quizQuestion){
                res.status(200).json({
                    success: true,
                    data: [
                        {
                            id: quiz.id
                        }
                    ],
                    errors: [],
                    errorMessages: null
                });
            }
            else {
                deleteQuizQuery(quiz.id).then().catch();
                res.status(200).json({
                    success: false,
                    data: [],
                    errors: [],
                    errorMessages: "Error on creating a new quiz questions"
                });
            }
        }
        else {
            res.status(200).json({
                success: false,
                data: [],
                errors: [],
                errorMessages: "Error on creating a new quiz"
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const getQuizBatch = async (req, res, next) => {
    try {
        const { status, page, perPage } = req.query;
        const skip = (Number(page) - 1) * Number(perPage);
        const quiz = await getQuizBatchQuery(status, null, skip, Number(perPage));
        res.status(200).json({
            success: true,
            data: quiz,
            errors: [],
            errorMessages: null
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const getQuizById = async (req, res, next) => {
    try {
        const { quizId } = req.params;
        const quiz = await getQuizBatchQuery(null, quizId, 0, 1);
        res.status(200).json({
            success: true,
            data: quiz,
            errors: [],
            errorMessages: null
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    addQuiz,
    getQuizBatch,
    getQuizById
};