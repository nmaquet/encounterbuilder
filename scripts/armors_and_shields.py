#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

with open("../data/items/armors_and_shields_descriptions.json", "r") as f:
    PRD_ARMORS_AND_SHIELDS_DESCRIPTIONS = json.loads(f.read())

with open("../data/manual/missing_armors_and_shields_manual.json", "r") as f:
    MISSING_ARMORS_AND_SHIELDS_MANUAL = json.loads(f.read())

def getDescription(armorOrShieldId):
    for armorOrShield in PRD_ARMORS_AND_SHIELDS_DESCRIPTIONS:
        if armorOrShield["id"] == armorOrShieldId:
            return armorOrShield["Description"]
    for armorOrShield in MISSING_ARMORS_AND_SHIELDS_MANUAL:
            if armorOrShield["id"] == armorOrShieldId:
                return armorOrShield["description"]
    print "No description found for id " + armorOrShieldId
    return ""

light_armors = """Armored Kilt ; 20 gp ; +1 ; +6 ; 0 ; 0% ; 30 ft. ; 20 ft. ; 10 lbs. ; AA
Padded armor; 5 gp ; +1 ; +8 ; 0 ; 5% ; 30 ft. ; 20 ft. ; 10 lbs. ; CRB
Quilted Cloth ; 100 gp ; +1 ; +8 ; 0 ; 10% ; 30 ft. ; 20 ft. ; 15 lbs. ; APG
Leather ; 10 gp ; +2 ; +6 ; 0 ; 10% ; 30 ft. ; 20 ft. ; 15 lbs. ; CRB
Rosewood armor ; 50 gp ; +2 ; +6 ; 0 ; 10% ; 30 ft. ; 20 ft. ; 15 lbs. ; AA
Hide shirt ; 20 gp ; +3 ; +4 ; -1 ; 15% ; 30 ft. ; 20 ft. ; 18 lbs. ; VBoL
Leaf armor ; 500 gp ; +3 ; +5 ; 0 ; 15% ; 30 ft. ; 20 ft. ; 20 lbs. ; ISWG
Parade armor ; 25 gp ; +3 ; +5 ; -1 ; 15% ; 30 ft. ; 20 ft. ; 20 lbs. ; AA
Studded leather ; 25 gp ; +3 ; +5 ;  -1 ; 15% ; 30 ft. ; 20 ft. ; 20 lbs. ; CRB
Wooden ; 20 gp ; +3 ; +3 ; -1 ; 15% ; 30 ft. ; 20 ft. ; 25 lbs. ; APG
Chain shirt ; 100 gp ; +4 ; +4 ;  -2 ; 20% ; 30 ft. ; 20 ft. ; 25 lbs. ; CRB"""

medium_armors = """Armored Coat ; 50 gp ; +4 ; +3 ; -2 ; 20% ; 20 ft. ; 15 ft. ; 20 lbs. ; APG
Hide ; 15 gp ; +4 ; +4 ;  -3 ; 20% ; 20 ft. ; 15 ft. ; 25 lbs. ; CRB
Scale mail ; 50 gp ; +5 ; +3 ;  -4 ; 25% ; 20 ft. ; 15 ft. ; 30 lbs. ; CRB
Chainmail ; 150 gp ; +6 ; +2 ;  -5 ; 30% ; 20 ft. ; 15 ft. ; 40 lbs. ; CRB
Breastplate ; 200 gp ; +6 ; +3 ;  -4 ; 25% ; 20 ft. ; 15 ft. ; 30 lbs. ; CRB
Breastplate (agile) ; 400 gp ; +6 ; +3 ; -4 ; 25% ; 20 ft. ; 15 ft. ; 25 lbs. ; APG"""

heavy_armors = """Splint mail ; 200 gp ; +7 ; +0 ;  -7 ; 40% ; 20 ft. ; 15 ft. ; 45 lbs. ; CRB
Banded mail ; 250 gp ; +7 ; +1 ;  -6 ; 35% ; 20 ft. ; 15 ft. ; 35 lbs. ; CRB
Field Plate ; 1,200 gp ; +7 ; +1 ; -5 ; 35% ; 20 ft. ; 15 ft. ; 50 lbs. ; ISWG
Half-plate ; 600 gp ; +8 ; +0 ;  -7 ; 40% ; 20 ft. ; 15 ft. ; 50 lbs. ; CRB
Half-plate (agile) ; 850 gp ; +8 ; +0 ; -7 ; 40% ; 20 ft. ; 15 ft. ; 55 lbs. ; APG
Full plate ; 1,500 gp ; +9 ; +1 ;  -6 ; 35% ; 20 ft. ; 15 ft. ; 50 lbs. ; CRB
Hellknight plate ; 2,000 gp ; +9 ; +1 ; -5 ; 35% ; 20 ft. ; 15 ft. ; 50 lbs. ; ISWG
Stoneplate ; 1,800 gp ; +9 ; +1 ; -6 ; 35% ; 15 ft. ; 10 ft. ; 75 lbs. ; ISWG"""

