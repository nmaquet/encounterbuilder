"use strict";

module.exports = function (userCollection, authentication) {
    return function (request, response) {
        if (request.session && request.session.user) {

            var username = request.session.user.username;

            authentication.authenticate(userCollection, username, request.body.oldPassword, function (error, user) {
                if (user) {
                    var newPassword = request.body.newPassword;
                    authentication.hash(newPassword, function (error, salt, hash) {
                        userCollection.update(
                            {username: user.username},
                            {$set: {
                                hash: new String(hash).toString(),
                                salt: new String(salt).toString()}
                            },
                            function (error) {
                                if (error) {
                                    console.log(error);
                                    response.send(500);
                                }
                                response.send(200);
                            });
                    });
                } else {
                    //FIXME send appropriate error so that the modal can display something
                    response.send(401, 'access denied');
                }
            });
        }
        else {
            response.send(401, 'access denied');
        }
    }

};