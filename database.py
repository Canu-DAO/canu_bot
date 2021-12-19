import pymongo, os

class Database(object):
    url = os.environ["MONGO_URL"]
    database = None
    
    @staticmethod
    def initialize():
        client = pymongo.MongoClient(Database.url)
        Database.database = client['canuHelper']
    
    @staticmethod
    def insert(collection, data):
        Database.database[collection].insert(data)
        
    @staticmethod
    def find(collection, query):
        return Database.database[collection].find(query)
        
    @staticmethod
    def find_one(collection, query):
        return Database.database[collection].find_one(query)

    @staticmethod
    def update_one(collection, query, new_values):
        Database.database[collection].update_one(query, new_values)
