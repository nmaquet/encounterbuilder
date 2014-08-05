# Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

# -*- coding: utf-8 -*-

import json

with open("../data/items/weapon_descriptions.json", "r") as f:
    PRD_WEAPON_DESCRIPTIONS = json.loads(f.read())

with open("../data/contrib/weapons_kyle_text_descriptions.json", "r") as f:
    WEAPONS_KYLE = json.loads(f.read())

with open("../data/manual/missing_weapons_manual.json", "r") as f:
    MISSING_WEAPONS_MANUAL = json.loads(f.read())

def getDescription(weaponId):
    for weapon in PRD_WEAPON_DESCRIPTIONS:
        if weapon["id"] == weaponId:
            return weapon["Description"]
    for weapon in WEAPONS_KYLE["ArrayOfWeapon"]["Weapon"]:
        if slugify(weapon["Name"][0]) == weaponId and "Desc" in weapon:
            return weapon["Desc"][0]
    for weapon in MISSING_WEAPONS_MANUAL:
        if weapon["id"] == weaponId:
            return weapon["description"]
    print "No description found for id " + weaponId
    return ""

simple_light="""Gauntlet;   2 gp;   1d2 ;1d3;   X2; -   ;1 lb.; B   ;-  ;CRB
Unarmed strike;  0 gp;   1d2 ;1d3 ;X2 ; -  ; -  ; B ;  nonlethal  ; CRB
Battle aspergillum ; 5 gp ;   1d4; 1d6; X2 ; -  ; 4 lb.;   B ;  see text ;   APG
Brass knife ;2 gp  ;  1d3 ;1d4; 19-20/X2  ;  10 ft.;  1 lb. ;  P or S  ;fragile; PoIS
Brass knuckles ; 1 gp  ;  1d2 ;1d3; X2 ; - ;  1 lb. ;  B  ; monk ;   AA / APG
Cestus ; 5 gp  ;  1d3 ;1d4; 19-20/X2 ;   -  ; 1 lb.  ; B or P ; monk ;   APG
Dagger ; 2 gp  ;  1d3 ;1d4; 19-20/X2  ;  10 ft.;  1 lb. ;  P or S;  - ;  CRB
Punching dagger ;  2 gp ;   1d3;1d4 ;x3 ; -;   1 lb. ;  P  ; -  ; CRB
Spiked gauntlet;  5 gp  ;  1d3 ;1d4 ;X2 ; - ;  1 lb. ;  P ;  - ;  CRB
Hook hand  ; 10 gp;   1d3; 1d4; X2 ; -  ; 1 lb. ;  S;   disarm;  PoIS
Light mace ;5 gp ;   1d4; 1d6 ;X2 ; -  ; 4 lbs.;  B  ; -  ; CRB
Sickle  ;6 gp  ;  1d4 ;1d6 ;X2 ; -  ; 2 lbs.;  S;   trip  ;  CRB
Wooden stake   ; -  ; 1d3 ;1d4 ;X2 ; 10 ft.  ;1 lb.;   P;   - ;  APG
"""
simple_one_handed="""Club ;   - ;  1d4; 1d6; X2 ; 10 ft. ; 3 lbs. ; B  ; - ;  CRB
Mere club ;2 gp ;   1d3; 1d4; X2;  -  ; 2 lbs.  ;B or P  ;fragile ;AA
Heavy mace ;12 gp  ; 1d6 ;1d8; X2 ; - ;  8 lbs. ; B  ; -  ; CRB
Morningstar; 8 gp  ;  1d6; 1d8; X2 ; -   ;6 lbs.;  B and P; -  ; CRB
Shortspear  ;1 gp  ;  1d4; 1d6 ;X2  ;20 ft. ; 3 lbs.;  P  ; -  ; CRB
"""
simple_two_handed="""Bayonet; 5 gp ;   1d4; 1d6; X2 ; - ;  1 lb.;   P  ; - ;  APG
Boarding pike ; 8 gp  ;  1d6 ;1d8; x3;  -  ; 9 lbs.;  P ;  brace, reach ;   PoIS
Longspear ;  5 gp ;   1d6 ;1d8 ;x3 ; -  ; 9 lbs. ; P ;  brace, reach ;   CRB
Quarterstaff   ; 0 gp ;  1d4/1d4 ;1d6/1d6; X2 ; -  ; 4 lbs.  ;B  ; double, monk  ;  CRB
Spear ;  2 gp  ;  1d6 ;1d8; x3 ; 20 ft.;  6 lbs.;  P   ;brace ;  CRB
Boar spear ;5 gp  ;  1d6 ;1d8 ;X2 ; - ;  8 lb.  ; P  ; brace, see text; APG
"""
simple_ranged="""Blowgun; 2 gp ;   1 ;  1d2; X2 ; 20 ft.;  1 lb. ;  P  ; -  ; CRB
Heavy crossbow ;50 gp  ; 1d8; 1d10  ;  19-20/X2 ;   120 ft.; 8 lbs. ; P ;  - ;  CRB
Heavy crossbow (underwater) ;   100 gp ; 1d8 ;1d10 ;   19-20/X2;    120 ft. ;8 lbs.  ;P  ; - ;  ARG
Light crossbow; 35 gp  ; 1d6 ;1d8 ;19-20/X2;    80 ft.;  4 lbs.;  P ;  - ;  CRB
Light crossbow (underwater) ;   70 gp ;  1d6; 1d8; 19-20/X2;    80 ft. ; 4 lbs. ; P ;  - ;  ARG
Dart  ;  5 sp  ;  1d3 ;1d4; X2;  20 ft.;  1/2 lb.; P  ; - ;  CRB
Javelin ;1 gp   ; 1d4 ;1d6; X2 ; 30 ft. ; 2 lbs.;  P   ;-  ; CRB
Sling  ; 0 gp  ; 1d3 ;1d4 ;X2  ;50 ft.;  - ;  B  ; -  ; CRB
Stingchuck ; 0 gp ;  1d3 ;1d4 ;X2 ; 10 ft. ; 9 lbs.;  B  ; see text  ;  AA
"""
simple_ammunition="""Crossbow bolt (10) ; 1 gp ;   - ;  -  ; -  ; -  ; 1 lb. ;  -  ; - ;  CRB
Acid bolt (1)   ;40 gp ;  -  ; - ;  -  ; - ;  0.1 lb. ;-  ; see text;    AP15
Drow poison bolt (1)  ;  100 gp  ;- ;  -  ; -  ; - ;  0.1 lb. ;- ;  see text;    AP15
Fire bolt (1);   50 gp ;  - ;  -  ; -  ; - ;  0.1 lb.; -  ; see text  ;  AP15
Groaning bullet (10) ;   2 gp   ; - ;  - ;  - ;  - ;  5 lbs. ; -  ; see text ;   AA
Sling bullet (10)  ; 1 sp ;   -;  -  ; - ;  - ;  5 lbs. ; - ;  -  ; CRB
Smoke bullet (10)  ; 100 gp  ;-  ; -  ; -;   -;   5 lbs. ; -  ; see text ;   PCS
Blowgun dart (10)  ; 5 sp  ;  - ;  -   ;-  ; - ;  1 lb. ;  -  ; - ;  CRB
"""
martial_light="""Boarding axe;  6 gp  ;  1d4; 1d6 ;x3 ; -   ;3 lbs. ; P or S  ;-  ; PoIS
Throwing axe;  8 gp   ; 1d4 ;1d6 ;X2  ;10 ft.  ;2 lbs. ; S   ;-  ; CRB
Blade boot ; 25 gp ;  1d3 ;1d4 ;X2  ;-  ; 2 lbs. ; P  ; see text;    AA
Cat-o'-nine-tails ;  1 gp   ; 1d3 ;1d4; X2 ; -  ; 1 lb.  ; S ;  disarm, nonlethal ;  PoIS
Dogslicer  ; 8 gp ;   1d4 ;1d6 ;19-20/X2 ;   -  ; 1 lb.  ; S ;  fragile ;ARG
Light hammer;  1 gp ;   1d3 ;1d4; X2 ; 20 ft.;  2 lbs.;  B  ; -  ; CRB
Gladius ;15 gp ;  1d4 ;1d6 ;19-20/X2  ;  -  ; 3 lbs.;  P or S;  performance; UC
Handaxe ;6 gp ;   1d4 ;1d6 ;x3  ;- ;  3 lbs. ; S  ; -  ; CRB
Switchblade knife;5 gp  ;  1d3; 1d4; 19-20/X2 ;   10 ft. ; 1 lb.;   P  ; - ;  AA
Long lash Kobold tail attachment ;  15 gp ;  1d4; 1d6 ;X2 ; -  ; 1 lb.;   S ;  reach ;  ARG
Pounder Kobold tail attachment ;1 gp  ;  1d6; 1d8 ;X2;  -  ; 4 lbs.;  B ;  - ;  ARG
Razored Kobold tail attachment; 3 gp ;   1d6; 1d8 ;19-20/X2  ;  - ;  2 lbs.;  S ;  - ;  ARG
Spiked Kobold tail attachment ;3 gp ;   1d6 ;1d8 ;X3  ;-  ; 2 lbs.;  P  ; - ;  ARG
Sweeper Kobold tail attachment ;7 gp  ;  1d4 ;1d6; X2 ; - ;  3 lbs. ; B ;  trip  ;  ARG
Kukri  ; 8 gp ;   1d3 ;1d4 ;18-20/x2  ;  -;   2 lbs.;  S ; -  ; CRB
Light Pick ;4 gp ;   1d3 ;1d4 ;x4  ;-  ; 3 lbs.;  P  ; - ;  CRB
Ratfolk tailblade ;  11 gp;   1d2 ;1d3 ;20/X2 ;  - ;  1/2 lb.; S  ; - ;  ARG
Sap ;1 gp ;  1d4; 1d6; X2  ;- ;  2 lbs.;  B;   nonlethal ;  CRB
Sea-knife  ; 8 gp  ;  1d3; 1d4; 19-20/X2   ; -  ; 1 lb. ;  S  ; -  ; ARG
Light wooden shield; 3 gp; 1d2; 1d3; X2  ;- ;  special ;B  ; -  ; CRB
Spiked armor  ;  50 gp; 1d4; 1d6; X2 ; - ;  special ;P  ; -  ; CRB
Light spiked shield; 10 gp; 1d3; 1d4 ;X2 ; -  ; special; P ;  - ;  CRB
Starknife  ; 24 gp  ; 1d3; 1d4 ;x3 ; 20 ft. ; 3 lbs.;  P ;  - ;  CRB
Short sword ;  10 gp   ;1d4 ;1d6; 19-20/X2;    -   ;2 lbs.  ;P ;  -  ; CRB
War razor ;  8 gp  ;  1d3 ;1d4 ;19-20/X2 ;   -   ;1 lb. ;  S  ; -  ; ISWG
"""
martial_one_handed="""Battleaxe   ;10 gp ;  1d6 ;1d8;x3  ;- ;  6 lbs.  ;S  ; - ;  CRB
Combat scabbard ; 1 gp  ;  1d4  ;  1d6 ;x2 ;  -   ;1 lb. ; B ;  improvised, see text ;    AA
Cutlass ;15 gp  ; 1d4 ;1d6 ;18-20/X2  ;  -  ; 4 lbs. ; S  ; -  ; PoIS
Flail  ; 8 gp ;   1d6 ;1d8 ;X2 ; - ;  5 lbs. ; B  ; disarm, trip ;   CRB
Klar   ; 12 gp ;  1d4 ;1d6 ;X2 ; -;   6 lbs.;  S  ;-  ; ISWG
Longsword ;  15 gp  ; 1d6 ;1d8; 19-20/X2   ; -;   4 lbs.;  S  ; -  ; CRB
Heavy pick; 8 gp  ;  1d4 ;1d6; x4;  - ;  6 lbs.;  P;   -  ; CRB
Rapier ; 20 gp ;  1d4 ;1d6 ;18-20/X2;    - ;  2 lbs.;  P  ; -  ; CRB
Combat scabbard (sharpened)  ;  10 gp ;  1d4 ;1d6 ;18-20/X2 ;   - ;  1 lb. ;  S  ; see text   ; AA
Scimitar   ; 15 gp  ; 1d4; 1d6 ;18-20/X2  ;  -  ; 4 lbs.;  S   ;- ;  CRB
Scizore ;20 gp  ; 1d8 ;1d10 ;   X2 ; -  ; 3 lbs. ; P  ; -;   UC
Heavy wooden shield; 7 gp ;1d3 ;1d4 ;X2;  -  ; special ;B  ; -  ; CRB
Heavy spiked shield ; 10 gp; 1d4 ;1d6; X2 ; -  ; special; P ;  - ;  CRB
Sword cane ; 45 gp  ; 1d4 ;1d6; X2 ; - ;  4 lbs.  ;P  ; see text  ;  APG
Terbutje  ;  5 gp  ;  1d6 ;1d8 ;19-20/X2  ;  -   ;2 lbs. ; S ;  fragile; AA
Steel terbutje; 20 gp ;  1d6 ;1d8; 19-20/X2    ;- ;  4 lbs. ; S ;  - ;  AA
Trident ;15 gp ;  1d6 ;1d8 ;X2  ;10 ft.;  4 lbs.;  P ;  brace ;  CRB
Warhammer   ;12 gp ;  1d6 ;1d8; x3 ; -  ; 5 lbs. ; B  ; -  ; CRB
"""
martial_two_handed="""Bardiche ;   13 gp ;  1d8; 1d10 ;   19-20/X2 ;   -;   14 lbs.; S  ; brace, reach, see text ; APG
Bec de corbin ;  15 gp ;  1d8 ;1d10  ;  x3  ;-  ; 12 lbs.; B or P;  brace, reach, see text ; APG
Bill   ; 11 gp  ; 1d6 ;1d8 ;x3 ; - ;  11 lbs. ;S ;  brace, disarm, reach, see text ; APG
Earth breaker ;  40 gp ;  1d10  ;  2d6; x3 ; -  ; 14 lbs. ;B  ; - ;  ISWG
Falchion ;   75 gp ;  1d6; 2d4 ;18-20/X2   ; - ;  8 lbs.;  S  ; - ;  CRB
Heavy flail  ;  15 gp  ; 1d8 ;1d10 ;   19-20/X2;    -;   10 lbs.; B;   disarm, trip ;   CRB
Glaive ; 8 gp  ;  1d8 ;1d10 ;   x3  ;-  ; 10 lbs.; S  ; reach   ;CRB
Glaive-guisarme ;12 gp  ; 1d8; 1d10 ;   x3 ; - ;  10 lbs.; S  ; brace, reach, see text ; APG
Greataxe   ; 20 gp ;  1d10 ;   1d12   ; x3  ;-  ; 12 lbs.; S ;  - ;  CRB
Greatclub ;  5 gp  ;  1d8 ;1d10 ;   X2 ; - ;  8 lbs.;  B ;  - ;  CRB
Greatsword ; 50 gp ;  1d10  ;  2d6 ;19-20/X2;    - ;  8 lbs.;  S  ; -;   CRB
Guisarme  ;  9 gp  ;  1d6; 2d4 ;x3 ; - ;  12 lbs.; S ;  reach, trip ;CRB
Halberd ;10 gp ;  1d8 ;1d10  ;  x3 ; - ;  12 lbs. ;P or S ; brace, trip; CRB
Lucerne hammer;15 gp;   1d10 ;   1d12 ;   X2 ; - ;  12 lbs.; B or P ; brace, reach, see text ; APG
Horsechopper    ;10 gp  ; 1d8 ;1d10 ;   x3;  - ;  12 lbs.; P or S;  reach, trip ;ARG
Lance  ; 10 gp ;  1d6 ;1d8 ;x3 ; -  ; 10 lbs. ;P ;  reach ;  CRB
Ogre hook  ; 24 gp ;  1d8; 1d10  ;  x3  ;- ;  10 lbs.; P ;  trip ;   ISWG
Pickaxe ;14 gp;  1d6; 1d8; x4 ; - ;  12 lbs.; P  ; - ;  AP14
Ranseur ;10 gp;   1d6 ;2d4 ;x3  ;- ;  12 lbs.; P  ; disarm, reach  ; CRB
Scythe ; 18 gp  ; 1d6 ;2d4 ;x4 ; -  ; 10 lbs.; P or S ; trip ;   CRB
Syringe spear ; 100 gp ; 1d6 ;1d8 ;x3 ; 20 ft.;  6 lbs.;  P  ; brace, see text; AA
"""
martial_ranged="""Ammentum  ;  -;   1d4 ;1d6 ;X2 ; 50 ft. ; 1 lb. ;  P;   performance ;UC
Chakram ;1 gp  ;  1d6; 1d8 ;X2;  30 ft. ; 1 lb. ;  S ;  - ;  APG
Jolting dart ;  100 gp;  1d3; 1d4; X2 ; 20 ft.;  1/2 lb.; P  ; see text ;   ARG
Hunga munga ;4 gp  ;  1d4; 1d6 ;X2  ;15 ft. ; 3 lbs. ; P ;  - ;  AA
Longbow ;75 gp  ; 1d6; 1d8; x3  ;100 ft.; 3 lbs.;  P  ; -  ; CRB
Composite longbow ; 100 gp ; 1d6 ;1d8; x3;  110 ft. ;3 lbs. ; P ;  - ;  CRB
Pilum   ;5 gp ;   1d6 ;1d8 ;X2  ;20 ft. ; 4 lbs.;  P;   see text ;   APG
Shortbow  ; 30 gp ;  1d4 ;1d6 ;x3 ; 60 ft. ; 2 lbs. ; P ;  - ;  CRB
Composite shortbow ;75 gp  ; 1d4 ;1d6; x3;  70 ft.;  2 lbs. ; P ;  - ;  CRB
"""
martial_ammunition="""Common arrow (20) ;  1 gp  ;  - ;  - ;  - ;  -  ; 3 lbs.  ;P ;  -  ; CRB
Bleeding arrow (1) ; 360 gp ; see text  ;  see text  ;  see text  ;  see text ;   see text    ;see text ;   see text  ;  EoG
Blunt arrow (20)  ;  2 gp ;   - ;  -  ; -  ; - ;  3 lbs. ; B   ;see text ;   APG
Durable arrow (1) ;  1 gp   ; see text ;   see text ;  see text  ;  see text   ; see text ;   see text   ; see text ;   EoG
Dye arrow (1) ;  1 gp  ;  see text  ;  see text;    see text   ; see text ;   4 lbs.;  -  ; see text   ; EoG
Flight arrow (20) ;  2 gp   ; -;   - ;  -  ; see text ;   3 lbs. ; P  ; see text  ;  APG
Lodestone arrow (1); 10 gp  ; see text  ;  see text  ;  see text  ;  see text ;   see text ;   see text;    see text  ;  EoG
Pheromone arrow (1);15 gp ;  see text;    see text    ;see text ;   see text  ;  see text   ; see text  ;  see text ;   EoG
Raining arrow (1)  ; 30 gp  ; see text ;   see text  ;  see text   ; see text   ; see text ;   see text  ;  see text  ;  EoG
Slow burn arrow (1) ;150 gp ; see text   ; see text ;   see text ;   see text  ;  see text ;   see text  ;  see text  ;  EoG
Smoke arrow (1) ;10 gp;   -  ; -  ; -;   - ;  -  ; P   ;see text   ; APG
Splintercloud arrow (1); 25 gp  ; see text  ;  see text   ; see text ;   see text;    see text ;   see text ;   see text  ;  EoG
Tanglefoot arrow (1)   ; 20 gp  ; see text   ; see text ;   see text ;   see text ;   see text   ; see text   ; see text   ; EoG
Thistle arrow (1) ;  1 gp  ;  -;   -  ; - ;  -  ; 0.15 lbs  ;  P  ; see text  ;  AA
Trip arrow (1);  25 gp ;  see text ;   see text   ; see text ;   see text ;   see text  ;  see text  ;  see text  ;  EoG
Whistling arrow (20)   ; 2 gp ;   -;   -  ; -   ;-  ; 3 lbs.  ;-;   - ;  UC
"""
exotic_light="""Aklys  ; 5 gp ;   1d6 ;1d8; X2 ; 20 ft. ; 2 lbs. ; B ;  performance, trip ;  UC
Knuckle axe  ;  9 gp   ; 1d4 ;1d6 ;x3 ; -  ; 2 lbs. ; S   ;monk, performance ;  UC
Barbazu beard   ;25 gp   ;1d3; 1d4; X2 ; - ;  5 lbs  ; S  ; see text ;   Cheliax
Battle poi  ;5 gp  ;  1d3  ;   1d4  ;   X2 ; - ;  2 lbs.;  fire   ; - ;  AA
Swordbreaker dagger ; 10 gp ;  1d3 ;1d4 ;X2  ;- ;  3 lbs. ; S  ; disarm, sunder;  APG
Flying Talon ; 15 gp  ; 1d3; 1d4 ;X2 ; 10 ft. ; 5 lbs. ; P ;  disarm, trip ;   D1
Dwarven boulder helmet ; 20 gp  ; 1d3 ;1d4; X2 ; -  ; 10 lbs.; B ;  see text ;   ARG
Kama   ; 2 gp  ;  1d4 ;1d6; x2 ; -  ; 2 lbs.;  S ;  monk, trip ; CRB
Tri-bladed katar ;  6 gp ;   1d3 ;1d4; x4 ; - ;  2 lbs. ; P;   - ;  PCS
Butterfly knife ; 5 gp  ;  1d3 ;1d4; 19-20/X2;    - ;  1 lb. ;  P or S;  - ;  AA
Dwarven Maulaxe  ; 25 gp ;  1d4 ;1d6 ;x3 ; 10 ft.  ;5 lbs. ; B or S  ;-   ;AA
Nunchaku   ; 2 gp ;   1d4; 1d6 ;x2;  -  ; 2 lbs. ; B  ; disarm, monk  ;  CRB
Quadrens ;   8 gp  ;  1d4; 1d6 ;19-20/X2   ; - ; 2 lbs.;  P  ; performance; UC
Rope gauntlet  ; 2 sp  ;  1d3; 1d4 ;X2 ; -  ; 2 lbs.;  B (or S) ;   - ;  AA
Sai ;1 gp  ;  1d3 ;1d4 ;x2;  -  ; 1 lb. ;  B   ;disarm, monk   ; CRB
Siangham    ;3 gp ;   1d4; 1d6 ;x2  ;-;  1 lb.;   P;   monk;    CRB
Sica   ; 10 gp   ;1d4 ;1d6; X2;  - ;  2 lbs. ; S  ; performance; UC
Thorn bracer  ;  30 gp ;  1d4 ;1d6;X2 ; - ;  3 lbs.;  P ;  -;   PCS
Scorpion Whip ; 5 gp ;   1d3 ;1d4 ;X2;  - ;  3 lbs.;  S   ;disarm, performance, reach, trip ;   UC
"""
exotic_one_handed="""Hooked axe; 20 gp ; 1d6; 1d8; x3 ; -   ;7 lbs. ; S  ; disarm, performance, trip;   UC
Falcata ;18 gp  ; 1d6 ;1d8; 19-20/x3 ;   -  ; 4 lbs. ; S ;  - ;  APG
Flindbar  ;  0 gp ;   1d6 ;1d8;X2  ; - ;  ? ;  B ;  disarm  ;CMR
Khopesh ;20 gp  ; 1d6 ;1d8 ;19-20/X2 ;   - ;  8 lbs.;  S ;  trip;    APG
Rhoka  ; 5 gp ;  1d6 ;1d8;18-20/X2;    - ;  6 lbs.;  S  ; - ;  AA
Sawtooth sabre ;35 gp ;  1d6 ;1d8; 19-20/X2;    - ;  2 lbs. ; S;   -;   ISWG
Shotel;  30 gp ;  1d6 ;1d8; x3 ; - ;  3 lbs. ; P;   performance ;UC
Dueling sword ; 20 gp ;  1d6 ;1d8 ;19-20/X2  ;  -  ; 3 lbs ;  S ;  -;   ISWG
Bastard sword; 35 gp;   1d8 ;1d10 ;   19-20/X2  ;  -  ; 6 lbs.;  S  ; - ;  CRB
Dwarven waraxe ;30 gp  ; 1d8; 1d10  ;  x3;  -  ; 8 lbs. ; S  ; - ;  CRB
Dwarven double waraxe ;  60 gp  ; 1d8 ;1d10 ;   X3 ; - ;  12 lbs. ;S  ; see text ;   ARG
Whip ;   1 gp;1d2; 1d3 ;X2 ; - ;  2 lbs.;  S;   disarm, nonlethal, reach, trip;  CRB
"""
exotic_two_handed="""Orc double axe ; 60 gp   ;1d6/1d6 ;1d8/1d8 ;x3 ; - ;  15 lbs.; S ;  double;  CRB
Battle Ladder  ; 20 gp  ; 1d4/1d4 ;1d6/1d6; X2  ;- ;  8 lbs. ; B;  double, trip  ;  GoG
Boarding gaff  ; 8 gp  ;  1d4/1d4; 1d6/1d6 ;X2 ; - ;  8 lbs. ; S ;  double, reach, trip ;PoIS
Spiked chain ;   25 gp ;  1d6 ;    2d4   ;  X2 ;     -  ; 10 lbs. ;P ;  disarm, trip ;   CRB
Elven curve blade ;80 gp  ; 1d8 ;1d10 ;   18-20/X2   ; - ;  7 lbs. ; S ;  -;   CRB
Dwarven Dorn Dergar  ;  50 gp ;  1d8 ;1d10   ; X2 ; - ;  15 lbs.; B ;  reach ;  DoG
Fauchard   ; 14 gp ;  1d8; 1d10  ;  18-20/X2 ;   - ;  10 lbs.; S ;  reach, trip ;CHR
Dire flail ;90 gp ;  1d6/1d6 ;1d8/1d8 ;X2  ;- ;  10 lbs.; B   ;disarm, double, trip ;   CRB
Flailpole  ; 15 gp  ; 1d6 ;1d8 ;X2 ; -  ; 10 lbs.; S  ; reach, trip ;GoG
Flambard   ; 50 gp ;  1d8 ;1d10 ;   19-20/X2  ;  - ;  6 lbs. ; S  ; sunder;  AA
Flying blade   ; 40 gp  ; 1d10 ;   1d12 ;   x3  ;- ;  12 lbs. ;S ;  performance, reach;  UC
Garrote; 3 gp  ;  1d4; 1d6 ;X2 ; -  ; 1 lb. ;  S  ; grapple, see text  ; AA
Gnome hooked hammer ;  20 gp ;  1d6/1d4; 1d8/1d6; x3/x4 ;  -  ; 6 lbs.  ;B or P ; double, trip   ; CRB
Harpoon ;5 gp  ;  1d6 ;1d8; x3 ; 10 ft.  ;16 lbs.; P;   grapple; PoIS
Dwarven longaxe ;   50 gp;   1d10 ;   1d12 ;   X3  ;-;   14 lbs.; S ;  reach;   ARG
Dwarven longhammer; 70 gp ;  1d10   ; 2d6; X3;  - ;  20 lbs.; B   ;reach;   ARG
Mancatcher ; 15 gp ;  1;   1d2; X2 ; -  ; 10 lbs.; P  ; grapple, reach, see text ;   APG
Snag net ; 30 gp ;  see text ;   see text;    - ;  10 ft. ; 10 lbs.; P  ; trip, see text  ;ARG
Piston maul ;70 gp ;  1d8 ;1d10 ;   X2 ; -;   15 lbs.; B  ; see text  ;  GoG
Ripsaw glaive   ;30 gp ;  1d8 ;1d10  ;  x3;  -;   12 lbs.; S ;  reach, see text ;GoG
Bladed scarf ; 12 gp ;  1d4 ;1d6 ;X2 ; - ;  2 lbs. ; S ;  disarm, trip  ;  ISWG
Totem spear ;  25 gp  ; 1d8 ;1d10  ;  x3 ; 10 ft. ; 6 lbs. ; P or S ; see text  ;  CRB
Two-bladed sword ;  100 gp;  1d6/1d6; 1d8/1d8 ;19-20/X2 ;   -   ;10 lbs.; S  ; double ; CRB
Dwarven urgrosh  ;  50 gp  ; 1d6/1d4 ;1d8/1d6 ;x3 ; - ;  12 lbs. ;P or S  ;brace, double  ; CRB
"""
exotic_ranged="""Bola ; 5 gp ;   1d3 ;1d4; X2 ; 10 ft.;  2 lbs. ; B ;  nonlethal, trip; CRB
Brutal bola ;   15 gp;   1d3 ;1d4; X2 ; 10 ft.;  2 lbs.;  B and P ;trip  ;  ISWG
Boomerang ;  3 gp  ;  1d4; 1d6; X2;  30 ft.;  3 lbs.;  B  ; -   ;APG
Thorn bow ; 50 gp ;  1d4 ;1d6 ;x3 ; 40 ft. ; 2 lbs. ; P  ; - ;  AA
Double crossbow ;   300 gp  ;1d6 ;1d8 ;19-20/X2 ;   80 ft. ; 18 lbs.; P  ; -  ; APG
Hand crossbow;100 gp ; 1d3 ;1d4; 19-20/X2;    30 ft.;  2 lbs.;  P ;  -  ; CRB
Launching crossbow;75 gp ;  -;   -;   -;   30 ft.;  8 lbs.;  -   ;see text  ;  AA
Repeating heavy crossbow ;  400 gp;  1d8 ;1d10  ;  19-20/X2  ;  120 ft.; 12 lbs.; P  ; -  ; CRB
Repeating crossbow; 250 gp  ;1d6; 1d8; 19-20/X2;    80 ft.  ;6 lbs.;  P ;  -  ; CRB
Flask Thrower  ; 25 gp ;  - ;  -   ;- ;  20 ft. ; 4 lbs. ; -;   see text ;  GoG
Grappling hook ; 6 gp  ;  1d4 ;1d6 ;X2 ; 10 ft. ; 14 lbs. ;P  ; grapple ;PoIS
Lasso   ;1 sp ;   - ;  -  ; -  ; - ;  5 lbs. ; - ;  see text  ;  APG
Net ;20 gp ;  - ;  -  ; -  ; 10 ft. ; 6 lbs. ; - ;  -  ; CRB
Throwing shield ;  +50 gp ; 1d4 ;1d6 ;X2 ; 20 ft. ; - ;  B ;  performance, trip ;  UC
Shrillshaft javelin ;35 gp ;  1d4 ;1d6; X2 ; 30 ft. ; 3 lbs.;  P  ; see text  ;  GoG
Shuriken (5)   ; 1 gp  ;  1   ;1d2; X2;  10 ft.;  1/2 lbs.;    P ;  monk   ; CRB
Double sling ; 10 gp ;  1d3 ;1d4; X2;  50 ft.;  1 lb. ;  B   ;double, see text ;   HoG
Sling glove ;5 gp  ;  1d3 ;1d4; X2 ; 50 ft.;  2 lbs. ; B ;  - ;  AA
Halfling sling staff; 20 gp ;  1d6 ;1d8; x3;  80 ft. ; 3 lbs. ; B ;  -;   CRB
Stitched sling; - ;  1d4 ;1d6 ;X2 ; -  ; 1 lb. ;  B  ; disarm, trip ;   HoG
"""

