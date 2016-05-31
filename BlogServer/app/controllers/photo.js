/**
 * Created by iRubb on 2016/5/15.
 */
'use strict';

var mongoose = require('mongoose'),
    Photo = mongoose.model('Photo');

exports.save = function (req, res) {
    var newPhoto = new Photo();
    newPhoto.title = req.query.title;
    newPhoto.content = req.query.content;
    newPhoto.url = req.query.url;
    res.send(JSON.stringify(newPhoto));
    newPhoto.save(function (err, _newMovie) {
        if(err){
            console.log(err);
        }
    });
};

exports.list = function(req, res){
    var page = req.query.page;
    if(page){
        var query = Photo.find({})
            .skip((page-1)*20)
            .limit(20);
        var _count;
        Photo.count().exec(function(err, num){
            if(err)
                console.log(err);
            _count = num;
        });
        query.exec(function(err, _photos){
                if(err){
                    console.log(err);
                }
                var pageCount = parseInt(_count/20+1);
                var jsonArray = {
                    status:{
                        code: 0,
                        text: 'success'
                    },
                    data:{
                        pages: pageCount,
                        photos: _photos
                    }
                };
                res.send(jsonArray);
            });
    }
    else{
        Photo.find({})
            .exec(function (err, photos) {
                if(err)
                    console.log(err);
                var jsonArray = {
                    status:{
                        code: 0,
                        text: 'success'
                    },
                    data:{
                        pages: 0,
                        photos: photos
                    }
                };
                res.send(jsonArray);
            })
    }
};