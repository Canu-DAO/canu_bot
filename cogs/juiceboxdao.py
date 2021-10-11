import discord, json
from discord.ext import commands
from JuiceboxReader import JuiceboxReader


server_data_path = 'resources/server_data.json'
JBReader = JuiceboxReader()

class JuiceboxDAO(commands.Cog):
    
    def __init__(self, client):
        self.client = client
        
    #@commands.Cog.listener() for events
    #@commands.command() for commands
    
    @commands.command(name='endcycle', aliases=['ec', 'end'], help = 'Tells you when the current funding cycle will end.')
    async def end_cycle(self, ctx):
        with open(server_data_path, 'r') as file:
            server_data = json.load(file)
        project_id = int(server_data[str(ctx.guild.id)]["id"])
        message = "Cycle ends on: " + JBReader.get_cycle_end(project_id)
        
        await ctx.send(message)

    @commands.command(name='timeleft', aliases=['tl', 'time'], help = 'Tells you the time remaining within the funding cycle.')
    async def time_left(self, ctx):   
        with open(server_data_path, 'r') as file:
            server_data = json.load(file)
        
        project_id = int(server_data[str(ctx.guild.id)]["id"])
        message = f'Time left on this cycle: {str(JBReader.get_time_left(project_id))}'
        await ctx.send(message)

    @commands.command(name='target', aliases=['tar', 't'], help = 'Tells you what is the funding target of the current cycle.')
    async def curr_goal(self, ctx):
        with open(server_data_path, 'r') as file:
            server_data = json.load(file)
        project_id = int(server_data[str(ctx.guild.id)]["id"])
        message = f'Target for this cycle: {JBReader.get_cycle_target(project_id)}' 
        await ctx.send(message)

    @commands.command(name='reserved', aliases=['rr', 'r'], help = 'Tells you the percentage of tokens that are reserved in each payment transaction in the current cycle.')
    async def reserved_funds(self, ctx):
        with open(server_data_path, 'r') as file:
            server_data = json.load(file)
        project_id = int(server_data[str(ctx.guild.id)]["id"])
        message = f'Reserved rate for this cycle: {JBReader.get_cycle_reserved(project_id)}%'
        await ctx.send(message)

    @commands.command(name='discount', aliases=['d', 'disc'], help = 'Tells you the discount rate set for the current cycle, this means how much the amount of tokens you get per ETH will decrease in the next cycle.')
    async def discount_rate(self, ctx):
        with open(server_data_path, 'r') as file:
            server_data = json.load(file)

        discount_rate = JBReader.get_cycle_discount(int(server_data[str(ctx.guild.id)]["id"]))
        message = f'The current discount rate is {discount_rate}%, this means payment to the project will wieald {discount_rate}% less tokens in the next cycle.'
        await ctx.send(message)

    @commands.command(name='bonding',aliases=['bc', 'bond'], help = 'Tells you the bonding curve set for the current cycle, this means for what percentage of their value tokens can be redeemed.')
    async def bonding_curve(self, ctx):
        with open(server_data_path, 'r') as file:
            server_data = json.load(file)


        project_id = int(server_data[str(ctx.guild.id)]["id"])
        message = f'The Bonding Curve set for the current cycle is {JBReader.get_cycle_bonding(project_id)}%'
        await ctx.send(message)
    
    @commands.command(name='setdao', aliases=['set'], help = 'Set the dao for the server.')
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
        
    @commands.command(name='getdao', aliases=['get'], help = 'Get the name of the DAO.')
    async def get_dao(ctx):
        with open(server_data_path, 'r') as file:
            server_data = json.load(file)
        project_id = int(server_data[str(ctx.guild.id)]["id"])
        message = f'The current DAO is {JBReader.get_dao_name(project_id)}'
        await ctx.send(message)

    @commands.command(name='balance', aliases=['b', 'bal'], help = 'Tells you how much the DAO has in treasury at the moment, both in USD and ETH.')
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

    @commands.command(name='list', aliases=['l'], help= 'Lists available DAOs.')
    async def list(ctx):
        with open('resources/id_to_name.json', 'r') as file:
            name_dict = json.load(file)  
        message = ""
        for key in name_dict:
            message += f'{name_dict[key]} \n'

        await ctx.send(message)

def setup(client):
    client.add_cog(JuiceboxDAO(client))