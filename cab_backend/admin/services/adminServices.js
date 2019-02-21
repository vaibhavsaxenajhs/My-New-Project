const db                 = require('../../database/dbConnection')
const Promise            = require('bluebird');
const config             = require('../../Config/config')
const adminAuthorization = require('../../Authorization/adminAuthorization')

module.exports.checkDatabaseEmpty=()=>
{
    return new Promise( function(resolve, reject){
        db.query("SELECT admin_id FROM admin", function(err,val)
        {
            if(err)
            { 
                //console.log(err);
                reject(err)
            }
            else
            {    
               // console.log(val)
                resolve(val)
            }
        })
    }
    
    )
}

function insertAdminFunction(adminName,adminMail,password)
{   return new Promise((resolve , reject)=>
    {
        db.query("INSERT INTO admin(admin_name, email,password) VALUES (?,?,?)",[adminName,adminMail,password],(err,data)=>
    {
        if(err)
        {   

            console.log(err)
            reject(err)
        }
        else{
            resolve("Successfully Inserted...")
        }
    })
    })
    
}

module.exports.insertIntoDatabase=()=>
{
    return new Promise((resolve,reject)=>{
        Promise.coroutine(function*(){
        let hashForAdmin1 = yield adminAuthorization.generateHashFunction(config.adminPassword[0])
        console.log(hashForAdmin1);
        let hashForAdmin2 = yield adminAuthorization.generateHashFunction(config.adminPassword[1])
        console.log(hashForAdmin2)
        let insertAdmin1   = yield insertAdminFunction("AKASH DEEP","akash@gmail.com",hashForAdmin1);
        let insertAdmin2   = yield insertAdminFunction("BHAGAT SIR","bhagat@gmail.com",hashForAdmin2);
        console.log(insertAdmin1)
        console.log(insertAdmin2)
        resolve('Successfully Completed......')
        })().catch((err)=>{
            reject('ERROR')
        })
        

    })
}
module.exports.getHashValueFunction= (req,res,email)=>
{   
    return new Promise((resolve,reject)=>{
        db.query("SELECT password FROM admin WHERE email =?", [email], (err,data)=>
    {
        if(err)
        {   
            console.log("hsdshdsjdsh  hdshdahdasdajhaj")
            reject(err)
        }
        else{
            console.log(data)
            if(data[0]==undefined)
            {
               resolve('');
            }
                else
                {
                   resolve(data[0].password)
                }
            }
    })
    })
    
}


module.exports.fetchAdminDetailsFunction=(email)=>
{
    return new Promise((resolve, reject)=>{
        console.log(email+".....")
        db.query("SELECT admin_id,admin_name,created_at FROM admin WHERE email=?",email,function(err,val){
            if(err)
            {      
                   reject('')
            }
            else{
                console.log("uuuuu"+val);
                resolve(val)
            }
        })
    })
}

module.exports.fetchDriversByRatings=()=>
{
    return new Promise((resolve , reject)=>
    {
        db.query("SELECT driver_id, driver_name , driver_ratings, driver_ratings FROM driver WHERE status=? ORDER BY driver_ratings DESC ",'free',(err,details)=>
        {
            if(err)
            {
                reject('')
            }
            else{
                resolve(details);
            }
        })
    })
}
module.exports.fetchPendingUsersFunction=()=>
{
    return new Promise((resolve, reject)=>
    {
        db.query("SELECT user_id, booking_id,source, destination FROM booking WHERE booking_status =? order by booking_created_at",['pending'],(err,details)=>
        {
            if(err)
            {
                reject('')
            }
            else{
                resolve(details);
            }
        })
    })
}




module.exports.getAvailableDriver=(req,res)=>
{   
      return new Promise((resolve,reject)=>{
       db.query("SELECT driver_id, car_number FROM driver WHERE status=? AND driver_id=? LIMIT 1", ['free',req.body.driverID],(err,data)=>{
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

module.exports.assignDriver=(req,res,driverDetails)=>{
    return new Promise((resolve, reject)=>
    {   
        console.log(driverDetails.car_number)
        db.query("UPDATE booking SET driver_id=?, car_number =?, booking_status=? WHERE user_id= ? AND booking_status=? ",[driverDetails.driver_id, driverDetails.car_number,'ASSIGNED', req.body.userID,'free'], function(err,val)
        {
            if(err)
            {
                reject('FAIL')
            }
            else{
                resolve('succcess')
            }
        })
    })
}

module.exports.updateDriverStatusFunction=(req,res)=>
{
    return new Promise((resolve,reject)=>{
        db.query("UPDATE driver SET status =? WHERE driver_id= ?",['busy', req.body.driverID],(err,data)=>
        {
            if(err)
            {
                reject('error')
            }
            else{
                 resolve('success')
            }
        })
    })
}