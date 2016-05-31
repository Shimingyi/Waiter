/**
 * Created by iRubb on 2016/5/17.
 */
'use strict';

var mongoose = require('mongoose'),
    Comment = mongoose.model('Comment');

exports.save = new function (req, res) {
    var _content = req.query.title || '',
        _from = req.query.from || '',
        _article = req.query.article || '';
    if(!article){
        var jsonArray = {
            status:{
                code: 1,
                text: 'Error article id'
            }
        };
        return res.send(jsonArray);
    }
    else{
        if(!_from){
            var jsonArray = {
                status:{
                    code: 2,
                    text: 'Error from name'
                }
            };
            return res.send(jsonArray);
        }
        else{
            if(!_content) {
                var jsonArray = {
                    status:{
                        code: 3,
                        text: 'Error comment content'
                    }
                };
                return res.send(jsonArray);
            }
            else{
                var comment = new Comment();
                comment.content = _content;
                comment.from = _from;
                comment.article = _article;
                comment.save(function (err, _comment) {
                    if(err){
                        console.log(err);
                    }
                    var jsonArray = {
                        status:{
                            code: 0,
                            text: 'Success'
                        },
                        data:{
                            comment: _comment
                        }
                    };
                    return res.send(jsonArray);
                });
            }
        }
    }
};

exports.delete = new function (req, res) {
    
};