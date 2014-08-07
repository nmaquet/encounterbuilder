// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

module.exports = function (userMonsterCollection, monstersCollection, ObjectID) {

    function newUserMonster(username) {
        return {
            Username: username,
            Name: "new Monster",
            CR:0,
            XP:0
        }
    }

    return {
        findOne: function (request, response) {
            var username = request.user.username;
            var userMonserId = request.params.id;
            userMonsterCollection.findOne({_id: ObjectID(userMonserId), Username: username}, function (error, userMonster) {
                if (error) {
                    response.json({error: error});
                }
                else {
                    response.json({userMonster: userMonster});
                }
            });
        },
        update: function (request, response) {
            var username = request.user.username;
            var userMonster = request.body.userMonster;
            userMonster.Username = username;
            var selector = {_id: ObjectID(userMonster._id), Username: username};
            delete userMonster._id;
            userMonsterCollection.update(selector, userMonster, {}, function (error, result) {
                if (error) {
                    console.log(error);
                    response.json({error: "could not update userMonster"});
                }
                else {
                    response.json({_id: selector._id});
                }
            });
        },
        create: function (request, response) {
            var username = request.user.username;
            userMonsterCollection.insert(newUserMonster(username), function (error, newUserMonster) {
                if (error) {
                    console.log(error);
                    response.json({error: "could not insert userMonster"});
                }
                else {
                    response.json({userMonster: newUserMonster[0]});
                }
            });
        },
        copy: function (request, response) {
            var username = request.user.username;

            var userCreated = request.body.userCreated;
            var originCollection = (userCreated) ? userMonsterCollection : monstersCollection;

            var query = (userCreated) ? {_id: ObjectID(request.body.id), Username: username} : {id: request.body.id};

            originCollection.findOne(query, {id: 0, _id: 0}, function (error, monster) {
                if (error) {
                    return response.json({error: error});
                }
                else {
                    var userMonster = monster;
                    if (userMonster) {
                        if (!userCreated) {
                            //FIXME this kinda works now but will be messy when user will copy content from other users.
                            userMonster.Source = "originally from " + (userMonster.Source || "???") + " and modified by " + username;
                        }
                        userMonster.Username = username;
                        userMonsterCollection.insert(userMonster, function (error, newUserMonster) {
                            if (error) {
                                console.log(error);
                                response.json({error: "could not insert userMonster"});
                            }
                            else {
                                response.json({userMonster: newUserMonster[0]});
                            }
                        });
                    } else {
                        response.json({error: "could not find source Monster to copy"});
                    }
                }
            });
        },
        delete: function (request, response) {
            var username = request.user.username;
            var userMonster = request.body.userMonster;
            if (userMonster._id && username) {
                userMonsterCollection.remove({_id: ObjectID(userMonster._id), Username: username}, function (error) {
                    if (error) {
                        response.json({error: "could not delete userMonster"});
                    }
                    else {
                        response.json({});
                    }
                });
            }
            else {
                response.json({error: "no userMonster id"});
            }
        }
    };
};

