#this does not work when run online
import os #initalise modules needed to commmunicate wuth temp sesnsor
import glob
import time
 
os.system('modprobe w1-gpio') #run this command in terminal to initalise communication with temp sensor via onewire protocol.
os.system('modprobe w1-therm')#read temp from sensor and put results in sensor file.
 
base_dir = '/sys/bus/w1/devices/' #base directory where sensor folder is located
device_folder = glob.glob(base_dir + '28*')[0]#Specific folder where sensor is located
device_file = device_folder + '/w1_slave'#file where sensor output is found 
 
def Readtemp():
    f = open(device_file, 'r') 
    temp = f.readlines()
    f.close()
    return(temp)
def Trimtemp():
    temp = Readtemp()
    while temp[0].strip()[-3:] != 'YES':
        time.sleep(0.2)
        temp = Readtemp()
    equals_pos = temp[1].find('t=')
    if equals_pos != -1:
        temp_string = temp[1][equals_pos+2:]
        temp_final = float(temp_string) / 1000.0
        return(temp_final)
        
print(Trimtemp())
    
