"use strict";

module.exports = function (userNpcCollection, npcsCollection, ObjectID) {

    var fromHTMLToString = require('./utils')().fromHTMLToString;

    function newUserNpc(username) {
        return {
            Username: username,
            Name: "Unnamed Npc"
        }
    }

    return {
        findOne: function (request, response) {
            var username = request.session.user.username;
            var userNpcId = request.params.id;
            userNpcCollection.findOne({_id: ObjectID(userNpcId), Username: username}, function (error, userNpc) {
                if (error) {
                    response.json({error: error});
                }
                else {
                    response.json({userNpc: userNpc});
                }
            });
        },
        update: function (request, response) {
            var username = request.session.user.username;
            var userNpc = request.body.userNpc;
            userNpc.Username = username;
            var selector = {_id: ObjectID(userNpc._id), Username: username};
            delete userNpc._id;
            userNpcCollection.update(selector, userNpc, {}, function (error, result) {
                if (error) {
                    console.log(error);
                    response.json({error: "could not update userNpc"});
                }
                else {
                    response.json({_id: selector._id});
                }
            });
        },
        create: function (request, response) {
            var username = request.session.user.username;
            userNpcCollection.insert(newUserNpc(username), function (error, newUserNpc) {
                if (error) {
                    console.log(error);
                    response.json({error: "could not insert userNpc"});
                }
                else {
                    response.json({userNpc: newUserNpc[0]});
                }
            });
        },
        copy: function (request, response) {
            var username = request.session.user.username;

            npcsCollection.findOne({id: request.body.id}, {id: 0, _id: 0}, function (error, npc) {
                if (error) {
                    return response.json({error: error});
                }
                else {
                    var userNpc = npc;
                    userNpc.Name = "copy of " + userNpc.Name;
                    userNpc.Source = "originally from " + (userNpc.Source || "???") + " and modified by " + username;
                    userNpc.Username = username;
                    if (userNpc.Description) {
                        userNpc.Description = fromHTMLToString(npc.Description);
                    }
                    if (userNpc.SpecialAbilities) {
                        userNpc.SpecialAbilities = fromHTMLToString(npc.SpecialAbilities);
                    }
                    if (userNpc.SpellLikeAbilities) {
                        userNpc.SpellLikeAbilities = fromHTMLToString(npc.SpellLikeAbilities);
                    }
                    userNpcCollection.insert(userNpc, function (error, newUserNpc) {
                        if (error) {
                            console.log(error);
                            response.json({error: "could not insert userNpc"});
                        }
                        else {
                            response.json({userNpc: newUserNpc[0]});
                        }
                    });
                }
            });
        },
        delete: function (request, response) {
            var username = request.session.user.username;
            var userNpc = request.body.userNpc;
            if (userNpc._id && username) {
                userNpcCollection.remove({_id: ObjectID(userNpc._id), Username: username}, function (error) {
                    if (error) {
                        response.json({error: "could not delete userNpc"});
                    }
                    else {
                        response.json({});
                    }
                });
            }
            else {
                response.json({error: "no userNpc id"});
            }
        }
    };
};

