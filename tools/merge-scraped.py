import pymongo
import urllib
import json

username = urllib.parse.quote_plus('cailey')
password = urllib.parse.quote_plus('xxxxxxxx')

client = pymongo.MongoClient("mongodb+srv://" + username + ":" + password + "@randobot-eni9x.mongodb.net/test?retryWrites=true&w=majority")
labyrinthos = client['randobot']['labyrinthos-tarot']
biddy = client['randobot']["biddy-tarot"]

card_string = ""
card_dict = {}
value_dict = {
    "ace": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "ten": 10,
    "page": 11,
    "knight": 12,
    "queen": 13,
    "king": 14
}

for labcard in labyrinthos.find():
    query = {'name_lower' : labcard['name_lower']}
    biddycard = biddy.find_one(query)
    print(labcard["name"] + ' : ' + biddycard["name"])

    card_dict["name"] = labcard["name"]
    card_dict["name_lower"] = labcard["name_lower"]
    card_dict["suit"] = labcard["suit"]
    if card_dict["suit"] != "major":
        card_dict["value_en"] = labcard["value_en"]
        card_dict["value_num"] = labcard["value_num"]
    card_dict["keyword_up"] = biddycard["meaning_up"]
    card_dict["keyword_rev"] = biddycard["meaning_rev"]
    card_dict["meaning_up"] = labcard["meaning_up"]
    card_dict["meaning_rev"] = labcard["meaning_rev"]
    card_dict["biddy_image"] = biddycard["image"]
    card_dict["rws_image"] = labcard["image"]
    card_dict["biddy_link"] = biddycard["link"]
    card_dict["labyrinthos_link"] = labcard["link"]
    #print(html_card.prettify())
    card_string += str(json.dumps(card_dict)) + '\n'

print(card_string)
