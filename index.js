var TelegramBot = require('node-telegram-bot-api');
var Promise = require('bluebird');
var telegramToken = "282721404:AAEceceIPunZtUjVZ1bqMI_t8RdY8h1uWUU"

var options = {
  polling: {
    interval: 5000,
    timeout: 20
  }
};

var bot = new TelegramBot(telegramToken, options); // creating an object

// onText is a callback
bot.onText(/^\/echo\s(.+)/i, function (msg, match) { 
    var reply = match[1];
    var replyChatId = msg.chat.id;
    bot.sendMessage(replyChatId, reply);
});