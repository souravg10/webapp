const express = require('express')
const pg = require('pg')
const app = express()
const path = require('path')
const port = 4567
module.exports = { port };
app.use(express.json())

const { Client } = pg
const client = new Client({
    user: 'sourav',
    host: 'localhost',
    database: 'testdb',
    password: 'pwd123',
    port: 5432,
})

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
    } catch (err) {
        console.error('Database connection error:', err.stack);
    }
}
connectToDatabase();

app.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/initiate', async (req, res) => {
  try {
    const totalQuery = 'SELECT COUNT(*) FROM questions';
    const totalResult = await client.query(totalQuery);
    const totalQuestions = parseInt(totalResult.rows[0].count);
    const data = {
        totalQuestions: totalQuestions
    }
    res.status(200).send(data);
} catch (err) {
    console.error('Error fetching total questions:', err.stack);
    res.status(500).send('Error fetching total questions');
  }
});

// Fetch a random question
app.get('/question', async (req, res) => {
  try {
    const questionId = parseInt(req.query.questionId, 10);
    const query = 'SELECT * FROM questions WHERE id = $1';
    const values = [questionId];
    const result = await client.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).send('Error: Question not found');
    }
    const question = result.rows[0];
    const data = {
      title: 'Quiz World!',
      selected: null,
      question: question.question,
      questionId: question.id,
      choices: [
        `A) ${question.option1}`,
        `B) ${question.option2}`,
        `C) ${question.option3}`,
        `D) ${question.option4}`
      ],
      answer: question.answer
    };

    res.status(200).send(data);
  } catch (err) {
    console.error('Error fetching question:', err.stack);
    res.status(500).send('Error fetching question');
  }
});

app.post('/recordAnswer', async (req, res) => {
  const { questionId, userAnswer, isCorrect } = req.body;

  if (!questionId || userAnswer == null || isCorrect == null) {
    return res.status(400).send('Error: "questionId", "userAnswer", and "isCorrect" fields are required');
  }

  try {
      const query = 'INSERT INTO answers (question_id, option, correct) VALUES ($1, $2, $3) RETURNING *';
      const values = [questionId, userAnswer, isCorrect];
      const result = await client.query(query, values);

      console.log('Inserted record:', result.rows[0]);
      res.status(200).send();
  } catch (err) {
      console.error('Error inserting record:', err.stack);
      res.status(500).send('Error checking answer');
  }

});


app.get('/style.css', function(req, res) {
  res.sendFile(path.join(__dirname + '/style.css'));
});

app.get('/app.js', function(req, res) {
  res.sendFile(path.join(__dirname + '/app.js'));
});

console.log(`PLANNING TO USE PORT: ${port}`)
app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}!`))
