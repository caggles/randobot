import json
import requests
from bs4 import BeautifulSoup

major_url = 'https://www.biddytarot.com/tarot-card-meanings/major-arcana/'
cups_url = 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/'
swords_url = 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-swords/'
wands_url = 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-wands/'
pentacles_url = 'https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-pentacles/'

def get_cards(url, type):
    major = requests.get(url)
    soup = BeautifulSoup(major.content, 'html.parser')
    card_string = ""
    card_dict = {}

    html_card_list = soup.find('div', id='biddy_card_list').find_all('div')
    for html_card in html_card_list:
        card_dict["name"] = html_card.find('h4').text
        card_dict["meaning_up"] = html_card.find_all('p')[0].text
        card_dict["meaning_rev"] = html_card.find_all('p')[1].text
        image_tag = html_card.find('img')
        card_dict["image"] = str(image_tag).split('"')[1]
        card_dict["type"] = type
        #print(html_card.prettify())
        card_string += str(json.dumps(card_dict)) + '\n'

    print(card_string)

get_cards(major_url, 'major')
get_cards(cups_url, 'cups')
get_cards(swords_url, 'swords')
get_cards(wands_url, 'wands')
get_cards(pentacles_url, 'pentacles')
