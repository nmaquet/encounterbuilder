# Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

﻿#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

items = {}
items["belt"] = {}
items["body"] = {}
items["chest"] = {}
items["eyes"] = {}
items["feet"] = {}
items["hands"] = {}
items["head"] = {}
items["headband"] = {}
items["neck"] = {}
items["shoulders"] = {}
items["wrists"] = {}
items["slotless"] = {}

items["belt"]["lesser_minor"] = """01-16	Belt of tumbling	800 gp
17-28	Beneficial bandolier	1,000 gp
29-40	Meridian belt	1,000 gp
41-54	Bladed belt	2,000 gp
55-70	Heavyload belt	2,000 gp
71-84	Aquatic cummerbund	2,600 gp
85-100	Equestrian belt	3,200 gp"""

items["belt"]["greater_minor"] = """01-18	Belt of giant strength +2	4,000 gp
19-36	Belt of incredible dexterity +2	4,000 gp
37-54	Belt of mighty constitution +2	4,000 gp
55-62	Belt of teeth	4,000 gp
63-74	Blinkback belt	5,000 gp
75-84	Plague rat belt	5,200 gp
85-100	Belt of foraging	6,000 gp"""

items["belt"]["lesser_medium"] = """01-04	Serpent belt	9,000 gp
05-08	Monkey belt	9,400 gp
09-16	Belt of physical might +2	10,000 gp
17-22	Belt of the weasel	10,000 gp
23-27	Belt of thunderous charging	10,000 gp
28-32	Minotaur belt	11,000 gp
33-36	Plague rat belt, greater	11,200 gp
37-41	Belt of equilibrium	12,000 gp
42-46	Security belt	12,500 gp
47-51	Belt of mighty hurling, lesser	14,000 gp
52-57	Belt of dwarvenkind	14,900 gp
58-61	Cord of stubborn resolve	15,000 gp
62-71	Belt of giant strength +4	16,000 gp
72-80	Belt of physical perfection +2	16,000 gp
81-90	Belt of incredible dexterity +4	16,000 gp
91-100	Belt of mighty constitution +4	16,000 gp"""

items["belt"]["greater_medium"] = """01-12	Monkey belt, greater	18,000 gp
13-26	Anaconda's coils	18,500 gp
27-38	Serpent belt, greater	20,000 gp
39-53	Belt of fallen heroes	21,000 gp
54-67	Gorgon belt	23,000 gp
68-84	Elemental earth belt	24,000 gp
85-100	Sash of flowing water	25,000 gp"""

items["belt"]["lesser_major"] = """01-12	Merform belt	32,000 gp
13-30	Belt of giant strength +6	36,000 gp
31-48	Belt of incredible dexterity +6	36,000 gp
49-66	Belt of mighty constitution +6	36,000 gp
67-88	Belt of physical might +4	40,000 gp
89-100	Belt of mighty hurling, greater	42,000 gp"""

items["belt"]["greater_major"] = """01-25	Belt of stoneskin	60,000 gp
26-55	Belt of physical perfection +4	64,000 gp
56-75	Belt of physical might +6	90,000 gp
76-90	Shadowform belt	110,000 gp
91-100	Belt of physical perfection +6	144,000 gp"""


items["body"]["lesser_minor"] = """01-20	Robe of infinite twine	1,000 gp
21-35	Robe of needles	1,000 gp
36-60	Robe of bones	2,400 gp
61-70	Bodywrap of mighty strikes +1	3,000 gp
71-80	Corset of the vishkanya	3,000 gp
81-100	Druid's vestment	3,750 gp"""

items["body"]["greater_minor"] = """01-15	Cassock of the clergy	4,600 gp
16-30	Mnemonic vestment	5,000 gp
31-45	Robe of components	5,000 gp
46-60	Sorcerer's robe	5,000 gp
61-75	Eidolon anchoring harness	6,000 gp
76-100	Robe of useful items	7,000 gp"""

items["body"]["lesser_medium"] = """01-15	Robe of blending	8,400 gp
16-26	Blazing robe	11,000 gp
27-37	Shocking robe	11,000 gp
38-48	Voidfrost robe	11,000 gp
49-59	Bodywrap of mighty strikes +2	12,000 gp
60-75	Monk's robe	13,000 gp
76-100	Robe of arcane heritage	16,000 gp"""

items["body"]["greater_medium"] = """01-25	Xorn robe	20,000 gp
26-52	Corset of dire witchcraft	22,000 gp
53-76	Bodywrap of mighty strikes +3	27,000 gp
77-100	Robe of scintillating colors	27,000 gp"""

items["body"]["lesser_major"] = """01-40	Gunman's duster	36,000 gp
41-80	Bodywrap of mighty strikes +4	48,000 gp
81-100	Smuggler's collapsible robe	48,000 gp"""

items["body"]["greater_major"] = """01-10	Robe of stars	58,000 gp
11-15	Robe of gates	64,000 gp
16-20	Otherworldly kimono	67,000 gp
21-40	Bodywrap of mighty strikes +5	75,000 gp
41-51	Resplendent robe of the thespian	75,000 gp
52-67	Robe of the archmagi	75,000 gp
68-77	Bodywrap of mighty strikes +6	108,000 gp
78-97	Robe of eyes	120,000 gp
98-100	Bodywrap of mighty strikes +7	147,000 gp"""


items["chest"]["lesser_minor"] = """01-15	Bandages of rapid recovery	200 gp
16-30	Quick runner's shirt	1,000 gp
31-50	Endless bandolier	1,500 gp
51-75	All tools vest	1,800 gp
76-100	Vest of surgery	3,000 gp"""

