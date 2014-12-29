// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

Monsters = new Meteor.Collection("monsters");
Chronicles = new Meteor.Collection("chronicles");
ChronicleItems = new Meteor.Collection("chronicle-items");
EncounterItems = new Meteor.Collection("encounter-items");

var example_chronicle = {
    _id: "XtvP2F8ap6AmFp53j",
    ownerId: "hWP6SAXiQDGZGLCDG",
    name: "Example Chronicle"
};

//var example_text_chronicle_item = {
//    "_id": "aJPqce4z4xgNCowKK",
//    "ownerId": "hWP6SAXiQDGZGLCDG",
//    "chronicleId": "eoxegb59NzM5ErihA",
//    "type": "text",
//    "content": {
//        "title": "Example Chronicle Item",
//        "body": "Some text here"
//    },
//    "rank": 1.4375
//};
//
//var example_monster_chronicle_item = {
//    "_id": "TfdQAsivGX2EyEtFh",
//    "ownerId": "5pSxJPZFr2ydeBL5d",
//    "chronicleId": "gtBi88qWRgP2qJpTb",
//    "type": "monster",
//    "content": {
//        "Name": "Behemoth, Ravener",
//        "CR": 18
//        /* ... */
//    },
//    "rank": 3
//};
//
//var example_encounter_chronicle_item = {
//    "_id": "TfdQAsivGX2EyEtFh",
//    "ownerId": "5pSxJPZFr2ydeBL5d",
//    "chronicleId": "gtBi88qWRgP2qJpTb",
//    "type": "encounter",
//    "content": {
//        "name": "Encounter Name"
//    },
//    "rank": 3
//};
//
//var example_monster_encounter_item = {
//
//};