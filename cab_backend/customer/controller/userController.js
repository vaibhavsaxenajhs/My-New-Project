const express     = require('express')
const app         = express();
const bodyParser  = require ('body-parser');
const bcrypt      = require('bcrypt')
const saltRounds  =10;
const db          = require('../../database/dbConnection')
const config      = require('../../Config/config')
const userService = require('../../customer/services/userServices')
const async       = require('async')

const createBookingFunction= async function(req,res){
    let insert = await userService.insertBookingDetails(req,res);
    let getBookingDetail= await userService.getBookingDetail(req,res);
    if(insert=='')
    {
        res.json({
            error:config.errorCode[2]
        })
    }
    else{
        res.json({
            statusCode:200,
            message:" Your booking creation is successfully Completed....",
            data:{
                USER_ID :req.userID,
                "YOUR BOOKING ID ": getBookingDetail[0].booking_id,
                "Pick up Point ":getBookingDetail[0].source,
                "Drop Point ":   getBookingDetail[0].destination,
                "message": "please wait till driver assign....."
            }

        })
    }
}

const completeBookingFunction=async (req,res)=>{
    let email = req.email;
    let getUserDetailsByEmail = await userService.getUserDetailsByEmailFunction(email);
    if(getUserDetailsByEmail=='')
    {
        res.json({
            "error":config.errorCode[2],
            "messsage": "email doesnt exsists...."
        })
    }
    else{
        console.log(getUserDetailsByEmail.user_id)
        let updateBookingTable    = await userService.setBookingTable(getUserDetailsByEmail);
        if(updateBookingTable=='')
        {
            res.json({
                statusCode:404,
                "message": "No booking is assigned to you right Now"
            })
        }
        else{
            let driverDetails= await userService.fetchDriverStatus(getUserDetailsByEmail);
            if(driverDetails=='')
            {
                res.json({
                    Error: config.errorCode[3]
                })
            }
            else{
                let setStatusOfDriver =  await userService.setStatusOfDriverFunction(driverDetails)
                if(setStatusOfDriver=='')
                {
                    res.json({
                        Error: config.errorCode[2],
                        message: "Driver status Updation Failed.."
                    })
                }
                else{
                    res.json({
                        statusCode:200,
                        "message": "You have Successfully Complete Your booking....",
                        data:{
                            "USER_ID ":getUserDetailsByEmail.user_id,
                            "USER_NAME":getUserDetailsByEmail.user_name,
                            "USER_EMAIL": getUserDetailsByEmail.user_email,
                            "DRIVER_ID": driverDetails.driver_id,
                            "CAR_NUMBER": driverDetails.car_number
                        }
                    })
                }
            }
        }
        
    }
   


}


module.exports.createBookingFunction = createBookingFunction;
module.exports.completeBookingFunction = completeBookingFunction