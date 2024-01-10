const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const cors = require('cors');
const markdownToJsx = require('markdown-to-jsx');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/chatbot', async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = req.body.prompt;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    console.log(text,"text")

    // Log the content of 'text'
    console.log('Original Markdown Content:', text);

    function formatBotReply(botReply) {
        // Replace triple backticks with an empty string
        let formattedText = botReply.replace(/```/g, '');
      
        // Replace double asterisks with bold tags
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
        // Replace single asterisks with emphasis tags
        formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
        return formattedText.trim();
      }
      
      const formattedBotReply = formatBotReply(text);
      console.log(formattedBotReply);
    

    res.json({ botReply: formattedBotReply });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
