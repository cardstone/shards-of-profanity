##
#
#	Simply inserts all cards from a text file into the database.
#
#	USE: python load_cards.py [file] [color] [pack]
#
##

from pymongo import MongoClient
import sys
#import cheese

client = MongoClient()

client = MongoClient('mongodb://shards:cardstone@52.20.69.252:27017/shard')

collection = client['cards']

with open(sys.argv[2]) as f:
	for line in f:

		card = {
			"color": sys.argv[3],
			"text": line,
			"pack": sys.argv[4]
		}

		collection.insert( card )
