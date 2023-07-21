const { Op } = require('sequelize')
const db = require('../models')
const user = db.user
const bycryp = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    register : async (req, res) => {
            const {username, email, phone_number, password, confirmPassword } = req.body
            const salt = await bycryp.genSalt(10)
            const hashPassword = await bycryp.hash(password, salt)
            const result = await user.create({name : username, email, phoneNumber : phone_number, password : hashPassword} )
            const payload = {id : result.id}
            const token = jwt.sign(payload, 'key', {expiresIn : '10h'})
            res.status(200).send({
                message: 'regis success',
                result,
                token
            })
    },
    login : async (req,res) => { 
        try {
            const {data, password} = req.body
            const result = await user.findOne({
                where : {
                    [Op.or] : [
                        {
                            name : data
                        },
                        {
                            email : data
                        }
                    ],
                }
            })
        const payload = {id : result.id}
        const token = jwt.sign(payload, 'key', {expiresIn : '10h'})
        const jumlah = result.totalLogin
        const isValid = await bycryp.compare(password, result.password)
        if (result.totalLogin == 3) {
            await result.update({    
                isVerify : false,
                jumlah : 0
            })
        }
        if (result.isVerify == 0){
            await result.update({
                totalLogin : 0
            })
            throw{message : 'you must verify'}

            
        }
        if (!isValid) {
            await result.update({
                totalLogin: jumlah+1
            })
            throw{message :'password salah'}
        }

            await result.update({
                totalLogin : 0
            })
            res.status(200).send({
                result,
                token
            })
        
        }
         catch (error) {
            res.status(400).send(error)
        }
    },
    verify : async (req, res) => {
        try {
            await user.update (
                {
                    isVerify : true
                },
                {
                    where : {id : req.user.id}
                }
            )
            res.status(200).send('verify account success')
        } catch (error) {
            res.status(400).send(error)
        }
    },
    keepLogin: async (req,res) => {
        try {
            const id = req.user.id
            const result = await user.findOne({
                where : {id : req.user.id}
            })
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    getAllUser : async (req, res) => {
        try {
            const result = await user.findAll()
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    }
}