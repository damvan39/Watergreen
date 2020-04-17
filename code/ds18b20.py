#!/usr/bin/env python3
#this does not work when run online
import os #initalise modules needed to commmunicate wuth temp sesnsors
import glob
import time
import sys
import logging
import signal

os.system('modprobe w1-gpio') #run this command in terminal to initalise communication with temp sensor via onewire protocol.
os.system('modprobe w1-therm')#retrive values from sensor

if len(sys.argv) > 3 or len(sys.argv) < 2: #check that command line arguments are valid
	print("usage:", sys.argv[0], "<mode> <address> (at least Mode is required) acceptable modes are: address <address> , listall, printall")
	sys.exit(1)
mode = sys.argv[1] # set the program mode as argument 1
if len(sys.argv) > 2:
	address = sys.argv[2] # set the device address as argument 2
base_dir = '/sys/bus/w1/devices/' #base directory where sensor folder is located
try:
	device_folder = glob.glob(base_dir + '28*')#Specific folder where sensor is located
except:
	print('unable to detect temperature sensor, please check that the wiring is correct\nalso check that you have the 1-wire protocol enabled')
	exit() # if there is no sensors connected there will be no folders that match the glob expression

device_file = [] # iterate through the device file and add /w1 slave to the end of it. this point to the fiile from which to retrive the readings
i = 0
while i < len(device_folder):
	device_file.append(device_folder[i] + '/w1_slave')
	i += 1
num_devices = len(device_folder) # set the number of devices as the number of strings in the array
'''
the following def functions define function for use later in the code. 
they dont execute in order and can only be called by other code
'''

def alarm_handler_read(signum, frame): # this handles the timeout alarm for the readtemp function, this functionis called after the readtemp function has been running for 5 seconds
	print(' the read function timed out, this is usually caused when\nthe temperature sensor connection is faulty or has been recently unplugged\n restarting normally fixes this issue')
	exit() #exit the program

def Listsensor(): #used for listing the sensor addresses from the modprobe file
	i = 0
	output = [] #initalize the output as an array
	while i < num_devices: # loop 
		string = device_folder[i] # turn the array of a specific of sensor i onto a string
		x = string.find('-') # find the - character
		string = string[x+1:] #trucate string to after the - character
		output.append(string) #add the string into the output array
		i += 1 # next iteration
	return output # return the output to the function that called it


def Addressread(address): # this is the function that associates the addres provided with the index of a teperature sensor using an address
	if len(address) != 12: # checks that the address is the right length
		print('this is not the correct length of address, addresses should be 12 digits\n to list addresses please run: ', sys.argv[0],'list')
		exit()
	i = 0
	while i < num_devices: #iterates through each sensor
		string = device_folder[i] # uses device folder which contains the sensoraddress
		boolean = address in string# checks if the the string is present in the device file
		if boolean == True: #if it does, return the dedvice index
			return i
		i += 1 #check the next sensor path
	print ('this is not the address of a connected sensor, please check that your wiring is correct and try again\n to list addresses please run: ', sys.argv[0],'list')
	exit() #exit if the address does not match any connected sensors

def Readtemp(index): #this is the function that reads the raw data from the modprobe file
	signal.signal(signal.SIGALRM, alarm_handler_read) # tells the linux kernel to send an alarm signal after 5 seconds and sets tehe interupt to point to alarm_handler_read function
	signal.alarm(5)# sets 5 second mentioned above
	try: # the function is put inside of a try container so that if it fails i  can hadle it whitout the program crashing
		f = open(device_file[index],'r')
		lines = f.readlines()
		f.close()
	except:
		f.close() #
		exit()
		print('error reading from sensor, please check connection or reboot') #print error to terminal
	signal.alarm(0) #cancel the alarm signal

	return lines # return the varible lines to the function that called it


def Trimtemp(index): #the main temperature block of code that calls the readtemo function and then retrives the teperature value from the raw output 
	lines = Readtemp(index) #get the raw file contents from readtemp function
	retries = 5 #sets the maximim numbers of retries to 5
	while (lines[0].strip()[-3:] != 'YES') and (retries > 0): #checks that the integrity value of the file is equal to yes if not retry
		# read failed so try again
		time.sleep(0.1)
		#print('Read Failed', retries)
		lines = Readtemp(index) # read the file again
		retries -= 1
	if retries == 0:
		return 999 # coudnt get valid response from sensor

	equals_pos = lines[1].find('t=') #parse the output to find the t= value"
	if equals_pos != -1: # if the result of the find statment is valid
		temp = lines[1][equals_pos + 2:] #trim the raw output to every thing after t= and set it as the varible temp
		return float(temp)/1000  #divide by 1000 to add the decimal point
	else:
	# error
		return 999   #if there is no t= throw an error


if mode == 'list': #this is kind of selfe explanatory, if the mode that we set at command line is equalt to list
	print (Listsensor()) #print the value return form the Linsttemp() function
	exit()

elif mode == 'printall':
	i = 0
	output = [] #initalize outout as an array
	limit = 64 #set a limit to the number of times times that this can iterate
	while i < num_devices and limit > 0: #iterate through the devices and add the value for each sensor to the output array
		value = Trimtemp(i)
		output.append(value)
		i += 1 
		limit -= 1
	print (output)# print the array
	exit()

elif mode == 'address':
	try: # inside a try statment so that if an error occurs i can handle it gracefully
		index = Addressread(address) #match the sensor index with the address provided
		pass
	except:
		print('something is wronng with the addres that was provided')
		exit()


	print (Trimtemp(index))#read the snesor with the index that correstonds to the address
	exit()

else: #if none of these match the mode provided at the commadline than proint the error message along with how to use the script
	print("usage:", sys.argv[0], "<mode> <address> (at least Mode is required)\nacceptable modes are: address <sensor-address> , list, printall")
	exit()




    
