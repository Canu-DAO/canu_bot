import discord
from discord.ext import commands, tasks
from JuiceboxReader import JuiceboxReader
from datetime import datetime, timedelta
import json
from web3 import Web3

w3 = Web3(Web3.HTTPProvider('https://mainnet.infura.io/v3/98469dd384934368a686fd6818f97182'))
JBReader = JuiceboxReader()

server_data_path = 'resources/test_data.json'


### Bot settings
# Prefix
prefix = 'cn!'

help_command = commands.DefaultHelpCommand(
    no_category = 'Commands'
)

activity = discord.Game(name = prefix + 'help')
bot = commands.Bot(command_prefix=prefix, help_command=help_command, activity=activity)


# Bot commands
@bot.command(name='list', aliases=['l'], help= 'Lists available DAOs.')
async def list(ctx):
    with open('resources/id_to_name.json', 'r') as file:
        name_dict = json.load(file)  
    message = ""
    for key in name_dict:
        message += f'{name_dict[key]} \n'

    await ctx.send(message)

@bot.command(name='setdao', aliases=['set'], help = 'Set the dao for the server.')
#@commands.has_any_role('Admin', 'admin', 'canuDOERS', 'Juicer!', 'core', 'canu')
async def set_dao(ctx, project_name):
    try:

        with open(server_data_path, 'r') as file:
            server_data = json.load(file)

        new_data = {}   
        new_data["id"] = JBReader.id_from_name(project_name)
        new_data["name"] = project_name

        if str(ctx.guild.id) not in server_data:
            server_data[str(ctx.guild.id)] = {}

        server_data[str(ctx.guild.id)]['id'] = new_data['id']
        server_data[str(ctx.guild.id)]['name'] = new_data['name']

        with open(server_data_path, 'w') as file:
            json.dump(server_data, file, indent=4, sort_keys=True)            

        message = f'New DAO for the server is {project_name}.'
    except:
        message = f"Couldn't find DAO {project_name}."
    await ctx.send(message)

@bot.command(name='getdao', aliases=['get'], help = 'Get the name of the DAO.')
async def get_dao(ctx):
    with open(server_data_path, 'r') as file:
        server_data = json.load(file)
    project_id = int(server_data[str(ctx.guild.id)]["id"])
    message = f'The current DAO is {JBReader.get_dao_name(project_id)}'
    await ctx.send(message)


@bot.command(name='endcycle', aliases=['ec', 'end'], help = 'Tells you when the current funding cycle will end.')
async def end_cycle(ctx):
    with open(server_data_path, 'r') as file:
        server_data = json.load(file)
    project_id = int(server_data[str(ctx.guild.id)]["id"])
    message = "Cycle ends on: " + JBReader.get_cycle_end(project_id)
    
    await ctx.send(message)

@bot.command(name='timeleft', aliases=['tl', 'time'], help = 'Tells you the time remaining within the funding cycle.')
async def time_left(ctx):   
    with open(server_data_path, 'r') as file:
        server_data = json.load(file)
    
    project_id = int(server_data[str(ctx.guild.id)]["id"])
    message = f'Time left on this cycle: {str(JBReader.get_time_left(project_id))}'
    await ctx.send(message)

@bot.command(name='target', aliases=['tar', 't'], help = 'Tells you what is the funding target of the current cycle.')
async def curr_goal(ctx):
    with open(server_data_path, 'r') as file:
        server_data = json.load(file)
    project_id = int(server_data[str(ctx.guild.id)]["id"])
    message = f'Target for this cycle: {JBReader.get_cycle_target(project_id)}' 
    await ctx.send(message)

@bot.command(name='reserved', aliases=['rr', 'r'], help = 'Tells you the percentage of tokens that are reserved in each payment transaction in the current cycle.')
async def reserved_funds(ctx):
    with open(server_data_path, 'r') as file:
        server_data = json.load(file)
    project_id = int(server_data[str(ctx.guild.id)]["id"])
    message = f'Reserved rate for this cycle: {JBReader.get_cycle_reserved(project_id)}%'
    await ctx.send(message)

@bot.command(name='discount', aliases=['d', 'disc'], help = 'Tells you the discount rate set for the current cycle, this means how much the amount of tokens you get per ETH will decrease in the next cycle.')
async def discount_rate(ctx):
    with open(server_data_path, 'r') as file:
        server_data = json.load(file)

    discount_rate = JBReader.get_cycle_discount(int(server_data[str(ctx.guild.id)]["id"]))
    message = f'The current discount rate is {discount_rate}%, this means payment to the project will wieald {discount_rate}% less tokens in the next cycle.'
    await ctx.send(message)

