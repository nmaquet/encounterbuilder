"use strict";

module.exports = function (userNpcCollection, npcsCollection, ObjectID) {

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

            var userCreated = request.body.userCreated;
            var originCollection = (userCreated) ? userNpcCollection : npcsCollection;

            var query = (userCreated) ? {_id: ObjectID(request.body.id), Username: username} : {id: request.body.id};


            originCollection.findOne(query, {id: 0, _id: 0}, function (error, npc) {
                if (error) {
                    return response.json({error: error});
                }
                else {
                    var userNpc = npc;
                    if (userNpc) {
                        if (!userCreated) {
                            //FIXME this kinda works now but will be messy when user will copy content from other users.
                            userNpc.Name = "copy of " + userNpc.Name;
                            userNpc.Source = "originally from " + (userNpc.Source || "???") + " and modified by " + username;
                        }
                        userNpc.Username = username;
                        userNpcCollection.insert(userNpc, function (error, newUserNpc) {
                            if (error) {
                                console.log(error);
                                response.json({error: "could not insert userNpc"});
                            }
                            else {
                                response.json({userNpc: newUserNpc[0]});
                            }
                        });
                    } else {
                        response.json({error: "could not find source Npc to copy"});
                    }
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

