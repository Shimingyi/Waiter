/**
 * Created by iRubb on 2016/5/15.
 */
'use strict';

var mongoose = require('mongoose'),
    PhotoSchemas = require('../schemas/photo');

var Photo = mongoose.model('Photo', PhotoSchemas);

module.exports = Photo;