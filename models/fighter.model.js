const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
        name: { type: String, required: true },
        gsp: { type: Number, default: 0},
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
        createdDate: { type: Date, default: Date.now },
        isFavorite: {type: Boolean, default: false},
        isElite: {type: Boolean, default: false}
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Fighter', schema);
