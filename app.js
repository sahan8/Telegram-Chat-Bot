//requiring express,telegrambot,openai,telegram_token and linked dotenv file
const express = require('express');
const app = express();
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const openAi = require('openai');
const apiKey = process.env.OPENAI_API_KEY;
const openai = new openAi({ key: apiKey });

const token = process.env.TG_BOT_TOKEN; //dotenv file linked


const bot = new TelegramBot(token, { polling: true });//


bot.on('message', async (msg) => {
  const userMsg = msg.text;

  //bot commands
  if (userMsg.startsWith('/start')) {
   
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to the chat bot! Let\'s chat 😊');
  }else if(userMsg.startsWith('/help')){
    const chatId = msg.chat.id;

    bot.sendMessage(
      chatId,
      '🔥 Commands \n /start - start the bot \n /help - get instructions for using the chat bot \n /developer - contact me'
    );
  } else if(userMsg.startsWith('/developer')){
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, '🔥 Developed by sahan escobar \n 🔥 Contact me @InduwarKD');

  }else {
    // User sent a regular message, send it to GPT 

    //api header
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are helpful assistant' },
        
        { role: 'user', content: userMsg }
      ],
      
      model: 'gpt-3.5-turbo',
    });
//response for user
    const aiResponse = completion.choices[0].message.content;
    const chatId = msg.chat.id;


    bot.sendMessage(chatId, aiResponse);

    
    
  }
});


app.listen(7740, () => {
  console.log('App is listening on port 7740');
});
