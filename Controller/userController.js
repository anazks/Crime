let errorModel = require('../models/errorModel')
let userLogin = (req,res)=>{
        try {
          res.render("user/Login")
        } catch (error) {
            console.log(error)
        }
}

let userHome = async (req,res)=>{
    try {
        console.log("Home route working")
        let errors = await errorModel.find({})
        res.render("user/home",{errors})
    } catch (error) {
        console.log(error)
    }
}
let errors = async (req,res)=>{
        try {
            let errors = await errorModel.find({})
            res.json(errors)
        } catch (error) {
            console.log(error)
        }
}
module.exports = {
    userLogin,
    userHome,
    errors
}