items["chest"]["greater_minor"] = """01-10	Sash of the war champion	4,000 gp
11-20	Sipping jacket	5,000 gp
21-31	Tunic of careful casting	5,000 gp
32-42	Vest of escape	5,200 gp
43-52	Cackling hag's blouse	6,000 gp
53-62	Deadshot vest	6,000 gp
63-70	Prophet's pectoral	6,000 gp
71-79	Tunic of deadly might	6,000 gp
80-90	Vest of the vengeful tracker	6,000 gp
91-100	Resplendent uniform coat	7,000 gp"""

items["chest"]["lesser_medium"] = """01-13	Shirt of immolation	8,000 gp
14-28	Snakeskin tunic	8,000 gp
29-40	Bane baldric	10,000 gp
41-60	Unfettered shirt	10,000 gp
61-80	Poisoner's jacket, lesser	12,000 gp
81-100	Vest of the cockroach	16,000 gp"""

items["chest"]["greater_medium"] = """01-50	Vest of stable mutation	20,000 gp
51-100	Spectral shroud	26,000 gp"""

items["chest"]["lesser_major"] = """01-60	Mantle of immortality	50,000 gp
61-100	Poisoner's jacket, greater	58,000 gp"""

items["chest"]["greater_major"] = """01-35	Merciful baldric	60,000 gp
36-70	Mantle of faith	76,000 gp
71-100	Mantle of spell resistance	90,000 gp"""


items["eyes"]["lesser_minor"] = """01-18	Deathwatch eyes	2,000 gp
19-38	Eyes of the eagle	2,500 gp
39-58	Goggles of minute seeing	2,500 gp
59-72	Pirate's eye patch	2,600 gp
73-87	Spectacles of understanding	3,000 gp
88-100	Lenses of detection	3,500 gp"""

items["eyes"]["greater_minor"] = """01-20	Eyes of the owl	4,000 gp
21-44	Eyes of keen sight	6,000 gp
45-66	Treasure hunter's goggles	6,400 gp
67-84	Inquisitor's monocle	6,800 gp
85-100	Kinsight goggles	7,500 gp"""

items["eyes"]["lesser_medium"] = """01-16	Goggles of elvenkind	8,500 gp
17-31	Goggles of brilliant light	8,800 gp
32-48	Blind man's fold	12,000 gp
49-67	Goggles of night	12,000 gp
68-82	Lenses of figment piercing	12,000 gp
83-100	Arachnid goggles	15,000 gp"""

items["eyes"]["greater_medium"] = """01-21	Darklands goggles	20,000 gp
22-40	Sniper goggles	20,000 gp
41-58	Rainbow lenses	21,000 gp
59-77	Annihilation spectacles	25,000 gp
78-100	Eyes of doom	25,000 gp"""

items["eyes"]["lesser_major"] = """01-60	Eyes of eyebite	30,000 gp
61-100	Sniper goggles, greater	50,000 gp"""

items["eyes"]["greater_major"] = """01-18	Eyes of charming	56,000 gp
19-34	Monocle of the investigator	66,000 gp
35-48	Sea tyrant's patch	70,000 gp
49-63	Swordmaster's blindfold	80,000 gp
64-77	Mindmaster's eyes	95,000 gp
78-90	Eyes of the dragon	110,000 gp
91-100	Truesight goggles	184,800 gp"""


items["feet"]["lesser_minor"] = """01-11	Boots of the cat	1,000 gp
12-22	Daredevil boots	1,400 gp
23-31	Boots of the enduring march	1,500 gp
32-41	Feather step slippers	2,000 gp
42-50	Boots of friendly terrain	2,400 gp
51-60	Boots of the winterlands	2,500 gp
61-76	Boots of elvenkind	2,500 gp
77-85	Acrobat slippers	3,000 gp
86-92	Horseshoes of speed	3,000 gp
93-100	Boots of the mire	3,500 gp"""

items["feet"]["greater_minor"] = """01-07	Burglar boots, minor	4,000 gp
08-13	Horseshoes of crushing blows +1	4,000 gp
14-19	Sandals of quick reaction	4,000 gp
20-26	Slippers of cloudwalking	4,400 gp
27-40	Slippers of spider climbing	4,800 gp
41-46	Sandals of the lightest step	5,000 gp
47-60	Boots of striding and springing	5,500 gp
61-68	Horseshoes of a zephyr	6,000 gp
69-75	Haunted shoes	6,480 gp
76-82	Jaunt boots	7,200 gp
83-100	Boots of levitation	7,500 gp"""

items["feet"]["lesser_medium"] = """01-08	Boots of escape	8,000 gp
09-14	Earth root boots	8,000 gp
15-21	Nightmare boots	8,500 gp
22-26	Nightmare horseshoes	9,000 gp
27-32	Caltrop boots	10,000 gp
33-39	Tremor boots	10,000 gp
40-47	Boots of the mastodon	10,500 gp
48-54	Shoes of the lightning leaper	10,500 gp
55-70	Boots of speed	12,000 gp
71-77	Verdant boots	12,000 gp
78-84	Horseshoes of crushing blows +2	16,000 gp
85-100	Winged boots	16,000 gp"""

items["feet"]["greater_medium"] = """01-38	Shoes of the firewalker	21,000 gp
39-72	Dryad sandals	24,000 gp
73-100	Horseshoes of the mist	27,000 gp"""

items["feet"]["lesser_major"] = """01-20	Getaway boots	30,000 gp
21-35	Horseshoes of crushing blows +3	36,000 gp
36-55	Horseshoes of glory	39,600 gp
56-75	Burglar boots, major	46,000 gp
76-100	Boots of teleportation	49,000 gp"""

items["feet"]["greater_major"] = """01-40	Slippers of the triton	56,000 gp
41-70	Horseshoes of crushing blows +4	64,000 gp
71-100	Horseshoes of crushing blows +5	100,000 gp"""


items["hands"]["lesser_minor"] = """01-13	Assisting gloves	180 gp
14-22	Claws of the ice bear	1,300 gp
23-34	Gloves of reconnaissance	2,000 gp
35-46	Glowing glove	2,000 gp
47-58	Apprentice's cheating gloves	2,200 gp
59-70	Challenger's gloves	2,200 gp
71-80	Gloves of larceny	2,500 gp
81-90	Healer's gloves	2,500 gp
91-100	Engineer's workgloves	3,000 gp"""

