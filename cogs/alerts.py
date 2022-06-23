import sys, os, logging, discord
from Telegram import TelegramBot
from logging.handlers import RotatingFileHandler
from discord.ext import commands, tasks
from datetime import time, timedelta, datetime
import requests

# Adds parent directory to path, so we can import JuiceboxReader
curr = os.path.dirname(os.path.realpath(__file__))
parent = os.path.dirname(curr)
sys.path.append(parent)

from JuiceboxReader import JuiceboxReader
from database import Database

_collection = 'test_data'
JBReader = JuiceboxReader()
TeleBot = TelegramBot()

## Logger config, with a rotating file system for both errors and normal operation.
logger = logging.getLogger('root')
logger.setLevel(logging.INFO)

log_format = logging.Formatter('%(asctime)s.%(msecs)03d ALERTS_MODULE:%(levelname)s:%(message)s')

info_handler = RotatingFileHandler(filename='logs/helper.log', maxBytes=100*1024, backupCount=2)
info_handler.setFormatter(log_format)
info_handler.setLevel(logging.INFO)

error_handler = RotatingFileHandler(filename='logs/helper.err', maxBytes=100*1024, backupCount=2)
info_handler.setFormatter(log_format)
error_handler.setLevel(logging.ERROR)

logger.addHandler(info_handler)
logger.addHandler(error_handler)

