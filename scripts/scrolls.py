#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import sys

common_arcane = {};
uncommon_arcane = {};
common_divine = {};
uncommon_divine = {};

common_arcane[0] = """01-09	Acid splash	12.5 gp
10-17	Daze	12.5 gp
18-27	Detect magic	12.5 gp
28-35	Flare	12.5 gp
36-45	Light	12.5 gp
46-55	Mage hand	12.5 gp
56-63	Mending	12.5 gp
64-72	Prestidigitation	12.5 gp
73-81	Ray of frost	12.5 gp
82-91	Read magic	12.5 gp
92-100	Touch of fatigue	12.5 gp"""

uncommon_arcane[0] = """01-07	Arcane mark	12.5 gp
08-17	Bleed	12.5 gp
18-25	Dancing lights	12.5 gp
26-35	Detect poison	12.5 gp
36-42	Disrupt undead	12.5 gp
43-51	Ghost sound	12.5 gp
52-61	Message	12.5 gp
62-68	Open/close	12.5 gp
69-75	Resistance	12.5 gp
76-83	Sift	12.5 gp
84-92	Spark	12.5 gp
93-100	Unwitting ally	12.5 gp"""

common_arcane[1] = """01-05	Burning hands	25 gp
06-09	Cause fear	25 gp
10-14	Charm person	25 gp
15-17	Chill touch	25 gp
18-21	Disguise self	25 gp
22-24	Endure elements	25 gp
25-28	Enlarge person	25 gp
29-32	Expeditious retreat	25 gp
33-36	Grease	25 gp
37-39	Hypnotism	25 gp
40-42	Identify	25 gp
43-48	Mage armor	25 gp
49-54	Magic missile	25 gp
55-58	Magic weapon	25 gp
59-62	Obscuring mist	25 gp
63-64	Protection from chaos	25 gp
65-67	Protection from evil	25 gp
68-69	Protection from good	25 gp
70-71	Protection from law	25 gp
72-75	Ray of enfeeblement	25 gp
76-80	Shield	25 gp
81-84	Shocking grasp	25 gp
85-88	Silent image	25 gp
89-93	Sleep	25 gp
94-96	Summon monster I	25 gp
97-100	True strike	25 gp"""

uncommon_arcane[1] = """01-02	Air bubble	25 gp
03-06	Alarm	25 gp
07-08	Animate rope	25 gp
09-12	Ant haul	25 gp
13-15	Blend	25 gp
16-18	Break	25 gp
19-23	Color spray	25 gp
24-26	Comprehend languages	25 gp
27-30	Corrosive touch	25 gp
31-33	Detect secret doors	25 gp
34-36	Detect undead	25 gp
37-38	Erase	25 gp
39-40	Flare burst	25 gp
41-43	Floating disk	25 gp
44-46	Hold portal	25 gp
47-48	Hydraulic push	25 gp
49-51	Icicle dagger	25 gp
52-54	Illusion of calm	25 gp
55-58	Jump	25 gp
59-60	Magic aura	25 gp
61-63	Mirror strike	25 gp
64-66	Mount	25 gp
67-69	Ray of sickening	25 gp
70-71	Reduce person	25 gp
72-74	Shadow weapon	25 gp
75-77	Shock shield	25 gp
78-80	Stone fist	25 gp
81-84	Touch of the sea	25 gp
85-88	Unseen servant	25 gp
89-91	Urban grace	25 gp
92-96	Vanish	25 gp
97-98	Ventriloquism	25 gp
99-100	Voice alteration	25 gp"""

common_arcane[2] = """01-04	Acid arrow	150 gp
05-07	Alter self	150 gp
08-12	Bear's endurance	150 gp
13-15	Blur	150 gp
16-20	Bull's strength	150 gp
21-24	Cat's grace	150 gp
25-27	Darkness	150 gp
28-30	Darkvision	150 gp
31-34	Eagle's splendor	150 gp
35-37	False life	150 gp
38-40	Flaming sphere	150 gp
41-44	Fox's cunning	150 gp
45-47	Glitterdust	150 gp
48-52	Invisibility	150 gp
53-54	Knock	150 gp
55-58	Levitate	150 gp
59-61	Minor image	150 gp
62-65	Mirror image	150 gp
66-69	Owl's wisdom	150 gp
70-73	Resist energy	150 gp
74-75	Rope trick	150 gp
76-80	Scorching ray	150 gp
81-83	See invisibility	150 gp
84-85	Shatter	150 gp
86-88	Spider climb	150 gp
89-91	Summon monster II	150 gp
92-93	Summon swarm	150 gp
94-98	Web	150 gp
99-100	Whispering wind	150 gp"""

uncommon_arcane[2] = """01-03	Bestow weapon proficiency	150 gp
04-06	Blindness/deafness	150 gp
07-09	Burning gaze	150 gp
10-12	Certain grip	150 gp
13-14	Command undead	150 gp
15-16	Create pit	150 gp
17-20	Daze monster	150 gp
21-23	Detect thoughts	150 gp
24-27	Disguise other	150 gp
28-31	Elemental touch	150 gp
32-34	Fire breath	150 gp
35-38	Fog cloud	150 gp
39-40	Ghoul touch	150 gp
41-41	Glide	150 gp
42-44	Gust of wind	150 gp
45-47	Haunting mists	150 gp
48-51	Hideous laughter	150 gp
52-54	Hypnotic pattern	150 gp
55-57	Locate object	150 gp
58-60	Make whole	150 gp
61-62	Misdirection	150 gp
63-63	Obscure object	150 gp
64-65	Pernicious poison	150 gp
66-67	Protection from arrows	150 gp
68-70	Pyrotechnics	150 gp
71-73	Returning weapon	150 gp
74-77	Scare	150 gp
78-80	Shadow anchor	150 gp
81-83	Share memory	150 gp
84-85	Slipstream	150 gp
86-88	Spectral hand	150 gp
89-90	Spontaneous immolation	150 gp
91-93	Touch of idiocy	150 gp
94-94	Unshakable chill	150 gp
95-96	Magic mouth	160 gp
97-97	Arcane lock	175 gp
98-99	Continual flame	200 gp
100-100	Phantom trap	200 gp"""