items["hands"]["greater_minor"] = """01-12	Gauntlets of the skilled maneuver	4,000 gp
13-21	Ghostvision gloves	4,000 gp
22-33	Gloves of arrow snaring	4,000 gp
34-43	Trapspringer's gloves	4,000 gp
44-55	Gloves of arcane striking	5,000 gp
56-65	Poisoner's gloves	5,000 gp
66-75	Magnetist's gloves	6,000 gp
76-100	Gloves of swimming and climbing	6,250 gp"""

items["hands"]["lesser_medium"] = """01-02	Deliquescent gloves	8,000 gp
03-05	Form-fixing gauntlets	8,000 gp
06-08	Iron cobra gauntlet	8,000 gp
09-16	Shadow falconer's glove	8,000 gp
17-20	Spellstrike gloves	8,000 gp
21-28	Glyphbane gloves	9,000 gp
29-40	Glove of storing	10,000 gp
41-46	Gloves of shaping	10,000 gp
47-54	Pliant gloves	10,000 gp
55-76	Gauntlet of rust	11,500 gp
77-100	Gloves of dueling	15,000 gp"""

items["hands"]["greater_medium"] = """01-30	Vampiric gloves	18,000 gp
31-65	Giant fist gauntlets	20,000 gp
66-100	Gloves of the shortened path	27,000 gp"""

items["hands"]["lesser_major"] = """01-40	Gloves of the commanding conjurer	30,000 gp
41-100	Gauntlet of rust, greater	34,500 gp"""

items["hands"]["greater_major"] = """01-60	Talons of Leng	67,000 gp
61-100	Gauntlets of the weaponmaster	110,000 gp"""


items["head"]["lesser_minor"] = """01-10	Mask of stony demeanor	500 gp
11-22	Cap of human guise	800 gp
23-36	Cap of light	900 gp
37-56	Hat of disguise	1,800 gp
57-71	Buffering cap	2,000 gp
72-85	Miser's mask	3,000 gp
86-100	Stalker's mask	3,500 gp"""

items["head"]["greater_minor"] = """01-12	Circlet of persuasion	4,500 gp
13-21	Grappler's mask	5,000 gp
22-31	Helm of fearsome mien	5,000 gp
32-40	Jingasa of the fortunate soldier	5,000 gp
41-54	Helm of comprehend languages and read magic	5,200 gp
55-67	Crown of swords	6,000 gp
68-87	Crown of blasting, minor	6,480 gp
88-100	Mask of the krenshar	7,200 gp"""

items["head"]["lesser_medium"] = """01-16	Helm of the mammoth lord	8,500 gp
17-30	Veil of fleeting glances	9,000 gp
31-46	Mask of a thousand tomes	10,000 gp
47-63	Medusa mask	10,000 gp
64-80	Cap of the free thinker	12,000 gp
81-100	Halo of inner calm	16,000 gp"""

items["head"]["greater_medium"] = """01-06	Cat's eye crown	18,000 gp
07-12	Maw of the wyrm	18,000 gp
13-19	Mitre of the hierophant	18,000 gp
20-27	Magician's hat	20,000 gp
28-34	Circlet of mindsight	22,000 gp
35-42	Mask of the skull	22,000 gp
43-50	Howling helm	22,600 gp
51-62	Crown of blasting, major	23,760 gp
63-72	Helm of underwater action	24,000 gp
73-79	Crown of conquest	24,600 gp
80-85	Batrachian helm	26,000 gp
86-94	Helm of telepathy	27,000 gp
95-100	Plague mask	27,000 gp"""

items["head"]["lesser_major"] = """01-14	Iron circlet of guarded souls	30,000 gp
15-29	Laurel of command	30,000 gp
30-45	Mask of giants, lesser	30,000 gp
46-61	Steel-mind cap	33,600 gp
62-78	Stormlord's helm	35,000 gp
79-100	Helm of brilliance, lesser	36,000 gp"""

items["head"]["greater_major"] = """01-14	Judge's wig	59,200 gp
15-39	Helm of teleportation	73,500 gp
40-55	Halo of menace	84,000 gp
56-68	Mask of giants, greater	90,000 gp
69-83	Helm of brilliance	125,000 gp
84-92	Helm of electric radiance	125,000 gp
93-100	Crown of heaven	150,000 gp"""


items["headband"]["lesser_minor"] = """01-60	Phylactery of faithfulness	1,000 gp
61-100	Dead man's headband	3,600 gp"""

items["headband"]["greater_minor"] = """01-09	Headband of alluring charisma +2	4,000 gp
10-18	Headband of inspired wisdom +2	4,000 gp
19-27	Headband of vast intelligence +2	4,000 gp
28-33	Headband of aerial agility +2	4,500 gp
34-39	Shifter's headband +2	4,500 gp
40-45	Headband of ponderous recollection	5,100 gp
46-51	Headband of ki focus	5,400 gp
52-58	Headband of unshakeable resolve	5,600 gp
59-66	Hollywreath band	5,700 gp
67-74	Headband of deathless devotion	6,400 gp
75-82	Phylactery of the shepherd	7,000 gp
83-91	Headband of intuition	7,000 gp
92-100	Headband of fortune's favor	7,700 gp"""

items["headband"]["lesser_medium"] = """01-06	Headband of havoc	8,000 gp
07-12	Serpent's band	9,000 gp
13-20	Headband of mental prowess +2	10,000 gp
21-26	Hunter's band	11,000 gp
27-34	Phylactery of negative channeling	11,000 gp
35-42	Phylactery of positive channeling	11,000 gp
43-48	Veiled eye	12,000 gp
49-54	Band of the stalwart warrior	14,000 gp
55-60	Headband of ninjitsu	15,000 gp
61-68	Headband of alluring charisma +4	16,000 gp
69-76	Headband of inspired wisdom +4	16,000 gp
77-85	Headband of mental superiority +2	16,000 gp
86-93	Headband of vast intelligence +4	16,000 gp
94-100	Shifter's headband +4	17,500 gp"""

