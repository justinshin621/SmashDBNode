const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
        name: { type: String, unique: true, required: true },
        gsp: { type: String, default: 'N/A' },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
        createdDate: { type: Date, default: Date.now },
    }
);

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Fighter', schema);
