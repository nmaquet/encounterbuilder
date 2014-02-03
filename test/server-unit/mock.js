"use strict";

module.exports = function () {
    return {
        Monster: {
            find: function (params, callback) {
                this.find.params = params;
                this.find.callback = callback;
                return this;
            },
            limit: function (value) {
                this.limit.value = value;
                return this;
            },
            sort: function (options) {
                this.sort.options = options;
                return this;
            },
            skip: function (value) {
                this.skip.value = value;
                return this;
            },
            count: function (callback) {
                this.count.callback = callback;
                return this;
            },
            execFind: function (callback) {
                this.execFind.callback = callback;
                return this;
            },
            remove: function(params, callback) {
                this.remove.params = params;
                this.remove.callback = callback;
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