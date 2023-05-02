//https://javascript.info/xmlhttprequest#http-headers
// npm install -g json-server
// json-server --watch db.json in Terminal(command prompt)
function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3000/employees");
    xhttp.send();
    //https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest 
    //XMLHttpRequest Methods and Properties
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = "";
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += "<tr>";
          trHTML += "<td>" + object["id"] + "</td>";
          trHTML +=
            '<td><img width="50px" src="' +
            object["avatar"] +
            '" class="avatar"></td>';
          trHTML += "<td>" + object["fname"] + "</td>";
          trHTML += "<td>" + object["lname"] + "</td>";
          trHTML += "<td>" + object["username"] + "</td>";
          trHTML +=
            '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' +
            object["id"] +
            ')">Edit</button>';
          trHTML +=
            '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' +
            object["id"] +
            ')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();

  function showUserCreateBox() {
    //https://sweetalert2.github.io/v9.html
    Swal.fire({
      title: "Create user",
      html:
        '<input id="id" type="hidden">' +
        '<input id="PatientImage"type="file" name="avatar" accept=".png, .jpg, .jpeg" class="avatar">'+

        '<input id="fname" class="swal2-input" placeholder="First">' +
        '<input id="lname" class="swal2-input" placeholder="Last">' +
        '<input id="username" class="swal2-input" placeholder="Username">' +
        '<input id="email" class="swal2-input" placeholder="Email">',
      preConfirm: () => {
        userCreate();
      },
    });
  }
  
  function userCreate() {
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
  
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3000/employees/");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        fname: fname,
        lname: lname,
        username: username,
        email: email,
        avatar: "https://www.melivecode.com/users/1.png",
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
  }

  function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:3000/employees/${id}`);
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        //const user = objects["objects"];
        console.log(objects);
        Swal.fire({
          title: "Edit User",
          html:
            '<input id="id" type="hidden" value="' +
            objects[`${id}`] +
            '">' +
            '<input id="fname" class="swal2-input" placeholder="First" value="' +
            objects["fname"] +
            '">' +
            '<input id="lname" class="swal2-input" placeholder="Last" value="' +
            objects["lname"] +
            '">' +
            '<input id="username" class="swal2-input" placeholder="Username" value="' +
            objects["username"] +
            '">' +
            '<input id="email" class="swal2-input" placeholder="Email" value="' +
            objects["email"] +
            '">',
          preConfirm: () => {
            userEdit(id);
          },
        });
      }
    };
  }
  
  function userEdit(id) {
    //const id = document.getElementById("id").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    console.log(id);
    console.log(fname);
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `http://localhost:3000/employees/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
       // id: id,
        fname: fname,
        lname: lname,
        username: username,
        email: email,
        avatar: "https://www.melivecode.com/users/1.png",
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        loadTable();
      }
    };
  }

  function userDelete(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open(`DELETE`, `http://localhost:3000/employees/${id}`);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(
      JSON.stringify({
        id: id,
      })
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
       // Swal.fire(objects["message"]);
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.value) {
              objects["message"];
          }
      })
      }
      //loadTable();
    };
  }



  function userDelete(id){
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open(`DELETE`, `http://localhost:3000/company/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      xhttp.send(JSON.stringify({ id: id }));
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          loadTable();
        }
      };
    }
  });
}


function showUserEditBox(id) {
  console.log(id);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:3000/employees/${id}`);
  xhttp.send();
  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          const objects = JSON.parse(this.responseText);
          Swal.fire({
              title: "Edit Employee",
              html:
                  '<input id="id" type="hidden" value="' + objects[`${id}`] + '">' +
                  '<input id="empname" class="swal2-input" required type="text" value="' + objects[`empname`] + '">' +
                  '<input id="DOJ" type="text" class="swal2-input" value="' + objects[`DOJ`] + '">' +
                  '<input id="department" type="text" class="swal2-input" value="' + objects[`department`] + '">' +
                  '<input id="designation" type="text" class="swal2-input" value="' + objects[`designation`] + '">' +
                  '<input id="salary" type="text" class="swal2-input"  value="' + objects[`salary`] + '">',
              preConfirm: () => {
                  userEdit(id);
              }
          })
      }
  }
}

function userEdit(id) {
  const empname = document.getElementById("empname").value;
  const DOJ = document.getElementById("DOJ").value;
  const department = document.getElementById("department").value;
  const designation = document.getElementById("designation").value;
  const salary = document.getElementById("salary").value;
  console.log(empname);
  const xhttp = new XMLHttpRequest();
  xhttp.open("PUT", `http://localhost:3000/employees/${id}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
      JSON.stringify({
          empname: empname,
          DOJ: DOJ,
          department: department,
          designation: designation,
          salary: salary,
          image: "https://www.melivecode.com/users/1.png",
      })
  );

  xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          const objects = JSON.parse(this.responseText);
          Swal.fire(objects["message"]);
          loadTable();
      }
  }
}

// Get the image element
const img = document.getElementById('my-image');

// Convert the image to a data URL
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = img.naturalWidth;
canvas.height = img.naturalHeight;
ctx.drawImage(img, 0, 0);
const dataURL = canvas.toDataURL();

// Create a JSON object with the image key and value
const data = { image: dataURL };

// Convert the JSON object to a string
const jsonString = JSON.stringify(data);

// Save the JSON string to a file
const blob = new Blob([jsonString], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'data.json';
document.body.appendChild(link);
link.click();
