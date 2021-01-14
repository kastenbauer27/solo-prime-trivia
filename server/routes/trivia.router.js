const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();


router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "trivia_questions" ORDER BY "id" ASC`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log('error in getting trivia from db');
    })
});

router.get('/random', (req, res) => {
    let quizKey = process.env.apiKey;
    axios.get(`https://quizapi.io/api/v1/questions?apiKey=${quizKey}`)
    .then(response => {
        console.log('response', response);
        res.send(response.data);
    })
    .catch(err => {
        console.log('error in getting random quiz from api', err);
        res.sendStatus(500);
    })
});

router.get('/history', (req, res) => {
    axios.get(`https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple`)
    .then(response => {
        console.log('response', response);
        res.send(response.data.results);
    })
    .catch(err => {
        console.log('error in getting random quiz from api', err);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    const queryText = `INSERT INTO "trivia_questions" ("question", "correct_answer", "incorrect1", "incorrect2", "incorrect3")
                       VALUES ($1, $2, $3, $4, $5);`;
    const triviaToAdd = req.body;
    pool.query(queryText, [triviaToAdd.question, triviaToAdd.correct_answer, triviaToAdd.incorrect_answers[0], triviaToAdd.incorrect_answers[1], triviaToAdd.incorrect_answers[2]])
    .then(response => {
        res.sendStatus(201);
    })
    .catch(err => {
        console.log('error in adding trivia question to db', err);
        alert('Unable to add question at this time, please try again later.');
        res.sendStatus(500);
    })
})

module.exports = router;