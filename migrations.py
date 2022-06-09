import json
from database import Database
from JuiceboxReader import JuiceboxReader
import datetime

a = datetime.datetime.now().timestamp()
for i in range(10000000):
    a +=1
    a -=1
b = datetime.datetime.now().timestamp()


c = datetime.timedelta(days=14)