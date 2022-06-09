import discord
from discord.ext import commands
from JuiceboxReader import JuiceboxReader
from database import Database

_collection = 'test_data'
JBReader = JuiceboxReader()

class Settings(commands.Cog):
    
    def __init__(self, client):
        self.client = client
    
    @commands.command(name='alerts_here', help='Sets the current channel as the alerts channel')
    #@commands.has_any_role('Admin', 'admin', 'canuDOERS', 'Juicer!', 'core', 'canu')
    async def set_alerts_channel(self, ctx):
        guild_id = ctx.guild.id
        data = Database.find(_collection, {'server_id': guild_id})
        
        if data.collection.count_documents({}) == 0:
            new_data = {}
            new_data['server_id'] = guild_id
            new_data['project_id'] = 0
            new_data['project_name'] = 'Placeholder'
            new_data['alerts_channel'] = int(ctx.channel.id)
            new_data['latest_block'] = JBReader.get_latest_block()
            new_data['cycle_warning'] = "2:00:00"
            Database.insert(_collection, new_data)
        else:
            Database.update_one(_collection, {'server_id': guild_id}, {'$set': {'alerts_channel': int(ctx.channel.id)}})

        await ctx.send(f'Set alerts to be sent in this channel.')
   

def setup(client):
    client.add_cog(Settings(client))