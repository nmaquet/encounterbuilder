"use strict";

module.exports = function () {
    return {
        Monster: {
            find: function (params, callback) {
                this.find.params = params;
                this.find.callback = callback;
            }
        },

        request: {
            params: {

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

        }
    };
};