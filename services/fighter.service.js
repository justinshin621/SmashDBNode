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

    console.log('It is adding');

    let doesExist = await Fighter.findOne({createdBy: userid, name: fighter.name});

    if(doesExist) {
        throw 'Fighter info already exists for this user';
    }

    const isElite = fighter.gsp >= 7000000;

    let newrecord = fighter;
    fighter.createdBy = userid;
    fighter.createdDate = Date.now();
    fighter.isElite = isElite;


    dbrecord = new Fighter(newrecord);
    await dbrecord.save();

    //Changing Avgs for Fighters
    const cardsFighters = await Fighter.find({name: fighter.name});
    const count2 = await Fighter.count({name: fighter.name});

    avggspFighter = 0;
    cardsFighters.forEach(card => {
        avggspFighter += card.gsp;
    })

    if (count2 === 1) {
        avggspFighter = fighter.gsp;
    }
    else {
        avggspFighter /= count2;
    }

    await Fighter.updateMany({name: fighter.name}, {$set: {avggsp: Math.round(avggspFighter)}});

    //Changing AVGs for LBCard
    const cards = await Fighter.find({createdBy: userid});
    const count = await Fighter.count({createdBy: userid});

    let avggsp = 0;
    let topgsp = 0;

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


    if (topgsp >= 7000000) {
        await LBCard.updateOne({username}, {$set: {isElite: true}});
    }
    else {
        await LBCard.updateOne({username}, {$set: {isElite: false}});
    }

    await LBCard.updateOne({username}, {$set: {avggsp: Math.round(avggsp), topgsp}});

}

async function edit({date, gsp, fighter, favorite, hasMain}, userid, username) {

    const isElite = gsp >= 7000000;
    console.log('It is editting')

    await Fighter.updateOne({createdBy: userid, createdDate: date}, {$set: {gsp, isElite, isFavorite: favorite}});

    //Changing Avgs for Fighters
    const cardsFighters = await Fighter.find({name: fighter});
    const count2 = await Fighter.count({name: fighter});

    avggspFighter = 0;
    cardsFighters.forEach(card => {
        avggspFighter += card.gsp;
    })

    if (count2 === 0) {
        avggspFighter = 0;
    }
    else {
        avggspFighter /= count2;
    }

    await Fighter.updateMany({name: fighter}, {$set: {avggsp: Math.round(avggspFighter)}});

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

    if (!favorite) {
        let user = await User.findOne({username, favoriteFighter: fighter});
        if (user) {
            await User.updateOne({username}, {$set: {hasMain: false, favoriteFighter: ''}});
            await LBCard.updateOne({username}, {$set: {favoriteFighter: ''}});
        }
    }
    else {
        if (!hasMain) {
            await User.updateOne({username}, {$set: {hasMain: true, favoriteFighter: fighter}});
            await LBCard.updateOne({username}, {$set: {favoriteFighter: fighter}});
        }
    }
    if (topgsp >= 7000000) {
        await LBCard.updateOne({username}, {$set: {isElite: true}});
    }
    else {
        await LBCard.updateOne({username}, {$set: {isElite: false}});
    }
    await LBCard.updateOne({username}, {$set: {avggsp: Math.round(avggsp), topgsp}});


}

async function deleteFighter(date, userid, username) {

    let fighter = await Fighter.findOne({createdDate: date});

    console.log('Is it deleting in service');

    if (fighter.createdBy+ '' === userid) {
        if (fighter.isFavorite) {
            console.log('Delete covering for favorite fighters');
            let user = await User.findOne({username, favoriteFighter: fighter.name});
            if (user) {
                await User.updateOne({username}, {$set: {hasMain: false, favoriteFighter: ''}});
                await User.updateOne({username}, {$set: {favoriteFighter: ''}});
            }
        }
        console.log('Fighter about to be deleted: ' + fighter);
        await Fighter.deleteOne(fighter);
    }
    else {
        throw 'Operation not permitted by: ' + username;
    }

    //Changing Avgs for Fighters
    const cardsFighters = await Fighter.find({name: fighter.name});
    const count2 = await Fighter.count({name: fighter.name});

    avggspFighter = 0;
    cardsFighters.forEach(card => {
        avggspFighter += card.gsp;
    })

    if (count2 === 0) {
        avggspFighter = 0;
    }
    else {
        avggspFighter /= count2;
    }

    await Fighter.updateMany({name: fighter.name}, {$set: {avggsp: Math.round(avggspFighter)}});

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

    if (topgsp >= 7000000) {
        await LBCard.updateOne({username}, {$set: {isElite: true}});
    }
    else {
        await LBCard.updateOne({username}, {$set: {isElite: false}});
    }
    let lbcard = await LBCard.findOne({favoriteFighter: fighter.name});
    if (lbcard) {
        await LBCard.updateOne({username}, {$set:{favoriteFighter: ''}});
    }
    await LBCard.updateOne({username}, {$set: {avggsp: Math.round(avggsp), topgsp}});


}
