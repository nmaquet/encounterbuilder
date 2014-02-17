#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json

common = {};
uncommon = {};

common[0] = """01-07 	Acid splash	375 gp
08-14	Create water	375 gp
15-20	Daze	375 gp
21-28	Detect magic	375 gp
29-34	Ghost sound	375 gp
35-42	Light	375 gp
43-49	Mage hand	375 gp
50-55	Mending	375 gp
56-60	Message	375 gp
61-66	Prestidigitation	375 gp
67-73	Purify food and drink	375 gp
74-81	Ray of frost	375 gp
82-88	Read magic	375 gp
89-95	Stabilize	375 gp
96-100	Touch of fatigue	375 gp"""
uncommon[0] = """01-06	Arcane mark	375 gp
07-15	Bleed	375 gp
16-22	Dancing lights	375 gp
23-31	Detect poison	375 gp
32-40	Disrupt undead	375 gp
41-48	Flare	375 gp
49-56	Guidance	375 gp
57-65	Know direction	375 gp
66-73	Lullaby	375 gp
74-79	Open/close	375 gp
80-86	Resistance	375 gp
87-94	Spark	375 gp
95-100	Virtue	375 gp"""
common[1] = """01-02	Alarm	750 gp
03-03	Animate rope	750 gp
04-05	Bane	750 gp
06-11	Bless	750 gp
12-14	Burning hands	750 gp
15-17	Cause fear	750 gp
18-19	Charm person	750 gp
20-21	Color spray	750 gp
22-23	Command	750 gp
24-24	Comprehend languages	750 gp
25-31	Cure light wounds	750 gp
32-33	Disguise self	750 gp
34-37	Divine favor	750 gp
38-38	Endure elements	750 gp
39-41	Enlarge person	750 gp
42-43	Entangle	750 gp
44-45	Expeditious retreat	750 gp
46-46	Feather fall	750 gp
47-48	Grease	750 gp
49-50	Identify	750 gp
51-52	Inflict light wounds	750 gp
53-58	Mage armor	750 gp
59-60	Magic fang	750 gp
61-67	Magic missile	750 gp
68-68	Magic stone	750 gp
69-70	Magic weapon	750 gp
71-71	Obscuring mist	750 gp
72-73	Produce flame	750 gp
74-74	Protection from chaos	750 gp
75-75	Protection from evil	750 gp
76-76	Protection from good	750 gp
77-77	Protection from law	750 gp
78-79	Ray of enfeeblement	750 gp
80-81	Remove fear	750 gp
82-84	Shield	750 gp
85-86	Shield of faith	750 gp
87-87	Shillelagh	750 gp
88-89	Shocking grasp	750 gp
90-90	Silent image	750 gp
91-94	Sleep	750 gp
95-95	Summon monster I	750 gp
96-96	Summon nature's ally I	750 gp
97-99	True strike	750 gp
100-100	Unseen servant	750 gp"""
uncommon[1] = """01-02	Ant haul	750 gp
03-05	Aspect of the falcon	750 gp
06-07	Bless weapon	750 gp
08-08	Calm animals	750 gp
09-10	Charm animal	750 gp
11-12	Chill touch	750 gp
13-14	Compel hostility	750 gp
15-17	Confusion, lesser	750 gp
18-19	Corrosive touch	750 gp
20-21	Deathwatch	750 gp
22-22	Detect animals or plants	750 gp
23-23	Detect chaos	750 gp
24-24	Detect evil	750 gp
25-25	Detect good	750 gp
26-26	Detect law	750 gp
27-28	Detect secret doors	750 gp
29-29	Detect snares and pits	750 gp
30-31	Detect undead	750 gp
32-35	Doom	750 gp
36-37	Entropic shield	750 gp
38-38	Erase	750 gp
39-39	Faerie fire	750 gp
40-41	Feather step	750 gp
42-44	Floating disk	750 gp
45-47	Goodberry	750 gp
48-49	Hide from animals	750 gp
50-51	Hide from undead	750 gp
52-52	Hideous laughter	750 gp
53-54	Hold portal	750 gp
55-56	Hypnotism	750 gp
57-58	Icicle dagger	750 gp
59-60	Ill omen	750 gp
61-63	Jump	750 gp
64-65	Longstrider	750 gp
66-66	Magic aura	750 gp
67-68	Mount	750 gp
69-69	Obscure object	750 gp
70-71	Pass without trace	750 gp
72-72	Ray of sickening	750 gp
73-75	Reduce person	750 gp
76-78	Sanctuary	750 gp
79-80	Shock shield	750 gp
81-83	Speak with animals	750 gp
84-85	Stone fist	750 gp
86-87	Stone shield	750 gp
88-88	Summon minor monster	750 gp
89-89	Undetectable alignment	750 gp
90-92	Urban grace	750 gp
93-96	Vanish	750 gp
97-97	Ventriloquism	750 gp
98-98	Magic mouth	1,250 gp
99-99	Bless water	2,000 gp
100-100	Curse water	2,000 gp"""
common[2] = """01-02	Acid arrow	4,500 gp
03-03	Aid	4,500 gp
04-05	Alter self	4,500 gp
06-07	Barkskin	4,500 gp
08-10	Bear's endurance	4,500 gp
11-11	Blur	4,500 gp
12-14	Bull's strength	4,500 gp
15-16	Cat's grace	4,500 gp
17-22	Cure moderate wounds	4,500 gp
23-25	Darkness	4,500 gp
26-26	Darkvision	4,500 gp
27-27   Delay poison	4,500 gp
28-29	Eagle's splendor	4,500 gp
30-30	False life	4,500 gp
31-31	Find traps	4,500 gp
32-32	Flame blade	4,500 gp
33-33	Flaming sphere	4,500 gp
34-35	Fog cloud	4,500 gp
36-37	Fox's cunning	4,500 gp
38-38	Glitterdust	4,500 gp
39-40	Heat metal	4,500 gp
41-43	Hold person	4,500 gp
44-46	Inflict moderate wounds	4,500 gp
47-51	Invisibility	4,500 gp
52-52	Knock	4,500 gp
53-54	Levitate	4,500 gp
55-55	Minor image	4,500 gp
56-57	Mirror image	4,500 gp
58-59	Owl's wisdom	4,500 gp
60-60	Pyrotechnics	4,500 gp
61-61	Remove paralysis	4,500 gp
62-64	Resist energy	4,500 gp
65-66	Restoration, lesser	4,500 gp
67-71	Scorching ray	4,500 gp
72-73	See invisibility	4,500 gp
74-74	Shatter	4,500 gp
75-76	Shield other	4,500 gp
77-78	Silence	4,500 gp
79-81	Sound burst	4,500 gp
82-83	Spider climb	4,500 gp
84-86	Spiritual weapon	4,500 gp
87-88	Summon monster II	4,500 gp
89-90	Summon nature's ally II	4,500 gp
91-92	Summon swarm	4,500 gp
93-96	Web	4,500 gp
97-97	Whispering wind	4,500 gp
98-99	Augury	5,750 gp
100-100	Fire trap	5,750 gp"""
uncommon[2] = """01-02	Align weapon	4,500 gp
03-05	Animal aspect	4,500 gp
06-06	Animal messenger	4,500 gp
07-07	Animal trance	4,500 gp
08-10	Aspect of the bear	4,500 gp
11-13	Bestow weapon proficiency	4,500 gp
14-15	Blindness/deafness	4,500 gp
16-18	Burning gaze	4,500 gp
19-21	Calm emotions	4,500 gp
22-24	Chill metal	4,500 gp
25-25	Command undead	4,500 gp
26-27	Daze monster	4,500 gp
28-29	Death knell	4,500 gp
30-32	Defensive shock	4,500 gp
33-33	Delay pain	4,500 gp
34-35	Detect thoughts	4,500 gp
36-39	Disguise other	4,500 gp
40-42	Effortless armor	4,500 gp
43-46	Elemental touch	4,500 gp
47-48	Enthrall	4,500 gp
49-50	Gentle repose	4,500 gp
51-51	Ghoul touch	4,500 gp
52-53	Glide	4,500 gp
54-55	Groundswell	4,500 gp
56-56	Gust of wind	4,500 gp
57-57	Hold animal	4,500 gp
58-59	Hypnotic pattern	4,500 gp
60-60	Locate object	4,500 gp
61-61	Make whole	4,500 gp
62-63	Misdirection	4,500 gp
64-65	Oppressive boredom	4,500 gp
66-66	Protection from arrows	4,500 gp
67-67	Reduce animal	4,500 gp
68-69	Rope trick	4,500 gp
70-72	Scare	4,500 gp
73-74	Share language	4,500 gp
75-76	Soften earth and stone	4,500 gp
77-78	Spectral hand	4,500 gp
79-80	Status	4,500 gp
81-82	Tongues	4,500 gp
83-84	Touch of idiocy	4,500 gp
85-86	Tree shape	4,500 gp
87-88	Warp wood	4,500 gp
89-91	Weapon of awe	4,500 gp
92-93	Wood shape	4,500 gp
94-95	Zone of truth	4,500 gp
96-96	Arcane lock	5,750 gp
97-97	Consecrate	5,750 gp
98-98	Desecrate	5,750 gp
99-99	Continual flame	7,000 gp
100-100	Phantom trap	7,000 gp"""
common[3] = """01-02	Beast shape I	11,250 gp
03-04	Blink	11,250 gp
05-07	Call lightning	11,250 gp
08-08	Create food and water	11,250 gp
09-14	Cure serious wounds	11,250 gp
15-16	Daylight	11,250 gp
17-18	Deep slumber	11,250 gp
19-20	Deeper darkness	11,250 gp
21-25	Dispel magic	11,250 gp
26-28	Displacement	11,250 gp
29-34	Fireball	11,250 gp
35-35	Flame arrow	11,250 gp
36-37	Fly	11,250 gp
38-38	Gaseous form	11,250 gp
39-40	Haste	11,250 gp
41-42	Heroism	11,250 gp
43-45	Inflict serious wounds	11,250 gp
46-47	Invisibility purge	11,250 gp
48-48	Invisibility sphere	11,250 gp
49-50	Keen edge	11,250 gp
51-55	Lightning bolt	11,250 gp
56-56	Magic circle against chaos	11,250 gp
57-57	Magic circle against evil	11,250 gp
58-58	Magic circle against good	11,250 gp
59-59	Magic circle against law	11,250 gp
60-60	Magic fang, greater	11,250 gp
61-62	Magic vestment	11,250 gp
63-64	Magic weapon, greater	11,250 gp
65-66	Major image	11,250 gp
67-70	Prayer	11,250 gp
71-74	Protection from energy	11,250 gp
75-75	Remove blindness/deafness	11,250 gp
76-77	Remove curse	11,250 gp
78-79	Remove disease	11,250 gp
80-82	Searing light	11,250 gp
83-83	Sleet storm	11,250 gp
84-85	Slow	11,250 gp
86-87	Speak with dead	11,250 gp
88-89	Stinking cloud	11,250 gp
90-90	Stone shape	11,250 gp
91-92	Suggestion	11,250 gp
93-93	Summon monster III	11,250 gp
94-94	Summon nature's ally III	11,250 gp
95-97	Vampiric touch	11,250 gp
98-99	Water breathing	11,250 gp
100-100	Animate dead	23,750 gp"""
uncommon[3] = """01-04	Animal aspect, greater	11,250 gp
05-06	Aqueous orb	11,250 gp
07-08	Arcane sight	11,250 gp
09-11	Archon's aura	11,250 gp
12-14	Ash storm	11,250 gp
15-17	Bestow curse	11,250 gp
18-20	Clairaudience/clairvoyance	11,250 gp
21-22	Contagion	11,250 gp
23-23	Diminish plants	11,250 gp
24-25	Dominate animal	11,250 gp
26-29	Elemental aura	11,250 gp
30-30	Explosive runes	11,250 gp
31-34	Force punch	11,250 gp
35-35	Halt undead	11,250 gp
36-37	Helping hand	11,250 gp
38-40	Hostile levitation	11,250 gp
41-43	Howling agony	11,250 gp
44-45	Hydraulic torrent	11,250 gp
46-46	Mad monkeys	11,250 gp
47-49	Meld into stone	11,250 gp
50-52	Neutralize poison	11,250 gp
53-54	Pain strike	11,250 gp
55-55	Phantom steed	11,250 gp
56-57	Plant growth	11,250 gp
58-60	Poison	11,250 gp
61-61	Quench	11,250 gp
62-65	Rage	11,250 gp
66-67	Ray of exhaustion	11,250 gp
68-69	Resinous skin	11,250 gp
70-70	Secret page	11,250 gp
71-71	Shrink item	11,250 gp
72-73	Snare	11,250 gp
74-74	Speak with plants	11,250 gp
75-76	Spike growth	11,250 gp
77-77	Tiny hut	11,250 gp
78-81	Water walk	11,250 gp
82-84	Wind wall	11,250 gp
85-86	Wrathful mantle	11,250 gp
87-87	Illusory script	13,750 gp
88-89	Nondetection	13,750 gp
90-91	Glibness	15,750 gp
92-95	Good hope	15,750 gp
96-97	Heal mount	15,750 gp
98-98	Sculpt sound	15,750 gp
99-99	Glyph of warding	21,250 gp
100-100	Sepia snake sigil	36,250 gp"""
common[4] = """01-02 	Air walk	21,000 gp
03-04	Beast shape II	21,000 gp
05-07	Black tentacles	21,000 gp
08-08	Chaos hammer	21,000 gp
09-11	Charm monster	21,000 gp
12-14	Confusion	21,000 gp
15-16	Crushing despair	21,000 gp
17-22	Cure critical wounds	21,000 gp
23-24	Death ward	21,000 gp
25-28	Dimension door	21,000 gp
29-29	Dimensional anchor	21,000 gp
30-30	Dismissal	21,000 gp
31-33	Divine power	21,000 gp
34-35	Elemental body I	21,000 gp
36-37	Enervation	21,000 gp
38-39	Enlarge person, mass	21,000 gp
40-42	Fear	21,000 gp
43-44	Fire shield	21,000 gp
45-48	Flame strike	21,000 gp
49-51	Freedom of movement	21,000 gp
52-53	Globe of invulnerability, lesser	21,000 gp
54-54	Holy smite	21,000 gp
55-56	Ice storm	21,000 gp
57-58	Imbue with spell ability	21,000 gp
59-61	Inflict critical wounds	21,000 gp
62-65	Invisibility, greater	21,000 gp
66-66	Order's wrath	21,000 gp
67-69	Phantasmal killer	21,000 gp
70-70	Resilient sphere	21,000 gp
71-72	Scrying	21,000 gp
73-73	Sending	21,000 gp
74-74	Shout	21,000 gp
75-76	Solid fog	21,000 gp
77-79	Spell immunity	21,000 gp
80-80	Summon monster IV	21,000 gp
81-81	Summon nature's ally IV	21,000 gp
82-82	Unholy blight	21,000 gp
83-87	Wall of fire	21,000 gp
88-91	Wall of ice	21,000 gp
92-93	Divination	22,250 gp
94-95	Restoration	26,000 gp
96-96	Break enchantment	30,000 gp
97-98	Stoneskin	33,500 gp
99-99	Planar ally, lesser	46,000 gp
100-100 Restoration (Can dispel permanent negative levels)	71,000 gp"""
uncommon[4] = """01-01	Antiplant shell	21,000 gp
02-04	Arcane eye	21,000 gp
05-07	Aspect of the stag	21,000 gp
08-11	Ball lightning	21,000 gp
12-12	Blight	21,000 gp
13-13	Command plants	21,000 gp
14-15	Control water	21,000 gp
16-18	Darkvision, greater	21,000 gp
19-19	Detect scrying	21,000 gp
20-20	Discern lies	21,000 gp
21-24	Dragon's breath	21,000 gp
25-28	False life, greater	21,000 gp
29-30	Geas, lesser	21,000 gp
31-34	Ghost wolf	21,000 gp
35-36	Giant vermin	21,000 gp
37-37	Hallucinatory terrain	21,000 gp
38-38	Illusory wall	21,000 gp
39-40	Locate creature	21,000 gp
41-42	Minor creation	21,000 gp
43-43	Mnemonic enhancer	21,000 gp
44-46	Obsidian flow	21,000 gp
47-48	Rainbow pattern	21,000 gp
49-50	Reduce person, mass	21,000 gp
51-53	Reincarnate	21,000 gp
54-54	Repel vermin	21,000 gp
55-56	Ride the waves	21,000 gp
57-59	Rusting grasp	21,000 gp
60-60	Secure shelter	21,000 gp
61-63	Shadow conjuration	21,000 gp
64-67	Shadow step	21,000 gp
68-70	Shocking image	21,000 gp
71-74	Spike stones	21,000 gp
75-76	Volcanic storm	21,000 gp
77-79	Wandering star motes	21,000 gp
80-80	Animal growth	30,000 gp
81-82	Commune with nature	30,000 gp
83-83	Dispel chaos	30,000 gp
84-84	Dispel evil	30,000 gp
85-87	Dominate person	30,000 gp
88-91	Hold monster	30,000 gp
92-94	Holy sword	30,000 gp
95-95	Mark of justice	30,000 gp
96-97	Modify memory	30,000 gp
98-98	Tree stride	30,000 gp
99-99	Zone of silence	30,000 gp
100-100	Legend lore	33,500 gp"""

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

