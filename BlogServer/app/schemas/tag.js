/**
 * Created by iRubb on 2016/5/16.
 */
'use strict';
var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
    name: String,
    describe: String,
    rank: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

TagSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }
    next();
});

TagSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('rank')
            .exec(cb);
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};

module.exports = TagSchema;