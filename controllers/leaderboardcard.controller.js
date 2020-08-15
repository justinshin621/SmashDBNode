const leaderservice = require('../services/leaderboardcard.service');

module.exports = {
    getAllCards
};


function getAllCards(req, res, next) {
    leaderservice.getAllCards()
        .then(cards => {
            console.log(cards);
            res.json(cards);
        })
        .catch(err => next(err));
}
