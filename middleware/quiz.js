
const { addQuizBody, getQuizBatchBody, getQuizBody } = require('./validator.body');

const addQuizValidator = async (req, res, next) => {
    try {
        const { body } = req;
        addQuizBody(body);
        if (addQuizBody.errors) {
            res.status(200).json({
                success: false,
                data: [],
                errors: addQuizBody.errors,
                errorMessages: "Body is not a valid JSON"
            });
        }
        else {
            next();
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const getQuizValidator = async (req, res, next) => {
    try {
        getQuizBatchBody({
            ...req.query,
            page: req.query.page ? Number(req.query.page) : null,
            perPage: req.query.perPage ? Number(req.query.perPage) : null,
        });
        if (getQuizBatchBody.errors) {
            res.status(200).json({
                success: false,
                data: [],
                errors: getQuizBatchBody.errors,
                errorMessages: "Query is not a valid"
            });
        }
        else {
            next();
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

module.exports = {
    addQuizValidator,
    getQuizValidator,
}