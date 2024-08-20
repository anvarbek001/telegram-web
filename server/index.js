const TelegramBot = require('node-telegram-bot-api');
const token = '7517418643:AAH3mQ9gN33c35u149MAwdFYNJ1jbco-Wlc'

const bot = new TelegramBot(token,{polling:true});

const bootstrap = () => {
    bot.on('message',async msg => {
        const chatId = msg.chat.id
        const text = msg.text

        if(text === '/start'){
            await bot.sendMessage(
                chatId,
                'Platformamizdagi bor kurslarni sotib olishingiz mumkin',
                {reply_markup:{
                    keyboard:[
                        [
                            {
                                text:'Kurslarni korish',
                                web_app:{
                                    url:'https://sammi.ac',
                                }
                            }
                        ]
                    ]
                }}
            );
        }
    })
}

bootstrap();