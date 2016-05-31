/**
 * Created by iRubb on 2016/5/15.
 */
'use strict';

var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId;

var CommentSchema = new mongoose.Schema({
    content: String,
    from: String,
    article: {
        type: Object,
        ref: 'Article'
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

CommentSchema.pre('save',function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else {
        this.meta.updateAt = Date.now();
    }
    next();
});

// 静态方法不会与数据库直接交互，需要经过模型编译实例化后才会具有该方法
CommentSchema.statics = {
    fetch: function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function(id,cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    }
};

module.exports = CommentSchema;