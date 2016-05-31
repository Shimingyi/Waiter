/**
 * Created by iRubb on 2016/5/16.
 */
'use strict';

var mongoose = require('mongoose'),
    ccap = require('ccap')(),
    User = mongoose.model('User'),
    captcha = '';

exports.captcha = function (req, res) {
    if(req.url === '/favicon.ico'){
        return res.end('');
    }
    var ary = ccap.get();
    captcha = ary[0];
    res.end(captcha);
};

exports.register = function(req, res){
    var _username = req.query.username || '',
        _captcha = req.query.captcha || '';

    User.findOne({username: _username}, function (err, user) {
        if(err){
            console.log(err);
        }
        if(user){
            var jsonArray = {
                status:{
                    code: 1,
                    text: 'User is exited'
                }
            };
            return res.send(jsonArray);
        }
        else{
            if(_captcha){
                if(_captcha.toLowerCase() !== captcha.toLowerCase()){
                    var jsonArray = {
                        status:{
                            code: 2,
                            text: 'Error captcha'
                        }
                    };
                    return res.send(jsonArray);
                }
                else{
                    var _user ={};
                    _user.username = _username || '';
                    _user.captcha = _captcha || '';
                    _user.password = req.query.password || '';
                    user = new User(_user);
                    user.save(function (err, user) {
                        if(err){
                            console.log(err);
                        }
                        console.log('user:'+user.username + user.password);
                        req.session.user = user;
                        var jsonArray = {
                            status:{
                                code: 0,
                                text: 'success'
                            },
                            data:{
                                user: user
                            }
                        };
                        return res.send(jsonArray);
                    })
                }
            }
            else {
                var jsonArray = {
                    status:{
                        code: 2,
                        text: 'Error captcha'
                    }
                };
                return res.send(jsonArray);
            }
        }
    });
};

exports.sign = function (req, res) {
    var _username = req.query.username || '',
        _password = req.query.password || '',
        _captcha = req.query.captcha || '';

    User.findOne({username: _username}, function(err, user){
        if(err){
            console.log(err);
        }
        if(!user){
            var jsonArray = {
                status:{
                    code: 1,
                    text: 'User not exited'
                }
            };
            return res.send(jsonArray);
        }
        else{
            user.comparePassword(_password, function(err, isMatch){
                if(err){
                    console.log(err);
                }
                if(isMatch){
                    if(captcha){
                        if(_captcha.toLowerCase() !== captcha.toLowerCase()){
                            var jsonArray = {
                                status:{
                                    code: 2,
                                    text: 'Error captcha'
                                }
                            };
                            return res.send(jsonArray);
                        }
                        else{
                            req.session.user = user;
                            var jsonArray = {
                                status:{
                                    code: 0,
                                    text: 'success'
                                },
                                data:{
                                    user: user
                                }
                            };
                            return res.send(jsonArray);
                        }
                    }
                    else{
                        var jsonArray = {
                            status:{
                                code: 2,
                                text: 'Error captcha'
                            }
                        };
                        return res.send(jsonArray);
                    }
                }
                else{
                    var jsonArray = {
                        status:{
                            code: 3,
                            text: 'Error password'
                        }
                    };
                    return res.send(jsonArray);
                }
            });
        }
    });
};

exports.logout = function (req, res) {
    delete req.session.user;
    var jsonArray = {
        status:{
            code: 0,
            text: 'success'
        }
    };
    return res.send(jsonArray);
};

exports.signinRequired = function(req, res, next){
    var _user = req.session.user;
    if(!_user){
        var jsonArray = {
            status:{
                code: 1,
                text: 'no log in'
            }
        };
        return res.send(jsonArray);
    }
    next();
};

exports.adminRequired = function(req, res, next){
    var _user = req.session.user;
    if(_user && _user.role <= 10){
        var jsonArray = {
            status:{
                code: 1,
                text: 'no admin role'
            }
        };
        return res.send(jsonArray);
    }
    next();
}