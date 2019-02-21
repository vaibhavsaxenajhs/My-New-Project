const bcrypt     = require('bcrypt')
const saltRounds =10;
const config     = require('../Config/config')
const service    = require('../customer/services/userServices')
const db         = require('../database/dbConnection')
const jwt        = require('jsonwebtoken');
const checkCredentialsFunction=async function(req,res, next){
    //const email= req.body.email;
    const password= req.body.password;
    let hash= await service.checkEmailExistance(req,res)
    if(hash=='')
    {   res.json({
        Warning: config.warnings[0]

    })
        
    }
    else{
        console.log(password+'=========');
        console.log(hash[0].password);
        bcrypt.compare(password, hash[0].password,function(err,check)
        {
            if(check)
            {
                next();
            }
            else
            { res.json({
               Warning: config.warnings[1]
            })
                
            }
        })
    }
}


const passwordToHashFunction = function(req,res,next)
{
    bcrypt.genSalt(saltRounds,(err,salt)=>
    {
        bcrypt.hash(req.body.confirmPassword , salt , (err, hash)=>
        {
            if(err){
                throw err;
             }
             else{
                 req.hash= hash;
                 next();
             }
        });
    });    
}



const generateTokenFunction=(req,res, next)=>
{
    const payLoad = {
        email: req.body.email
        }
    jwt.sign(payLoad, config.privateKey, (err, token) => {
        if (err) {
            res.json(
                {
                   ERROR:config.errorCode[2]
                }
            )
            
        }
        else {
            req.token = token;
            console.log(token+")))))))))))))")
            next();
        }
    });
}


const validateTokenFunction= async (req,res,next)=>
{
    console.log('*************');
    
    let email = await service.getEmailByToken(req,res);
    console.log(email+"......")
    if(email=='')
    {
        res.json({
            ERROR: config.warnings[2]
        })
    }
    else{
        req.email= email;
        next();
    }
}

module.exports.checkCredentialsFunction = checkCredentialsFunction
module.exports.passwordToHashFunction = passwordToHashFunction
module.exports.generateTokenFunction= generateTokenFunction;
module.exports.validateTokenFunction = validateTokenFunction