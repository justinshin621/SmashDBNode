const db = require('../_helpers/database');
const LBCards = db.LBCard;

module.exports = {
    getAllCards
};


async function getAllCards(){

    return await LBCards.find().sort({avggsp: -1});

}
