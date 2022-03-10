const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()

const text = require('./constans')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(ctx => {
  ctx.replyWithHTML(`<i> Привет, ${ctx.message.from.first_name}.Я бот Academy Ogogo. Через пару секунд я пприщлю тебе набор команд для взаимоедействие со мной ... $</i> `)
  setTimeout(() => {
    ctx.reply(text.commands)
  }, 2000 )
})

bot.help(ctx => ctx.reply(text.commands))





//Пишим обработчика

bot.command('course', async ctx => {
  console.log(text)
  await ctx.replyWithHTML(
    '<b>Наши курсы</b>',
    Markup.inlineKeyboard(
      [
        [
          Markup.button.callback('UX/UI', 'btn_ux'),
          Markup.button.callback('HTML', 'btn_html'),
          Markup.button.callback('javascript', 'btn_javascript')
        ]
      ]
    )
  )
})

// Обработчик

const handlerAction = ( btnName, photo, txt) => {
  bot.action(btnName,  async ctx => {
  try {
    await ctx.answerCbQuery()
    if (photo !== false) {
      await ctx.replyWithPhoto({
        source: photo, 
      })
    }
    await ctx.replyWithHTML(txt)
  } catch (e) {
    console.error(e);
  }
})
}

handlerAction(`btn_ux`, `./img/1.jpg`, text.myTxt1)
handlerAction(`btn_html`, `./img/3.jpg`, text.myTxt2)
handlerAction(`btn_javascript`, `./img/2.jpg`, text.myTxt3)

//Start
bot.launch()