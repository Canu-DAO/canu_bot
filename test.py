import discord, json, os
from discord.ext import commands
from JuiceboxReader import JuiceboxReader
from web3 import Web3

with open ('config.json', 'r') as file:    
    w3 = Web3(Web3.HTTPProvider(json.load(file)["infura_url"]))
JBReader = JuiceboxReader()

server_data_path = 'resources/test_data.json'

### Bot settings
# Prefix
prefix = 'ct!'

help_command = commands.DefaultHelpCommand(
    no_category = 'Commands'
)

activity = discord.Game(name = prefix + 'help')
bot = commands.Bot(command_prefix=prefix, help_command=help_command, activity=activity)

with open('config.json', 'r') as file:
    auth = json.load(file)["test_key"]


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


@bot.event
async def on_ready():

    JBReader.start_events()
    print('ready')
    ## Start all alerts!
    cycle_ending.start()
    new_events.start()

for filename in os.listdir('./cogs'):
    if filename.endswith('.py'):
        bot.load_extension(f'cogs.{filename[:-3]}')

bot.run(auth)