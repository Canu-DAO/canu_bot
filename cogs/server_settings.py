import discord, json
from discord.ext import commands
from JuiceboxReader import JuiceboxReader


server_data_path = 'resources/server_data.json'
JBReader = JuiceboxReader()

class Settings(commands.Cog):
    
    def __init__(self, client):
        self.client = client
    
    @commands.command(name='alerts_here', help='Sets the current channel as the alerts channel')
    #@commands.has_any_role('Admin', 'admin', 'canuDOERS', 'Juicer!', 'core', 'canu')
    async def set_alerts_channel(self, ctx):
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
   

def setup(client):
    client.add_cog(Settings(client))