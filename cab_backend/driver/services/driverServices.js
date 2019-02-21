const db     = require('../../database/dbConnection')
const config = require('../../Config/config')


module.exports.insertDriverValues =(req, res)=>
{  
    console.log(req.body)
    console.log(req.hash)
    db.query("INSERT INTO driver(driver_name, driver_email, car_number ,password) VALUES (?,?,?,?)",[req.body.name,req.body.email,req.body.carNumber, req.hash],(err,detail)=>
    {
        if(err)
        {   
            console.log(err)
            res.send({
               error: config.errorCode[2],
               message:err.message
        })
    }
        else{

            db.query("SELECT driver_id,driver_name,driver_email, car_number FROM driver WHERE driver_email=?",req.body.email,function(err,data){
            if(err)
            {
              //  console.log('253525')
                config.errorCode[2]
            }
            else{
                
                res.json({
                    statusCode: 200,
                    message: 'The data inserted successfully in database. WELLCOME',
                    Data:{
                        DRIVER_ID: data[0].driver_id,
                        DRIVER_NAME: data[0].driver_name,
                        DRIVER_EMAIL: data[0].driver_email,
                        CAR_NUMBER: data[0].car_number
                    }  
                })

            }
                      
        })
    }
 })
}



module.exports.getHash=(req,res)=>
{return new Promise(function(resolve ,reject)
    {   
        console.log(req.body.email)
        db.query("SELECT password FROM driver WHERE driver_email=?", req.body.email,function(err,hash)
        {
       if(err)
       {
           reject('err')
       }
       else{   
                resolve(hash[0].password);
       }
   })
    })
}