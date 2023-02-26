const JsonValidator = require('is-my-json-valid');

const addQuizBody = JsonValidator({
    required: true,
    type: 'object',
    properties: {
        name: {
            required: true,
            type: 'string'
        },
        description: {
            required: true,
            type: 'string'
        },
        status: {
            required: true,
            type: 'string',
            enum: ['draft', 'publish']
        },
        questions: {
            required: true,
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                properties: {
                    question: {
                        required: true,
                        type: 'string'
                    },
                    options: {
                        required: true,
                        type: 'array',
                        minItems: 2,
                        items: {
                            type: 'object',
                            properties: {
                                value: {
                                    type: 'string',
                                    required: true,
                                },
                                isCorrect: {
                                    type: 'boolean',
                                    required: true,
                                }
                            }
                        }
                    },
                },
                additionalProperties: false
            }
        }
    },
    additionalProperties: false
});

const getQuizBatchBody = JsonValidator({
    required: true,
    type: 'object',
    properties: {
        status: {
            required: false,
            type: 'string',
            enum: ['draft', 'publish']
        },
        page: {
            required: true,
            type: 'integer',
            minimum: 1
        },
        perPage: {
            required: true,
            type: 'integer',
            minimum: 1
        },
    },
    additionalProperties: false
});

const getQuizBody = JsonValidator({
    required: true,
    type: 'object',
    properties: {
        quizId: {
            required: true,
            type: 'string',
        },
    },
    additionalProperties: false
});

module.exports = {
    addQuizBody,
    getQuizBatchBody,
    getQuizBody
}