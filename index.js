const mongoose = require('mongoose');
const moment = require('moment');
mongoose.Promise = require('bluebird');

const Time = {
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

const methods = [
    'update',
    'findOneAndUpdate',
    'updateMany',
    'updateOne'
];

const middleware = (schema) => {
    schema.pre('save', function (next) {
        if (this.isModified()) {
            this.updated_at = new Date();
        }
        next();
    });
    methods.forEach((method) => {
        schema.pre(method, function (next) {
            this.update({}, { $set: { updated_at: new Date() } });
            next();
        });
    })
}

const Base = (model, fields, options = {}) => {
    if (!fields.created_at) {
        fields.created_at = Time;
    }
    if (!fields.updated_at) {
        fields.updated_at = Time;
    }
    let schema = new mongoose.Schema(fields, options);
    middleware(schema);
    if (!schema.options.toJSON) {
        schema.options.toJSON = {};
    }
    if (!schema.options.toJSON.virtuals) {
        schema.options.toJSON.virtuals = true;
    }
    if (!schema.options.toJSON.getters) {
        schema.options.toJSON.getters = true;
    }

    let originTransform = schema.options.toJSON.transform;
    schema.options.toJSON.transform = (doc, ret, options) => {
        if (originTransform) {
            ret = prevTransform(doc, ret, options);
        }
        delete ret.__v;
        delete ret._id;
        return ret;
    }

    if (model && typeof model === 'string') {
        return mongoose.model(model, schema);
    } else {
        return schema;
    }
}

Base.Time = Time;

module.exports = Base;