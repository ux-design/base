const { TelegramClient } = require('messaging-api-telegram');

// get accessToken from telegram [@BotFather](https://telegram.me/BotFather)
const TOKEN = '367870654:AAHcArayj1y_8JbnJWGl0jj6b6PNVU0cNUk';
const SERVER = '149.154.167.50';
const CHAT_ID = '101';
const client = TelegramClient.connect('367870654:AAHcArayj1y_8JbnJWGl0jj6b6PNVU0cNUk');
// client.setWebhook('https://api.telegram.org/bot'+TOKEN+'')
//     .then(result=>{console.log(result)})
client.getWebhookInfo()
    .then(result=>{console.log(result)});

console.log('++++++++++++++++++++++++++++++++++++')
// client.sendMessage(CHAT_ID, 'hi', {
//     disable_web_page_preview: true,
//     disable_notification: true,
// })
//     .then(result=>{console.log(result)})
//     .catch(err=>{console.log(err)});