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
            execFind: function (callback) {
                this.execFind.callback = callback;
                return this;
            },
            remove: function(params, callback) {
                this.remove.params = params;
                this.remove.callback = callback;
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
            }
        },

        monster: {

        },

        FIND_LIMIT : 666
    };
};