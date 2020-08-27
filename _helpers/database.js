const config = require('../config.json');
const mongoose = require('mongoose');
const uri = "mongodb+srv://jshin:junyoung@smashcluster.nhimm.mongodb.net/SmashDB?retryWrites=true&w=majority";
mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true });
//mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    Fighter: require('../models/fighter.model'),
    LBCard: require('../models/leaderboardcard.model')
};