common_arcane[3] = """01-03	Beast shape I	375 gp
04-07	Blink	375 gp
08-12	Dispel magic	375 gp
13-16	Displacement	375 gp
17-21	Fireball	375 gp
22-24	Flame arrow	375 gp
25-29	Fly	375 gp
30-32	Gaseous form	375 gp
33-37	Haste	375 gp
38-40	Heroism	375 gp
41-43	Hold person	375 gp
44-46	Invisibility sphere	375 gp
47-51	Lightning bolt	375 gp
52-54	Magic circle against chaos	375 gp
55-57	Magic circle against evil	375 gp
58-60	Magic circle against good	375 gp
61-63	Magic circle against law	375 gp
64-66	Major image	375 gp
67-70	Phantom steed	375 gp
71-74	Protection from energy	375 gp
75-78	Slow	375 gp
79-81	Stinking cloud	375 gp
82-84	Suggestion	375 gp
85-87	Summon monster III	375 gp
88-90	Tiny hut	375 gp
91-94	Tongues	375 gp
95-97	Vampiric touch	375 gp
98-100	Water breathing	375 gp"""

uncommon_arcane[3] = """01-03	Animate dead, lesser	375 gp
04-06	Aqueous orb	375 gp
07-08	Arcane sight	375 gp
09-12	Beast shape	375 gp
13-15	Clairaudience/clairvoyance	375 gp
16-17	Cloak of winds	375 gp
18-20	Daylight	375 gp
21-24	Deep slumber	375 gp
25-27	Distracting cacophony	375 gp
28-30	Draconic reservoir	375 gp
31-35	Elemental aura	375 gp
36-38	Explosive runes	375 gp
39-43	Force punch	375 gp
44-45	Gentle repose	375 gp
46-47	Halt undead	375 gp
48-49	Healing thief	375 gp
50-51	Hydraulic torrent	375 gp
52-56	Keen edge	375 gp
57-61	Magic weapon, greater	375 gp
62-65	Monstrous physique I	375 gp
66-68	Rage	375 gp
69-70	Ray of exhaustion	375 gp
71-73	Resinous skin	375 gp
74-75	Resist energy, communal	375 gp
76-78	Secret page	375 gp
79-80	Shrink item	375 gp
81-83	Sleet storm	375 gp
84-86	Spiked pit	375 gp
87-90	Undead anatomy I	375 gp
91-92	Versatile weapon	375 gp
93-95	Wind wall	375 gp
96-96	Illusory script	425 gp
97-99	Nondetection	425 gp
100-100	Sepia snake sigil	875 gp"""

common_arcane[4] = """01-03	Beast shape II	700 gp
04-05	Bestow curse	700 gp
06-09	Black tentacles	700 gp
10-14	Charm monster	700 gp
15-18	Confusion	700 gp
19-21	Crushing despair	700 gp
22-26	Dimension door	700 gp
27-29	Dimensional anchor	700 gp
30-32	Elemental body I	700 gp
33-36	Enervation	700 gp
37-38	Enlarge person, mass	700 gp
39-43	Fear	700 gp
44-47	Fire shield	700 gp
48-50	Globe of invulnerability, lesser	700 gp
51-54	Ice storm	700 gp
55-59	Invisibility, greater	700 gp
60-64	Phantasmal killer	700 gp
65-67	Resilient sphere	700 gp
68-71	Scrying	700 gp
72-74	Shadow conjuration	700 gp
75-76	Shout	700 gp
77-78	Solid fog	700 gp
79-80	Stone shape	700 gp
81-83	Summon monster IV	700 gp
84-88	Wall of fire	700 gp
89-92	Wall of ice	700 gp
93-97	Stoneskin	950 gp
98-100	Animate dead	1,050 gp"""

uncommon_arcane[4] = """01-02	Acid pit	700 gp
03-06	Arcane eye	700 gp
07-10	Ball lightning	700 gp
11-13	Contagion	700 gp
14-17	Darkvision, greater	700 gp
18-19	Detect scrying	700 gp
20-23	Dragon's breath	700 gp
24-28	False life, greater	700 gp
29-32	Firefall	700 gp
33-35	Geas, lesser	700 gp
36-39	Ghost wolf	700 gp
40-41	Hallucinatory terrain	700 gp
42-43	Illusory wall	700 gp
44-46	Locate creature	700 gp
47-50	Minor creation	700 gp
51-54	Monstrous physique II	700 gp
55-57	Obsidian flow	700 gp
58-59	Phantom chariot	700 gp
60-62	Rainbow pattern	700 gp
63-64	Reduce person, mass	700 gp
65-68	Remove curse	700 gp
69-71	Secure shelter	700 gp
72-74	Shadow projection	700 gp
75-79	Shocking image	700 gp
80-83	Telekinetic charge	700 gp
84-85	True form	700 gp
86-89	Vermin shape I	700 gp
90-94	Volcanic storm	700 gp
95-97	Wandering star motes	700 gp
98-99	Fire trap	725 gp
100-100	Mnemonic enhancer	750 gp"""

