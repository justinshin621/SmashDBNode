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

    //console.log(username);

    if (topgsp >= 7000000) {
        await LBCard.updateOne({username}, {$set: {isElite: true}});
    }
    else {
        await LBCard.updateOne({username}, {$set: {isElite: false}});
    }

    await LBCard.updateOne({username}, {$set: {avggsp: Math.round(avggsp), topgsp}});

}

async function edit({date, gsp, fighter, favorite}, userid, username) {

    const isElite = gsp >= 7000000;
    console.log('Is this elite: ' + isElite);
    console.log(date);
    console.log(gsp);
    console.log(fighter);
    console.log(favorite);
    console.log(userid);

    await Fighter.updateOne({createdBy: userid, createdDate: date}, {$set: {gsp, isElite, isFavorite: favorite}});

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

    let favoriteFighter = '';
    if (favorite) {
        favoriteFighter = fighter;
    }
    if (topgsp >= 7000000) {
        await LBCard.updateOne({username}, {$set: {isElite: true}});
    }
    else {
        await LBCard.updateOne({username}, {$set: {isElite: false}});
    }
    await LBCard.updateOne({username}, {$set: {avggsp: Math.round(avggsp), topgsp, favoriteFighter}});


}

async function deleteFighter(date, userid, username) {

    let fighter = await Fighter.findOne({createdDate: date});

    if (fighter.isFavorite) {
        await User.updateOne({username}, {$set: {hasMain: false}});
        await LBCard.updateOne({username}, {$set: {favoriteFighter: ''}});
    }

    await Fighter.deleteOne(fighter);

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

    if (topgsp >= 7000000) {
        await LBCard.updateOne({username}, {$set: {isElite: true}});
    }
    else {
        await LBCard.updateOne({username}, {$set: {isElite: false}});
    }

    await LBCard.updateOne({username}, {$set: {avggsp: Math.round(avggsp), topgsp}});


}
