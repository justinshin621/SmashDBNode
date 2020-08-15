const db = require('../_helpers/database');
const Fighter = db.Fighter;
const LBCard = db.LBCard;
const User = db.User;

module.exports = {
    addFighter,
    edit,
    deleteFighter,
    getFighters
};

async function getFighters() {
    return await Fighter.find();
}


async function addFighter(fighter, userid, username) {
    if(await Fighter.findOne({ createdyBy: userid, name: fighter.name})){
        throw 'Fighter info already exists for this user';
    }

    const isElite = fighter.gsp >= 7000000;

    let newrecord = fighter;
    fighter.createdBy = userid;
    fighter.createdDate = Date.now();
    fighter.isElite = isElite;
    console.log(newrecord);

    dbrecord = new Fighter(newrecord);
    await dbrecord.save();

    //Changing AVGs for LBCard
    const cards = await Fighter.find({createdBy: userid});
    const count = await Fighter.count({createdBy: userid});

    avggsp = 0;
    topgsp = 0;

    cards.forEach(card => {
        avggsp += card.gsp;
        if (card.gsp > topgsp) {
            topgsp = card.gsp;
        }
    })

    if (count === 0) {
        avggsp = 0;
    }
    else {
        avggsp /= count;
    }

    console.log(username);


    await LBCard.updateOne({username}, {$set: {avggsp: Math.round(avggsp), topgsp}});

}

async function edit({date, gsp, fighter, favorite, hasMain}, userid, username) {

    const isElite = gsp >= 7000000;
    console.log('Is this elite: ' + isElite);

    await Fighter.updateOne({createdBy: userid, createdDate: date},
        {$set: {gsp, isFavorite: favorite, isElite}});

    //Changing AVGs for LBCard
    const cards = await Fighter.find({createdBy: userid});
    const count = await Fighter.count({createdBy: userid});

    avggsp = 0;
    topgsp = 0;

    cards.forEach(card => {
        avggsp += card.gsp;
        if (card.gsp > topgsp) {
            topgsp = card.gsp;
        }
    })

    if (count === 0) {
        avggsp = 0;
    }
    else {
        avggsp /= count;
    }

    console.log(username);


    await LBCard.updateOne({username}, {$set: {avggsp: Math.round(avggsp), topgsp}});

    //Change if User has main or not.
    await User.updateOne({username}, {$set: {hasMain}})

}

async function deleteFighter(date, username) {

}
