const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const cors = require('cors');

const configuration = new Configuration({
  organization: 'org-QyI4smLpMwBnzivq7VwKJr6O',
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(
  cors({
    origin: (origin, callback) => {
      if (true) {
        callback(null, true);
      }
    },
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.post('/', async (req, res) => {
  //res.send('Yes it works!');
  const { promps } = req.body;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: promps,
    max_tokens: 1000,
    temperature: 0,
  });

  res.send(response.data?.choices);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