exotic_ammunition="""Repeating crossbow bolt (5) ;   1 gp  ;  -  ; - ;  -  ; -  ; 1 lb.  ; - ;  - ;  CRB
Little starstones (10) ;5 cp ;   1 ;  1  ; - ;  -  ; 2 lbs. ; B;   nonlethal;   HoG
Sharpstones (10)  ; 1 gp  ;  1d3 ;1d4 ;- ;  - ;  5 lbs. ; P or S ; - ;  HoG
Softstones (10); 1 sp ;   -;   -  ; - ;  - ;  4 lbs.;  B ;  nonlethal ;  HoG
Spongestones (10) ;  10 gp;   -;   -  ; -  ; -  ; 2 lbs.;  P  ; -;   HoG
Thorn (20) ;1 gp ;   - ;  - ;  -  ; - ;  1 lb. ;  - ;  - ;  W1"""

early_one_handed_firearms = """Buckler gun ; 750 gp ; 1d4 ; 1d6 ; x4 ; 10 ft. ; 1 (5 ft.) ; 2 ; 6 lbs. ; B and P ; - ; UC
Pepperbox ; 3000 gp ; 1d6 ; 1d8 ; x4 ; 20 ft. ; 1-2 (5 ft.) ; 6 ; 5 lbs. ; B and P ; - ; UC
Pistol ; 1000 gp ; 1d6 ; 1d8 ; x4 ; 20 ft. ; 1 (5 ft.) ; 1 ; 4 lbs. ; B and P ; - ; UC
Pistol, coat ; 750 gp ; 1d3 ; 1d4 ; x3 ; 10 ft. ; 1 (5 ft.) ; 1 ; 1 lb. ; B and P ; - ; UC
Pistol, dagger ; 740 gp ; 1d3 ; 1d4 ; x3 ; 10 ft. ; 1 (5 ft.) ; 1 ; 1 lb. ; B and P ; - ; UC
Pistol, double-barreled ; 1750 gp ; 1d6 ; 1d8 ; x4 ; 20 ft. ; 1-2 (5 ft.) ; 2 ; 5 lbs. ; B and P ; - ; UC
Pistol, dragon ; 1000 gp ; 1d4 ; 1d6 ; x4 ; 20 ft. ; 1-2 (5 ft.) ; 1 ; 3 lbs. ; B and P ; scatter ; UC
Pistol, sword cane ; 775 gp ; 1d3 ; 1d4 ; x3 ; 10 ft. ; 1 (5 ft.) ; 1 ; 1 lb. ; B and P ; - ; UC"""

