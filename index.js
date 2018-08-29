const mongoose = require('mongoose');
const moment = require('moment');
mongoose.Promise = require('bluebird');

const TIME = {
    type: Date,
    default: Date.now,
    get(value) {
        return moment(value).unix();
    },
    set(value) {
        if (value instanceof Date) {
            return value;
        } else {
            return moment(value, 'X').toDate();
        }
    }
};

const BASE = (fields, options = {}) => {
    if (!fields.created_at) {
        fields.created_at = TIME;
    }
    if (!fields.updated_at) {
        fields.updated_at = TIME;
    }
    let schema = new mongoose.Schema(fields, options);
    return schema;
}


// module.exports = BASE