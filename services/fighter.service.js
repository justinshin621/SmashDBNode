const db = require('../_helpers/database');
const {Fighter} = require("../_helpers/database");
const fighterdb = db.Fighter;

module.exports = {addFighter}


async function addFighter(fighter, userid){
    if(await fighterdb.findOne({ createdyBy: userid, name: fighter.name})){
        throw 'Fighter info already exists for this user';
    }
    else if(!username){
        throw 'Username problem';
    }

    let newrecord = fighter;
    fighter.createdBy = userid;
    fighter.createdDate = Date.now();

    dbrecord = new Fighter(newrecord);
    await dbrecord.save();
}
