const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    const queryText = `SELECT trivia_questions.question, trivia_answers.answer FROM trivia_questions
                        JOIN trivia_answers ON trivia_questions.id = trivia_answers.question_id;`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log('error in getting trivia from db');
    })
});


router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;