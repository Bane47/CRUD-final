// function validate(){
//     //field values
//     const name = document.getElementById("PatientName").value;
//     const age = document.getElementById("Age").value;
//     const vdate= document.getElementById("VisitingDate").value;
//     const complaint=document.getElementById("Complaint").value;
//     const sex = document.getElementById("Sex").value; 

//     //regular expressions
//     const nameReg=/^[A-Za-z]$/;
//     const ageReg =/^[/d]$/;
//     const vdateReg=/^((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[1-9])|(1[0-2]))-(202[0-2])$/;

//     if(!name||!age||!vdate||!sex||!complaint){
//         Swal.fire({
//             title:"Fields should not be empty",
//             showConfirmButton:true
//         })
//     }
//     if(!name.match(nameReg)){
        
//         Swal.fire({
//             title:"Invalid Input",
//             html:"Use only alphabetical letters",
//             icon:"error",
//             showConfirmButton:true
//         })
//     }
//     if(!age.match(ageReg)){
        
//         Swal.fire({
//             title:"Invalid Input",
//             html:"Use only only numbers",
//             icon:"error",
//             showConfirmButton:true
//         })
//     }
//     if(!vdate.match(vdateReg)){
//         Swal.fire({
//             title:"Invalid Input",
//             html:"Please follow the format (dd-mm-yyyy)",
//             icon:"error",
//             showConfirmButton:true
//         })
//     }

//     if(name.match(nameReg)&&age.match(ageReg)&&vdate.match(vdateReg)){
//         Swal.fire({
//             title:"Successfully Created",
//             icon:"success",
//             showConfirmButton:true

//         })
//     }
    
// }


// function validatejq(){
//     //field values
//     const name = document.getElementById("PatientName").value;
//     const age = document.getElementById("Age").value;
//     const vdate= document.getElementById("VisitingDate").value;
//     const complaint=document.getElementById("Complaint").value;
//     const sex = document.getElementById("Sex").value; 

//     //regular expressions
//     const nameReg=/^[a-zA-Z]{2,32}$/;
//     const ageReg =/^[0-9]{1,2}$/;
//     const vdateReg=/^((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[1-9])|(1[0-2]))-(202[0-2])$/;
    
//     $(document).ready(function({
//         $()
//     }))

// }