common_arcane[5] = """01-03	Baleful polymorph	1,125 gp
04-07	Beast shape III	1,125 gp
08-10	Break enchantment	1,125 gp
11-15	Cloudkill	1,125 gp
16-21	Cone of cold	1,125 gp
22-23	Contact other plane	1,125 gp
24-26	Dismissal	1,125 gp
27-31	Dominate person	1,125 gp
32-35	Feeblemind	1,125 gp
36-40	Hold monster	1,125 gp
41-43	Magic jar	1,125 gp
44-46	Mind fog	1,125 gp
47-51	Overland flight	1,125 gp
52-54	Passwall	1,125 gp
55-56	Permanency	1,125 gp
57-58	Planar binding, lesser	1,125 gp
59-62	Polymorph	1,125 gp
63-65	Sending	1,125 gp
66-69	Shadow evocation	1,125 gp
70-73	Summon monster V	1,125 gp
74-76	Telekinesis	1,125 gp
77-82	Teleport	1,125 gp
83-88	Wall of force	1,125 gp
89-92	Wall of stone	1,125 gp
93-95	Waves of fatigue	1,125 gp
96-97	Symbol of pain	2,125 gp
98-100	Symbol of sleep	2,125 gp"""

uncommon_arcane[5] = """01-02	Absorb toxicity	1,125 gp
03-04	Animal growth	1,125 gp
05-06	Blight	1,125 gp
07-09	Dream	1,125 gp
10-13	Elemental body II	1,125 gp
14-15	Fabricate	1,125 gp
16-19	Fire snake	1,125 gp
20-22	Hostile juxtaposition	1,125 gp
23-25	Hungry pit	1,125 gp
26-29	Icy prison	1,125 gp
30-33	Interposing hand	1,125 gp
34-36	Life bubble	1,125 gp
37-38	Mage's faithful hound	1,125 gp
39-40	Mage's private sanctum	1,125 gp
41-43	Major creation	1,125 gp
44-46	Mirage arcana	1,125 gp
47-50	Monstrous physique III	1,125 gp
51-54	Nightmare	1,125 gp
55-56	Persistent image	1,125 gp
57-60	Planar adaptation	1,125 gp
61-64	Plant shape I	1,125 gp
65-68	Prying eyes	1,125 gp
69-70	Secret chest	1,125 gp
71-73	Seeming	1,125 gp
74-76	Sonic thrust	1,125 gp
77-79	Suffocation	1,125 gp
80-82	Telepathic bond	1,125 gp
83-84	Transmute mud to rock	1,125 gp
85-86	Transmute rock to mud	1,125 gp
87-90	Undead anatomy II	1,125 gp
91-94	Vermin form II	1,125 gp
95-98	Wind blades	1,125 gp
99-100	False vision	1,375 gp"""

common_arcane[6] = """01-03	Acid fog	1,650 gp
04-07	Antimagic field	1,650 gp
08-10	Bear's endurance, mass	1,650 gp
11-13	Beast shape IV	1,650 gp
14-16	Bull's strength, mass	1,650 gp
17-19	Cat's grace, mass	1,650 gp
20-25	Chain lightning	1,650 gp
26-31	Disintegrate	1,650 gp
32-37	Dispel magic, greater	1,650 gp
38-40	Eagle's splendor, mass	1,650 gp
41-42	Eyebite	1,650 gp
43-47	Flesh to stone	1,650 gp
48-50	Form of the dragon I	1,650 gp
51-53	Fox's cunning, mass	1,650 gp
54-56	Globe of invulnerability	1,650 gp
57-59	Heroism, greater	1,650 gp
60-62	Mislead	1,650 gp
63-65	Owl's wisdom, mass	1,650 gp
66-67	Planar binding	1,650 gp
68-70	Shadow walk	1,650 gp
71-72	Stone to flesh	1,650 gp
73-76	Suggestion, mass	1,650 gp
77-79	Summon monster VI	1,650 gp
80-82	Transformation	1,650 gp
83-84	Veil	1,650 gp
85-87	Wall of iron	1,700 gp
88-89	Create undead	1,750 gp
90-92	Legend lore	1,900 gp
93-96	True seeing	1,900 gp
97-98	Circle of death	2,150 gp
99-100	Symbol of fear	2,650 gp"""

uncommon_arcane[6] = """01-04	Analyze dweomer	1,650 gp
05-08	Battlemind link	1,650 gp
09-12	Cloak of dreams	1,650 gp
13-15	Contagion, greater	1,650 gp
16-20	Contagious flame	1,650 gp
21-26	Contingency	1,650 gp
27-30	Control water	1,650 gp
31-35	Elemental body III	1,650 gp
36-39	Fluid form	1,650 gp
40-45	Forceful hand	1,650 gp
46-48	Freezing sphere	1,650 gp
49-53	Geas/quest	1,650 gp
54-57	Getaway	1,650 gp
58-59	Guards and wards	1,650 gp
60-61	Mage's lucubration	1,650 gp
62-66	Monstrous physique IV	1,650 gp
67-68	Move earth	1,650 gp
69-71	Permanent image	1,650 gp
72-76	Plant shape II	1,650 gp
77-80	Repulsion	1,650 gp
81-84	Sirocco	1,650 gp
85-87	Tar pool	1,650 gp
88-92	Undead anatomy III	1,650 gp
93-95	Programmed image	1,675 gp
96-98	Undeath to death	2,150 gp
99-100	Symbol of persuasion	6,650 gp"""

common_arcane[7] = """01-04	Arcane sight, greater	2,275 gp
05-07	Banishment	2,275 gp
08-13	Delayed blast fireball	2,275 gp
14-17	Ethereal jaunt	2,275 gp
18-22	Finger of death	2,275 gp
23-27	Form of the dragon II	2,275 gp
28-30	Hold person, mass	2,275 gp
31-35	Invisibility, mass	2,275 gp
36-39	Mage's sword	2,275 gp
40-42	Phase door	2,275 gp
43-48	Plane shift	2,275 gp
49-53	Polymorph, greater	2,275 gp
54-57	Power word blind	2,275 gp
58-62	Prismatic spray	2,275 gp
63-66	Reverse gravity	2,275 gp
67-70	Scrying, greater	2,275 gp
71-73	Shadow conjuration, greater	2,275 gp
74-78	Spell turning	2,275 gp
79-81	Summon monster VII	2,275 gp
82-87	Teleport, greater	2,275 gp
88-90	Waves of exhaustion	2,275 gp
91-93	Project image	2,280 gp
94-97	Forcecage	2,775 gp
98-100	Limited wish	3,775 gp"""


