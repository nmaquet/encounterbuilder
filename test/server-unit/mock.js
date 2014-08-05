// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function () {
    return {
        monsterCollection: {
            find: function (query, options) {
                this.find.query = query;
                this.find.options = options;
                return this;
            },
            findOne: function (query, callback) {
                this.findOne.query = query;
                this.findOne.callback = callback;
                return this;
            },
            count: function (query, callback) {
                this.count.query = query;
                this.count.callback = callback;
                return this;
            },
            remove: function(params, callback) {
                this.remove.params = params;
                this.remove.callback = callback;
                return this;
            },
            toArray: function(callback) {
                this.toArray.callback = callback;
                return this;
            },
            create: function(object, callback) {
                if (this.create.calls === undefined)
                    this.create.calls = [];
                this.create.calls.push({
                    object : object,
                    callback : callback
                });
                return this;
            }
        },

        userMonsterCollection: {},

        request: {
            params: {

            },
            query : {

            }
        },

        response: {
            json: function (object) {
                this.json.object = object;
            },
            send: function (data) {
                this.send.data = data;
            },
            sendfile: function(path) {
                this.sendfile.path = path;
            },
            redirect: function(url) {
                this.redirect.url = url;
            },
            render: function(path) {
                this.render.path = path;
            }
        },

        monster: {

        },

        monsterArray : new Array(3),

        FIND_LIMIT : 666,

        fs : {
            readFile : function(path, encoding, callback) {
                this.readFile.path = path;
                this.readFile.encoding = encoding;
                this.readFile.callback = callback;
            }
        }
    };
};