# Cog for alerts
class Alerts(commands.Cog):  
    
    # Sets the upper level client as well as starting the threads.  
    def __init__(self, client):
        self.client = client
        self.telegram_chat = "-1001715810150"
        
        self.cycle_ending.start()
        self.new_events.start()
        logger.info('All set up!')
        
    # Sends a short notice on telegram
    def telegram_message(self, entry, project_id, version):
        
        if (entry[0] == 'pay'):
            try:
                _note = entry[3].replace('\x00', '')     
            except:
                _note = ''
            finally:                 
                raw_balance = (JBReader.get_balance(project_id, version))
                balance_formatter = (JBReader.contracts['v1']['prices'].functions.getETHPriceFor(JBReader.contracts[version]['funding_cycles'].functions.currentOf(project_id).call()[11]).call()//10**18)
                treasury_amount = "{:,.2f}".format(raw_balance * balance_formatter)       
                if (JBReader.contracts[version]['funding_cycles'].functions.currentOf(project_id).call()[11] != 0):
                    decorator = '$'
                else:
                    decorator = 'Ξ'
                balance = f'{decorator}{treasury_amount}'                
                
                message = f"New Payment\n\n{_note}\nAmount: Ξ{entry[2]}\nSent by: {entry[1]}\n\nNew balance: {balance}"
                TeleBot.message_channel(self.telegram_chat, message)
        elif (entry[0] == 'redeem'):
            pass
            # embed = discord.Embed(
            #     title="Tokens Redeemed",
            #     color= discord.Color.purple()
            #     )
            # embed.add_field(name="Ether redeemed", value=f"{entry[2]}", inline=False)
            # embed.add_field(name="Amount of Tokens", value=f"{entry[3]}", inline=False)
            # embed.add_field(name="Redeemed by", value=f"{entry[1]}", inline=False)
            # return embed
        elif (entry[0] == 'tap'):
            pass

    # Formats any event that comes in from new_events()
    def format_entry(self, entry, project_id, version):
        version = entry[-1]

        if (entry[0] == 'pay'):
            try:
                _note = entry[3].replace('\x00', '')     
            except:
                _note = ''
            finally: 
                embed = discord.Embed(
                    title="New Payment", 
                    description=f"{_note}",
                    color= discord.Color.purple()
                    )
                embed.add_field(name="Amount", value=f"Ξ{entry[2]}", inline=False)
                embed.add_field(name="Sent by", value=f"{entry[1]}", inline=False)
                
                raw_balance = (JBReader.get_balance(project_id, version))
                balance_formatter = (JBReader.contracts['v1']['prices'].functions.getETHPriceFor(JBReader.contracts[version]['funding_cycles'].functions.currentOf(project_id).call()[11]).call()//10**18)
                treasury_amount = "{:,.2f}".format(raw_balance * balance_formatter)       

                if (JBReader.contracts[version]['funding_cycles'].functions.currentOf(project_id).call()[11] != 0):
                    decorator = '$'
                else:
                    decorator = 'Ξ'
                balance = f'{decorator}{treasury_amount}'                
                
                embed.add_field(name="New Balance", value=balance)
                return embed
        elif (entry[0] == 'redeem'):
            embed = discord.Embed(
                title="Tokens Redeemed",
                color= discord.Color.purple()
                )
            embed.add_field(name="Ether redeemed", value=f"{entry[2]}", inline=False)
            embed.add_field(name="Amount of Tokens", value=f"{entry[3]}", inline=False)
            embed.add_field(name="Redeemed by", value=f"{entry[1]}", inline=False)
            return embed
        elif (entry[0] == 'tap'):
            embed = discord.Embed(
                title="Distributed Funds",
                color= discord.Color.purple()
                )
            embed.add_field(name="Amount payed", value=f"{entry[2]}", inline=False)
            embed.add_field(name="Total payed this cycle", value=f"{entry[3]}", inline=False)
            embed.add_field(name="Signed by", value=f"{entry[1]}", inline=False)
        return embed

    def check_timeout(self, timeout):
        time_last_event = (datetime.now() - datetime.fromtimestamp(timeout['timestamp']))
        if (time_last_event.days < 14):
            logger.info('Recent events found!')
            return True
        else:
            if datetime.now().hour == 0:
                return True
            return False

    async def try_alerting(self, project_id, alerts_channel, server, version, data_block):
        logger.info(f'Checking for entries in {version}-{project_id}')
        entries, latest_block = JBReader.get_new_events(project_id, int(data_block), version)
        if entries:
            logger.info('Found entries.')
            Database.update_one('project_timeout', {'version': version, 'project_id': project_id}, { '$set': {'timestamp': datetime.timestamp(datetime.now())}})

            for entry in entries:
                pretty_message = self.format_entry(entry, project_id, version) 
                #pretty_message.set_thumbnail(url=JBReader.get_logo(project_id, version))  
                pretty_message.add_field(name="DAO", value=str(JBReader.get_dao_name(project_id, version)))
        
                try:
                    logger.info('Trying to send.')
                    await self.client.wait_until_ready() # This step is necessary to make sure the bot is ready to send
                    
                    #channel = self.client.get_channel(int(channel_id))
                    channel = self.client.get_channel(int('875439504096391181'))
                    await channel.send(embed=pretty_message)                    
                   
                    logger.info(f'Sent {entry[0]} in {server}')
               
                except Exception as e:          
                    logger.error(f'Failed to send {entry[0]} to {server}')
                    logger.error(e)

                finally:                
                    self.telegram_message(entry, project_id, version)
        
        else:
            logger.info(f'No new entries for {JBReader.get_dao_name(project_id, version)}')
        
        return latest_block
        

    # Looks for new events every 15 minutes and sends them on discord
    @tasks.loop(seconds=900.0)
    async def new_events(self): 

        data = Database.find(_collection, {})
        for document in data:
            server = document['server_id']                   
            logger.info(f"Checking for events in {server}")
            if (int(server) == 775859454780244028 or int(server) == 875439504096391178): # If server = JuiceboxDAO 
                try:
                    for v in ['v1', 'v2']:
                        for i in range(1, int(JBReader.get_count(v))+1): # Instead of project_id, we are going to get all projects
                            timeout = Database.find_one('project_timeout', {'project_id': i, 'version': v}) 
                            if(self.check_timeout(timeout)):
                                latest_block =  await self.try_alerting(i, document['alerts_channel'],
                                                    document['server_id'], v, document['latest_block'])  
                            else:
                                continue
                
                    Database.update_one(_collection, {'server_id' : server}, { '$set': {'latest_block':latest_block}})

                except Exception as e:
                    logger.error(e)
                    Database.update_one(_collection, {'server_id' : server}, { '$set': {'latest_block':JBReader.get_latest_block()}})  # Update the last_updated_block
            else:
                try:
                    latest_block =  await self.try_alerting(document['project_id'], document['alerts_channel'],
                                        document['server_id'], document['version'] , document['latest_block'])  
                    
                    Database.update_one(_collection, {'_id': document['_id']}, { '$set': {'latest_block':latest_block}})# Update the last_updated_block
                
                except Exception as e:
                    logger.error(e)
                    Database.update_one(_collection, {'_id': document['_id']}, { '$set': {'latest_block':JBReader.get_latest_block()}})  # Update the last_updated_block

    # Checks if the cycle passed a threshold, every five minutes.
    @tasks.loop(seconds=7200.0)
    async def cycle_ending(self):
        data = Database.find(_collection, {})

        for document in data:
            send = False
            server = document['server_id']
            project_id = document['project_id']
            channel_id = document['alerts_channel']
            logger.info(f'Checking cycle ending for {server}')
            
            ## TODO: get role to be mentioned in server from database (@DAO)
            
            timeleft = JBReader.get_time_left(int(project_id))  
            logger.info(f'Checking EOC for {project_id} on {server}: {timeleft}')
            if (timeleft < timedelta(hours=2)):
                if (document['cycle_warning'] == str(timedelta(hours=12))):
                    message = f'Attention! Current funding cycle ends in 2 hours!'
                    Database.update_one(_collection, {'_id': document['_id']}, {'$set': {'cycle_warning':str(timedelta(hours=2))}})
                    send = True
            
            elif (timeleft < timedelta(hours=12)):
                if (document['cycle_warning'] == str(timedelta(days=1))):
                    message = f'Attention! Current funding cycle ends in 12 hours!'
                    Database.update_one(_collection, {'_id': document['_id']}, {'$set': {'cycle_warning':str(timedelta(hours=12))}})
                    send = True           

            elif (timeleft < timedelta(days=1)):
                if (document['cycle_warning'] == str(timedelta(days=2))):
                    message = f'Attention! Current funding cycle ends in 1 day!'
                    Database.update_one(_collection, {'_id': document['_id']}, {'$set': {'cycle_warning': str(timedelta(days=1))}}) 
                    send = True
            
            elif (timeleft < timedelta(days=2)):
                if (document['cycle_warning'] == str(timedelta(hours=2))):
                    message = f'Attention! Current funding cycle ends in 2 days!'
                    Database.update_one(_collection, {'_id': document['_id']}, {'$set': {'cycle_warning': str(timedelta(days=2))}})
                    send = True
           
            if send:
                logger.info(f"sending EOC for {project_id}: {timeleft}:::{document['cycle_warning']}")
                pretty_message = discord.Embed(
                    title = "Funding Cycle Ending",
                        description=message
                )
                
                try:
                    await self.client.get_channel(int(channel_id)).send(embed=pretty_message)
                    logger.info(f"cycle: {message}")
                except Exception as e:
                    logger.error(f'cycle: {message}')
                    logger.error(e)

     
def setup(client):
    client.add_cog(Alerts(client))
