const express = require('express');
const quizRouter = require('./routes/v1/quiz');
require('./seeders/index');
const app = express();
const port = 8000;
app.use(express.json());
app.use((err, _req, res, next) => {
    // error-handling code goes here
    req.status(500).json({
        err
    })
})

app.get('/', (_req, res) => res.send('quiz app'));


app.use('/api/v1/quiz', quizRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));