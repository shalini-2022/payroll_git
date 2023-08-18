const exp = require('express')
const router = exp.Router()
const save = require('../controller/index')
const multer = require('../middleware/middleware')
const routes = (index)=>
{
   
    router.post('/upload',multer.single("upload"),save.user);
    router.post('/find',multer.single("findone"),save.getuser);
    router.post('/findone',multer.single("find"),save.findOne);
    router.post('/salary',save.find);
    router.post('/updateall',save.getdata)
    router.post('/data',save.updatedata)
    router.post('/updatedetails',save.alldetails)
    index.use('/api',router)
}
module.exports = routes 