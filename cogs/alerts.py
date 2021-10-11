import discord, json
from discord.ext import commands, tasks
from JuiceboxReader import JuiceboxReader
from datetime import timedelta

server_data_path = 'resources/server_data.json'
JBReader = JuiceboxReader()

class Settings(commands.Cog):
    
    def __init__(self, client):
        self.client = client
        
    #@commands.Cog.listener() for events
    #@commands.command() for commands################
#### ALERTS ####
################


    @tasks.loop(seconds=300.0)
    async def new_events(self):
        with open(server_data_path, 'r') as file:
            server_data = json.load(file)

        for server in server_data:
            project_id = server_data[str(server)]['id']
            channel_id = server_data[str(server)]['alerts_channel']
            try:
                last_alerted_block = server_data[str(server)]['last_alerted_block'] 
                entries, latest_block = JBReader.get_new_events(project_id, last_alerted_block)
                if entries:
                    for entry in entries:
                        await self.client.get_channel(int(channel_id)).send(entry)
                
                server_data[str(server)]['last_alerted_block'] = latest_block  # Update the last_updated_block
            except:
                server_data[str(server)]['last_alerted_block'] = JBReader.get_latest_block()  # Update the last_updated_block
            with open(server_data_path, 'w') as file:
                json.dump(server_data, file, indent=4)
                
    @tasks.loop(seconds=60.0)
    async def cycle_ending(self):
        send = False

        with open(server_data_path, 'r') as file:
            server_data = json.load(file)

        for server in server_data:
            project_id = server_data[server]['id']
            channel_id = server_data[server]['alerts_channel']
            ## TODO: get role to be mentioned in/from server_data.json

            #dao_role = channel.server.roles.mention('name', 'dao')
            
            timeleft = JBReader.get_time_left(int(project_id))  

            if ((timeleft < timedelta(days=2)) and (server_data[server]["latest_warning"] == str(timedelta(hours=2)))):
                message = f'Attention! Current funding cycle ends in 2 days!'
                server_data[server]["latest_warning"] = str(timedelta(days=2))
                send = True

            if ((timeleft < timedelta(days=1)) and (server_data[server]["latest_warning"] == str(timedelta(days=2)))):
                message = f'Attention! Current funding cycle ends in 1 day!'
                server_data[server]["latest_warning"] = str(timedelta(days=1))
                send = True

            if ((timeleft < timedelta(hours=12)) and (server_data[server]["latest_warning"] == str(timedelta(days=1)))):
                message = f'Attention! Current funding cycle ends in 12 hours!'
                server_data[server]["latest_warning"] = str(timedelta(hours=12))
                send = True

            if ((timeleft < timedelta(hours=2)) and (server_data[server]["latest_warning"] == str(timedelta(hours=12)))):
                message = f'Attention! Current funding cycle ends in 2 hours!'
                server_data[server]["latest_warning"] = str(timedelta(hours=2))
                send = True
            
            if send:
                await self.client.get_channel(int(channel_id)).send(message)

            with open(server_data_path, 'w') as file:
                json.dump(server_data, file, indent=4)

    #@commands.Cog.listener() for events
    @commands.Cog.listener()
    async def on_ready(self):
        print('Initiating all events!')
        JBReader.start_events()
        ## Start all alerts!
        self.cycle_ending.start()
        self.new_events.start()
        print('Alerts cog has been loaded')

def setup(client):
    client.add_cog(Settings(client))