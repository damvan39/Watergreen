#!/usr/bin/env python3
#this does not work when run online
import os #initalise modules needed to commmunicate wuth temp sesnsors
import glob
import time
import sys
import logging
os.system('modprobe w1-gpio') #run this command in terminal to initalise communication with temp sensor via onewire protocol.
os.system('modprobe w1-therm')

if len(sys.argv) < 3 and len(sys.argv) < 2:
    print("usage:", sys.argv[0], "<mode> <address> (at least Mode is required) acceptable modes are: address <address> , listall, printall")
    sys.exit(1)
mode = sys.argv[1]
if len(sys.argv) > 2:
    address = sys.argv[2]
base_dir = '/sys/bus/w1/devices/' #base directory where sensor folder is located
try:
    device_folder = glob.glob(base_dir + '28*')#Specific folder where sensor is located
except:
    print('unable to detect temperature sensor, please check that the wiring is correct')
    exit()


device_file = []
i = 0
while i < len(device_folder):
    device_file.append(device_folder[i] + '/w1_slave')
    i += 1


num_devices = len(device_folder)
def Listsensor():
    i = 0
    output = []
    while i < num_devices:
        string = device_folder[i]
        x = string.find('-')
        string = string[x+1:]
        output.append(string)
        i += 1
    return output


def Addressread(address):
    if len(address) != 12:
        print('this is not the correct length of address, addresses should be 12 digits\n to list addresses please run: ', sys.argv[0],'list')
        exit()
    i = 0
    while i < num_devices:
        string = device_folder[i]
        boolean = address in string
        if boolean == True:
            return i
        i += 1
    print ('this is not the address of a connected sensor, please check that your wiring is correct and try again\n to list addresses please run: ', sys.argv[0],'list')
    exit()

def Readtemp(index):
    f = open(device_file[index],'r')
    lines = f.readlines()
    f.close()
    return lines


def Trimtemp(index,):
    lines = Readtemp(index)
    retries = 5
    while (lines[0].strip()[-3:] != 'YES') and (retries > 0):
        # read failed so try again
        time.sleep(0.1)
        #print('Read Failed', retries)
        lines = Readtemp(index)
        retries -= 1
    if retries == 0:
        return 999

    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        temp = lines[1][equals_pos + 2:]
        return float(temp)/1000
    else:
        # error
        return 999   


if mode == 'list':
    print (Listsensor())
    exit()

elif mode == 'printall':
    i = 0
    output = []
    limit = 5
    while i < num_devices and limit > 0:
        value = Trimtemp(i)
        output.append(value)
        i += 1 
        limit -= 1
    print (output)
    exit()

elif mode == 'address':
    try:
        index = Addressread(address)
        pass
    except:
        print('this is not the correct length of address, addresses should be 12 digits\n to list addresses please run: ', sys.argv[0],'list')
        exit()


    print (Trimtemp(index))
    exit()

else:
    print("usage:", sys.argv[0], "<mode> <address> (at least Mode is required)\nacceptable modes are: address <sensor-address> , list, printall")
    exit()




    
