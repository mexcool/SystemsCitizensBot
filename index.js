var TelegramBot = require('node-telegram-bot-api');
var Promise = require('bluebird');
var telegramToken = "282721404:AAEceceIPunZtUjVZ1bqMI_t8RdY8h1uWUU";

var Q = require('Q');
var request = Q.denodeify(require("request"));

var options = {
  polling: {
    interval: 5000,
    timeout: 20
  }
};

var bot = new TelegramBot(telegramToken, options); // creating an object

// function is a callback
bot.onText(/^\/echo\s(.+)/i, function (msg, match) {
    var reply = match[1];
    var replyChatId = msg.chat.id;
    bot.sendMessage(replyChatId, reply);
});

bot.onText(/\/weather (.+)/, function (msg, match) {
  var fromId = msg.from.id; // get the id, of who is sending the message
  var postcode = match[1];
  getWeatherData(postcode)
  .then(function(data){
    var message = "Weather today in "+postcode+"\n";
    message += data.wx_desc+"\n"
    message += "temp: "+data.temp_c+"C or "+data.temp_f+"F"
    bot.sendMessage(fromId, message);
  });

});

function getWeatherData(postcode){
  var app_id = "72f3b159"
  var app_key = "1c3b9261391b3370acb608a46b8ccb64"
  var url = "http://api.weatherunlocked.com/api/current/us."+postcode
  url += "?app_id="+app_id+"&app_key="+app_key

  var options ={
      url: url,
      method: "GET",
      json:true,
    }
    var response = request(options);
    return response.then(function (r){
        return r[0].body
    })
}
