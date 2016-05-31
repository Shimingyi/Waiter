/**
 * Created by iRubb on 2016/5/17.
 */
'use strict';

var mongoose = require('mongoose'),
    ArticleSchema = require('../schemas/article');

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;