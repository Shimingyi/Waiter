/**
 * Created by iRubb on 2016/5/15.
 */
'use strict';

var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
    title: String,
    describe: String,
    content: String,
    url: String,
    category: [{type: mongoose.Schema.Types.ObjectId, ref:'Category'}],
    pv: {
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


ArticleSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else {
        this.meta.updateAt = Date.now();
    }
    next();
});

ArticleSchema.statics = {
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

module.exports = ArticleSchema;