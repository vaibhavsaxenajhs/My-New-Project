const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser')
const Promise     = require('bluebird')

app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));

const adminService = require('./admin/services/adminServices')


const userRouter = require('./Router/userRouter');
const adminRouter= require('./Router/adminRouter');
const driverRouter = require('./Router/driverRouter')
const config = require('./Config/config.js')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/driver',driverRouter);



app.listen(config.port, function (err, result) { 
    if (err) { 
    console.log(config.errorCode[2]) 
    } 
    else { 
    Promise.coroutine(function* () { 
        let check=yield adminService.checkDatabaseEmpty()
        console.log(check[0])
        if(check[0]==undefined)
        { 
            let result = yield adminService.insertIntoDatabase()
            console.log(result)
        } 
        else{
            console.log("Successfully Connected at Port Number "+ config.port)
        }
    })().catch((err)=>{ 
            console.log(err);
    }) 
    } 
    })