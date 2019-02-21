const db    = require('../../database/dbConnection')
const config=require('../../Config/config')
const loginSuccessFunction= (req,res)=>

{
    db.query("SELECT driver_id, driver_name , driver_email, car_number FROM driver WHERE driver_email= ?",req.body.email,function(err, data)
    {  
        if(err){
            ERROR: config.errorCode[2]
        }
        else{

    }
        res.json({
            statusCode: 200,
            message: "Successfully Log in to you account. WELCOME!!",
            data: 
            {
                DRIVER_ID: data[0].driver_id,
                DRIVER_NAME: data[0].driver_name,
                DRIVER_EMAIL: data[0].driver_email,
                CAR_NUMBER: data[0].car_number,
                "YOUR TOKEN ": req.token
            }
        })
    })
}

module.exports.loginSuccessFunction= loginSuccessFunction