items["headband"]["greater_medium"] = """01-30	Headband of arcane energy	20,000 gp
31-70	Headband of counterspelling	20,000 gp
71-100	Headband of knucklebones	27,500 gp"""

items["headband"]["lesser_major"] = """01-09	Soulbound eye	30,000 gp
10-19	Winter wolf headband	32,000 gp
20-32	Headband of alluring charisma +6	36,000 gp
33-45	Headband of inspired wisdom +6	36,000 gp
46-58	Headband of vast intelligence +6	36,000 gp
59-66	Shifter's headband +6	39,000 gp
67-81	Headband of mental prowess +4	40,000 gp
82-90	Headband of seduction	40,000 gp
91-100	Headband of aerial agility +4	42,000 gp"""

items["headband"]["greater_major"] = """01-20	Headband of mental resilience	64,000 gp
21-50	Headband of mental superiority +4	64,000 gp
51-65	Headband of aerial agility +6	81,000 gp
66-85	Headband of metal prowess +6	90,000 gp
86-100	Headband of mental superiority +6	144,000 gp"""


items["neck"]["lesser_minor"] = """01-10	Hand of the mage	900 gp
11-18	Aegis of recovery	1,500 gp
19-25	Amulet of bullet protection +1	1,500 gp
26-37	Brooch of shielding	1,500 gp
38-49	Necklace of fireballs (type I)	1,650 gp
50-63	Amulet of natural armor +1	2,000 gp
64-72	Golembane scarab	2,500 gp
73-82	Necklace of fireballs (type II)	2,700 gp
83-89	Swarmbane clasp	3,000 gp
90-95	Mind sentinel medallion	3,500 gp
96-100	Mummer's ruff	3,500 gp"""

items["neck"]["greater_minor"] = """01-08	Amulet of elemental strife	4,000 gp
09-15	Righteous fist amulet	4,000 gp
16-26	Necklace of fireballs (type III)	4,350 gp
27-36	Amulet of mighty fists +1	5,000 gp
37-47	Necklace of fireballs (type IV)	5,400 gp
48-55	Stormlure	5,400 gp
56-66	Necklace of fireballs (type V)	5,850 gp
67-73	Amulet of bullet protection +2	6,000 gp
74-81	Feychild necklace	6,000 gp
82-89	Carcanet of detention	7,200 gp
90-100	Periapt of health	7,500 gp"""

items["neck"]["lesser_medium"] = """01-08	Amulet of natural armor +2	8,000 gp
09-12	Amulet of proof against petrification	8,000 gp
13-15	Everwake amulet	8,000 gp
16-18	Gravewatch pendant	8,000 gp
19-23	Hand of glory	8,000 gp
24-26	Torc of lionheart fury	8,000 gp
27-33	Necklace of fireballs (type VI)	8,100 gp
34-40	Necklace of fireballs (type VII)	8,700 gp
41-43	Amulet of hidden strength	9,000 gp
44-47	Necklace of adaptation	9,000 gp
48-51	Amulet of spell cunning	10,000 gp
52-54	Collar of the true companion	10,000 gp
55-58	Frost fist amulet	10,000 gp
59-63	Crystal of healing hands	12,000 gp
64-66	Guardian gorget	12,000 gp
67-73	Medallion of thoughts	12,000 gp
74-77	Periapt of protection from curses	12,000 gp
78-81	Forge fist amulet	13,000 gp
82-85	Amulet of bullet protection +3	13,500 gp
86-92	Periapt of wound closure	15,000 gp
93-95	Necklace of ki serenity	16,000 gp
96-98	Brooch of amber sparks	16,800 gp
99-100	Symbol of sanguine protection	17,500 gp"""

items["neck"]["greater_medium"] = """01-15	Amulet of natural armor +3	18,000 gp
16-24	Ampoule of false blood	20,000 gp
25-35	Amulet of magecraft	20,000 gp
36-50	Amulet of mighty fists +2	20,000 gp
51-62	Dragonfoe amulet	20,000 gp
63-67	Amulet of spell mastery	22,000 gp
68-72	Amulet of bullet protection +4	24,000 gp
73-85	Hand of stone	27,000 gp
86-100	Periapt of proof against poison	27,000 gp"""

items["neck"]["lesser_major"] = """01-18	Amulet of natural armor +4	32,000 gp
19-35	Amulet of proof against detection and location	35,000 gp
36-49	Amulet of bullet protection +5	37,500 gp
50-67	Scarab of protection	38,000 gp
68-82	Necklace of netted stars	42,000 gp
83-100	Amulet of mighty fists +3	45,000 gp"""

items["neck"]["greater_major"] = """01-35	Amulet of natural armor +5	50,000 gp
36-60	Amulet of mighty fists +4	80,000 gp
61-85	Amulet of the planes	120,000 gp
86-100	Amulet of mighty fists +5	125,000 gp"""


items["shoulders"]["lesser_minor"] = """01-06	Catching cape	200 gp
07-10	Cloak of human guise	900 gp
11-30	Cloak of resistance +1	1,000 gp
31-36	Muleback cords	1,000 gp
37-38	Shawl of life-keeping	1,000 gp
39-44	Shield cloak	1,000 gp
45-50	Quickchange cloak	1,500 gp
51-56	Cowardly crouching cloak	1,800 gp
57-74	Cloak of elvenkind	2,500 gp
75-80	Cloak of the hedge wizard	2,500 gp
81-85	Cloak of fiery vanishing	2,600 gp
86-94	Cloak of fangs	2,800 gp
95-97	Pauldrons of the serpent	3,000 gp
98-100	Stonemist cloak	3,500 gp"""