early_two_handed_firearms = """Blunderbuss ; 2000 gp ; 1d6 ; 1d8 ; x2 ; special ; 1-2 (10 ft.) ; 1 ; 8 lbs. ; B and P ; scatter ; UC
Culverin ; 4000 gp ; 2d6 ; 2d8 ; x4 ; 30 ft. ; 1 (10 ft.) ; 1 ; 40 lbs. ; B and P ; scatter ; UC
Double hackbut ; 4000 gp ; 2d10 ; 2d12 ; x4 ; 50 ft. ; 1-2 (5 ft.) ; 2 ; 18 lbs. ; B and P ; - ; UC
Fire lance ; 25 gp ; 1d4 ; 1d6 ; x4 ; 10 ft. ; 1-4 (5 ft.) ; 1 ; 4 lbs. ; P ; - ; UC
Musket ; 1500 gp ; 1d10 ; 1d12 ; x4 ; 40 ft. ; 1-2 (5 ft.) ; 1 ; 9 lbs. ; B and P ; - ; UC
Musket, axe ; 1600 gp ; 1d6 ; 1d8 ; x4 ; 30 ft. ; 1-2 (5 ft.) ; 1 ; 6 lbs. ; B and P ; - ; UC
Musket, double-barreled ; 2500 gp ; 1d10 ; 1d12 ; x4 ; 40 ft. ; 1-3 (5 ft.) ; 2 ; 11 lbs. ; B and P ; - ; UC
Musket, warhammer ; 1600 gp ; 1d6 ; 1d8 ; x4 ; 30 ft. ; 1-2 (5 ft.) ; 1 ; 6 lbs. ; B and P ; - ; UC"""

