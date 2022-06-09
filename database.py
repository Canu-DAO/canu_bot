import pymongo, os
from dotenv import load_dotenv

class Database(object):
    load_dotenv()
    url = os.environ["MONGO_URL"]
    database = None
    
    @staticmethod
    def initialize():
        client = pymongo.MongoClient(Database.url)
        Database.database = client['canuHelper']
    
    @staticmethod
    def insert_one(collection, data):
        Database.database[collection].insert_one(data)
        
    @staticmethod
    def find(collection, query):
        return Database.database[collection].find(query)
        
    @staticmethod
    def find_one(collection, query):
        return Database.database[collection].find_one(query)

    @staticmethod
    def update_one(collection, query, new_values):
        Database.database[collection].update_one(query, new_values)
