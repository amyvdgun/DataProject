import csv
import json
from collections import OrderedDict

# read data file and write json file
csvfile = open("tickersymbols.csv", "r")
jsonfile = open("tickersymbols.json", "w+")

names = ("Ticker")

reader = csv.DictReader(csvfile, names, delimiter = ";")

storage = []
for row in reader:
    data = OrderedDict()
    for element in names:
        data[element] = row[element].strip()
    storage.append(data)

json.dump(storage, jsonfile, indent=4)

