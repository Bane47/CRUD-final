function render() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/Patient");
    xhttp.send();               //sending the request

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHTML = "";
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                trHTML += "<tr>";
                trHTML += "<td>" + object["id"] + "</td>";
                trHTML += '<td>' +
                    object["PatientImage"] +
                    '</td>';
                trHTML += "<td>" + object['PatientName'] + "</td>";
                trHTML += "<td>" + object['Age'] + "</td>";
                trHTML += "<td>" + object['Sex'] + "</td>";
                trHTML += "<td>" + object['VisitingDate'] + "</td>";
                trHTML += "<td>" + object['Complaint'] + "</td>";
                trHTML += '<td><button type="button" class="btn btn-secondary" onclick="showUserEditBox(' + object["id"] + ')">Edit</button>';


                trHTML += '<button class="noselect"><span class="text" onclick="userDelete(' + object["id"] + ')">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button></td>';
                trHTML += '</tr>';

            }
            document.getElementById("mytable").innerHTML = trHTML;
        }
    }
}

render();

function showUserCreateBox() {
    Swal.fire({
        title: "Create user",
        html:
            '<input id="id" type="hidden">' +
            '<input id="PatientImage" type="file" name="avatar" accept=".png, .jpg, .jpeg" class="swal2-input">' +
            '<input id="PatientName" class="swal2-input" placeholder="Name">' +
            '<input id="Age" class="swal2-input" placeholder="Age">' +
            '<input id="Sex" class="swal2-input" placeholder="Sex" >' +
            '<input id="VisitingDate" class="swal2-input" placeholder="Date">' +
            '<input id="Complaint" class="swal2-input"placeholder="Complaint">',
        preConfirm: () => {

            // const valid = validate();
            // console.log(valid)
            // if(valid==true){
            // console.log("Success");

            userCreate();
            // }

        }
    });
}

function userCreate() {
    const patientimage = document.getElementById("PatientImage").value;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = patientimage.naturalWidth;
    canvas.height = patientimage.naturalHeight;
    context.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL();

    //create a JSON object with the image key and value
    const data = { image: dataURL };

    //convert the json object to a string
    const stringifiedjson = JSON.stringify(data);

    //Saving the jsomn string to a file
    const blob = new Blob([stringifiedjson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'database.json';
    document.body.appendChild(link);
    link.click();

    const pname = document.getElementById("PatientName").value;
    const age = document.getElementById("Age").value;
    const sex = document.getElementById("Sex").value;
    const visitingdate = document.getElementById("VisitingDate").value;
    const complaint = document.getElementById("Complaint").value;


    if (validate() == true) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/Patient");
        xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const objects = JSON.parse(this.responseText);
                Swal.fire(objects["message"]);

            }
        }
        xhttp.send(
            JSON.stringify({
                PatientName: pname,
                Age: age,
                Sex: sex,
                VisitingDate: visitingdate,
                Complaint: complaint,
                PatientImage: "https://www.melivecode.com/users/1.png",
            })
        );
        render();

    }
    //    else{
    // Swal.fire({
    //     title:"User creation unsuccessful",
    //     icon:"Error"

    // })
    //    }

}

function validate() {
    //field values
    const name = document.getElementById("PatientName").value;
    const age = document.getElementById("Age").value;
    const vdate = document.getElementById("VisitingDate").value;
    const complaint = document.getElementById("Complaint").value;
    const sex = document.getElementById("Sex").value;

    //regular expressions
    const nameReg = /^[a-zA-Z\s]{2,32}$/;
    const ageReg = /^[0-9]{1,2}$/;
    const vdateReg = /^((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[1-9])|(1[0-2]))-(202[0-3])$/;

    if (name == "" || age == "" || vdate == "" || sex == "" || complaint == "") {
        Swal.fire({
            title: "Fields should not be empty",
            showConfirmButton: true,
            icon: "error"
        })
        return false;
    }
    if (!name.match(nameReg)) {

        Swal.fire({
            title: "Invalid Input",
            text: "Name should only contain alphabetical letters",
            icon: "error",
            showConfirmButton: true,

        })
        return false;

    }
    if (!age.match(ageReg)) {

        Swal.fire({
            title: "Invalid Input",
            text: "Age should only contain numbers",
            icon: "error",
            showConfirmButton: true
        })
        return false;

    }
    if (!vdate.match(vdateReg)) {
        Swal.fire({
            title: "Invalid Input",
            text: "Please follow the format (dd-mm-yyyy) for the date  field",
            icon: "error",
            showConfirmButton: true
        })
        return false;

    }

    if (name.match(nameReg) && age.match(ageReg) && vdate.match(vdateReg)) {
        Swal.fire({
            title: "Successfully Created",
            icon: "success",
            showConfirmButton: true

        })
        return true;




    }



}

// function showUserEditBox(id){
//     console.log(id);
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("Get",`http://localhost:3000/Patient/${id}`);
//     xhttp.send();
//     xhttp.onreadystatechange= function (){
//         if(this.readyState==4 && this.status == 200){
//             const objects = JSON.parse(this.responseText);
//             console.log(objects);
//             Swal.fire({
//                 title:"Edit User",
//                 html:
//                 '<input id="id" type="hidden" value="'+objects[`$(id)`]+'">'+
//                 '<input id="PatientName" class="swal2-input" placeholder="Name" value="'+
//                 objects[`PatientName`]+
//                 '">'+
//                 '<input id="Age" class="swal2-input" placeholder="Age" value="'+objects[`Age`]+'">'+
//                 '<input id="Sex" class="swal2-input" placeholder="Sex" value="'+objects[`Sex`]+'">'+
//                 '<input id="VisitingDate" class="swal2-input" placeholder="VisitingDate" value="'+objects[`VisitingDate`]+'">'+
//                 '<input id="Complaint" class="swal2-input" placeholder="Enter your Complaint" value="'+objects[`Complaint`]+'">',
//                 preconfirm:() => {
//                     // const valid=validate();
//                     // if (valid){
//                     userEdit(id);
//                     // }
//                     // return false;
//                 },

