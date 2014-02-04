"use strict";


module.exports = function (Encounter) {
    return function (request, response) {
        if (request.session && request.session.user) {

            var username =  request.session.user.username;

            Encounter.find({Username:username}, function (error, Encounters){
                if (error)
                    response.send(error);

                console.log(Encounters);

                if (Encounters.length === 0) {
                    console.log("pushing");
                    Encounters.push({ Name: "Untitled", CR: "0", Monsters: {}});
                } else{
                    console.log("not pushing");
                }

                var userData = {
                    user: {
                        username: username
                    },
                    Encounters: Encounters
                };
                response.json(userData);
            })
        }
        else {
            response.json({});
        }
    }
};