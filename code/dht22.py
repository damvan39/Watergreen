import Adafruit_DHT

DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 17

while True:
	humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

	if humidity is not None and temperature is not None:
		temperature = round(temperature,2)
		humidity = round(humidity,2)
		print(temperature, humidity)
	else:
		print("Failed to retrieve data from humidity sensor")