def wand(name, price):
	result = {
		"Name": "Wand of " + name,
		"id": "wand-of-" + slugify(name),
		"Price": float(price.replace(',','')),
		"PriceUnit": "gp"
	}
	return result

def parseTable(text):
    table = []
    upperBounds = []
    values = []
    for line in text.splitlines():
        splitted = line.split()
        chance = splitted[0]
        lo_chance, hi_chance = map(int, chance.split("-"))
        upperBounds.append(hi_chance)
        price = splitted[-2]
        name = " ".join(splitted[1:-2])
        values.append(wand(name, price))
    return "return rangeIn100(%s, %s);" % (json.dumps(upperBounds[:-1]), json.dumps(values));

if __name__ == "__main__":
    common_levels = []
    uncommon_levels = []
    common_levels.append('"0" : function() { %s }' % parseTable(common[0]))
    common_levels.append('"1" : function() { %s }' % parseTable(common[1]))
    common_levels.append('"2" : function() { %s }' % parseTable(common[2]))
    common_levels.append('"3" : function() { %s }' % parseTable(common[3]))
    common_levels.append('"4" : function() { %s }' % parseTable(common[4]))
    uncommon_levels.append('"0" : function() { %s }' % parseTable(uncommon[0]))
    uncommon_levels.append('"1" : function() { %s }' % parseTable(uncommon[1]))
    uncommon_levels.append('"2" : function() { %s }' % parseTable(uncommon[2]))
    uncommon_levels.append('"3" : function() { %s }' % parseTable(uncommon[3]))
    uncommon_levels.append('"4" : function() { %s }' % parseTable(uncommon[4]))
    string = ("""var randomWand = {
                   common : {
                       %s
                   },
                   uncommon : {
                       %s
                   }
             };

           """ % (",\n".join(common_levels),",\n".join(uncommon_levels)))
    with open("../data/items/wands_tables.js", "w") as f:
        f.write(string)



