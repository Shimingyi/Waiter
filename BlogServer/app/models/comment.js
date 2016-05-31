/**
 * Created by iRubb on 2016/5/17.
 */
'use strict';

var mongoose = require('mongoose'),
    commentSchema = require('../schemas/comment');

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;