items["shoulders"]["greater_minor"] = """01-26	Cloak of resistance +2	4,000 gp
27-38	Cloak of the scuttling rat	6,000 gp
39	Seafoam shawl	6,000 gp
40-52	Treeform cloak	6,000 gp
53-74	Eagle cape	7,000 gp
75-94	Cloak of the manta ray	7,200 gp
95-100	Hunter's cloak	7,500 gp"""

items["shoulders"]["lesser_medium"] = """01-20	Cloak of resistance +3	9,000 gp
21-22	Cloak of the duskwalker	10,000 gp
23-25	Cocoon cloak	10,000 gp
26-27	Pauldrons of the bull	10,000 gp
28-32	Stone cloak, minor	10,000 gp
33-40	Cape of the mountebank	10,800 gp
41-45	Pauldrons of the watchful lion	10,800 gp
46-52	Lion cloak	12,000 gp
53-54	Mantle of spores	13,400 gp
55-59	Cape of effulgent escape	14,000 gp
60-69	Cloak of arachnida	14,000 gp
70-72	Gunfighter's poncho	14,000 gp
73-74	Tentacle cloak	14,000 gp
75-76	Demonspike pauldrons	14,350 gp
77-78	Comfort's cloak	15,600 gp
79-88	Cloak of resistance +4	16,000 gp
89-91	Shawl of the crone	16,000 gp
92-100	Prestidigitator's cloak	17,200 gp"""

items["shoulders"]["greater_medium"] = """01-12	Stole of justice	18,000 gp
13-24	Jellyfish cape	19,200 gp
25-32	Cloak of the diplomat	20,000 gp
33-44	Slashing cloak	20,000 gp
45-56	Stone cloak, major	20,000 gp
57-68	Cloak of displacement, minor	24,000 gp
69-88	Cloak of resistance +5	25,000 gp
89-100	Cloak of the bat	26,000 gp"""

items["shoulders"]["lesser_major"] = """01-40	Highwayman's cape	32,500 gp
41-60	Juggernaut's pauldrons	40,000 gp
61-100	Charlatan's cape	45,000 gp"""

items["shoulders"]["greater_major"] = """01-15	Cloak of displacement, major	50,000 gp
16-35	Wings of flying	54,000 gp
36-55	Cloak of etherealness	55,000 gp
56-80	Wings of the gargoyle	72,000 gp
81-100	Wyvern cloak	78,600 gp"""


items["wrists"]["lesser_minor"] = """01-10	Sleeves of many garments	200 gp
11-20	Armbands of the brawler	500 gp
21-48	Bracers of armor +1	1,000 gp
49-63	Burglar's bracers	1,000 gp
64-91	Bracers of steadiness	2,000 gp
92-96	Manacles of cooperation	2,000 gp
97-100	Shackles of compliance	3,280 gp"""

items["wrists"]["greater_minor"] = """01-27	Bracers of armor +2	4,000 gp
28	Bracers of falcon's aim	4,000 gp
29-38	Inquisitor's bastion vambraces	4,000 gp
39-65	Bracers of archery, lesser	5,000 gp
66-68	Spellguard bracers	5,000 gp
69-71	Bonebreaker gauntlets	6,000 gp
72-81	Vambraces of defense	6,000 gp
82-98	Verdant vine	6,000 gp
99	Longarm bracers	7,200 gp
100	Bracers of the glib entertainer	7,900 gp"""

items["wrists"]["lesser_medium"] = """01-04	Charm bracelet	8,000 gp
05-08	Duelist's vambraces	8,000 gp
09-13	Merciful vambraces	8,000 gp
14-18	Vambraces of the tactician	8,000 gp
19-43	Bracers of armor +3	9,000 gp
44-53	Seducer's bane	9,900 gp
54-58	Bracers of the avenging knight	11,500 gp
59-63	Arrowmaster's bracers	13,900 gp
64-73	Vambraces of the genie (efreeti)	14,400 gp
74-78	Bracelet of bargaining	14,500 gp
79-82	Bracelet of mercy	15,000 gp
83-86	Bracers of the merciful knight	15,600 gp
87-90	Bracelet of second chances	15,750 gp
91-99	Bracers of armor +4	16,000 gp
100	Shackles of durance vile	16,200 gp"""

items["wrists"]["greater_medium"] = """01-10	Vambraces of the genie (djinni)	18,900 gp
11-20	Vambraces of the genie (marid)	18,900 gp
21-30	Vambraces of the genie (shaitan)	18,900 gp
31-50	Bracelet of friends	19,000 gp
51-70	Bracers of archery, greater	25,000 gp
71-90	Bracers of armor +5	25,000 gp
91-100	Bracers of sworn vengeance	25,000 g"""

items["wrists"]["lesser_major"] = """01-30	Dimensional shackles	28,000 gp
31-45	Gauntlets of skill at arms	30,000 gp
46-100	Bracers of armor +6	36,000 gp"""

items["wrists"]["greater_major"] = """01-60	Bracers of armor +7	49,000 gp
61-100	Bracers of armor +8	64,000 gp"""


