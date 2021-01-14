const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();


router.get('/', (req, res) => {
    const queryText = `SELECT trivia_questions.question, trivia_answers.answer FROM trivia_questions
                        JOIN trivia_answers ON trivia_questions.id = trivia_answers.question_id;`;
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
  // POST route code here
});

module.exports = router;