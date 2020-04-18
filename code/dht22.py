import Adafruit_DHT
#import the adafruit dht library
DHT_SENSOR = Adafruit_DHT.DHT22
#set the dht sensor as dht22
DHT_PIN = 17
#set the dht pin to 17

while True:
	#set varibles humididy and temperature respectivly to the output from the sensor
	humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
	if humidity is not None and temperature is not None:#if the output is valid
		temperature = round(temperature,2)#roud the temperature and humidity to 2 decimal points
		humidity = round(humidity,2)
		print(temperature, humidity)#print them back to the command line
	else:
		print("Failed to retrieve data from humidity sensor") #error message if output is not valid