uncommon_arcane[7] = """01-03	Control undead	2,275 gp
04-07	Control weather	2,275 gp
08-10	Create demiplane, lesser	2,275 gp
11-14	Deflection	2,275 gp
15-19	Elemental body IV	2,275 gp
20-23	Firebrand	2,275 gp
24-29	Fly, mass	2,275 gp
30-34	Giant form I	2,275 gp
35-40	Grasping hand	2,275 gp
41-44	Hostile juxtaposition, greater	2,275 gp
45-49	Ice body	2,275 gp
50-53	Insanity	2,275 gp
54-56	Mage's magnificent mansion	2,275 gp
57-61	Phantasmal revenge	2,275 gp
62-65	Plague storm	2,275 gp
66-70	Plant shape III	2,275 gp
71-74	Resonating word	2,275 gp
75-78	Sequester	2,275 gp
79-81	Statue	2,275 gp
82-84	Teleport object	2,275 gp
85-88	Walk through space	2,275 gp
89-91	Vision	2,525 gp
92-93	Instant summons	3,275 gp
94-96	Symbol of stunning	7,275 gp
97-98	Symbol of weakness	7,275 gp
99-100	Simulacrum	8,775 gp"""

common_arcane[8] = """01-05	Charm monster, mass	3,000 gp
06-09	Demand	3,000 gp
10-13	Dimensional lock	3,000 gp
14-18	Form of the dragon III	3,000 gp
19-23	Horrid wilting	3,000 gp
24-28	Incendiary cloud	3,000 gp
29-33	Irresistible dance	3,000 gp
34-40	Maze	3,000 gp
41-45	Mind blank	3,000 gp
46-49	Planar binding, greater	3,000 gp
50-55	Polar ray	3,000 gp
56-59	Polymorph any object	3,000 gp
60-66	Power word stun	3,000 gp
67-72	Prismatic wall	3,000 gp
73-76	Scintillating pattern	3,000 gp
77-80	Summon monster VIII	3,000 gp
81-85	Telekinetic sphere	3,000 gp
86-90	Protection from spells	3,500 gp
91-94	Symbol of death	8,000 gp
95-97	Temporal stasis	8,000 gp
98-100	Trap the soul	23,000 gp"""

uncommon_arcane[8] = """01-04	Antipathy	3,000 gp
05-10	Clenched fist	3,000 gp
11-12	Clone	3,000 gp
13-15	Create demiplane	3,000 gp
16-19	Discern location	3,000 gp
20-24	Euphoric tranquility	3,000 gp
25-29	Frightful aspect	3,000 gp
30-34	Giant form II	3,000 gp
35-38	Iron body	3,000 gp
39-43	Moment of prescience	3,000 gp
44-47	Orb of the void	3,000 gp
48-52	Pyrying eyes, greater	3,000 gp
53-56	Screen	3,000 gp
57-62	Shadow evocation, greater	3,000 gp
63-66	Shout, greater	3,000 gp
67-72	Stormbolts	3,000 gp
73-76	Sunburst	3,000 gp
77-81	Undead anatomy IV	3,000 gp
82-87	Wall of lava	3,000 gp
88-91	Create greater undead	3,150 gp
92-95	Sympathy	4,500 gp
96-98	Symbol of insanity	8,000 gp
99-100	Binding (chaining)	13,000 gp"""

common_arcane[9] = """01-06	Dominate monster	3,825 gp
07-11	Energy drain	3,825 gp
12-16	Freedom	3,825 gp
17-23	Gate	3,825 gp
24-28	Hold monster, mass	3,825 gp
29-33	Imprisonment	3,825 gp
34-39	Mage's disjunction	3,825 gp
40-47	Meteor swarm	3,825 gp
48-55	Power word kill	3,825 gp
56-61	Prismatic sphere	3,825 gp
62-66	Shapechange	3,825 gp
67-71	Summon monster IX	3,825 gp
72-79	Time stop	3,825 gp
80-85	Weird	3,825 gp
86-90	Astral projection	4,825 gp
91-96	Teleportation circle	4,825 gp
97-100	Wish	28,825 gp"""

uncommon_arcane[9] = """01-06	Create demiplane, greater	3,825 gp
07-15	Crushing hand	3,825 gp
16-23	Etherealness	3,825 gp
24-31	Fiery body	3,825 gp
32-38	Foresight	3,825 gp
39-44	Heroic invocation	3,825 gp
45-50	Icy prison, mass	3,825 gp
51-57	Ride the lightning	3,825 gp
58-65	Shades	3,825 gp
66-72	Soul bind	3,825 gp
73-79	Tsunami	3,825 gp
80-88	Wail of the banshee	3,825 gp
89-95	Winds of vengeance	3,825 gp
96-100	Refuge	4,325 gp"""

