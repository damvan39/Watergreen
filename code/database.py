import pymongo
import os
import datetime
client = pymongo.MongoClient("mongodb://localhost:27017")
print(client.list_database_names())

my_path = os.path.abspath(os.path.dirname(__file__))
print(my_path)


def getData() :
    class readData:
        @classmethod
        def airt(cls): 
            x = os.system('python3 ' + os.path.join(my_path, "dht22.py"))[0]
            x = [{"data":x}]
            return x

        def airh(self) :
            x = os.system('python3 ' + os.path.join(my_path, "dht22.py"))[1]
            return x

        def watert(self): 
            return("water")
    return readData.watert
    # x = {
    #     "time": datetime.datetime.now(),
    #     "airt": readData.airt(),
    #     airh: [{ data: Number }],
    #     watert: [{ data: Number }],
    # }


def updateBuffer() :
    mydb = client["data"]
    data_buffer = mydb["data_buffer"]
    data = getData()




