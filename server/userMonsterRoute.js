"use strict";

module.exports = function (userMonsterCollection, monstersCollection, ObjectID) {

    function newUserMonster(username) {
        return {
            Username: username,
            Name: "Unnamed Monster"
        }
    }

    function fromHTMLToString(html) {
        var result = html;
        result = result.replace(/<\/p>/gim, '\n\n');
        result = result.replace(/<\/h5>/gim, '\n\n');
        result = result.replace(/<br>/gim, '\n\n');
        result = result.replace(/<(?:.|\n)*?>/gim, '');
        return result.trim();
    }

    return {
        findOne: function (request, response) {
            var username = request.session.user.username;
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
            var username = request.session.user.username;
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
            var username = request.session.user.username;
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
            var username = request.session.user.username;

            monstersCollection.findOne({id: request.body.id}, {id: 0, _id: 0}, function (error, monster) {
                if (error) {
                    return response.json({error: error});
                }
                else {
                    var userMonster = monster;
                    userMonster.Name = "copy of " + userMonster.Name;
                    userMonster.Username = username;
                    if (userMonster.Description) {
                        userMonster.Description = fromHTMLToString(monster.Description);
                    }
                    if (userMonster.SpecialAbilities) {
                        userMonster.SpecialAbilities = fromHTMLToString(monster.SpecialAbilities);
                    }
                    if (userMonster.SpellLikeAbilities) {
                        userMonster.SpellLikeAbilities = fromHTMLToString(monster.SpellLikeAbilities);
                    }
                    userMonsterCollection.insert(userMonster, function (error, newUserMonster) {
                        if (error) {
                            console.log(error);
                            response.json({error: "could not insert userMonster"});
                        }
                        else {
                            response.json({userMonster: newUserMonster[0]});
                        }
                    });
                }
            });
        },
        delete: function (request, response) {
            var username = request.session.user.username;
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

