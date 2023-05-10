const dish1 = {
  id: "0",
  name: "Nasi Lemak with Muar otah",
  description: "A set consists of a main item and two side dishes and price start at $2.00. More side dishes can be added for an extra $1.00.",
  price: "2.80",
  image: "images/nasi0.jpg", // https://reqres.in/img/faces/3-image.jpg
  sideDishes: "Sides $1.00 each"
};
const dish2 = {
  id: "1",
  name: "Nasi Lemak with egg",
  description: "The sambal packs a punch though - a little goes a long way",
  price: "3.90",
  image: "images/nasi1.jpg",
  sideDishes: "2 sides free of your choice"
};
const dish3 = {
  id: "2",
  name: "Nasi Lemak with drumstick",
  description: "You get a piece of BBQ chicken and a side dish of your choice.st and tasty meat It is best eaten on-site, but if you are doing a take-away, get it packed separately.",
  price: "4.00",
  image: "images/nasi2.jpg",
  sideDishes: "Rendang beef & Ikan bilis"
};
const dish4 = {
  id: "3",
  name: "Nasi Lemak with beef rendang",
  description: "For big eaters, this is a Value Meal priced at $8.00 including 2 special sides, Muar Otah and sambal brinjal",
  price: "8.00",
  image: "images/nasi3.jpg",
  sideDishes: "Sambal sotong & Rendang beef"
};
const dish5 = {
  id: "4",
  name: "Nasi Lemak with Achar",
  description: "This pickled vegetable is another of our customers favourites and they always get it as a side dish when it is available. The Achar is not spicy but fruity with an appetising balance of sweetness and acidity ",
  price: "4.20",
  image: "images/nasi4.jpg",
  sideDishes: "Egg sunny & Sambal soton"
};
const dish6 = {
  id: "5",
  name: "Nasi Lemak with chicken wing",
  description: "The chicken is well marinated and fried perfectly, with a crisp batter enveloping moi.",
  price: "3.70",
  image: "images/nasi5.jpg",
  sideDishes: "Luncheon meat & Cendol"
};


const dishes = [];
dishes.push(dish1, dish2, dish3, dish4, dish5, dish6);

displayDishes = (dishes) => {
    let details = "";
    details = `<h1 class="text-primary text-center">Dishes List</h1>
    <div class="container-fluid" style="margin-bottom: 70px;">
      <div class="row">`;
    for (let i = 0; i < dishes.length; i++) {
        details += `
          <div class="col-md-4 bg-success-subtle p-5">
          <img
            class="w-100 h-50 img-fluid object-fit-cover pt-2"
            alt="Full-width image"
            src=${dishes[i].image}
          />
          <h6 class="text-center">
            <b>${dishes[i].name} $${dishes[i].price}</b>
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
displayDishes(dishes);

function displayDetails(index) {
  //When user clicks on any "More" button, the details of the selected product will be displayed
  document.querySelector("#modalImg").src = dishes[index].image;
  document.querySelector("#modalName").innerHTML = dishes[index].name;
  document.querySelector("#modalPrice").innerHTML = dishes[index].price;
  document.querySelector("#modalDescription").innerHTML = dishes[index].description;
  document.querySelector("#modalSideDishes").innerHTML = dishes[index].sideDishes;
};