advanced_one_handed_firearms = """Revolver ; 4000 gp ; 1d6 ; 1d8 ; x4 ; 20 ft. ; 1 ; 6 ; 4 lbs. ; B and P ; - ; UC"""

advanced_two_handed_firearms = """Rifle ; 5000 gp ; 1d8 ; 1d10 ; x4 ; 80 ft. ; 1 ; 1 ; 12 lbs. ; B and P ; - ; UC
Rifle, pepperbox ; 7000 gp ; 1d8 ; 1d10 ; x4 ; 80 ft. ; 1-2 ; 4 ; 15 lbs. ; B and P ; - ; UC
Shotgun ; 5000 gp ; 1d6 ; 1d8 ; x2 ; 20 ft. ; 1-2 ; 1 ; 12 lbs. ; B and P ; scatter ; UC
Shotgun, double-barreled ; 7000 gp ; 1d6 ; 1d8 ; x2 ; 20 ft. ; 1-2 ; 2 ; 15 lbs. ; B and P ; scatter ; UC"""

firearm_gear = """Alchemical cartridge, dragon’s breath ; 40 gp ; - ; - ; - ; - ; -; - ; - ; - ; - ; UC
Alchemical cartridge, entangling shot ; 40 gp ; - ; - ; - ; - ; -; - ; - ; - ; - ; UC
Alchemical cartridge, flare ; 10 gp ; - ; - ; - ; - ; -; - ; - ; - ; - ; UC
Alchemical cartridge, paper (bullet or pellet) ; 12 gp ; - ; - ; - ; - ; -; - ; - ; - ; - ; UC
Alchemical cartridge, salt shot ; 12 gp ; - ; - ; - ; - ; -; - ; - ; - ; - ; UC
Black powder (dose) ; 10 gp ; - ; - ; - ; - ; -; - ; - ; - ; - ; UC
Black powder (keg) ; 1000 gp ; - ; - ; - ; - ; 5 lbs.; - ; - ; - ; - ; UC
Firearm bullet (1) ; 1 gp ; - ; - ; - ; - ; -; - ; - ; - ; - ; UC
Firearm bullet (30) ; 30 gp ; - ; - ; - ; - ; 1/2 lb. ; - ; - ; - ; - ; UC
Bullet, adamantine ; 61 gp ; - ; - ; - ; - ; -; - ; - ; - ; - ; UC
Firearm bullet, pitted ; 5 gp ; - ; - ; - ; - ; -; - ; - ; - ; - ; UC
Firearm bullet, silver ; 25 gp ; - ; - ; - ; - ; -; - ; - ; - ; - ; UC
Metal cartridge ; 15 gp ; - ; - ; - ; - ; -; - ; - ; - ; - ; UC
Pellets (handful) ; 1 gp ; - ; - ; - ; - ; -; - ; - ; - ; - ; UC
Pellets (30 handfuls) ; 30 gp ; - ; - ; - ; - ; 1/2 lb. ; - ; - ; - ; - ; UC
Powder horn ; 3 gp ; - ; - ; - ; - ; 1 lb. ; - ; - ; - ; - ; UC"""

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