common_divine[0] = """01-11	Bleed	12 gp, 5 sp
12-21	Create water	12 gp, 5 sp
22-34	Detect magic	12 gp, 5 sp
35-44	Know direction	12 gp, 5 sp
45-55	Light	12 gp, 5 sp
56-65	Mending	12 gp, 5 sp
66-75	Purify food and drink	12 gp, 5 sp
76-88	Read magic	12 gp, 5 sp
89-100	Stabilize	12 gp, 5 sp"""
uncommon_divine[0]="""01-15	Detect poison	12 gp, 5 sp
16-33	Flare	12 gp, 5 sp
34-50	Guidance	12 gp, 5 sp
51-68	Resistance	12 gp, 5 sp
69-85	Spark	12 gp, 5 sp
86-100	Virtue	12 gp, 5 sp"""
common_divine[1]="""01-04	Bane	25 gp
05-10	Bless	25 gp
11-15	Cause fear	25 gp
16-19	Command	25 gp
20-22	Comprehend languages	25 gp
23-28	Cure light wounds	25 gp
29-30	Detect chaos	25 gp
31-32	Detect evil	25 gp
33-34	Detect good	25 gp
35-36	Detect law	25 gp
37-39	Detect undead	25 gp
40-45	Divine favor	25 gp
46-48	Doom	25 gp
49-52	Entangle	25 gp
53-57	Inflict light wounds	25 gp
58-61	Magic fang	25 gp
62-65	Obscuring mist	25 gp
66-68	Produce flame	25 gp
69-71	Protection from chaos	25 gp
72-74	Protection from evil	25 gp
75-77	Protection from good	25 gp
78-80	Protection from law	25 gp
81-84	Remove fear	25 gp
85-88	Sanctuary	25 gp
89-94	Shield of faith	25 gp
95-97	Summon monster I	25 gp
98-100	Summon nature's ally I	25 gp"""
uncommon_divine[1]="""01-04	Ant haul	25 gp
05-07	Aspect of the falcon	25 gp
08-09	Calm animals	25 gp
10-12	Charm animal	25 gp
13-15	Compel hostility	25 gp
16-17	Deathwatch	25 gp
18-18	Detect animals or plants	25 gp
19-20	Detect snares and pits	25 gp
21-23	Diagnose disease	25 gp
24-27	Endure elements	25 gp
28-30	Entropic shield	25 gp
31-33	Faerie fire	25 gp
34-36	Feather step	25 gp
37-39	Forbid action	25 gp
40-42	Frostbite	25 gp
43-46	Goodberry	25 gp
47-47	Hide from animals	25 gp
48-49	Hide from undead	25 gp
50-52	Hydraulic push	25 gp
53-55	Jump	25 gp
56-59	Keen senses	25 gp
60-62	Liberating command	25 gp
63-65	Longstrider	25 gp
66-68	Magic stone	25 gp
69-72	Pass without trace	25 gp
73-74	Remove sickness	25 gp
75-75	Sanctify corpse	25 gp
76-78	Shillelagh	25 gp
79-81	Speak with animals	25 gp
82-85	Stone fist	25 gp
86-88	Stone shield	25 gp
89-91	Sun metal	25 gp
92-95	Touch of the sea	25 gp
96-98	Bless water	50 gp
99-100	Curse water	50 gp"""
common_divine[2]="""01-04	Aid	150 gp
05-06	Align weapon	150 gp
07-08	Animal messenger	150 gp
09-13	Barkskin	150 gp
14-16	Bear's endurance	150 gp
17-19	Bull's strength	150 gp
20-22	Cat's grace	150 gp
23-24	Chill metal	150 gp
25-30	Cure moderate wounds	150 gp
31-33	Darkness	150 gp
34-36	Delay poison	150 gp
37-39	Eagle's splendor	150 gp
40-41	Find traps	150 gp
42-44	Flame blade	150 gp
45-46	Fog cloud	150 gp
47-50	Heat metal	150 gp
51-52	Hold animal	150 gp
53-56	Hold person	150 gp
57-60	Inflict moderate wounds	150 gp
61-63	Owl's wisdom	150 gp
64-65	Remove paralysis	150 gp
66-68	Resist energy	150 gp
69-73	Restoration, lesser	150 gp
74-77	Shield other	150 gp
78-81	Silence	150 gp
82-85	Sound burst	150 gp
86-89	Spiritual weapon	150 gp
90-91	Summon monster II	150 gp
92-93	Summon nature's ally II	150 gp
94-95	Summon swarm	150 gp
96-97	Zone of truth	150 gp
98-100	Augury	175 gp"""
uncommon_divine[2]="""01-04	Animal aspect	150 gp
05-06	Animal trance	150 gp
07-10	Animate dead, lesser	150 gp
11-13	Arrow of law	150 gp
14-17	Aspect of the bear	150 gp
18-20	Blessing of courage and life	150 gp
21-24	Calm emotions	150 gp
25-27	Death knell	150 gp
28-30	Dread bolt	150 gp
31-34	Effortless armor	150 gp
35-37	Enthrall	150 gp
38-41	Flaming sphere	150 gp
42-43	Gentle repose	150 gp
44-46	Grace	150 gp
47-48	Groundswell	150 gp
49-51	Gust of wind	150 gp
52-53	Instant armor	150 gp
54-55	Instrument of agony	150 gp
56-58	Make whole	150 gp
59-60	Reduce animal	150 gp
61-62	Scent trail	150 gp
63-65	Shard of chaos	150 gp
66-68	Share language	150 gp
69-70	Shatter	150 gp
71-73	Soften earth and stone	150 gp
74-76	Spear of purity	150 gp
77-79	Spider climb	150 gp
80-82	Status	150 gp
83-84	Tree shape	150 gp
85-85	Undetectable alignment	150 gp
86-88	Warp wood	150 gp
89-91	Weapon of awe	150 gp
92-93	Wood shape	150 gp
94-95	Consecrate	175 gp
96-97	Desecrate	175 gp
98-99	Fire trap	175 gp
100-100	Masterwork transformation	450 gp"""
common_divine[3]="""01-03	Bestow curse	375 gp
04-08	Call lightning	375 gp
09-15	Cure serious wounds	375 gp
16-19	Daylight	375 gp
20-23	Deeper darkness	375 gp
24-28	Dispel magic	375 gp
29-33	Inflict serious wounds	375 gp
34-37	Invisibility purge	375 gp
38-40	Locate object	375 gp
41-42	Magic circle against chaos	375 gp
43-44	Magic circle against evil	375 gp
45-46	Magic circle against good	375 gp
47-48	Magic circle against law	375 gp
49-52	Magic fang, greater	375 gp
53-57	Magic vestment	375 gp
58-59	Poison	375 gp
60-65	Prayer	375 gp
66-68	Protection from energy	375 gp
69-70	Remove blindness/deafness	375 gp
71-73	Remove curse	375 gp
74-76	Remove disease	375 gp
77-79	Searing light	375 gp
80-81	Sleet storm	375 gp
82-85	Speak with dead	375 gp
86-87	Stone shape	375 gp
88-89	Summon monster III	375 gp
90-91	Summon nature's ally III	375 gp
92-95	Water breathing	375 gp
96-97	Water walk	375 gp
98-100	Animate dead	625 gp"""
uncommon_divine[3]="""01-04	Aqueous orb	375 gp
05-08	Archon's aura	375 gp
09-12	Bestow insight	375 gp
13-16	Blindness/deafness	375 gp
17-19	Burst of nettles	375 gp
20-22	Chain of perdition	375 gp
23-26	Contagion	375 gp
27-30	Create food and water	375 gp
31-34	Daybreak arrow	375 gp
35-36	Diminish plants	375 gp
37-40	Discovery torch	375 gp
41-45	Dominate animal	375 gp
46-48	Guiding star	375 gp
49-51	Helping hand	375 gp
52-56	Meld into stone	375 gp
57-58	Obscure object	375 gp
59-61	Plant growth	375 gp
62-64	Quench	375 gp
65-67	Shifting sands	375 gp
68-72	Snare	375 gp
73-75	Speak with plants	375 gp
76-80	Spike growth	375 gp
81-83	Vision of hell	375 gp
84-87	Wind wall	375 gp
88-90	Wrathful mantle	375 gp
91-93	Continual flame	425 gp
94-96	Nap stack	475 gp
97-98	Glyph of warding	575 gp
99-100	Symbol of healing	875 gp"""
common_divine[4]="""01-04	Air walk	700 gp
05-07	Chaos hammer	700 gp
08-15	Cure critical wounds	700 gp
16-19	Death ward	700 gp
20-22	Dimensional anchor	700 gp
23-25	Discern lies	700 gp
26-28	Dismissal	700 gp
29-33	Divine power	700 gp
34-39	Flame strike	700 gp
40-43	Freedom of movement	700 gp
44-46	Holy smite	700 gp
47-51	Inflict critical wounds	700 gp
52-56	Magic weapon, greater	700 gp
57-61	Neutralize poison	700 gp
62-64	Order's wrath	700 gp
65-68	Poison	700 gp
69-73	Spell immunity	700 gp
74-77	Spike stones	700 gp
78-80	Summon monster IV	700 gp
81-83	Summon nature's ally IV	700 gp
84-86	Tongues	700 gp
87-89	Unholy blight	700 gp
90-93	Divination	725 gp
94-96	Planar ally, lesser	1,200 gp
97-100	Restoration	1,700 gp"""
uncommon_divine[4]="""01-04	Absorb toxicity	700 gp
05-06	Antiplant shell	700 gp
07-11	Aspect of the stag	700 gp
12-15	Aura of doom	700 gp
16-21	Ball lightning	700 gp
22-25	Blessing of fervor	700 gp
26-28	Blight	700 gp
29-31	Command plants	700 gp
32-35	Control water	700 gp
36-39	Debilitating portent	700 gp
40-43	Giant vermin	700 gp
44-49	Ice storm	700 gp
50-55	Imbue with spell ability	700 gp
56-59	Plague carrier	700 gp
60-63	Planar adaptation	700 gp
64-67	Protection from energy, communal	700 gp
68-72	Reincarnate	700 gp
73-75	Repel vermin	700 gp
76-78	Rusting grasp	700 gp
79-83	Scrying	700 gp
84-87	Sending	700 gp
88-90	Spiritual ally	700 gp
91-93	Thorn body	700 gp
94-98	Volcanic storm	700 gp
99-100	Symbol of slowing	1,700 gp"""
common_divine[5]="""01-02	Animal growth	1,125 gp
03-04	Atonement	1,125 gp
05-07	Baleful polymorph	1,125 gp
08-11	Break enchantment	1,125 gp
12-16	Breath of life	1,125 gp
17-21	Call lightning storm	1,125 gp
22-25	Command, greater	1,125 gp
26-30	Cure light wounds, mass	1,125 gp
31-34	Death ward	1,125 gp
35-37	Disrupting weapon	1,125 gp
38-42	Inflict light wounds, mass	1,125 gp
43-47	Plane shift	1,125 gp
48-53	Righteous might	1,125 gp
54-57	Scrying	1,125 gp
58-62	Slay living	1,125 gp
63-67	Spell resistance	1,125 gp
68-70	Summon monster V	1,125 gp
71-73	Summon nature's ally V	1,125 gp
74-75	Tree stride	1,125 gp
76-77	Wall of fire	1,125 gp
78-80	Wall of stone	1,125 gp
81-82	Wall of thorns	1,125 gp
83-87	True seeing	1,375 gp
88-91	Commune	1,625 gp
92-94	Awaken	3,125 gp
95-100	Raise dead	6,125 gp"""
uncommon_divine[5]="""01-03	Air walk, communal	1,125 gp
04-08	Aspect of the wolf	1,125 gp
09-11	Blessing of the salamander	1,125 gp
12-15	Cleanse	1,125 gp
16-21	Commune with nature	1,125 gp
22-24	Contagion, greater	1,125 gp
25-28	Control winds	1,125 gp
29-31	Dispel chaos	1,125 gp
32-34	Dispel evil	1,125 gp
35-37	Dispel good	1,125 gp
38-40	Dispel law	1,125 gp
41-43	Fickle winds	1,125 gp
44-46	Forbid action, greater	1,125 gp
47-52	Insect plague	1,125 gp
53-55	Life bubble	1,125 gp
56-58	Mark of justice	1,125 gp
59-63	Pillar of life	1,125 gp
64-66	Serenity	1,125 gp
67-72	Snake staff	1,125 gp
73-76	Spell immunity, communal	1,125 gp
77-79	Transmute mud to rock	1,125 gp
80-82	Transmute rock to mud	1,125 gp
83-86	Wind blades	1,125 gp
87-90	Stoneskin	1,375 gp
91-92	Hallow	2,125 gp
93-94	Symbol of pain	2,125 gp
95-96	Symbol of sleep	2,125 gp
97-98	Unhallow	2,125 gp
99-99	Hallow (4th-level spell included)	6,125 gp
100-100	Unhallow (4th-level spell included)	6,125 gp"""
common_divine[6]="""01-05	Bear's endurance, mass	1,650 gp
06-11	Blade barrier	1,650 gp
12-16	Bull's strength, mass	1,650 gp
17-21	Cat's grace, mass	1,650 gp
22-27	Cure moderate wounds, mass	1,650 gp
28-32	Dispel magic, greater	1,650 gp
33-37	Eagle's splendor, mass	1,650 gp
38-43	Find the path	1,650 gp
44-47	Fire seeds	1,650 gp
48-55	Harm	1,650 gp
56-63	Heal	1,650 gp
64-69	Heroes' feast	1,650 gp
70-74	Inflict moderate wounds, mass	1,650 gp
75-78	Liveoak	1,650 gp
79-83	Owl's wisdom, mass	1,650 gp
84-87	Summon monster VI	1,650 gp
88-91	Summon nature's ally VI	1,650 gp
92-96	Word of recall	1,650 gp
97-100	Planar ally	2,900 gp"""
uncommon_divine[6]="""01-05	Animate objects	1,650 gp
06-09	Antilife shell	1,650 gp
10-15	Banishment	1,650 gp
16-19	Cold ice strike	1,650 gp
20-23	Dust form	1,650 gp
24-29	Geas/quest	1,650 gp
30-33	Ironwood	1,650 gp
34-37	Joyful rapture	1,650 gp
38-42	Move earth	1,650 gp
43-46	Plague storm	1,650 gp
47-51	Planar adaptation, mass	1,650 gp
52-54	Repel wood	1,650 gp
55-59	Sirocco	1,650 gp
60-63	Spellstaff	1,650 gp
64-67	Stone tell	1,650 gp
68-70	Swarm skin	1,650 gp
71-74	Tar pool	1,650 gp
75-77	Transport via plants	1,650 gp
78-83	Wind walk	1,650 gp
84-86	Create undead	1,750 gp
87-90	Glyph of warding, greater	2,050 gp
91-92	Undeath to death	2,150 gp
93-95	Symbol of fear	2,650 gp
96-98	Forbiddance	4,650 gp
99-100	Symbol of persuasion	6,650 gp"""
common_divine[7]="""01-04	Blasphemy	2,275 gp
05-10	Control weather	2,275 gp
11-17	Creeping doom	2,275 gp
18-24	Cure serious wounds, mass	2,275 gp
25-28	Dictum	2,275 gp
29-33	Ethereal jaunt	2,275 gp
34-40	Fire storm	2,275 gp
41-44	Holy word	2,275 gp
45-50	Inflict serious wounds, mass	2,275 gp
51-55	Regenerate	2,275 gp
56-60	Repulsion	2,275 gp
61-65	Scrying, greater	2,275 gp
66-69	Summon monster VII	2,275 gp
70-73	Summon nature's ally VII	2,275 gp
74-78	Sunbeam	2,275 gp
79-82	Word of chaos	2,275 gp
83-89	Destruction	2,775 gp
90-94	Restoration, greater	7,275 gp
95-100	Resurrection	12,275 gp"""
uncommon_divine[7]="""01-08	Animate plants	2,275 gp
09-17	Changestaff	2,275 gp
18-24	Circle of clarity	2,275 gp
25-30	Create demiplane, lesser	2,275 gp
31-38	Jolting portent	2,275 gp
39-45	Rampart	2,275 gp
46-53	Scouring winds	2,275 gp
54-60	Siege of trees	2,275 gp
61-67	Transmute metal to wood	2,275 gp
68-76	Vortex	2,275 gp
77-83	Waves of ecstasy	2,275 gp
84-89	Refuge	3,775 gp
90-95	Symbol of stunning	7,275 gp
96-100	Symbol of weakness	7,275 gp"""
common_divine[8]="""01-08	Antimagic field	3,000 gp
09-14	Cloak of chaos	3,000 gp
15-23	Cure critical wounds, mass	3,000 gp
24-31	Earthquake	3,000 gp
32-38	Finger of death	3,000 gp
39-44	Holy aura	3,000 gp
45-51	Inflict critical wounds, mass	3,000 gp
52-59	Reverse gravity	3,000 gp
60-65	Shield of law	3,000 gp
66-73	Spell immunity, greater	3,000 gp
74-78	Summon monster VIII	3,000 gp
79-83	Summon nature's ally VIII	3,000 gp
84-89	Sunburst	3,000 gp
90-95	Unholy aura	3,000 gp
96-100	Planar ally, greater	5,500 gp"""
uncommon_divine[8]="""01-07	Animal shapes	3,000 gp
08-13	Blood mist	3,000 gp
14-18	Control plants	3,000 gp
19-24	Create demiplane	3,000 gp
25-31	Dimensional lock	3,000 gp
32-37	Discern location	3,000 gp
38-42	Euphoric tranquility	3,000 gp
43-49	Frightful aspect	3,000 gp
50-56	Orb of the void	3,000 gp
57-61	Repel metal or stone	3,000 gp
62-68	Seamantle	3,000 gp
69-75	Storm bolts	3,000 gp
76-83	Whirlwind	3,000 gp
84-88	Create greater undead	3,150 gp
89-95	Symbol of death	8,000 gp
96-100	Symbol of insanity	8,000 gp"""
common_divine[9]="""01-07	Elemental swarm	3,825 gp
08-15	Energy drain	3,825 gp
16-22	Etherealness	3,825 gp
23-30	Gate	3,825 gp
31-40	Heal, mass	3,825 gp
41-48	Implosion	3,825 gp
49-58	Miracle	3,825 gp
59-65	Shambler	3,825 gp
66-73	Shapechange	3,825 gp
74-81	Storm of vengeance	3,825 gp
82-87	Summon monster IX	3,825 gp
88-93	Summon nature's ally IX	3,825 gp
94-100	True resurrection	28,825 gp"""
uncommon_divine[9]="""01-08	Antipathy	3,825 gp
09-15	Clashing rocks	3,825 gp
16-22	Create demiplane, greater	3,825 gp
23-31	Foresight	3,825 gp
32-39	Overwhelming presence	3,825 gp
40-47	Polar midnight	3,825 gp
48-56	Soul bind	3,825 gp
57-64	Spell immunity, greater	3,825 gp
65-71	Summon froghemoth	3,825 gp
72-80	Winds of vengeance	3,825 gp
81-87	World wave	3,825 gp
88-94	Astral projection	4,825 gp
95-100	Sympathy	5,325 gp"""

	
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

