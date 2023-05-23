
let dishes = {};    //Empty Object - Global Scope
let selectIndex = ""
fetch("http://localhost:8080/api/all")
        .then(response => response.json())
        .then(info => {
            dishes = info;
            displayDatabase(dishes);
            displayDishes(dishes);
        });

displayDishes = (dishes) => {
    let details = "";
    details = `<h1 class="text-primary text-center" style="margin-top: 50px;">Menu</h1>
    <div class="container-fluid" style="margin-bottom: 70px;">
      <div class="row justify-content-around">`;
    for (let i = 0; i < dishes.length; i++) {
        details += `
          <div class="col-md-3 bg-success-subtle p-4 m-2">
          <img
            class="w-100 h-50 img-fluid object-fit-cover pt-2"
            alt="[Nasi Lemak image]"
           src="${dishes[i].imageUrl}"}
          />
          <h6 class="text-center">
            <b>${i} ${dishes[i].name} $${dishes[i].price.toFixed(2)}</b>
          </h6>
          <p style = " height: 110px">
            ${dishes[i].description}
          </p>
           <button class="btn btn-danger btn-xs">
            <a
              class="nav-link"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#dishesModal"
              onClick="displayDetails(${i})"
              >More</a>
          </button>
          </div>
        `;
    }
    details += `
        </div>
    </div>`;

    // console.log(details)
    document.querySelector("#dishesList").innerHTML = details;
    // outputWindow.document.querySelector("#dishesList").innerHTML = details;
};

function displayDetails(index) {
    //When user clicks on any "More" button, the details of the selected product will be displayed
    document.querySelector("#modalImg").src = dishes[index].imageUrl;
    document.querySelector("#modalName").innerHTML = dishes[index].name;
    document.querySelector("#modalPrice").innerHTML = dishes[index].price.toFixed(2);
    document.querySelector("#modalDescription").innerHTML = dishes[index].description;
    document.querySelector("#modalSideDishes").innerHTML = dishes[index].side;
};
function selectDish() {
    const index = prompt("Enter the Index of the dish you want to select:");
    selectIndex = index;

        // Validate numeric input
        if (!/^\d+$/.test(index)) {
        alert("Invalid input. Please enter a numeric index.");
        return;
        }

        if (index < 0 || index >= dishes.length) {
        alert("Invalid index number. Please refer to table below for a valid index.");
        return;
        }

    document.querySelector("#index").innerHTML = `<p><b>Index: </b>${index}</p>`;
    id = dishes[index].id;
    document.querySelector("#name").value = dishes[index].name;
    document.querySelector("#description").value = dishes[index].description;
    document.querySelector("#price").value = dishes[index].price;
    document.querySelector("#imageUrl").value = dishes[index].imageUrl.split("/").pop();
    document.querySelector("#side").value = dishes[index].side;

}
function addDish() {
    const form = document.querySelector('#myForm'); // select the form element
    if (form.checkValidity()) {
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const imageUrl = document.getElementById("imageUrl").value;
        const side = document.getElementById("side").value;

        const newDish = {
          //  id: dishes.length.toString(),
            name: name,
            description: description,
            price: price,
            imageUrl: imageUrl,
            side: side
        };

        appendDish(name, description, price, imageUrl, side);
        clearForm();
    } else {
        alert("Please fill out all required fields.");
    }
}// End of addDish

function appendDish(name, description, price, imageUrl, side)
{
// FormData is an object provided by the browser API for us to send the data over to the backend
   const formData = new FormData();
   formData.append('name', name);
   formData.append('description', description);
   formData.append('price', price);
   formData.append('imageUrl', imageUrl);
   formData.append('side', side);

  fetch("http://localhost:8080/api/save", {
        method: 'POST',
        body: formData
        })
        .then(function(response) {
            console.log(response.status); // Will show you the status
            if (response.ok) {
                location.reload();  // reload the page
                alert("Successfully Added Product!")
            }
            else {
               alert("Something went wrong. Please try again")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error adding item to Product")
        });
} // End of function appendDish


function updateDish() {
    const form = document.querySelector('#myForm'); // select the form element
    if (form.checkValidity()) {
        //const id = id;
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        const imageUrl = document.getElementById("imageUrl").value;
        const side = document.getElementById("side").value;

        const newDish = {
          //  id: dishes.length.toString(),
            id: id,
            name: name,
            description: description,
            price: price,
            imageUrl: imageUrl,
            side: side
        };

// FormData is an object provided by the browser API for us to send the data over to the backend
   const formData = new FormData();
   formData.append('id', id);
   formData.append('name', name);
   formData.append('description', description);
   formData.append('price', price);
   formData.append('imageUrl', imageUrl);
   formData.append('side', side);


  fetch("http://localhost:8080/api/save", {
        method: 'POST',
        body: formData
        })
        .then(function(response) {
            console.log(response.status); // Will show you the status
            if (response.ok) {
                location.reload();  // reload the page
                alert("Successfully updated Product!")
            }
            else {
               alert("Something went wrong. Please try again")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error adding item to Product")
        });
        clearForm();
    } else {
        alert("Click Select button first to enter Index No");
    }
} // End of function updateDish


function deleteDish() {
    if (selectIndex == null || selectIndex == "") {
    alert("Click Select button and enter [Index No] to delete. Please try again")
    //    return;
    }
  fetch("http://localhost:8080/api/"+id, {
        method: 'DELETE',
     //   body: formData
        })
        .then(function(response) {
            console.log(response.status); // Will show you the status
            if (response.ok) {
                location.reload();  // reload the page
                alert("Successfully deleted Product!")
            }
            else {
               alert("Something went wrong. Please try again")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Error deleting item to Product")
        });
    clearForm();
}//End of deleteDish


function clearForm() {
    displayDatabase(dishes);
    displayDishes(dishes);
    document.querySelector("#index").innerHTML = `<p><b> Index: </b></p>`;
    selectIndex = "";
    document.querySelector("#myForm").reset();
}
function displayDatabase(dishes) {
    let display = `
            <table class="table table-striped mb-5" style="border:1px solid #000">  
                <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Extra</th>
                </tr>    
           `;
    for (let i = 0; i < dishes.length; i++) {
        display += `
                <tr>
                 <td>${i}</td>
                 <td>${dishes[i].name} </td>
                 <td>${dishes[i].description} </td>
                 <td>${'$' + dishes[i].price.toFixed(2)} </td>
                 <td>${dishes[i].imageUrl.split("/").pop()} </td>
                 <td>${dishes[i].side} </td>
                </tr>
                `;
    } //End of For Loop
    display += `</table>`;
    document.querySelector("#database").innerHTML = display;
};