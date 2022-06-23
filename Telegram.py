import telebot
from dotenv import load_dotenv
class TelegramBot():

    def __init__(self):
        load_dotenv()
        self.bot = telebot.TeleBot(os.environ["TELEGRAM_KEY"], parse_mode=None)


    def message_channel(self, channel, message):
        self.bot.send_message(chat_id=channel, text=message)