const bcrypt         = require('bcrypt')
const saltRounds     =10;
const driverService  = require('../driver/services/driverServices')
const config         = require('../Config/config')
const jwt            = require('jsonwebtoken')
const passwordToHash=(req,res , next)=>
{
    bcrypt.genSalt(saltRounds,(err,salt)=>
    {
        bcrypt.hash(req.body.confirmPassword , salt , (err, hash)=>
        {
            if(err){
                throw err;
             }
             else{
                 console.log(hash)
                 req.hash = hash;
                 next();
             }
        });
    }); 
}

const  checkCredentialFunction= async (req, res, next)=>{
         let hash = await driverService.getHash(req,res);
         console.log(hash);
         req.hash = hash;
         if(hash==='err')
         {
             res.json({
                 Warning: config.warnings[0] 
             })
         }
         else{
             next();
         }
}



const hashToPassword= (req, res, next)=>
{
    bcrypt.compare(req.body.password , req.hash, function(err,check){
        if(err)
        {
            res.json({
                error: err.message
            })
        }
        else{
            if(check)
            {
                next()
            }
            else{
                config.warnings[1];
            }
        }
    } )
}

const generateToken= (req, res, next)=>
{
    const payLoad = {
        email: req.body.email
        }
    jwt.sign(payLoad, config.privateKey, (err, token) => {
        if (err) {
            config.errorCode[2]
        }
        else {
            req.token = token;
            console.log(token+"{{{{{{{{{{}}}}}}}")
            next();
        }
    });
}

module.exports.passwordToHash= passwordToHash;
module.exports.checkCredentialFunction= checkCredentialFunction
module.exports.hashToPassword = hashToPassword
module.exports.generateToken= generateToken