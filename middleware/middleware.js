const multer=require('multer')
const xlsfilter=(req,file,cb)=>{
    if(file.mimetype.includes('xlsx')){
        cb(null,true)
    }else{
        cb("kindly upload excel file",false)
        return console.log("please upload excel file");
    }
}

const storage1=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./files/')
    },
    filename:(req,file,cb)=>{
        console.log(file.originalname);
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
var upload=multer({storage:storage1});
module.exports=
upload