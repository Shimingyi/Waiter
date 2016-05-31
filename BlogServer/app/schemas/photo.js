/**
 * Created by iRubb on 2016/5/15.
 */
'use strict';

var mongoose = require('mongoose');

var PhotoSchema = new mongoose.Schema({
    url: String,
    title: String,
    content: String,
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

PhotoSchema.pre('save', function (next) {
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }
    else{
        this.meta.updateAt = Date.now();
    }
    next();
});

PhotoSchema.static = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function(id, cb){
        return this
            .findOne({_id:id})
            .exec(cb);
    }
};

module.exports = PhotoSchema;