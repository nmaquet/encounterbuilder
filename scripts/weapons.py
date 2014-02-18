#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

simple_light="""Gauntlet;   2 gp;   1d2 ;1d3;   X2; -   ;1 lb.; B   ;-  ;CRB
Unarmed strike;  0 gp;   1d2 ;1d3 ;X2 ; -  ; -  ; B ;  nonlethal  ; CRB
Battle aspergillum ; 5 gp ;   1d4; 1d6; X2 ; -  ; 4 lb.;   B ;  see text ;   APG
Brass knife ;2 gp  ;  1d3 ;1d4; 19-20/X2  ;  10 ft.;  1 lb. ;  P or S  ;fragile; PoIS
Brass knuckles ; 1 gp  ;  1d2 ;1d3; X2 ; - ;  1 lb. ;  B  ; monk ;   AA / APG
Cestus ; 5 gp  ;  1d3 ;1d4; 19-20/X2 ;   -  ; 1 lb.  ; B or P ; monk ;   APG
Dagger ; 2 gp  ;  1d3 ;1d4; 19-20/X2  ;  10 ft.;  1 lb. ;  P or S;  - ;  CRB
Dagger, punching  ;  2 gp ;   1d3;1d4 ;x3 ; -;   1 lb. ;  P  ; -  ; CRB
Gauntlet, spiked  ;  5 gp  ;  1d3 ;1d4 ;X2 ; - ;  1 lb. ;  P ;  - ;  CRB
Hook hand  ; 10 gp;   1d3; 1d4; X2 ; -  ; 1 lb. ;  S;   disarm;  PoIS
Mace, light ;5 gp ;   1d4; 1d6 ;X2 ; -  ; 4 lbs.;  B  ; -  ; CRB
Sickle  ;6 gp  ;  1d4 ;1d6 ;X2 ; -  ; 2 lbs.;  S;   trip  ;  CRB
Wooden stake   ; -  ; 1d3 ;1d4 ;X2 ; 10 ft.  ;1 lb.;   P;   - ;  APG
"""
simple_one_handed="""Club ;   - ;  1d4; 1d6; X2 ; 10 ft. ; 3 lbs. ; B  ; - ;  CRB
Club, mere  ;2 gp ;   1d3; 1d4; X2;  -  ; 2 lbs.  ;B or P  ;fragile ;AA
Mace, heavy ;12 gp  ; 1d6 ;1d8; X2 ; - ;  8 lbs. ; B  ; -  ; CRB
Morningstar; 8 gp  ;  1d6; 1d8; X2 ; -   ;6 lbs.;  B and P; -  ; CRB
Shortspear  ;1 gp  ;  1d4; 1d6 ;X2  ;20 ft. ; 3 lbs.;  P  ; -  ; CRB
"""
simple_two_handed="""Bayonet; 5 gp ;   1d4; 1d6; X2 ; - ;  1 lb.;   P  ; - ;  APG
Boarding pike ; 8 gp  ;  1d6 ;1d8; x3;  -  ; 9 lbs.;  P ;  brace, reach ;   PoIS
Longspear ;  5 gp ;   1d6 ;1d8 ;x3 ; -  ; 9 lbs. ; P ;  brace, reach ;   CRB
Quarterstaff   ; 0 gp ;  1d4/1d4 ;1d6/1d6; X2 ; -  ; 4 lbs.  ;B  ; double, monk  ;  CRB
Spear ;  2 gp  ;  1d6 ;1d8; x3 ; 20 ft.;  6 lbs.;  P   ;brace ;  CRB
Spear, boar ;5 gp  ;  1d6 ;1d8 ;X2 ; - ;  8 lb.  ; P  ; brace, see text; APG
"""
simple_ranged="""Blowgun; 2 gp ;   1 ;  1d2; X2 ; 20 ft.;  1 lb. ;  P  ; -  ; CRB
Crossbow, heavy ;50 gp  ; 1d8; 1d10  ;  19-20/X2 ;   120 ft.; 8 lbs. ; P ;  - ;  CRB
Crossbow, heavy (underwater) ;   100 gp ; 1d8 ;1d10 ;   19-20/X2;    120 ft. ;8 lbs.  ;P  ; - ;  ARG
Crossbow, light; 35 gp  ; 1d6 ;1d8 ;19-20/X2;    80 ft.;  4 lbs.;  P ;  - ;  CRB
Crossbow, light (underwater) ;   70 gp ;  1d6; 1d8; 19-20/X2;    80 ft. ; 4 lbs. ; P ;  - ;  ARG
Dart  ;  5 sp  ;  1d3 ;1d4; X2;  20 ft.;  1/2 lb.; P  ; - ;  CRB
Javelin ;1 gp   ; 1d4 ;1d6; X2 ; 30 ft. ; 2 lbs.;  P   ;-  ; CRB
Sling  ; 0 gp  ; 1d3 ;1d4 ;X2  ;50 ft.;  - ;  B  ; -  ; CRB
Stingchuck ; 0 gp ;  1d3 ;1d4 ;X2 ; 10 ft. ; 9 lbs.;  B  ; see text  ;  AA
"""
simple_ammunition="""Bolt(s), crossbow (10) ; 1 gp ;   - ;  -  ; -  ; -  ; 1 lb. ;  -  ; - ;  CRB
Bolt(s), acid (1)   ;40 gp ;  -  ; - ;  -  ; - ;  0.1 lb. ;-  ; see text;    AP15
Bolt(s), Drow poison (1)  ;  100 gp  ;- ;  -  ; -  ; - ;  0.1 lb. ;- ;  see text;    AP15
Bolt(s), fire (1);   50 gp ;  - ;  -  ; -  ; - ;  0.1 lb.; -  ; see text  ;  AP15
Bullet(s), groaning (10) ;   2 gp   ; - ;  - ;  - ;  - ;  5 lbs. ; -  ; see text ;   AA
Bullet(s), sling (10)  ; 1 sp ;   -;  -  ; - ;  - ;  5 lbs. ; - ;  -  ; CRB
Bullet(s), smoke (10)  ; 100 gp  ;-  ; -  ; -;   -;   5 lbs. ; -  ; see text ;   PCS
Dart(s), blowgun (10)  ; 5 sp  ;  - ;  -   ;-  ; - ;  1 lb. ;  -  ; - ;  CRB
"""
martial_light="""Axe, boarding ;  6 gp  ;  1d4; 1d6 ;x3 ; -   ;3 lbs. ; P or S  ;-  ; PoIS
Axe, throwing ;  8 gp   ; 1d4 ;1d6 ;X2  ;10 ft.  ;2 lbs. ; S   ;-  ; CRB
Blade boot ; 25 gp ;  1d3 ;1d4 ;X2  ;-  ; 2 lbs. ; P  ; see text;    AA
Cat-o'-nine-tails ;  1 gp   ; 1d3 ;1d4; X2 ; -  ; 1 lb.  ; S ;  disarm, nonlethal ;  PoIS
Dogslicer  ; 8 gp ;   1d4 ;1d6 ;19-20/X2 ;   -  ; 1 lb.  ; S ;  fragile ;ARG
Hammer, light ;  1 gp ;   1d3 ;1d4; X2 ; 20 ft.;  2 lbs.;  B  ; -  ; CRB
Gladius ;15 gp ;  1d4 ;1d6 ;19-20/X2  ;  -  ; 3 lbs.;  P or S;  performance; UC
Handaxe ;6 gp ;   1d4 ;1d6 ;x3  ;- ;  3 lbs. ; S  ; -  ; CRB
Knife, switchblade  ;5 gp  ;  1d3; 1d4; 19-20/X2 ;   10 ft. ; 1 lb.;   P  ; - ;  AA
Kobold tail attachment, Long lash ;  15 gp ;  1d4; 1d6 ;X2 ; -  ; 1 lb.;   S ;  reach ;  ARG
Kobold tail attachment, Pounder ;1 gp  ;  1d6; 1d8 ;X2;  -  ; 4 lbs.;  B ;  - ;  ARG
Kobold tail attachment, Razored; 3 gp ;   1d6; 1d8 ;19-20/X2  ;  - ;  2 lbs.;  S ;  - ;  ARG
Kobold tail attachment, Spiked  ;3 gp ;   1d6 ;1d8 ;X3  ;-  ; 2 lbs.;  P  ; - ;  ARG
Kobold tail attachment, Sweeper ;7 gp  ;  1d4 ;1d6; X2 ; - ;  3 lbs. ; B ;  trip  ;  ARG
Kukri  ; 8 gp ;   1d3 ;1d4 ;18-20/x2  ;  -;   2 lbs.;  S ; -  ; CRB
Pick, light ;4 gp ;   1d3 ;1d4 ;x4  ;-  ; 3 lbs.;  P  ; - ;  CRB
Ratfolk tailblade ;  11 gp;   1d2 ;1d3 ;20/X2 ;  - ;  1/2 lb.; S  ; - ;  ARG
Sap ;1 gp ;  1d4; 1d6; X2  ;- ;  2 lbs.;  B;   nonlethal ;  CRB
Sea-knife  ; 8 gp  ;  1d3; 1d4; 19-20/X2   ; -  ; 1 lb. ;  S  ; -  ; ARG
Shield, light wooden  ; 3 gp; 1d2; 1d3; X2  ;- ;  special ;B  ; -  ; CRB
Spiked armor  ;  50 gp; 1d4; 1d6; X2 ; - ;  special ;P  ; -  ; CRB
Spiked shield, light ; 10 gp; 1d3; 1d4 ;X2 ; -  ; special; P ;  - ;  CRB
Starknife  ; 24 gp  ; 1d3; 1d4 ;x3 ; 20 ft. ; 3 lbs.;  P ;  - ;  CRB
Sword, short  ;  10 gp   ;1d4 ;1d6; 19-20/X2;    -   ;2 lbs.  ;P ;  -  ; CRB
War razor ;  8 gp  ;  1d3 ;1d4 ;19-20/X2 ;   -   ;1 lb. ;  S  ; -  ; ISWG
"""
martial_one_handed="""Battleaxe   ;10 gp ;  1d6 ;1d8;x3  ;- ;  6 lbs.  ;S  ; - ;  CRB
Combat scabbard ; 1 gp  ;  1d4  ;  1d6 ;x2 ;  -   ;1 lb. ; B ;  improvised, see text ;    AA
Cutlass ;15 gp  ; 1d4 ;1d6 ;18-20/X2  ;  -  ; 4 lbs. ; S  ; -  ; PoIS
Flail  ; 8 gp ;   1d6 ;1d8 ;X2 ; - ;  5 lbs. ; B  ; disarm, trip ;   CRB
Klar   ; 12 gp ;  1d4 ;1d6 ;X2 ; -;   6 lbs.;  S  ;-  ; ISWG
Longsword ;  15 gp  ; 1d6 ;1d8; 19-20/X2   ; -;   4 lbs.;  S  ; -  ; CRB
Pick, heavy; 8 gp  ;  1d4 ;1d6; x4;  - ;  6 lbs.;  P;   -  ; CRB
Rapier ; 20 gp ;  1d4 ;1d6 ;18-20/X2;    - ;  2 lbs.;  P  ; -  ; CRB
Scabbard, combat (sharpened)  ;  10 gp ;  1d4 ;1d6 ;18-20/X2 ;   - ;  1 lb. ;  S  ; see text   ; AA
Scimitar   ; 15 gp  ; 1d4; 1d6 ;18-20/X2  ;  -  ; 4 lbs.;  S   ;- ;  CRB
Scizore ;20 gp  ; 1d8 ;1d10 ;   X2 ; -  ; 3 lbs. ; P  ; -;   UC
Shield, heavy wooden ; 7 gp ;1d3 ;1d4 ;X2;  -  ; special ;B  ; -  ; CRB
Spiked shield, heavy   ; 10 gp; 1d4 ;1d6; X2 ; -  ; special; P ;  - ;  CRB
Sword cane ; 45 gp  ; 1d4 ;1d6; X2 ; - ;  4 lbs.  ;P  ; see text  ;  APG
Terbutje  ;  5 gp  ;  1d6 ;1d8 ;19-20/X2  ;  -   ;2 lbs. ; S ;  fragile; AA
Terbutje, steel; 20 gp ;  1d6 ;1d8; 19-20/X2    ;- ;  4 lbs. ; S ;  - ;  AA
Trident ;15 gp ;  1d6 ;1d8 ;X2  ;10 ft.;  4 lbs.;  P ;  brace ;  CRB
Warhammer   ;12 gp ;  1d6 ;1d8; x3 ; -  ; 5 lbs. ; B  ; -  ; CRB
"""
martial_two_handed="""Bardiche ;   13 gp ;  1d8; 1d10 ;   19-20/X2 ;   -;   14 lbs.; S  ; brace, reach, see text ; APG
Bec de corbin ;  15 gp ;  1d8 ;1d10  ;  x3  ;-  ; 12 lbs.; B or P;  brace, reach, see text ; APG
Bill   ; 11 gp  ; 1d6 ;1d8 ;x3 ; - ;  11 lbs. ;S ;  brace, disarm, reach, see text ; APG
Earth breaker ;  40 gp ;  1d10  ;  2d6; x3 ; -  ; 14 lbs. ;B  ; - ;  ISWG
Falchion ;   75 gp ;  1d6; 2d4 ;18-20/X2   ; - ;  8 lbs.;  S  ; - ;  CRB
Flail, heavy  ;  15 gp  ; 1d8 ;1d10 ;   19-20/X2;    -;   10 lbs.; B;   disarm, trip ;   CRB
Glaive ; 8 gp  ;  1d8 ;1d10 ;   x3  ;-  ; 10 lbs.; S  ; reach   ;CRB
Glaive-guisarme ;12 gp  ; 1d8; 1d10 ;   x3 ; - ;  10 lbs.; S  ; brace, reach, see text ; APG
Greataxe   ; 20 gp ;  1d10 ;   1d12   ; x3  ;-  ; 12 lbs.; S ;  - ;  CRB
Greatclub ;  5 gp  ;  1d8 ;1d10 ;   X2 ; - ;  8 lbs.;  B ;  - ;  CRB
Greatsword ; 50 gp ;  1d10  ;  2d6 ;19-20/X2;    - ;  8 lbs.;  S  ; -;   CRB
Guisarme  ;  9 gp  ;  1d6; 2d4 ;x3 ; - ;  12 lbs.; S ;  reach, trip ;CRB
Halberd ;10 gp ;  1d8 ;1d10  ;  x3 ; - ;  12 lbs. ;P or S ; brace, trip; CRB
Hammer, lucerne ;15 gp;   1d10 ;   1d12 ;   X2 ; - ;  12 lbs.; B or P ; brace, reach, see text ; APG
Horsechopper    ;10 gp  ; 1d8 ;1d10 ;   x3;  - ;  12 lbs.; P or S;  reach, trip ;ARG
Lance  ; 10 gp ;  1d6 ;1d8 ;x3 ; -  ; 10 lbs. ;P ;  reach ;  CRB
Ogre hook  ; 24 gp ;  1d8; 1d10  ;  x3  ;- ;  10 lbs.; P ;  trip ;   ISWG
Pickaxe ;14 gp;  1d6; 1d8; x4 ; - ;  12 lbs.; P  ; - ;  AP14
Ranseur ;10 gp;   1d6 ;2d4 ;x3  ;- ;  12 lbs.; P  ; disarm, reach  ; CRB
Scythe ; 18 gp  ; 1d6 ;2d4 ;x4 ; -  ; 10 lbs.; P or S ; trip ;   CRB
Spear, syringe ; 100 gp ; 1d6 ;1d8 ;x3 ; 20 ft.;  6 lbs.;  P  ; brace, see text; AA
"""
martial_ranged="""Ammentum  ;  -;   1d4 ;1d6 ;X2 ; 50 ft. ; 1 lb. ;  P;   performance ;UC
Chakram ;1 gp  ;  1d6; 1d8 ;X2;  30 ft. ; 1 lb. ;  S ;  - ;  APG
Dart, jolting ;  100 gp;  1d3; 1d4; X2 ; 20 ft.;  1/2 lb.; P  ; see text ;   ARG
Hunga munga ;4 gp  ;  1d4; 1d6 ;X2  ;15 ft. ; 3 lbs. ; P ;  - ;  AA
Longbow ;75 gp  ; 1d6; 1d8; x3  ;100 ft.; 3 lbs.;  P  ; -  ; CRB
Longbow, composite ; 100 gp ; 1d6 ;1d8; x3;  110 ft. ;3 lbs. ; P ;  - ;  CRB
Pilum   ;5 gp ;   1d6 ;1d8 ;X2  ;20 ft. ; 4 lbs.;  P;   see text ;   APG
Shortbow   ; 30 gp ;  1d4 ;1d6 ;x3 ; 60 ft. ; 2 lbs. ; P ;  - ;  CRB
Shortbow, composite ;75 gp  ; 1d4 ;1d6; x3;  70 ft.;  2 lbs. ; P ;  - ;  CRB
"""
martial_ammunition="""Arrow(s), common (20) ;  1 gp  ;  - ;  - ;  - ;  -  ; 3 lbs.  ;P ;  -  ; CRB
Arrow(s), bleeding (1) ; 360 gp ; see text  ;  see text  ;  see text  ;  see text ;   see text    ;see text ;   see text  ;  EoG
Arrow(s), blunt (20)  ;  2 gp ;   - ;  -  ; -  ; - ;  3 lbs. ; B   ;see text ;   APG
Arrow(s), durable (1) ;  1 gp   ; see text ;   see text ;  see text  ;  see text   ; see text ;   see text   ; see text ;   EoG
Arrow(s), dye (1) ;  1 gp  ;  see text  ;  see text;    see text   ; see text ;   4 lbs.;  -  ; see text   ; EoG
Arrow(s), flight (20) ;  2 gp   ; -;   - ;  -  ; see text ;   3 lbs. ; P  ; see text  ;  APG
Arrow(s), lodestone (1); 10 gp  ; see text  ;  see text  ;  see text  ;  see text ;   see text ;   see text;    see text  ;  EoG
Arrow(s), pheromone (1);15 gp ;  see text;    see text    ;see text ;   see text  ;  see text   ; see text  ;  see text ;   EoG
Arrow(s), raining (1)  ; 30 gp  ; see text ;   see text  ;  see text   ; see text   ; see text ;   see text  ;  see text  ;  EoG
Arrow(s), slow burn (1) ;150 gp ; see text   ; see text ;   see text ;   see text  ;  see text ;   see text  ;  see text  ;  EoG
Arrow(s), smoke (1) ;10 gp;   -  ; -  ; -;   - ;  -  ; P   ;see text   ; APG
Arrow(s), splintercloud (1); 25 gp  ; see text  ;  see text   ; see text ;   see text;    see text ;   see text ;   see text  ;  EoG
Arrow(s), tanglefoot (1)   ; 20 gp  ; see text   ; see text ;   see text ;   see text ;   see text   ; see text   ; see text   ; EoG
Arrow(s), thistle (1) ;  1 gp  ;  -;   -  ; - ;  -  ; 0.15 lbs  ;  P  ; see text  ;  AA
Arrow(s), trip (1);  25 gp ;  see text ;   see text   ; see text ;   see text ;   see text  ;  see text  ;  see text  ;  EoG
Arrow(s), whistling (20)   ; 2 gp ;   -;   -  ; -   ;-  ; 3 lbs.  ;-;   - ;  UC
"""
exotic_light="""
Light Melee Weapons Cost    Dmg (S) Dmg (M) Critical    Range   Weight1 Type2   Special Source
Aklys   5 gp    1d6 1d8 X2  20 ft.  2 lbs.  B   performance, trip   UC
Axe, knuckle    9 gp    1d4 1d6 x3  -   2 lbs.  S   monk, performance   UC
Barbazu beard   25 gp   1d3 1d4 X2  -   5 lbs   S   see text    Cheliax
Battle poi  5 gp    1d3 fire    1d4 fire    X2  -   2 lbs.  fire    -   AA
Dagger, swordbreaker    10 gp   1d3 1d4 X2  -   3 lbs.  S   disarm, sunder  APG
Flying Talon    15 gp   1d3 1d4 X2  10 ft.  5 lbs.  P   disarm, trip    D1
Helmet, dwarven boulder 20 gp   1d3 1d4 X2  -   10 lbs. B   see text    ARG
Kama    2 gp    1d4 1d6 x2  -   2 lbs.  S   monk, trip  CRB
Katar, tri-bladed   6 gp    1d3 1d4 x4  -   2 lbs.  P   -   PCS
Knife, butterfly    5 gp    1d3 1d4 19-20/X2    -   1 lb.   P or S  -   AA
Maulaxe, dwarven    25 gp   1d4 1d6 x3  10 ft.  5 lbs.  B or S  -   AA
Nunchaku    2 gp    1d4 1d6 x2  -   2 lbs.  B   disarm, monk    CRB
Quadrens    8 gp    1d4 1d6 19-20/X2    -   2 lbs.  P   performance UC
Rope gauntlet   2 sp    1d3 1d4 X2  -   2 lbs.  B (or S)    -   AA
Sai 1 gp    1d3 1d4 x2  -   1 lb.   B   disarm, monk    CRB
Siangham    3 gp    1d4 1d6 x2  -   1 lb.   P   monk    CRB
Sica    10 gp   1d4 1d6 X2  -   2 lbs.  S   performance UC
Thorn bracer    30 gp   1d4 1d6 X2  -   3 lbs.  P   -   PCS
Whip, scorpion  5 gp    1d3 1d4 X2  -   3 lbs.  S   disarm, performance, reach, trip    UC
"""
exotic_one_handed="""
One-Handed Melee Weapons    Cost    Dmg (S) Dmg (M) Critical    Range   Weight1 Type2   Special Source
Axe, hooked 20 gp   1d6 1d8 x3  -   7 lbs.  S   disarm, performance, trip   UC
Falcata 18 gp   1d6 1d8 19-20/x3    -   4 lbs.  S   -   APG
Flindbar    ?   1d6 1d8 ?   -   ?   B   disarm  CMR
Khopesh 20 gp   1d6 1d8 19-20/X2    -   8 lbs.  S   trip    APG
Rhoka   5 gp    1d6 1d8 18-20/X2    -   6 lbs.  S   -   AA
Sabre, sawtooth 35 gp   1d6 1d8 19-20/X2    -   2 lbs.  S   -   ISWG
Shotel  30 gp   1d6 1d8 x3  -   3 lbs.  P   performance UC
Sword, dueling  20 gp   1d6 1d8 19-20/X2    -   3 lbs   S   -   ISWG
Sword, bastard  35 gp   1d8 1d10    19-20/X2    -   6 lbs.  S   -   CRB
Waraxe, dwarven 30 gp   1d8 1d10    x3  -   8 lbs.  S   -   CRB
Waraxe, dwarven double  60 gp   1d8 1d10    X3  -   12 lbs. S   see text    ARG
Whip    1 gp    1d2 1d3 X2  -   2 lbs.  S   disarm, nonlethal, reach, trip  CRB
"""
exotic_two_handed="""
Two-Handed Melee Weapons    Cost    Dmg (S) Dmg (M) Critical    Range   Weight1 Type2   Special Source
Axe, Orc Double 60 gp   1d6/1d6 1d8/1d8 x3  -   15 lbs. S   double  CRB
Battle Ladder   20 gp   1d4/1d4 1d6/1d6 X2  -   8 lbs.  B   trip    GoG
Boarding gaff   8 gp    1d4/1d4 1d6/1d6 X2  -   8 lbs.  S   double, reach, trip PoIS
Chain, Spiked   25 gp   1d6     2d4     X2      -   10 lbs. P   disarm, trip    CRB
Curve blade, elven  80 gp   1d8 1d10    18-20/X2    -   7 lbs.  S   -   CRB
Dorn Dergar, dwarven    50 gp   1d8 1d10    X2  -   15 lbs. B   reach   DoG
Fauchard    14 gp   1d8 1d10    18-20/X2    -   10 lbs. S   reach, trip CHR
Flail, dire 90 gp   1d6/1d6 1d8/1d8 X2  -   10 lbs. B   disarm, double, trip    CRB
Flailpole   15 gp   1d6 1d8 X2  -   10 lbs. S   reach, trip GoG
Flambard    50 gp   1d8 1d10    19-20/X2    -   6 lbs.  S   sunder  AA
Flying blade    40 gp   1d10    1d12    x3  -   12 lbs. S   performance, reach  UC
Garrote 3 gp    1d4 1d6 X2  -   1 lb.   S   grapple, see text   AA
Hammer, Gnome hooked    20 gp   1d6/1d4 1d8/1d6 x3/x4   -   6 lbs.  B or P  double, trip    CRB
Harpoon 5 gp    1d6 1d8 x3  10 ft.  16 lbs. P   grapple PoIS
Longaxe, dwarven    50 gp   1d10    1d12    X3  -   14 lbs. S   reach   ARG
Longhammer, dwarven 70 gp   1d10    2d6 X3  -   20 lbs. B   reach   ARG
Mancatcher  15 gp   1   1d2 X2  -   10 lbs. P   grapple, reach, see text    APG
Net, snag   30 gp   see text    see text    -   10 ft.  10 lbs. P   trip, see text  ARG
Piston maul 70 gp   1d8 1d10    X2  -   15 lbs. B   see text    GoG
Ripsaw glaive   30 gp   1d8 1d10    x3  -   12 lbs. S   reach, see text GoG
Scarf, bladed   12 gp   1d4 1d6 X2  -   2 lbs.  S   disarm, trip    ISWG
Spear, totem    25 gp   1d8 1d10    x3  10 ft.  6 lbs.  P or S  see text    CRB
Sword, two-bladed   100 gp  1d6/1d6 1d8/1d8 19-20/X2    -   10 lbs. S   double  CRB
Urgrosh, dwarven    50 gp   1d6/1d4 1d8/1d6 x3  -   12 lbs. P or S  brace, double   CRB
"""
exotic_ranged="""
Ranged Weapons  Cost    Dmg (S) Dmg (M) Critical    Range   Weight1 Type2   Special Source
Bola    5 gp    1d3 1d4 X2  10 ft.  2 lbs.  B   nonlethal, trip CRB
Bola, Brutal    15 gp   1d3 1d4 X2  10 ft.  2 lbs.  B and P trip    ISWG
Boomerang   3 gp    1d4 1d6 X2  30 ft.  3 lbs.  B   -   APG
Bow, thorn  50 gp   1d4 1d6 x3  40 ft.  2 lbs.  P   -   AA
Crossbow, double    300 gp  1d6 1d8 19-20/X2    80 ft.  18 lbs. P   -   APG
Crossbow, hand  100 gp  1d3 1d4 19-20/X2    30 ft.  2 lbs.  P   -   CRB
Crossbow, launching 75 gp   -   -   -   30 ft.  8 lbs.  -   see text    AA
Crossbow, repeating heavy   400 gp  1d8 1d10    19-20/X2    120 ft. 12 lbs. P   -   CRB
Crossbow, repeating 250 gp  1d6 1d8 19-20/X2    80 ft.  6 lbs.  P   -   CRB
Flask Thrower   25 gp   -   -   -   20 ft.  4 lbs.  -   see text    GoG
Grappling hook  6 gp    1d4 1d6 X2  10 ft.  14 lbs. P   grapple PoIS
Lasso   1 sp    -   -   -   -   5 lbs.  -   see text    APG
Net 20 gp   -   -   -   10 ft.  6 lbs.  -   -   CRB
Shield, throwing    +50 gp  1d4 1d6 X2  20 ft.  -   B   performance, trip   UC
Shrillshaft javelin 35 gp   1d4 1d6 X2  30 ft.  3 lbs.  P   see text    GoG
Shuriken (5)    1 gp    1   1d2 X2  10 ft.  1/2 lbs.    P   monk    CRB
Sling, double   10 gp   1d3 1d4 X2  50 ft.  1 lb.   B   double, see text    HoG
Sling glove 5 gp    1d3 1d4 X2  50 ft.  2 lbs.  B   -   AA
Sling staff, halfling   20 gp   1d6 1d8 x3  80 ft.  3 lbs.  B   -   CRB
Sling, stitched -   1d4 1d6 X2  -   1 lb.   B   disarm, trip    HoG
"""
exotic_ammunition="""
Ammunition  Cost    Dmg (S) Dmg (M) Critical    Range   Weight1 Type2   Special Source
Crossbow bolt(s), heavy/light/hand (10) 1 gp    -   -   -   -   1 lb.   -   -   CRB
Crossbow bolt(s), repeating, heavy/light (5)    1 gp    -   -   -   -   1 lb.   -   -   CRB
Little starstones (10)  5 cp    1   1   -   -   2 lbs.  B   nonlethal   HoG
Sharpstones (10)    1 gp    1d3 1d4 -   -   5 lbs.  P or S  -   HoG
Softstones (10) 1 sp    -   -   -   -   4 lbs.  B   nonlethal   HoG
Spongestones (10)   10 gp   -   -   -   -   2 lbs.  P   -   HoG
Thorn (20)  1 gp    -   -   -   -   1 lb.   -   -   W1"""

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
    
def weapon(name,cost,price_unit,dmg_s,dmg_m,crit,range,weight,type,special,source,proficiency,weapontype):
    if cost == "-":
        cost = 0
        price_unit = "gp"
    result = {
        "Name": name,
        "id": slugify(name),
        "Group": "Weapon",
        "WeaponType":weapontype,
        "Proficiency":proficiency,
        "Price": float(cost),
        "PriceUnit": price_unit,
        "CL" : 0,
        "DmgS":dmg_s,
        "DmgM":dmg_m,
        "Crit":crit,
        "Range":range,
        "Weight":weight,
        "DamageType":type,
        "Special":special,
        "Source":source
    }
    return result

def parseTable(text,proficiency,weapontype):
    table = []
    for line in text.splitlines():
        #print(line)
        splitted = line.split(";")
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
        weight =  splitted[6].strip()
        type = splitted[7].strip()
        special = splitted[8].strip()
        source = splitted[9].strip()
        table.append(weapon(name,cost,price_unit,dmg_s,dmg_m,crit,range,weight,type,special,source,proficiency,weapontype))
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
    string = json.dumps(table, indent=4, sort_keys=True)
    with open("../data/items/weapons.json", "w") as f:
        f.write(string)
    