def weapon(name,cost,price_unit,dmg_s,dmg_m,crit,range,weight,type,special,source,proficiency,weapontype, mwk, misfire, capacity):
    if cost == "-":
        cost = 0
        price_unit = "gp"
    effectiveName = ("Mwk " + name) if mwk else name
    result = {
        "Name": effectiveName,
        "id": slugify(effectiveName),
        "Group": "Weapon",
        "WeaponType":weapontype,
        "Proficiency":proficiency,
        "Price": float(cost) + (300 if mwk else 0),
        "PriceUnit": price_unit,
        "CL" : 0,
        "DmgS":dmg_s,
        "DmgM":dmg_m,
        "Crit":crit,
        "Range":range,
        "Weight":weight,
        "DamageType":type,
        "Special":special,
        "Source":source,
        "Mwk":mwk,
        "Description": getDescription(slugify(name))
    }
    if misfire is not None:
        result["Misfire"] = misfire
    if capacity is not None:
            result["Capacity"] = capacity
    return result

def parseTable(text,proficiency,weapontype):
    table = []
    for line in text.splitlines():
        splitted = line.split(";")
        if len(splitted) != 10 and (proficiency == "firearm" and len(splitted) != 12):
            raise ValueError("invalid line : "+ line)
        name = splitted[0].strip()
        price = splitted[1].split()
        cost = price[0].strip()
        if len(price) >1: 
            price_unit = splitted[1].split()[1].strip()
        else:
            price_unit = "gp"
        dmg_s = splitted[2].strip()
        dmg_m = splitted[3].strip()
        crit = splitted[4].strip()
        range = splitted[5].strip()
        if proficiency == "firearm":
            misfire = splitted[6].strip()
            capacity = splitted[7].strip()
            weight =  splitted[8].strip()
            type = splitted[9].strip()
            special = splitted[10].strip()
            source = splitted[11].strip()
        else:
            misfire = None;
            capacity = None;
            weight =  splitted[6].strip()
            type = splitted[7].strip()
            special = splitted[8].strip()
            source = splitted[9].strip()
        if weapontype != 'ammunition':
            table.append(weapon(name,cost,price_unit,dmg_s,dmg_m,crit,range,weight,type,special,source,proficiency,weapontype, True, misfire, capacity))
            # print table[-1]["Name"]
        table.append(weapon(name,cost,price_unit,dmg_s,dmg_m,crit,range,weight,type,special,source,proficiency,weapontype, False, misfire, capacity))
        # print table[-1]["Name"]
    return table

