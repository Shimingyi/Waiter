/**
 * Created by iRubb on 2016/5/15.
 */
'use strict';

var mongoose = require('mongoose'),
    PhotoSchemas = require('../schemas/user');

var Photo = mongoose.model('User', PhotoSchemas);

module.exports = Photo;