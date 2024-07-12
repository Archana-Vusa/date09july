const productContainer = document.querySelector(".list-of-products");

const API = "https://fakestoreapi.com";
//console.log(API);
const titles1 = document.querySelector("#input-title1");
const prices1 = document.querySelector("#input-price1");
const descriptions1 = document.querySelector("#input-description1");
const categorys1 = document.querySelector("#input-category1");
const ratings1 = document.querySelector("#input-rating1");
const rates1 = document.querySelector("#input-rates1");
const counts1 = document.querySelector("#input-count1");
const updateBtn = document.querySelector("#update-details-btn");

const updateProduct = async (productId) => {
  const productInfo = await fetch(`${API}/products`);
  //console.log(updateProduct);
  const { data } = await productInfo.json();

  const { title, price, description, category, rating, rate, count, _id } =
    data;

  titles1.value = title;
  prices1.value = price;
  descriptions1.value = description;
  categorys1.value = category;
  ratings1.value = rating;
  rates1.value = rate;
  counts1.value = count;

  updateBtn.addEventListener("click", async () => {
    const personInformation = {
      title: titles1.value,
      price: prices1.value,
      description: descriptions1.value,
      category: categorys1.value,
      rating: ratings1.value,
      rate: rates1.value,
      count: counts1.value,
    };

    const productCreation = await fetch(`${API}/update-products/1`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(personInformation),
    });

    const updatedProduct = await productCreationCreation.json();

    if (updateProduct) {
      window.location.reload();
      return alert("product details updated");
    }
  });
};

const deleteProduct = async (productId) => {
  try {
    const deleteProductAccount = await fetch(`${API}/delete-products/1`, {
      method: "DELETE",
    });

    const productDeleted = await deleteProductAccount.json();

    if (productDeleted) {
      window.location.reload();
      return alert("Product deleted successfully");
    }
  } catch (error) {}
};

const uploadDp = async (event, productId) => {
  const productImage = event.target.files[0];
  const formData = new FormData();

  formData.append("image", productImage);

  const uploadeImage = await fetch(`${API}/products/1`, {
    method: "POST",
    body: formData,
  });

  const pic = await uploadeImage.json();

  if (pic) {
    window.location.reload();
    return alert(" pic uploaded successfully..");
  }
};

window.onload = async () => {
  try {
    const data = await fetch(`${API}/products`, {
      method: "GET",
    });
    const dataInputs = await data.json();

    console.log(dataInputs);
    dataInputs.forEach((product) => {
      const {
        title,
        price,
        description,
        category,
        rating,
        rate,
        count,
        image,
        _id,
      } = product;

      const html = `
        <div class='d-flex justify-content-center align-items-center m-3'  >
            <div>
                <h1>title : ${title.toUpperCase()} </h1>
                <h2>price:${price}</h2>
                <h2>description: ${description}</h2>
                <h2>category : ${category}</h2>
                <h2>rating : ${rating}</h2>
                <h2>rate:${rate}</h2>
                <h2>count:${count}</h2>
                <button onclick="updateProduct('${_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >Update </button>
                <button class='btn btn-danger' onclick="deleteProduct('${_id}')" >Delete </button>
                <input type='file' class='form-control w-100 mt-3' onchange="uploadDp(event, '${_id}')"  />
            </div>
            <div>
                <img class="image" height="250" src=${image} alt="image">
            </div>
            
        </div>
        `;
      productContainer.innerHTML += html;
    });
  } catch (error) {}
};

const titles = document.querySelector("#input-title");
const prices = document.querySelector("#input-price");
const descriptions = document.querySelector("#input-description");
const categorys = document.querySelector("#input-category");
const ratings = document.querySelector("#input-rating");
const rates = document.querySelector("#input-rate");
const counts = document.querySelector("#input-count");
const addBtn = document.querySelector("#add-btn");

addBtn.addEventListener("click", async (event) => {
  try {
    event.preventDefault();
    if (
      !titles.value ||
      !prices.value ||
      !descriptions.value ||
      !categorys.value ||
      !ratings.value ||
      !rates.value ||
      !counts.value
    ) {
      return alert("Please fill the all the fileds...");
    }

    const productInformation = {
      titles: titles.value,
      prices: prices.value,
      descriptions: descriptions.value,
      categorys: categorys.value,
      ratings: ratings.value,
      rates: rates.value,
      counts: counts.value,
    };

    const productCreation = await fetch(`${API}/products-creation`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(productInformation),
    });

    const product = await productCreation.json();
    if (product === "Product is already entered....") {
      return alert("Product with this product id already entered..");
    } else {
      window.location.reload();
      return alert("product Created successfully..!!");
    }
  } catch (error) {
    console.log(error);
  }
});