shields = """Buckler ; 5 gp ; +1 ; - ;  -1 ; 5% ; - ; - ; 5 lbs. ; CRB
Klar ; 12 gp ; +1 ; - ; -1 ; 5% ; - ; - ; 6 lbs. ; ISWG
Leather madu ; 30 gp ; +1 ; - ; -2 ; 5% ; - ; - ; 5 lbs. ; AA
Steel madu ; 40 gp ; +1 ; - ; -2 ; 5% ; - ; - ; 6 lbs. ; AA
Light wooden shield; 3 gp ; +1 ; - ;  -1 ; 5% ; - ; - ; 5 lbs. ; CRB
Light wooden shield (quickdraw) ; 53 gp ; +1 ; - ; -2 ; 5% ; - ; - ; 6 lbs. ; APG
Light steel shield ; 9 gp ; +1 ; - ;  -1 ; 5% ; - ; - ; 6 lbs. ; CRB
Light steel shield (quickdraw) ; 59 gp ; +1 ; - ; -2 ; 5% ; - ; - ; 7 lbs. ; APG
Heavy wooden shield ; 7 gp ; +2 ; - ;  -2 ; 15% ; - ; - ; 10 lbs. ; CRB
Heavy steel shield ; 20 gp ; +2 ; - ;  -2 ; 15% ; - ; - ; 15 lbs. ; CRB
Tower shield ; 30 gp ; +43 ; +2 ;  -10 ; 50% ; - ; - ; 45 lbs. ; CRB"""

extras = """Armor spikes ; +50 gp ; - ; - ; - ; - ; - ; - ; +10 lbs. ; CRB
Locked gauntlet ; 8 gp ; - ; - ; - ; n/a ; - ; - ; +5 lbs. ; AA
Shield spikes ; +10 gp ; - ; - ; - ; - ; - ; - ; +5 lbs. ; CRB
Throwing shield; +50 gp ; - ; - ; - ; - ; - ; - ; - ; AA"""

def slugify(string):
    res = []
    for c in string:
        if c.isalpha(): 
            res.append(c.lower())
        elif res and res[-1] != '-':
            res.append('-')
    if res[-1] == "-":
        res.pop()
    return "".join(res)
    
def armor_or_shield(name,cost,price_unit,armor_bonus,max_dex_bonus,armor_check_penalty,arcane_spell_failure,speed_30_ft,speed_20_ft,weight,source,type, mwk):
    if cost == "-":
        cost = 0
        price_unit = "gp"
    if armor_check_penalty == "-":
        armor_check_penalty = 0
    effectiveName = ("Mwk " + name) if mwk else name
    result = {
        "Name": effectiveName,
        "id": slugify(effectiveName),
        "Group": "Armor",
        "ArmorType": type,
        "Price": float(cost.replace(",","")) + (150 if mwk else 0),
        "PriceUnit": price_unit,
        "CL" : 0,
        "ArmorBonus" : armor_bonus,
        "MaxDexBonus" : max_dex_bonus,
        "ArmorCheckPenalty" : min(0, float(armor_check_penalty) + (1 if mwk else 0)),
        "ArcaneSpellFailure" : arcane_spell_failure,
        "Speed30Ft" : speed_30_ft,
        "Speed20Ft" : speed_20_ft,
        "Weight":weight,
        "Source":source,
        "Description":getDescription(slugify(name)),
        "Mwk":mwk
    }
    return result

def parseTable(text, type):
    table = []
    for line in text.splitlines():
        splitted = line.split(";")
        name = splitted[0].strip()
        price = splitted[1].split()
        cost = price[0].strip()
        if len(price) > 1:
            price_unit = splitted[1].split()[1].strip()
        else:
            price_unit = "gp"
        armor_bonus = splitted[2].strip()
        max_dex_bonus = splitted[3].strip()
        armor_check_penalty = splitted[4].strip()
        arcane_spell_failure = splitted[5].strip()
        speed_30_ft =  splitted[6].strip()
        speed_20_ft = splitted[7].strip()
        weight = splitted[8].strip()
        source = splitted[9].strip()
        table.append(armor_or_shield(name,cost,price_unit,armor_bonus,max_dex_bonus,armor_check_penalty,arcane_spell_failure,speed_30_ft,speed_20_ft,weight,source,type, mwk=True))
        table.append(armor_or_shield(name,cost,price_unit,armor_bonus,max_dex_bonus,armor_check_penalty,arcane_spell_failure,speed_30_ft,speed_20_ft,weight,source,type, mwk=False))
    return table
    
if __name__ == "__main__":
    table=[] 
    table += parseTable(light_armors, "light-armor")
    table += parseTable(medium_armors, "medium-armor")
    table += parseTable(heavy_armors, "heavy-armor")
    table += parseTable(shields, "shield")
    table += parseTable(extras, "extra")
    string = json.dumps(table, indent=4, sort_keys=True)
    with open("../data/items/armors_and_shields.json", "w") as f:
        f.write(string)
    