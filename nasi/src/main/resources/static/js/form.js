// Data below received from backend database. Should be updated almost immediately for any changes


const sideDishes = ["Chicken Wing", "Fish", "Rendang Beef", "Sambal Sotong", "Rendang Mutton", "Egg Sunny", "Salted Egg","Ikan Bilis", "Luncheon Meat","Drumstick", "Otah", "Keropok","Tempeh","Long Beans"];
//const image = ["img src=(images/Chicken_Wing_Set.jpg)",]
image = "images/nasi5.jpg";


// Update the list in HTML

let addSelectSideDishName = " ";

for (let i = 0; i < sideDishes.length; i++) {

  addSelectSideDishName += `
    
    <div class="form-check">
    <input type="checkbox" class="form-check-input" id="sideDish${i}" name="sideDish${i}" value="${i}">
    <label class="form-check-label" for="sideDish${i}">${sideDishes[i]}</label>
  </div>`

  document.querySelector("#selectSideDishes").innerHTML = addSelectSideDishName;
};

function PreviewImage() {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("myImage").files[0]);

  oFReader.onload = function (oFREvent) {
    document.getElementById("uploadPreview").src = oFREvent.target.result;
  };

};

function dishSet() {

  const image = document.querySelector("#myImage").files[0];
  

  const dishName = document.querySelector("#addDishName").value;
  // document.querySelector("#outputDish").innerHTML = `Output Test Run = ${dishName}`;

  const descript = document.querySelector("#addText").value;
  //document.querySelector("#outputText").innerHTML = `Output Test Run = ${descript}`;

  const priceDish = document.querySelector("#priceDishSet").value;
  // document.querySelector("#outputPrice").innerHTML = `Output Test Run = ${priceDish}`;

  //Create an Array.
  var selected = new Array();

  //Reference the Table.
  var sideDish = document.getElementById("selectSideDishes");

  //Reference all the CheckBoxes in Table.
  var chks = sideDish.getElementsByTagName("INPUT");

  // Loop and push the checked CheckBox value in Array.
  for (var i = 0; i < chks.length; i++) {
    if (chks[i].checked) {
      selected.push(chks[i].value);
    }
  }

  //Display the selected CheckBox values.

  var sideDishList =[];

  if (selected.length > 0) {
    // alert("Selected values: " + selected.join(","));
    //let sideDishList = [];

    for (let i = 0; i < selected.length; i++) {

      sideDishList += sideDishes[selected[i]] + " ";

      console.log(sideDishList)
      // document.querySelector("#outputSideDish").innerHTML = `Output Test Run =${sideDishList}`;
    }
    
  }

  
    addProduct(dishName, descript, priceDish, image , sideDishList);
    displayDishes() 

};

// Below is the test for the set object

/* const set1 = {
  name: "Chicken Wing Set",
  description : " This chicken is from Malaysia",
  price: "5.00",
  image: "images/Chicken_Wing_Set.jpg",
  sideDishes: "Chicken Wing, Ikan Bilis, Egg Sunny",
  
}

const set2 = {
  name: "Fish Set",
  description : "This Fish is from Japan",
  price: "6.00",
  image: "images/nasi1.jpg",
  sideDishes: "Fish, Ikan Bilis, Egg Sunny",
  
}

const productList = [];
productList.push(set1);

function displayDishes() {

  let display = " ";

  for (let i = 0; i < productList.length; i++) {

    display += `
        
      <div class="col-lg-4">
        <div class="card" style="width: 18rem;">
            <img src=${productList[i].image}
                class="card-img-top" alt="image" />
            <div class="card-body">
                <h5 class="card-title">${productList[i].name}</h5>
                <p class="card-title">${productList[i].description}</h5>
                <p class="card-text">${productList[i].sideDishes}</p>
                <p class="card-price">Unit Price : $ ${productList[i].price}</p>
            </div>
        </div>
    </div>`

  }

  document.querySelector("#row").innerHTML = display;

} //End of displayProduct function

function addProduct(dishName, descript, priceDish, myImage, sideDishList) {

  // The parameters will be sent in from another function through the argument

  const productItem = {
    name: dishName,
    description: descript,
    price: priceDish,
    image: myImage,
    sideDishes: sideDishList,
  }

  productList.push(productItem);
}

// Below is hardcoded now. The individual property value will be send in via backend.

//addProduct("Redang Beef Set", "This is a special beef from Australia", "7.50", "images/nasi4.jpg", "Rendang Beef,Egg Sunny, Ikan Bilis");

displayDishes();
*/
