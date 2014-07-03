'use strict';

DEMONSQUID.encounterBuilderServices.factory('userTextService', ['$http', function ($http) {

    function nop() {
    }

    var lastUserText = null;
    var lastUserTextId = null;


    return {
        get: function (id, callback) {
            callback = callback || nop;
            if (lastUserTextId && lastUserTextId === id) {
                return callback(null, lastUserText);
            }
            $http.get('/api/user-text/' + id)
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                        lastUserTextId = lastUserText = null;
                    } else {
                        lastUserTextId = response.userText._id;
                        lastUserText = response.userText;
                    }
                    callback(response.error, response.userText);
                })
                .error(function (error) {
                    callback(error);
                });
        },
        create: function (callback) {
            callback = callback || nop;
            $http.post('/api/create-user-text')
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                        lastUserTextId = lastUserText = null;
                    } else {
                        lastUserTextId = response.userText._id;
                        lastUserText = response.userText;
                    }
                    callback(response.error, response.userText);
                })
                .error(function (response) {
                    console.log("post of text failed !");
                    callback(response.error);
                });
        },
        copy: function (id, callback) {
            callback = callback || nop;
            $http.post('/api/copy-text', {id: id})
                .success(function (response) {
                    console.log("userservice.success");
                    if (response.error) {
                        console.log(error);
                        lastUserTextId = lastUserText = null;
                    } else {
                        lastUserTextId = response.userText._id;
                        lastUserText = response.userText;
                    }
                    callback(response.error, response.userText);
                })
                .error(function (response) {
                    console.log("post of text failed !");
                    callback(response.error);
                });
        },
        update: function (userText, callback) {
            callback = callback || nop;
            $http.post('/api/update-user-text', { userText: userText })
                .success(function (response) {
                    if (response.error) {
                        console.log(error);
                        lastUserTextId = lastUserText = null;
                    } else {
//                        lastUserTextId = userText._id;
//                        lastUserText = userText;
                    }
                    callback(response.error);
                })
                .error(function (response) {
                    console.log("post of userText failed !");
                    callback(response.error);
                });
        },
        delete: function (userText, callback) {
            callback = callback || nop;
            $http.post('/api/delete-user-text', { userText: userText })
                .success(function (response) {
                    if (response.error) {
                        console.log(response.error);
                    }
                    lastUserTextId = lastUserText = null;
                    callback(response.error);
                })
                .error(function (response) {
                    console.log("delete of userText failed !");
                    callback(response.error);
                });
        },
        getMultiple: function (ids, callback) {
            function pushTask(id) {
                tasks.push(function (taskCallback) {
                        $http.get('/api/user-text/' + id)
                            .success(function (data) {
                                taskCallback(null, data.userText);
                            })
                            .error(function (error) {
                                taskCallback(error, null);
                            });
                    }
                );
            }

            var tasks = [];
            for (var i in ids) {
                pushTask(ids[i]);
            }
            window.async.parallel(tasks, function (error, results) {
                callback(error, results);
            });
        }
    };
}])
;