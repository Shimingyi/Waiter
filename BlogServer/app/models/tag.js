/**
 * Created by iRubb on 2016/5/16.
 */
'use strict';

var mongoose = require('mongoose'),
    TagSchema = require('../schemas/tag');

var Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;