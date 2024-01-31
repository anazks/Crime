const staffModel =  require('../models/staffModel')
const errModel = require('../models/errorModel')
const bcrypt = require("bcrypt");

const getLoginPage = (req,res)=>{
        try {
            res.render("admin/login",{ layout: false })
        } catch (error) {
           console.log(error) 
           res.status(500).send("Internal servar error")
        }
}
const homepage = async (req,res)=>{
        try {
            let staffList = await staffModel.find({});
            let staffCount  = await staffModel.countDocuments();
            let errorCount = await errModel.countDocuments();
            res.render('admin/admin',{partials:true,staffList,staffCount,errorCount})
        } catch (error) {
            console.log(error)
        }
}
const doLogin =(req,res)=>{
        try {
            let admin = {
                    username: "admin",
                    role:"admin",
                    allAccess:true
            }
            if(req.body.username == "admin" && req.body.password == "admin"){
                    req.session.admin = admin;
                    res.redirect('/admin/home')
            }
        } catch (error) {
            console.log(error)
        }
}
const getStaffpage = async(req,res)=>{
        try {
            let staffList = await staffModel.find({})
            res.render("admin/all-staffs",{partials:true,staffList})
        } catch (error) {
           console.log(error) 
            res.status(500).send("Internal server error")       
        }
}
const addStaffPage =(req,res)=>{
    try {
        res.render("admin/add-new-staffs",{partials:true})
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
}
const errorpage = async(req,res)=>{
    try {
        let errors = await errModel.find({})
        res.render("admin/view-all-questions",{partials:true,errors})
    } catch (error) {
        console.log(error)
        res.status(500).send("internal error")
    }
}
const addError =(req,res)=>{
    try {
        res.render('admin/add-question-paper',{partials:true})
    } catch (error) {
        console.log(error)
    }
}
const addErrorToDb =async (req,res)=>{
    try {
        let errordata = errModel.create(req.body);
        console.log("addes")
        res.redirect('/admin/getError')
    } catch (error) {
        console.log(error)
        res.status(500).send("internal error")
    }
}
const Report = (req,res)=>{
        try {
          res.render("admin/report")  
        } catch (error) {
            console.log(error)
        }
}
const logout = (req,res)=>{
    try {
       req.session.admin = null;
       res.redirect('/admin/')
    } catch (error) {
        console.log(error)
    }
}
const addStaff = async(req,res)=>{
        try {
            let {password} = req.body;
            password = await bcrypt.hash(password,10)
            req.body.password = password;
            let staff = await staffModel.create(req.body);
                if(staff){
                    res.redirect('/admin/getStaffPage')
                    console.log('staff added')
                }else{
                    res.staff(404).send("internal error")
                }
        } catch (error) {
            console.log(error)
            res.status(500).send("internal server error")
        }
}

const deleteStaff =async(req,res)=>{
    try {
        let deletedstaff = await staffModel.findByIdAndDelete({_id:req.params.id})
        console.log("deleted")
        res.redirect("/admin/getStaffPage")
    } catch (error) {
        console.log(error)
    }
}
const deleteError =async(req,res)=>{
    try {
        let deletederror = await errModel.findByIdAndDelete({_id:req.params.id})
        console.log("deleted")
        res.redirect("/admin/getError")
    } catch (error) {
        console.log(error)
    }
}
module.exports ={
    getLoginPage,
    homepage,
    doLogin,
    getStaffpage,
    addStaffPage,
    errorpage,
    addError,
    Report,
    addStaff,
    logout,
    addErrorToDb,
    deleteStaff,
    deleteError
}