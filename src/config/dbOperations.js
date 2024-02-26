 
 const sql=require('msnodesqlv8');

 async function getLoginDetails(){
  try {
   sql.query(config,"select * from Post",(err,rows)=>{
    console.log(rows);
   })
  } catch (error ) {
   console.log(error);
  }
 }
 module.exports={
  getLoginDetails:getLoginDetails
 }