items["slotless"]["lesser_minor"] = """01	Feather token (anchor)	50 gp
02	Universal solvent	50 gp
03-04	Ioun torch	75 gp
05	Stubborn nail	100 gp
06	War paint of the terrible visage	100 gp
07	Elixir of love	150 gp
08	Unguent of timelessness	150 gp
09	Feather token (fan)	200 gp
10	Formula alembic	200 gp
11	Hybridization funnel	200 gp
12	Soul soap	200 gp
13	Dust of tracelessness	250 gp
14-16	Elixir of hiding	250 gp
17-19	Elixir of swimming	250 gp
20-22	Elixir of tumbling	250 gp
23-25	Elixir of vision	250 gp
26-27	Nightdrops	250 gp
28	Oil of silence	250 gp
29-31	Silversheen	250 gp
32	Traveler's any-tool	250 gp
33-34	Bottle of messages	300 gp
35-36	Feather token (bird)	300 gp
37	Origami swarm	300 gp
38	Alluring golden apple	400 gp
39	Feather token (tree)	400 gp
40	Key of lock jamming	400 gp
41-42	Feather token (swan boat)	450 gp
43	Animated portrait	500 gp
44	Bottled misfortune	500 gp
45-46	Elixir of truth	500 gp
47-48	Feather token (whip)	500 gp
49-51	Scabbard of honing	500 gp
52-53	Seer's tea	550 gp
54-57	Abjurant salt	600 gp
58-61	Arrow magnet	600 gp
62-63	Dust of darkness	600 gp
64-69	Campfire bead	720 gp
70-72	Archon's torch	750 gp
73-75	Book of extended summoning (lesser)	750 gp
76-79	Iron rope	750 gp
80-83	Snapleaf	750 gp
84-86	Bottled yeti fur	800 gp
87-89	Defoliant polish	800 gp
90-92	Dust of emulation	800 gp
93-97	Steadfast gut-stone	800 gp
98-100	Dust of dryness	850 gp"""

items["slotless"]["greater_minor"] = """01-03	RANDOM_LEAST_MINOR	0 gp
04	Anatomy doll	1,000 gp
05	Bead of newt prevention	1,000 gp
06	Beast-bond brand	1,000 gp
07	Bookplate of recall	1,000 gp
08-09	Boro bead (1st)	1,000 gp
10	Concealing pocket	1,000 gp
11	Dowsing syrup	1,000 gp
12	Incense of transcendence	1,000 gp
13-14	Page of spell knowledge (1st)	1,000 gp
15-17	Pearl of Power (1st)	1,000 gp
18	Preserving flask (1st)	1,000 gp
19-20	Pyxes of redirected focus	1,000 gp
21-22	Salve of slipperiness	1,000 gp
23	Wasp nest of swarming	1,000 gp
24-26	Elixir of fire breath	1,100 gp
27	Grave salt	1,100 gp
28-29	Pipes of the sewers	1,150 gp
30-31	Dust of illusion	1,200 gp
32-33	Goblin skull bomb	1,200 gp
34-35	Elixir of dragon breath	1,400 gp
36	Bookmark of deception	1,500 gp
37	Word bottle	1,500 gp
38	Dust of acid consumption	1,600 gp
39-40	Dust of appearance	1,800 gp
41-42	Efficient quiver	1,800 gp
43	Pipes of sounding	1,800 gp
44	Scabbard of vigor	1,800 gp
45	Agile alpenstock	2,000 gp
46	Blood reservoir of physical prowess	2,000 gp
47	Clamor box	2,000 gp
48	Dry load powder horn	2,000 gp
49	Goblin fire drum (normal)	2,000 gp
50-51	Handy haversack	2,000 gp
52-53	Horn of fog	2,000 gp
54	Iron spike of safe passage	2,000 gp
55	Knight's pennon (honor)	2,200 gp
56-59	Volatile vaporizer (1st)	2,200 gp
60-62	Elemental gem	2,250 gp
63-64	Flying ointment	2,250 gp
65	Sovereign glue	2,400 gp
66	Apple of eternal sleep	2,500 gp
67-68	Bag of holding (type I)	2,500 gp
69	Candle of truth	2,500 gp
70	Hexing doll	2,500 gp
71-72	Stone of alarm	2,700 gp
73	Book of extended summoning (standard)	2,750 gp
74-77	Bead of force	3,000 gp
78	Cauldron of brewing	3,000 gp
79-80	Chime of opening	3,000 gp
81	Philter of love	3,000 gp
82-86	Rope of climbing	3,000 gp
87-88	Volatile vaporizer (2nd)	3,000 gp
89	Shroud of disintegration	3,300 gp
90-92	Bag of tricks (gray)	3,400 gp
93-95	Dust of disappearance	3,500 gp
96	Dust of weighty burdens	3,600 gp
97	Noble's vigilant pillbox	3,600 gp
98-99	Figurine of wondrous power (silver raven)	3,800 gp
100	Volatile vaporizer (3rd)	3,800 gp"""

items["slotless"]["lesser_medium"] = """01	Boro bead (2nd)	4,000 gp
02	Cautionary creance	4,000 gp
03	Escape ladder	4,000 gp
04	Far-reaching sight	4,000 gp
05-06	Ioun stone (clear spindle)	4,000 gp
07	Marvelous pigments	4,000 gp
08-15	Page of spell knowledge (2nd)	4,000 gp
16-25	Pearl of Power (2nd)	4,000 gp
26	Preserving flask (2nd)	4,000 gp
27	Restorative ointment	4,000 gp
28-30	Stone salve	4,000 gp
31	Wind-caller compass	4,400 gp
32	Goblin fire drum (greater)	4,500 gp
33	Knight's pennon (battle)	4,500 gp
34	Knight's pennon (parley)	4,500 gp
35	Void dust	4,500 gp
36	Incense of meditation	4,900 gp
37	Admixture vial	5,000 gp
38-51	Bag of holding (type II)	5,000 gp
52	Bone razor	5,000 gp
53	Horn of the huntmaster	5,000 gp
54	Insistent doorknocker	5,000 gp
55-56	Ioun stone (dusty rose prism)	5,000 gp
57	Mallet of building	5,000 gp
58	Polymorphic pouch	5,000 gp
59	Scabbard of stanching	5,000 gp
60	School of eyes	5,000 gp
61	Sheath of bladestealth	5,000 gp
62	Stone of alliance	5,000 gp
63	Summoning shackle	5,000 gp
64	Eversmoking bottle	5,400 gp
65	Sustaining spoon	5,400 gp
66	Wind fan	5,500 gp
67	Grim lantern	5,800 gp
68	Coin of the untrodden road	6,000 gp
69	Horn of battle clarity	6,000 gp
70	Life link badge	6,000 gp
71	Martyr's tear	6,000 gp
72	Pipes of haunting	6,000 gp
73	Rope of knots	6,000 gp
74	Singing bell of striking	6,000 gp
75	Stone familiar	6,000 gp
76	Book of extended summoning (greater)	6,126 gp
77	Dragonbone divination sticks	6,400 gp
78-79	Horn of goodness/evil	6,500 gp
79	Naga-scale bindi	6,600 gp
80	Bottle of shadows	7,000 gp
81	Cape of bravado	7,000 gp
82-83	Instant bridge	7,000 gp
84	Mirror of guarding reflections	7,000 gp
85	Folding boat	7,200 gp
86-87	Bottle of air	7,250 gp
88-94	Bag of holding (type III)	7,400 gp
95	Balm of impish grace	7,500 gp
96	Candle of clean air	7,500 gp
97	Harp of charming	7,500 gp
98-100	Manual of war	7,500 gp"""