@bot.command(name='bonding',aliases=['bc', 'bond'], help = 'Tells you the bonding curve set for the current cycle, this means for what percentage of their value tokens can be redeemed.')
async def bonding_curve(ctx):
    with open(server_data_path, 'r') as file:
        server_data = json.load(file)

    project_id = int(server_data[str(ctx.guild.id)]["id"])
    message = f'The Bonding Curve set for the current cycle is {JBReader.get_cycle_bonding(project_id)}%'
    await ctx.send(message)

@bot.command(name='balance', aliases=['b', 'bal'], help = 'Tells you how much the DAO has in treasury at the moment, both in USD and ETH.')
async def treasury(ctx):
    with open(server_data_path, 'r') as file:
        server_data = json.load(file)

    project_id = int(server_data[str(ctx.guild.id)]["id"])
    dao_name = JBReader.get_dao_name(project_id)         
    
    raw_balance = (JBReader.get_balance(project_id))
    balance_formatter = (JBReader.prices.functions.getETHPriceFor(JBReader.funding_cycles.functions.currentOf(project_id).call()[11]).call()//10**18)
    treasury_amount = raw_balance * balance_formatter

    if (JBReader.funding_cycles.functions.currentOf(project_id).call()[11] != 0):
        decorator = '$'
    else:
        decorator = 'ETH'

    treasury_amount = f"{str(treasury_amount).split('.')[0]}.{str(treasury_amount).split('.')[1][:5]}"
    message = f'The {dao_name} treasury holds {decorator}{treasury_amount}'
    await ctx.send(message)

@bot.command(name='alerts_here', help='Sets the current channel as the alerts channel')
#@commands.has_any_role('Admin', 'admin', 'canuDOERS', 'Juicer!', 'core', 'canu')
async def set_alerts_channel(ctx):
    with open(server_data_path, 'r') as file:
        server_data = json.load(file)
    
    if str(ctx.guild.id) not in server_data:
        new_data = {}
        new_data['alerts_channel'] = str(ctx.channel.id)
        server_data[str(ctx.guild.id)] = new_data
    else:
        server_data[str(ctx.guild.id)]['alerts_channel'] = str(ctx.channel.id)

    with open(server_data_path, 'w') as file:
        json.dump(server_data, file, indent=4, sort_keys=True)

    await ctx.send(f'Set alerts to be sent in this channel.')


################
#### ALERTS ####
################

@tasks.loop(seconds=300.0)
async def new_events():
    with open(server_data_path, 'r') as file:
        server_data = json.load(file)

    for server in server_data:
        project_id = server_data[str(server)]['id']
        channel_id = server_data[str(server)]['alerts_channel']
        entries = JBReader.get_new_events(project_id)
        if entries:
            for entry in entries:
                await bot.get_channel(int(channel_id)).send(entry)
            
@tasks.loop(seconds=60.0)
async def cycle_ending():
    send = False

    with open(server_data_path, 'r') as file:
        server_data = json.load(file)

    for server in server_data:
        project_id = server_data[server]['id']
        channel_id = server_data[server]['alerts_channel']

        ## TODO: get role to be mentioned in/from server_data.json

        dao_role = msg.channel.server.roles.mention('name', 'dao')
        
        timeleft = JBReader.get_time_left(int(project_id))  

        if ((timeleft < timedelta(days=2)) and (server_data[server]["latest_warning"] == str(timedelta(hours=2)))):
            message = f'Attention {dao_role.mention()}. Current funding cycle ends in 2 days!'
            server_data[server]["latest_warning"] = str(timedelta(days=2))
            send = True

        if ((timeleft < timedelta(days=1)) and (server_data[server]["latest_warning"] == str(timedelta(days=2)))):
            message = f'Attention {dao_role.mention()}. Current funding cycle ends in 1 day!'
            server_data[server]["latest_warning"] = str(timedelta(days=1))
            send = True

        if ((timeleft < timedelta(hours=12)) and (server_data[server]["latest_warning"] == str(timedelta(days=1)))):
            message = f'Attention {dao_role.mention()}. Current funding cycle ends in 12 hours!'
            server_data[server]["latest_warning"] = str(timedelta(hours=12))
            send = True

        if ((timeleft < timedelta(hours=2)) and (server_data[server]["latest_warning"] == str(timedelta(hours=12)))):
            message = f'Attention {dao_role.mention()}. Current funding cycle ends in 2 hours!'
            server_data[server]["latest_warning"] = str(timedelta(hours=2))
            send = True
        
        if send:
           await bot.get_channel(int(channel_id)).send(message)

    with open(server_data_path, 'w') as file:
        json.dump(server_data, file, indent=4)

@bot.event
async def on_ready():

    JBReader.start_events()

    ## Start all alerts!
    cycle_ending.start()
    new_events.start()



bot.run('')