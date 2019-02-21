const db     = require('../../database/dbConnection')
const config = require('../../Config/config')
const jwt    = require('jsonwebtoken')


module.exports.addSignupFunction =(req,res)=>
{  
    console.log(req.body)
    console.log(req.hash+"......")
    db.query("INSERT INTO user( user_name, user_email, user_phone, password) VALUES (?,?,?,?)",[req.body.name, req.body.email, req.body.phone, req.hash],function(err,data)
    {
        if(err)
        {
            res.json({error:config.errorCode[3],
            message: err.message});
        }
        else{
            db.query("SELECT user_id,user_name,user_email FROM user WHERE user_email= ?",req.body.email,function(err,data)
                         {
                            res.json({
                                statusCode: 200,
                                message: 'The data inserted successfully in database. WELLCOME',
                                Data:{
                                    USER_ID: data[0].user_id,
                                    username: data[0].user_name,
                                    user_email: data[0].user_email
                                }
                                  
                            })
                         })
        }
    })
}


module.exports.checkEmailExistance=(req,res)=>{
    return new Promise((resolve,reject)=>
    {   
        console.log(req.body.email+'55555555555')
        db.query("SELECT password FROM user WHERE user_email=?",req.body.email, function(err,val)
        {
            if(err)
            {  
                reject(err.message);
            }
            else{
                resolve(val);
            }
        })
    })
}



module.exports.fetchLoginDetails=(req, res)=>{
    db.query("SELECT user_id,user_name ,user_email, user_phone FROM user WHERE user_email=?",req.body.email, function(err, detail)
    {
        if(err)
        { 
            console.log(err)
             res.json({
               error: config.errorCode[1]
        })
            
        }
        else{
            
            res.json({
                statusCode: 200,
                message: "Successfully Log in to Your Account.....",
                WELCOME:{
                    USER_NAME: detail[0].user_name,
                    USER_ID: detail[0].user_id,
                    USER_EMAIL: detail[0].user_email,
                    USER_PHONE: detail[0].user_phone,
                    TOKEN : req.token
                }
            })
        }
    })
}

module.exports.getEmailByToken=(req,res)=>
{
    return new Promise (function(resolve, reject){
        console.log(req.body)
        jwt.verify(req.body.token, config.privateKey,(err,value)=>
        {
            if(err)
            {
                console.log("heilokolololo")
                reject('')
            }
            else{
               console.log(value.email)
                resolve(value.email)
            }
        })
    })
}

module.exports.insertBookingDetails=(req,res)=>
{
    return new Promise(function(resolve,reject)
    {  
        console.log(req.email+"25252525")
        db.query("SELECT user_id FROM user WHERE user_email=?",req.email,function(err,data)
        {
            if(err)
            {
                res.json({
                    ERROR: config.errorCode[2]
                })
            }
            else{
                req.userID=data[0].user_id;
                db.query("INSERT INTO booking(user_id,source, destination) VALUES (?,?,?)",[data[0].user_id, req.body.source, req.body.destination],(err,status)=>
                {
                    if(err)
                    {
                        console.log("insertion err")

                        reject('')
                    }
                    else{
                        resolve(status);
                    }
                })
            }
        })
    })
}
module.exports.getBookingDetail=(req,res)=>{
    return new Promise(function(resolve,reject)
    {    
        console.log(req.userID);
        db.query("SELECT booking_id, user_id, source, destination,booking_created_at FROM booking WHERE user_id=?",req.userID,function(err,val)
        {
            if(err)
            {   

                console.log("thisssssss    jsjj")
                reject(err)
            }
            else{
                resolve(val)

            }
        })
    })
}



module.exports.getUserDetailsByEmailFunction=(email)=>
{
    return new Promise((resolve, reject)=>{
        db.query("SELECT user_id, user_name ,user_email FROM user WHERE user_email= ? ", email,(err,data)=>
        {
            if(err)
            {
                reject('')
            }
            else{
                resolve(data[0])
            }
        })
    })
}



module.exports.setBookingTable=(user)=>{
    return new Promise((resolve, reject)=>
    {
        db.query("UPDATE booking SET booking_status = ? WHERE user_id=? AND booking_status =?",['completed', user.user_id, 'assigned'],(err,detail)=>
        {
            if(err)
            {
                reject('')
            }
            else{
                resolve('done')
            }
        })
    })
}





module.exports.fetchDriverStatus=(userData)=>
{
    return new Promise((resolve , reject)=>{
        db.query("SELECT driver_id,car_number from booking WHERE user_id =?", userData.user_id, (err, driverID)=>
        {
            if(err)
            {
                reject('')
                {
                    reject('')
                }
                resolve(driverID[0])
            }
        })
    })
}





module.exports.setStatusOfDriverFunction= (driver)=>{
    return new Promise((resolve, reject)=>
    { 
        db.query("UPDATE driver SET status=? WHERE driver_id=? AND status = ?", ['free', driver.driver_id, 'busy'],(err,data)=>
        {
            if(err)
        {
            reject('')
        }
        else{
            resolve('complete')

        }

        })
        
    })
}