const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
        username: { type: String, unique: true, required: true },
        first: { type: String, required: true },
        last: { type: String, required: true },
        avggsp: { type: String, default: 0},
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('lbcard', schema);