items["slotless"]["greater_medium"] = """01	Chalice of poison weeping	8,000 gp
02	Exorcist's aspergillum	8,000 gp
03	Golem manual (flesh)	8,000 gp
04	Harp of shattering	8,000 gp
05	Insignia of valor	8,000 gp
06	Ioun stone (deep red sphere)	8,000 gp
07	Ioun stone (incandescent blue sphere)	8,000 gp
08	Ioun stone (pale blue rhomboid)	8,000 gp
09	Ioun stone (pink and green sphere)	8,000 gp
10	Ioun stone (pink rhomboid)	8,000 gp
11	Ioun stone (scarlet and blue sphere)	8,000 gp
12	Needles of fleshgraving	8,000 gp
13	Restless lockpicks	8,000 gp
14	Werewhistle	8,000 gp
15-16	Deck of illusions	8,100 gp
17	Candle of invocation	8,400 gp
18-19	Bag of tricks (rust)	8,500 gp
20	Boro bead (3rd)	9,000 gp
21	Decanter of endless water	9,000 gp
22	Loathsome mirror	9,000 gp
23-25	Page of spell knowledge (3rd)	9,000 gp
26-31	Pearl of Power (3rd)	9,000 gp
32	Preserving flask (3rd)	9,000 gp
33	Figurine of wondrous power (serpentine owl)	9,100 gp
34	Strand of prayer beads (lesser)	9,600 gp
35-38	Bag of holding (type IV)	10,000 gp
39	Boundary chalk	10,000 gp
40	Chime of resounding silence	10,000 gp
41	Construct channel brick	10,000 gp
42	Doomharp	10,000 gp
43	Drum of advance and retreat	10,000 gp
44	Embalming thread	10,000 gp
45	Eye of the void	10,000 gp
46	Figurine of wondrous power (bronze griffon)	10,000 gp
47	Figurine of wondrous power (ebony fly)	10,000 gp
48	Figurine of wondrous power (slate spider)	10,000 gp
49	Hourglass of last chances	10,000 gp
50-51	Ioun stone (dark blue rhomboid)	10,000 gp
52	Ki mat	10,000 gp
53	Lord's banner (swiftness)	10,000 gp
54	Malleable symbol	10,000 gp
55	Migrus locker	10,000 gp
56	Ornament of healing light	10,000 gp
57	Prayer wheel of ethical strength	10,000 gp
58	Stone horse (courser)	10,000 gp
59	Summon-slave crystal	10,000 gp
60	Treasurer's seal	10,000 gp
61	Black soul shard	12,000 gp
62	Golem manual (clay)	12,000 gp
63	Horsemaster's saddle	12,000 gp
64	Pipes of dissolution	12,000 gp
65	Pipes of pain	12,000 gp
66	Seeker's sight	12,000 gp
67	Blessed book	12,500 gp
68	Waters of transfiguration	12,500 gp
69	Gem of brightness	13,000 gp
70	Harp of contagion	13,000 gp
71	Lyre of building	13,000 gp
72	Void pennant	14,000 gp
73	Stone horse (destrier)	14,800 gp
74	Book of the loremaster	15,000 gp
75	Cauldron of plenty	15,000 gp
76	Horn of judgment	15,000 gp
77	Horn of the tritons	15,000 gp
78	Pearl of the sirines	15,300 gp
79	Figurine of wondrous power (onyx dog)	15,500 gp
80-81	Bag of tricks (tan)	16,000 gp
82	Boro bead (4th)	16,000 gp
83	Page of spell knowledge (4th)	16,000 gp
84-87	Pearl of Power (4th)	16,000 gp
88	Preserving flask (4th)	16,000 gp
89-91	Scabbard of keen edges	16,000 gp
92-93	Figurine of wondrous power (golden lions)	16,500 gp
94-95	Chime of interruption	16,800 gp
96-99	Broom of flying	17,000 gp
100	Figurine of wondrous power (marble elephant)	17,000 gp"""