def scroll(lo_chance, hi_chance, name, gp, spell_level, caster_level, rarity, magic_type):
    result = {
        "LowChance" : lo_chance,
        "HighChance" : hi_chance,
        "Name": "Scroll of " + name,
        "id": "scroll-of-" + slugify(name),
        "Group": "Scroll",
        "MagicType": magic_type,
        "SpellName": name,
        "SpellId": slugify(name),
        "Price": float(gp.replace(",","")),
        "PriceUnit": "gp",
        "SpellLevel" : spell_level,
        "CL" : caster_level,
        "Rarity" : rarity
    }
    if result["SpellName"].startswith("Hallow"):
        result["SpellName"] = "Hallow"
        result["SpellId"] = "hallow"
    if result["SpellName"].startswith("Unhallow"):
        result["SpellName"] = "Unhallow"
        result["SpellId"] = "unhallow"
    return result
	
def parseTable(text, spell_level, caster_level, rarity, magic_type):
	table = []
	for line in text.splitlines():
		splitted = line.split()
		chance = splitted[0]
		try:
			lo_chance, hi_chance = map(int, chance.split("-"))
		except ValueError:
			print "BAD CHANCE '" + line + "'"
			sys.exit(-1)
		gp = splitted[-2]			
		name = " ".join(splitted[1:-2])			
		table.append(scroll(lo_chance, hi_chance, name, gp, spell_level, caster_level, rarity, magic_type))		
	return table

