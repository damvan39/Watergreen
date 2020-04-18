import os
import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
pin = 5
high = 25
address = '01191ee1ec53'
GPIO.setup(pin,GPIO.OUT)
def Gettemp(address):
    temp = os.system('python3 ds18b20.py address '+address)
    temp = int(temp)
    return temp
def setgpio(sig):
    if sig == 1:
        signal = GPIO.HIGH
    elif sig == 0:
        signal = GPIO.LOW
    else:
        print('program error')
    GPIO.output(pin, signal)

def logic():
    print('logic')
    if Gettemp(address) < high:
        print('setgpi')
        setgpio(1)
        print('set1')
    else:
        setgpio(0)
        print('set0')
i = 1
while i == i:
    logic()
    time.sleep(10)


