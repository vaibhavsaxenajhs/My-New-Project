const express    =require('express');
const app        = express();
const Joi        = require('joi');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


const inputValidateFunction= function(req,res, next){
    const schema = {
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        phone: Joi.number().required(),
        password: Joi.string().min(6).max(30).required(),
        confirmPassword: Joi.any().valid(Joi.ref('password'))
    }
    Joi.validate(req.body, schema ,(err,val)=>
    {
        if(err)
        {
            res.status(400).json({
                status : 400,
                message : 'Some error has been occured',
                data : err.details[0].message
            })
        }
        else
        {   
            console.log("Entered values are validated..."+val)
            next();
        }
    })

}

module.exports.inputValidateFunction = inputValidateFunction;
