import Adafruit_DHT
#import the adafruit dht library
DHT_SENSOR = Adafruit_DHT.DHT22
#set the dht sensor as dht22
DHT_PIN = 17
#set the dht pin to 17
#set varibles humididy and temperature respectivly to the output from the sensor
def read():
	humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
	return humidity, temperature
humidity, temperature = read()
if humidity is not None and temperature is not None:#if the output is valid
	i = 0
	while i < 2:
		humidity, temperature = read()
		temperature = round(temperature,2)#roud the temperature and humidity to 2 decimal points
		humidity = round(humidity,2)
		i += 1
	print([temperature, humidity])#print them back to the command line
	exit (0)
print("Failed to retrieve data from humidity sensor") #error message if output is not valid