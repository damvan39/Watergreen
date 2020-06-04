import pymongo
import os
import datetime
import subprocess
client = pymongo.MongoClient("mongodb://localhost:27017")
# print(client.list_database_names())

my_path = os.path.abspath(os.path.dirname(__file__))
# print(my_path)


def getData() :
    def airt(): 
        command = ['sudo', 'python3', os.path.join(my_path, "dht22.py")]
        p = subprocess.Popen(command, stdout=subprocess.PIPE)
        text = p.stdout.read()
        retcode = p.wait()
        text = text.decode('utf-8')
        text = text.rstrip("\n")
        text = list(text.split(" ")) 
        return (text)

    def airh() :
        x = os.system('python3 ' + os.path.join(my_path, "dht22.py"))[1]
        return x

    def watert(): 
        return("water")

    return (airt())
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



print(getData())
