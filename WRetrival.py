#1st iteration
import urllib.request
import os
length_forecast = 3 #max value 38 min value 1
authorisation_key = 'ff9eb73b3f291ec32601a97f440c27dc'
location_id = '7910041'
latest_weather = ''
urllib.request.urlretrieve('https://api.openweathermap.org/data/2.5/forecast?id=' + location_id + '&appid=' + authorisation_key + '&mode=xml', 'latest_weather.xml')
latest_weather = open("latest_weather.xml", "r").read()
temp_val = list()
value = 'temperature'
i = 0
index = 0
while i < length_forecast:
  index = latest_weather.find('temperature', (index + 70))
  v1 = latest_weather[index:index + 70]
  index2 = v1.find('value')
  v2 = v1[index2:index2 + 25]
  y = 0
  x = 0
  while x < 100:
    if v2[y].isdigit() == True:
     parsed_index_start = y
     break
    y = y + 1
    x = x + 1
  y = parsed_index_start + 4
  while x < 100:
   if v2[y].isdigit() == False:
     parsed_index_end = y
     break
   x = x + 1
   y = y + 1
  v2 = v2[parsed_index_start:parsed_index_end]
  temp_val.append(v2)
  i = i + 1
avg_temp = 0
for x in temp_val:
  var = float(x) 
  var = var - 273.15
  avg_temp = avg_temp + var 
avg_temp = avg_temp / len(temp_val)
avg_temp = round(avg_temp,2)
print (avg_temp)
os.remove("latest_weather.xml")



