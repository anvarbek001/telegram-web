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
                                    url:'https://telegram-web-bot-two.vercel.app/',
                                }
                            }
                        ]
                    ]
                }}
            );
        }

        if(msg.web_app_data?.data){
            try {
                const data = JSON.parse(msg.web_app_data?.data)

                await bot.sendMessage(chatId,"Bizga ishonch bildirganingiz uchun raxmat!,siz sotib olgan kurslarning ro'yxati")

                for(item of data){
                    await bot.sendMessage(chatId,`${item.title} - ${item.quantity}`)
                }

                await bot.sendMessage(chatId,`Umumiy narx-${data.reduce((a,c) => a + c.price * c.quantity,0)}`)
            } catch (error) {
                console.log(error);
            }
        }
    })
}

bootstrap();