if __name__ == "__main__":
    table=[] 
    table += parseTable(simple_light,"simple","light")
    table += parseTable(simple_one_handed,"simple","one-handed")
    table += parseTable(simple_two_handed,"simple","two-handed")
    table += parseTable(simple_ranged,"simple","ranged")
    table += parseTable(simple_ammunition,"simple","ammunition")
    table += parseTable(martial_light,"martial","light")
    table += parseTable(martial_one_handed,"martial","one-handed")
    table += parseTable(martial_two_handed,"martial","two-handed")
    table += parseTable(martial_ranged,"martial","ranged")
    table += parseTable(martial_ammunition,"martial","ammunition")
    table += parseTable(exotic_light,"exotic","light")
    table += parseTable(exotic_one_handed,"exotic","one-handed")
    table += parseTable(exotic_two_handed,"exotic","two-handed")
    table += parseTable(exotic_ranged,"exotic","ranged")
    table += parseTable(exotic_ammunition,"exotic","ammunition")
    table += parseTable(early_one_handed_firearms,"firearm","firearm")
    table += parseTable(early_two_handed_firearms,"firearm","firearm")
    table += parseTable(advanced_one_handed_firearms,"firearm","firearm")
    table += parseTable(advanced_two_handed_firearms,"firearm","firearm")
    table += parseTable(firearm_gear,"firearm","ammunition")
    string = json.dumps(table, indent=4, sort_keys=True)
    with open("../data/items/weapons.json", "w") as f:
        f.write(string)
    