if __name__ == "__main__":
	table = []
	table += parseTable(common_arcane[0], 0, 1, "common", "arcane")	
	table += parseTable(common_arcane[1], 1, 1, "common", "arcane")	
	table += parseTable(common_arcane[2], 2, 3, "common", "arcane")	
	table += parseTable(common_arcane[3], 3, 5, "common", "arcane")	
	table += parseTable(common_arcane[4], 4, 7, "common", "arcane")	
	table += parseTable(common_arcane[5], 5, 9, "common", "arcane")	
	table += parseTable(common_arcane[6], 6, 11, "common", "arcane")	
	table += parseTable(common_arcane[7], 7, 13, "common", "arcane")	
	table += parseTable(common_arcane[8], 8, 15, "common", "arcane")	
	table += parseTable(common_arcane[9], 9, 17, "common", "arcane")	
	table += parseTable(uncommon_arcane[0], 0, 1, "uncommon", "arcane")	
	table += parseTable(uncommon_arcane[1], 1, 1, "uncommon", "arcane")	
	table += parseTable(uncommon_arcane[2], 2, 3, "uncommon", "arcane")	
	table += parseTable(uncommon_arcane[3], 3, 5, "uncommon", "arcane")	
	table += parseTable(uncommon_arcane[4], 4, 7, "uncommon", "arcane")	
	table += parseTable(uncommon_arcane[5], 5, 9, "uncommon", "arcane")	
	table += parseTable(uncommon_arcane[6], 6, 11, "uncommon", "arcane")	
	table += parseTable(uncommon_arcane[7], 7, 13, "uncommon", "arcane")	
	table += parseTable(uncommon_arcane[8], 8, 15, "uncommon", "arcane")	
	table += parseTable(uncommon_arcane[9], 9, 17, "uncommon", "arcane")
	table += parseTable(common_divine[0], 0, 1, "common", "divine")	
	table += parseTable(common_divine[1], 1, 1, "common", "divine")	
	table += parseTable(common_divine[2], 2, 3, "common", "divine")	
	table += parseTable(common_divine[3], 3, 5, "common", "divine")	
	table += parseTable(common_divine[4], 4, 7, "common", "divine")	
	table += parseTable(common_divine[5], 5, 9, "common", "divine")	
	table += parseTable(common_divine[6], 6, 11, "common", "divine")	
	table += parseTable(common_divine[7], 7, 13, "common", "divine")	
	table += parseTable(common_divine[8], 8, 15, "common", "divine")	
	table += parseTable(common_divine[9], 9, 17, "common", "divine")	
	table += parseTable(uncommon_divine[0], 0, 1, "uncommon", "divine")	
	table += parseTable(uncommon_divine[1], 1, 1, "uncommon", "divine")	
	table += parseTable(uncommon_divine[2], 2, 3, "uncommon", "divine")	
	table += parseTable(uncommon_divine[3], 3, 5, "uncommon", "divine")	
	table += parseTable(uncommon_divine[4], 4, 7, "uncommon", "divine")	
	table += parseTable(uncommon_divine[5], 5, 9, "uncommon", "divine")	
	table += parseTable(uncommon_divine[6], 6, 11, "uncommon", "divine")	
	table += parseTable(uncommon_divine[7], 7, 13, "uncommon", "divine")	
	table += parseTable(uncommon_divine[8], 8, 15, "uncommon", "divine")	
	table += parseTable(uncommon_divine[9], 9, 17, "uncommon", "divine")
	string = json.dumps(table, indent=4, sort_keys=True)
	with open("../data/items/scrolls.json", "w") as f:
		f.write(string)
	
				
			