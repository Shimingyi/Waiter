/**
 * Created by iRubb on 2016/5/16.
 */
'use strict';

var mongoose = require('mongoose'),
    Tag = mongoose.model('Tag');

exports.add = function(req, res){
    var _name = req.query.name || '',
        _describe = req.query.describe || '',
        _rank = req.query.rank || '';
    if(!_name){
        var jsonArray = {
            status: {
                code: 1,
                text: 'invalid name'
            }
        };
        res.send(jsonArray);
    }
    else{
        if(!_rank){
            var jsonArray = {
                status: {
                    code: 1,
                    text: 'invalid rank'
                }
            };
            res.send(jsonArray);
        }
        else{
            if(_name && _rank){
                var tag = new Tag();
                tag.name = _name;
                tag.describe = _describe;
                tag.rank = Math.floor(_rank);
                tag.save(function (err, _category) {
                    if(err){
                        console.log(err);
                    }
                    var jsonArray = {
                        status: {
                            code: 0,
                            text: 'success'
                        }
                    };
                    res.send(jsonArray);
                });
            }
        }
    }
};

exports.list = function(req, res){
    Tag.fetch(function(err, _categorys){
        if(err){
            console.log(err);
        }
        var jsonArray = {
            status: {
                code: 0,
                text: 'success'
            },
            data: {
                categorys: _categorys
            }
        };
        res.send(jsonArray);
    });
};