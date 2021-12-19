import json
from database import Database

with open('resources/server_data.json', 'r') as file:
    data = json.load(file)

Database.initialize()
    
for server in data:
    query = {"server_id": int(server)}
    for x in Database.find('server_data', query):
        print(x['latest_block'])