//             });
//         }
//     };
// }

function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/Patient/${id}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire({
                title: "Edit User",
                html:
                    '<input id="id" type="hidden" value="' + objects[`${id}`] + '">' +
                    '<input type="file" name="avatar" accept=".png, .jpg, .jpeg" class="avatar">' +

                    '<input id="PatientName" class="swal2-input" required type="text" value="' + objects[`PatientName`] + '">' +
                    '<input id="Age" type="text" class="swal2-input" value="' + objects[`Age`] + '">' +
                    '<input id="Sex" type="text" class="swal2-input" value="' + objects[`Sex`] + '">' +
                    '<input id="VisitingDate" type="text" class="swal2-input" value="' + objects[`VisitingDate`] + '">' +
                    '<input id="Complaint" type="text" class="swal2-input"  value="' + objects[`Complaint`] + '">',
                preConfirm: () => {
                    userEdit(id);
                }
            })
        }
    }
}
function validate2() {
    //field values
    const name = document.getElementById("PatientName").value;
    const age = document.getElementById("Age").value;
    const vdate = document.getElementById("VisitingDate").value;
    const complaint = document.getElementById("Complaint").value;
    const sex = document.getElementById("Sex").value;

    //regular expressions
    const nameReg = /^[a-zA-Z]{2,32}$/;
    const ageReg = /^[0-9]{1,2}$/;
    const vdateReg = /^((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))-((0[1-9])|(1[0-2]))-(202[0-2])$/;

    if (name == "" || age == "" || vdate == "" || sex == "" || complaint == "") {
        Swal.fire({
            title: "Fields should not be empty",
            showConfirmButton: true,
            icon: "error"
        })
        return false;
    }
    if (!name.match(nameReg)) {

        Swal.fire({
            title: "Invalid Input",
            text: "Name should only contain alphabetical letters",
            icon: "error",
            showConfirmButton: true,

        })
        return false;

    }
    if (!age.match(ageReg)) {

        Swal.fire({
            title: "Invalid Input",
            text: "Age should only contain numbers",
            icon: "error",
            showConfirmButton: true
        })
        return false;

    }
    if (!vdate.match(vdateReg)) {
        Swal.fire({
            title: "Invalid Input",
            text: "Please follow the format (dd-mm-yyyy) for the date  field",
            icon: "error",
            showConfirmButton: true
        })
        return false;

    }

    if (name.match(nameReg) && age.match(ageReg) && vdate.match(vdateReg)) {
        Swal.fire({
            title: "Successfully Edited",
            icon: "success",
            showConfirmButton: true

        })
        return true;




    }



}

// function userEdit(id) {
//     const empname = document.getElementById("empname").value;
//     const DOJ = document.getElementById("DOJ").value;
//     const department = document.getElementById("department").value;
//     const designation = document.getElementById("designation").value;
//     const salary = document.getElementById("salary").value;
//     console.log(empname);
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("PUT", `http://localhost:3000/employees/${id}`);
//     xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     xhttp.send(
//         JSON.stringify({
//             empname: empname,
//             DOJ: DOJ,
//             department: department,
//             designation: designation,
//             salary: salary,
//             image: "https://www.melivecode.com/users/1.png",
//         })
//     );

//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             const objects = JSON.parse(this.responseText);
//             Swal.fire(objects["message"]);
//             loadTable();
//         }
//     }
// }




function userEdit(id) {
    console.log("Helloworld");
    const pname = document.getElementById("PatientName").value;
    const age = document.getElementById("Age").value;
    const sex = document.getElementById("Sex").value;
    const visitingdate = document.getElementById("VisitingDate").value;
    const complaint = document.getElementById("Complaint").value;
    console.log("Hell yeah");
    if (validate2() == true) {

        const xhttp = new XMLHttpRequest();
        xhttp.open("PUT", `http://localhost:3000/Patient/${id}`);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhttp.send(
            JSON.stringify({
                PatientName: pname,
                Age: age,
                Sex: sex,
                VisitingDate: visitingdate,
                Complaint: complaint,
                PatientImage: "https://www.melivecode.com/users/1.png"

            })
        );
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const objects = JSON.parse(this.responseText);
                Swal.fire({
                    title: "Successfully Edited",
                    icon: "success"
                });
                render();
            }
        }
    }



}

function userDelete(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open(`DELETE`, `http://localhost:3000/Patient/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Swal.fire({
        title: "Loading...",
        text: "Your operation is being processed, Please wait",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: () => {
            Swal.showLoading();
            setTimeout(() => {
                Swal.hideLoading();
                Swal.fire({
                    title: "Do you want to delete this?",
                    text: "You will not be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes , delete it!'
                }).then((result) => {
                    if (result.value) {
                        xhttp.send(
                            JSON.stringify({
                                id: id,
                            }));
                        xhttp.onreadystatechange = function () {
                            if (this.readyState == 4) {
                                render();
                            }
                        };
                    }
                });

            }, 1000);
        }
    })
}
