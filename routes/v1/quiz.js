const express = require('express');
const router = express.Router();
const { addQuizValidator, getQuizValidator } = require('../../middleware/quiz');
const { addQuiz, getQuizBatch, getQuizById } = require('../../controller/quiz');

router.post(
    '/',
    addQuizValidator,
    addQuiz
);

router.get(
    '/',
    getQuizValidator,
    getQuizBatch
);

router.get(
    '/:quizId',
    getQuizById
);

module.exports = router;