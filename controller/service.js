const mongoose = require("mongoose")
const empDetailsSchema = mongoose.Schema({
    Company_Name: String,
    Employee_id: String,
    Employee_Name: String,
    Gender: String,
    Date_of_Joining: String,
    Location: String,
    Mobile_Number : Number,
});

const empDetailsModel = mongoose.model("empdetails", empDetailsSchema);
const emp= async(data)=>
{
{
    if(data.length!==0)
    {
        const existingemp = await empDetailsModel.findOne({Mobile_Number : data.Mobile_Number})
        if(existingemp)
        {
            return false
        }
     else
     {
      const details=new empDetailsModel(data)
      const savedata=await details.save()
      return savedata
     }
}
}
}
const showdetails=async(info)=>
{
    const show=await empDetailsModel.findOne({Employee_id : info.Employee_id})
    return show
}
const update = async(data)=>
{
    const upt= await empDetailsModel.updateOne({Employee_id:data.Employee_id},{Mobile_Number:data.Mobile_Number})
    return upt;
}
const payrollDetailsSchema = mongoose.Schema({
    Employee_id: String,
    Salary: String,
    Basic: String,
    HRA: String,
    Conveyance: String,
    Other_allowance: String,
    Total_Detuctions : String,
    LOP: String,
    Month: String,
    Year: String,
    Designation: String,
    PAN: String,
    Bank_AC_Number: String
});
const payrollDetailsModel=mongoose.model("payrolldetails",payrollDetailsSchema);
const payroll=async(data)=>
{
    const details=new payrollDetailsModel(data)
    const savedetalis=await details.save()
    return savedetalis

}
const show=async(info)=>
{
    const show=await payrollDetailsModel.findOne({Employee_id : info.Employee_id})
    return show
}
// const findsalary= async(data)=>
// {
//     const getdata=await payrollDetailsModel.findOne({$and:[{Employee_id:data.Employee_id},{Year:data.Year},{Month:data.Month}]})
//     return getdata
// }
const findsalary = async(data) => {
    const getdata = await payrollDetailsModel.find(
        { Employee_id: data.Employee_id },
         {Year: data.Year },
         {Month: data.Month });
    return getdata;
}
const retrivePayslip=async(data)=>{

    let getInfo
    
        getInfo=await payrollDetailsModel.aggregate([
            {$match:{Employee_id:data.emp_id,Month:data.month,Year:data.year}},
            {
                $lookup: {
                    from: 'empdetails',
                    localField: 'Employee_id',
                    foreignField: 'Employee_id',
                    as: 'payroll'
                }
            },
            { $unwind: "$payroll" },
            {
                $project: {
                    "Company_Name":"$payroll.Company_Name",
                    "Employee_id":"$Employee_id",
                    "Employee_Name": "$payroll.Employee_Name",
                    
                    "Gender": "$payroll.Gender",
                    "Location":"$payroll.Location",
                    "Mobile_Number": "$payroll.Mobile_Number",
                    "Date_of_Joining": "$payroll.Date_of_Joining",
                    "Designation": "$Designation",
                    "Bank_AC_Number": "$Bank_AC_Number",
                    
                    "Basic": "$Basic",
                    "HRA": "$HRA",
                    "PAN": "$PAN",
                    "LOP":"$LOP",
                    "Conveyance": "$Conveyance",
                    "Other_allowance": "$Other_allowance",
                    "Salary": "$Salary",
                    "Total_Detuctions":"$Total_Detuctions",
                    "Month":"$Month",
                    "Year":"$Year"
                }
            }
           ])
    
    
     
   return getInfo
}
const updatedetails= async(set)=>
{
    const updateemail= await payrollDetailsModel.findOneAndUpdate({Employee_id:set.Employee_id,Month:set.Month,Year:set.Year},
    { $set:
      {
        Salary:set.Salary,
        Basic:set.Basic,
        HRA:set.HRA,
        Conveyance:set.Conveyance
      }
  })
    return updateemail
}
module.exports=
{
  emp,
  payroll,
  showdetails,
  show,
  findsalary,
  retrivePayslip,
  update,
  updatedetails
}
