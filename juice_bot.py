import discord, os
from discord.ext import commands
from JuiceboxReader import JuiceboxReader
from database import Database
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()
# Start Web3 interface using infura key from envornment.
w3 = Web3(Web3.HTTPProvider(os.environ["INFURA_URL"]))

# Get bot key from environment.
auth = os.environ["DISCORD_KEY"]
# Initialize an instance of JuiceboxReader
JBReader = JuiceboxReader()    

# Set Bot prefix
prefix = 'cn!'

# Set name for uncogged commands
help_command = commands.DefaultHelpCommand(
    no_category = 'Cog Management'
)

# Set status for the bot, showing how to run the help command
activity = discord.Game(name = prefix + 'help')

# Instantiate the bot
bot = commands.Bot(command_prefix=prefix, help_command=help_command, activity=activity)

### Cog loading and unloading
@bot.command()
async def load(ctx, extension):
    bot.load_extension(f'cogs.{extension}')
    await ctx.send(f'Modue {extension} loaded.')

@bot.command()
async def unload(ctx, extension):
    bot.unload_extension(f'cogs.{extension}')
    await ctx.send(f'Modue {extension} unloaded.')

@bot.command()
async def reload(ctx, extension):
    bot.unload_extension(f'cogs.{extension}')
    bot.load_extension(f'cogs.{extension}')
    await ctx.send(f'Modue {extension} reloaded.')

# Initialize MongoDB
Database.initialize()

# Load the core cogs (for now that is all cogs)
for filename in os.listdir('./cogs'):
    if filename.endswith('.py'):
        print(f'loading {filename}')
        bot.load_extension(f'cogs.{filename[:-3]}')

bot.run(auth)