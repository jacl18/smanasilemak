
let dishes = {};    //Empty Object - Global Scope

fetch("http://localhost:8080/api/all")
        .then(response => response.json())
        .then(info => {
            dishes = info;
            displayDishes(dishes);
        });

displayDishes = (dishes) => {
    let details = "";
    details = `<h1 class="text-primary text-center">Menu</h1>
    <div class="container-fluid" style="margin-bottom: 70px;">
      <div class="row">`;
    for (let i = 0; i < dishes.length; i++) {
        details += `
          <div class="col-md-4 bg-success-subtle p-5">
          <img
            class="w-100 h-50 img-fluid object-fit-cover pt-2"
            alt="Nasi Lemak image"
            src="${dishes[i].imageUrl}"
            }
          />
          <h6 class="text-center">
            <b>${dishes[i].name} $${dishes[i].price.toFixed(2)}</b>
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
    document.querySelector("#dishesList").innerHTML = details;
};


function displayDetails(index) {
  //When user clicks on any "More" button, the details of the selected product will be displayed
  document.querySelector("#modalImg").src =dishes[index].imageUrl;
  document.querySelector("#modalName").innerHTML = dishes[index].name;
  document.querySelector("#modalPrice").innerHTML = dishes[index].price.toFixed(2);
  document.querySelector("#modalDescription").innerHTML = dishes[index].description;
  document.querySelector("#modalSideDishes").innerHTML = dishes[index].side;
};

