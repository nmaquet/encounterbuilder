"use strict";

module.exports = function (userTextCollection, ObjectID) {

    function newUserText(username) {
        return {
            username: username,
            title: "Unnamed Text"
        }
    }

    return {
        findOne: function (request, response) {
            var username = request.session.user.username;
            var userTextId = request.params.id;
            userTextCollection.findOne({_id: ObjectID(userTextId), username: username}, function (error, userText) {
                if (error) {
                    response.json({error: error});
                }
                else {
                    response.json({userText: userText});
                }
            });
        },
        update: function (request, response) {
            var username = request.session.user.username;
            var userText = request.body.userText;
            var selector = {_id: ObjectID(userText._id), username: username};
            delete userText._id;
            userTextCollection.update(selector, userText, {}, function (error, result) {
                if (error) {
                    console.log(error);
                    response.json({error: "could not update userText"});
                }
                else {
                    response.json({_id: selector._id});
                }
            });
        },
        create: function (request, response) {
            var username = request.session.user.username;
            userTextCollection.insert(newUserText(username), function (error, newUserText) {
                if (error) {
                    console.log(error);
                    response.json({error: "could not insert userText"});
                }
                else {
                    response.json({userText: newUserText[0]});
                }
            });
        },
        copy: function (request, response) {
            var username = request.session.user.username;

            var userCreated = request.body.userCreated;

            var query = {_id: ObjectID(request.body.id), username: username};


            userTextCollection.findOne(query, {id: 0, _id: 0}, function (error, npc) {
                if (error) {
                    return response.json({error: error});
                }
                else {
                    var userText = npc;
                    if (userText) {
                        userText.username = username;
                        userTextCollection.insert(userText, function (error, newUserText) {
                            if (error) {
                                console.log(error);
                                response.json({error: "could not insert userText"});
                            }
                            else {
                                response.json({userText: newUserText[0]});
                            }
                        });
                    } else {
                        response.json({error: "could not find source Text to copy"});
                    }
                }
            });
        },
        delete: function (request, response) {
            var username = request.session.user.username;
            var userText = request.body.userText;
            if (userText._id && username) {
                userTextCollection.remove({_id: ObjectID(userText._id), username: username}, function (error) {
                    if (error) {
                        response.json({error: "could not delete userText"});
                    }
                    else {
                        response.json({});
                    }
                });
            }
            else {
                response.json({error: "no userText id"});
            }
        }
    };
};

