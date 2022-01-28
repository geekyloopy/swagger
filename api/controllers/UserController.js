/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// const Note = require("../models/Note");

// const User = require("../models/User");

// const User = require("../models/User");

// var User = require("../models/User");

module.exports = {
    register: async function(req,res){
        const uname= req.body.uname;
        const password=req.body.password;
        await User.create({uname: uname,password: password}).exec(function(err){
            if(err){
                res.send(500,{err: 'Database error...!!'});
            }
            // Note.create({uname: uname});
            console.log("User registered successfully...!!");
            return res.status(201).json({ uname: uname, message: 'Record entered successfully.' });
        })
    },
    list: async function(req,res){
        await User.find({}).exec(function(err,userList){
            if(err){
                res.send(500,{err: 'Database error..!!'});
            }
            console.log(userList);
            return res.status(200).json({message: 'Record fetched successfully..!!', data: userList});
        });
    },
    login: async function(req,res){
        const loginUname=req.body.uname;
        const loginPassword=req.body.password;
        User.findOne({uname: loginUname}).exec(function(err,loginUser){
            if(loginUser===undefined){
                return res.status(404).json({message: 'User not found...!!'});
            }
            // console.log(loginUser);
            // console.log(loginUser.password);
            // console.log(loginPassword);
            if(loginUser.password==loginPassword)
            return res.status(200).json({message: 'Successfully logged in...!!', user: loginUser});
            else{
                return res.status(404).json({message: `Credentials don't match..!!`});
            }
            })
    },
    updatePassword: async function(req,res){
        const loginUser=req.body;
        var updatedRecord= await User.updateOne({uname: loginUser.uname}).set({password: loginUser.password});
        if(updatedRecord){
            return res.status(200).json({message: 'Successfully updated the password.'});
        }
        else{
            return res.status(400).json({message: 'Bad request from client.'});
        }
    },
    listByUser: async function(req,res){
        const loginUser=req.param('unames');
        const loginUserFromBody=req.body;
        console.log(loginUser);
        console.log(loginUserFromBody.uname);
        console.log(req.param('newparam'));
    }
};