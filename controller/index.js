const service=require('./service')
const excel=require('xlsx')
const user=async(req,res)=>{
    try{
        if(!req.file){
            res.json({code:404,message:"please upload xlsx file...!"})
            return console.log('kindly select and upload xlsx file');
        }

        let path="./files/"+req.file.filename
        const details= excel.readFile(path)
        const sheetname=details.SheetNames[0];
        const sheet=details.Sheets[sheetname];
        const Data=excel.utils.sheet_to_json(sheet);
    
        
        for (const item of Data){
            const servicesave =await service.emp(item);
            const info=await service.payroll(item);
            
        
        }res.json({status:200,success:true ,message:"uploaded succesfully"})
    }catch(error){
        res.json({message:error,status:"not uploaded"})        
    }    
    }  
//find empdetails     
const getuser=async(req,res)=>
{
    const fetchdetails=await service.showdetails(req.body)
    res.send(fetchdetails)
}
//find payroll
const findOne=async(req,res)=>
{
    const detail=await service.show(req.body)
    res.send(detail)
}
//findsalary
const find=async(req,res)=>
{
    const salaryfind=await service.findsalary(req.body)
    res.send(salaryfind)
}
const getdata=async(req,res)=>{
    var emp_id=req.body.Employee_id
    var month=req.body.Month 
    var year=req.body.Year
    console.log(month);

    const data=await service.retrivePayslip({emp_id,month,year})
    res.send(data)
}
//update employee
const updatedata = async(req,res)=>
{
    const details= await service.update(req.body)
    res.send (details)
}
//update payroll
const alldetails= async(req,res)=>
{
    const update= await service.updatedetails(req.body)
    res.send(update)
}
    module.exports = 
    {
        user,
        getuser,
        findOne,
        find,
        getdata,
        updatedata,
        alldetails
    }