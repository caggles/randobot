import json
import requests
import re
from bs4 import BeautifulSoup

url = 'https://labyrinthos.co/blogs/tarot-card-meanings-list'

def get_cards(url, suit):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
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

    div_id = suit
    if suit == 'major':
        div_id = 'majorarcana'

    html_card_list = soup.find('div', id=div_id).find_all('div', class_="grid__item large--one-quarter medium--one-third text-center card")
    for html_card in html_card_list:
        link = 'https://labyrinthos.co' + html_card.find('a')['href']
        subpage = requests.get(link)
        subsoup = BeautifulSoup(subpage.content, 'html.parser')
        card_details = subsoup.find('div', class_="grid__item large--six-eighths push--large--one-eighth")
        card_dict["image"] = 'https:' + card_details.find('img')['src']
        card_dict["link"] = link
        card_dict["name"] = card_details.find('h1', string=re.compile("Tarot Card Description")).text.replace('Tarot Card Description', '').replace('\u00a0', ' ').replace('\xa0', '').strip()
        card_dict["name_lower"] = card_dict["name"].lower().replace('the', '').strip()
        card_dict["suit"] = suit
        if suit != "major":
            card_dict["name"] = card_dict["name"].replace('The ', '')
            card_dict["value_en"] = card_dict["name_lower"].split("of")[0]
            card_dict["value_en"] = card_dict["value_en"].strip()
            card_dict["value_num"] = value_dict[card_dict["value_en"]]
        tracker = card_details.find('h1', string=re.compile("Upright")).next_sibling
        card_dict["meaning_up"] = ''
        while tracker.name != 'h1':
            if tracker.name == 'p' and tracker.text != '&nbsp':
                card_dict["meaning_up"] += tracker.text + ' '
            tracker = tracker.next_sibling
        card_dict["meaning_up"] = card_dict["meaning_up"].replace("\u00a0", " ")
        card_dict["meaning_up"] = card_dict["meaning_up"].replace("\u2019", "'")
        card_dict["meaning_up"] = card_dict["meaning_up"].strip()
        tracker = card_details.find('h1', string=re.compile("Revers")).next_sibling
        card_dict["meaning_rev"] = ''
        while tracker.name != 'h1':
            if tracker.name == 'p' and tracker.text != '&nbsp':
                card_dict["meaning_rev"] += tracker.text + ' '
            tracker = tracker.next_sibling
        card_dict["meaning_rev"] = card_dict["meaning_rev"].replace("\u00a0", " ")
        card_dict["meaning_rev"] = card_dict["meaning_rev"].replace("\u2019", "'")
        card_dict["meaning_rev"] = card_dict["meaning_rev"].strip()
        card_string += str(json.dumps(card_dict)) + '\n'
    print(card_string)


get_cards(url, 'major')
get_cards(url, 'cups')
get_cards(url, 'swords')
get_cards(url, 'wands')
get_cards(url, 'pentacles')
