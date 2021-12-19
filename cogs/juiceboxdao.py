from typing_extensions import final
import discord, json
from discord.ext import commands
from JuiceboxReader import JuiceboxReader
from database import Database

_collection = 'server_data'
JBReader = JuiceboxReader()

class JuiceboxDAO(commands.Cog):
    
    def __init__(self, client):
        self.client = client
        
    #@commands.Cog.listener() for events
    #@commands.command() for commands
    
    @commands.command(name='endcycle', aliases=['ec', 'end'], help = 'Tells you when the current funding cycle will end.')
    async def end_cycle(self, ctx):
        data = Database.find_one(_collection, {'server_id': ctx.guild.id})        
        project_id = data['project_id']
                
        message = "Cycle ends on: " + JBReader.get_cycle_end(project_id)
        _embed = discord.Embed(
            title="Cycle ending:", 
            description=f"{message}"
            )
        _embed.set_thumbnail(url=JBReader.get_logo(project_id))  
        await ctx.send(embed=_embed)

    @commands.command(name='timeleft', aliases=['tl', 'time'], help = 'Tells you the time remaining within the funding cycle.')
    async def time_left(self, ctx):   
        data = Database.find_one(_collection, {'server_id': ctx.guild.id})        
        project_id = data['project_id']
        
        message = f'Time left on this cycle: {str(JBReader.get_time_left(project_id))}'
        _embed = discord.Embed(
            title="Timeleft", 
            description=f"{message}"
            )
        _embed.set_thumbnail(url=JBReader.get_logo(project_id))  
        await ctx.send(embed=_embed)

    @commands.command(name='target', aliases=['tar', 't'], help = 'Tells you what is the funding target of the current cycle.')
    async def curr_goal(self, ctx):
        data = Database.find_one(_collection, {'server_id': ctx.guild.id})        
        project_id = data['project_id']
        
        target_amnt = "{:,.2f}".format(float(JBReader.get_cycle_target(project_id)) )
        
        if (JBReader.funding_cycles.functions.currentOf(project_id).call()[11] != 0):
            decorator = '$'
        else:
            decorator = 'Ξ'
        
        message = f'Target for this cycle: {decorator}{target_amnt}' 
        _embed = discord.Embed(
            title="Funding target", 
            description=f"{message}"
            )
        _embed.set_thumbnail(url=JBReader.get_logo(project_id))  
        await ctx.send(embed=_embed)

    @commands.command(name='reserved', aliases=['rr', 'r'], help = 'Tells you the percentage of tokens that are reserved in each payment transaction in the current cycle.')
    async def reserved_funds(self, ctx):
        data = Database.find_one(_collection, {'server_id': ctx.guild.id})        
        project_id = data['project_id']
        message = f'Reserved rate for this cycle: {JBReader.get_cycle_reserved(project_id)}%'
        _embed = discord.Embed(
            title="Reserved tokens", 
            description=f"{message}"
            )
        _embed.set_thumbnail(url=JBReader.get_logo(project_id))  
        await ctx.send(embed=_embed)
        
    @commands.command(name='discount', aliases=['d', 'disc'], help = 'Tells you the discount rate set for the current cycle, this means how much the amount of tokens you get per ETH will decrease in the next cycle.')
    async def discount_rate(self, ctx):        
        data = Database.find_one(_collection, {'server_id': ctx.guild.id})        
        project_id = data['project_id']
        
        discount_rate = JBReader.get_cycle_discount(project_id)
        
        message = f'The current discount rate is {discount_rate}%, this means payment to the project will wieald {discount_rate}% less tokens in the next cycle.'
        _embed = discord.Embed(
            title="Discount rate", 
            description=f"{message}"
            )
        _embed.set_thumbnail(url=JBReader.get_logo(project_id))  
        await ctx.send(embed=_embed)
        
    @commands.command(name='bonding',aliases=['bc', 'bond'], help = 'Tells you the bonding curve set for the current cycle, this means for what percentage of their value tokens can be redeemed.')
    async def bonding_curve(self, ctx):
        data = Database.find_one(_collection, {'server_id': ctx.guild.id})        
        project_id = data['project_id']
        
        message = f'The Bonding Curve set for the current cycle is {JBReader.get_cycle_bonding(project_id)}%'
        
        _embed = discord.Embed(
            title="Bonding Curve", 
            description=f"{message}"
            )
        _embed.set_thumbnail(url=JBReader.get_logo(project_id))  
        await ctx.send(embed=_embed)    
        
    @commands.command(name='setdao', aliases=['set'], help = 'Set the dao for the server.')
    #@commands.has_any_role('Admin', 'admin', 'canuDOERS', 'Juicer!', 'core', 'canu')
    async def set_dao(self, ctx, project_name):        
        data = Database.find_one(_collection, {'server_id': ctx.guild.id})
        
        if data:
            try:
                id = int(JBReader.id_from_name(project_name))
                Database.update_one(_collection, {'server_id': data['server_id']}, 
                                    {'$set': {
                                        'project_id': id,
                                        'project_name': project_name}})
                message = f'New DAO for the server is {project_name}.'

            
            except:
                message = f"Couldn't find DAO {project_name}."
        else:
            try:
                id = int(JBReader.id_from_name(project_name))
                
                new_data = {}
                new_data['server_id'] = ctx.guild.id
                new_data['project_id'] = id
                new_data['project_name'] = project_name
                new_data['alerts_channel'] = 99999999
                new_data['latest_block'] = JBReader.get_latest_block()
                new_data['cycle_warning'] = "2:00:00"
                Database.insert(_collection, new_data)

                message = f'New DAO for the server is {project_name}.'
            except:
                message = f"Couldn't find DAO {project_name}."

        _embed = discord.Embed(
        title="New DAO", 
        description=f"{message}"
        )
        try:
            _embed.set_thumbnail(url=JBReader.get_logo(id))
        except Exception as e:
            pass
        finally:
            await ctx.send(embed=_embed)  
              
    @commands.command(name='getdao', aliases=['get'], help = 'Get the name of the DAO.')
    async def get_dao(self, ctx):
        data = Database.find_one(_collection, {'server_id': ctx.guild.id})        
        project_id = data['project_id']
        
        message = f"The current DAO is {data['project_name']}"
        
        _embed = discord.Embed(
            title="Current DAO", 
            description=f"{message}"
            )
        _embed.set_thumbnail(url=JBReader.get_logo(project_id))  
        await ctx.send(embed=_embed)  

    @commands.command(name='balance', aliases=['b', 'bal'], help = 'Tells you how much the DAO has in treasury at the moment, both in USD and ETH.')
    async def treasury(self, ctx):        
        data = Database.find_one(_collection, {'server_id': ctx.guild.id})        
        project_id = int(data['project_id'])
        dao_name = data['project_name']
        
        raw_balance = (JBReader.get_balance(project_id))
        balance_formatter = (JBReader.prices.functions.getETHPriceFor(JBReader.funding_cycles.functions.currentOf(project_id).call()[11]).call()//10**18)
        treasury_amount = "{:,.2f}".format(raw_balance * balance_formatter)
        

        if (JBReader.funding_cycles.functions.currentOf(project_id).call()[11] != 0):
            decorator = '$'
        else:
            decorator = 'Ξ'

        message = f'The {dao_name} treasury holds {decorator}{treasury_amount}'
        
        _embed = discord.Embed(
            title="Treasury", 
            description=f"{message}"
            )
        _embed.set_thumbnail(url=JBReader.get_logo(project_id))  
        await ctx.send(embed=_embed)  
        
    @commands.command(name='list', aliases=['l'], help= 'Lists available DAOs.', hidden=True)
    async def list(self, ctx):
        name_list = []
        for i in range (1, int(JBReader.get_count()+1)):
            name_list.append(JBReader.get_dao_name(i))
            
        message = ""
        for name in name_list:
            message += f'{name}\n'

        _embed = discord.Embed(
            title="Available DAOs", 
            description=f"{message}"
            )
        _embed.set_thumbnail(url=JBReader.get_logo(1))  
        await ctx.send(embed=_embed)  
        
def setup(client):
    client.add_cog(JuiceboxDAO(client))