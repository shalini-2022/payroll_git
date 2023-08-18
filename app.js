const app=require('express')()

const bodyparser =require('body-parser')
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
require('dotenv').config()
require('./config/db')
require('./routes/routes')(app)
const port=700
app.listen(port,()=>
{
    console.log(`serve listening on:${port}`)
})