items["slotless"]["lesser_major"] = """01-03	Ioun stone (iridescent spindle)	18,000 gp
04	Orb of foul Abaddon	18,000 gp
05-08	Carpet of flying (5 ft. by 5 ft.)	20,000 gp
09	Horn of antagonism	20,000 gp
10-13	Horn of blasting	20,000 gp
14-17	Ioun stone (pale lavender ellipsoid)	20,000 gp
18-21	Ioun stone (pearly white spindle)	20,000 gp
22-24	Master's perfect golden bell	20,000 gp
25-27	Necromancer's athame	20,000 gp
28-31	Portable hole	20,000 gp
32-35	Stone of good luck	20,000 gp
36-37	Figurine of wondrous power (ivory goats)	21,000 gp
38-40	Rope of entanglement	21,000 gp
41-42	Golem manual (stone)	22,000 gp
43	Orb of golden heaven	22,000 gp
44-45	Mattock of the titans	23,348 gp
46-48	Drinking horn of bottomless valor	24,000 gp
49-51	Boro bead (5th)	25,000 gp
52-53	Chaos emerald	25,000 gp
54-57	Page of spell knowledge (5th)	25,000 gp
58-64	Pearl of Power (5th)	25,000 gp
65-67	Preserving flask (5th)	25,000 gp
68-69	Maul of the titans	25,305 gp
70-73	Iron bands of binding	26,000 gp
74-76	Cube of frost resistance	27,000 gp
77-80	Manual of bodily health +1	27,500 gp
81-84	Manual of gainful exercise +1	27,500 gp
85-88	Manual of quickness of action +1	27,500 gp
89-92	Tome of clear thought +1	27,500 gp
93-96	Tome of leadership and influence +1	27,500 gp
97-100	Tome of understanding +1	27,500 gp"""

items["slotless"]["greater_major"] = """01-03	Crystal ball with see invisibility	50,000 gp
04-05	Horn of Valhalla	50,000 gp
06-08	Crystal ball with detect thoughts	51,000 gp
09	Last leaves of the autumn dryad	52,000 gp
10-11	Instant fortress	55,000 gp
12-15	Manual of bodily health +2	55,000 gp
16-19	Manual of gainful exercise +2	55,000 gp
20-23	Manual of quickness of action +2	55,000 gp
24-27	Tome of clear thought +2	55,000 gp
28-31	Tome of leadership and influence +2	55,000 gp
32-35	Tome of understanding +2	55,000 gp
36	Lord's banner (terror)	56,000 gp
37	Carpet of flying (10 ft. by 10 ft.)	60,000 gp
38-39	Darkskull	60,000 gp
40	Orb of pure law	60,000 gp
41	Cube of force	62,000 gp
42-43	Page of spell knowledge (8th)	64,000 gp
44-49	Pearl of Power (8th)	64,000 gp
50	Crystal ball with telepathy	70,000 gp
51	Horn of blasting (greater)	70,000 gp
52-54	Pearl of Power (two spells)	70,000 gp
55	Gem of seeing	75,000 gp
56	Lord's banner (victory)	75,000 gp
57	Crystal ball with true seeing	80,000 gp
58-59	Page of spell knowledge (9th)	81,000 gp
60-62	Pearl of Power (9th)	81,000 gp
63	Well of many worlds	82,000 gp
64-65	Manual of bodily health +3	82,500 gp
66-67	Manual of gainful exercise +3	82,500 gp
68-69	Manual of quickness of action +3	82,500 gp
70-71	Tome of clear thought +3	82,500 gp
72-73	Tome of leadership and influence +3	82,500 gp
74-75	Tome of understanding +3	82,500 gp
76	Apparatus of the crab	90,000 gp
77	Bowl of conjuring water elementals	90,000 gp
78	Brazier of conjuring fire elementals	90,000 gp
79	Censer of conjuring air elementals	90,000 gp
80	Stone of conjuring earth elementals	90,000 gp
81	Mirror of opposition	92,000 gp
82	Strand of prayer beads (greater)	95,800 gp
83	Lord's banner (crusades)	100,000 gp
84	Manual of bodily health +4	110,000 gp
85	Manual of gainful exercise +4	110,000 gp
86	Manual of quickness of action +4	110,000 gp
87	Tome of clear thought +4	110,000 gp
88	Tome of leadership and influence +4	110,000 gp
89	Tome of understanding +4	110,000 gp
90	Manual of bodily health +5	137,500 gp
91	Manual of gainful exercise +5	137,500 gp
92	Manual of quickness of action +5	137,500 gp
93	Tome of clear thought +5	137,500 gp
94	Tome of leadership and influence +5	137,500 gp
95	Tome of understanding +5	137,500 gp
96	Efreeti bottle	145,000 gp
97	Cubic gate	164,000 gp
98	Iron flask	170,000 gp
99	Mirror of mental prowess	175,000 gp
100	Mirror of life trapping	200,000 gp"""


def wondrous_item(name, price):
	result = {
		"Name": name,
		"id": slugify(name),
		"Price": float(price.replace(',','')),
		"PriceUnit": "gp"
	}
	return result

def slugify(string):
	res = []
	for c in string:
		if c.isalnum():
			res.append(c.lower())
		elif res and res[-1] != '-':
			res.append('-')
	if res[-1] == "-":
		res.pop()
	return "".join(res)
	
def parseTable(text, magnitude):
    table = []
    upperBounds = []
    values = []
    for line in text.splitlines():
        splitted = line.split()
        chance = splitted[0]
        if (all(c.isdigit() for c in chance)):
            lo_chance = hi_chance = int(chance)
        else:
            lo_chance, hi_chance = map(int, chance.split("-"))
        upperBounds.append(hi_chance)
        price = splitted[-2]
        name = " ".join(splitted[1:-2])
        values.append(wondrous_item(name, price))
    return """%s : {
                  create : function() {
                       return clone(rangeIn100(this.chanceTable, this.valueTable));
                  },
                  chanceTable : %s,
                  valueTable : %s
              }""" % (magnitude, json.dumps(upperBounds[:-1]), json.dumps(values))

if __name__ == "__main__":
    wondrous_items = []
    for slot in items :
        magnitudes = []
        for magnitude in items[slot]:
            magnitudes.append(parseTable(items[slot][magnitude], magnitude))
        wondrous_items.append("""%s : { \n %s \n }""" % (slot, ",\n".join(magnitudes)))
    string = """var random_wondrous_item = { \n %s \n };""" % (",\n".join(wondrous_items))

    print "wondrousItems.json contains a lot of hand fixes... if you regenerate it using this script, you'll loose these changes !";
    #with open("../data/items/wondrous_items_tables.js", "w") as f:
    #    f.write(string)