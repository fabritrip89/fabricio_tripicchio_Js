
/**
  * ! Funciones de dentro del carrito de compras
  **/

let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="cart-item">
        <img width="100%" src=${search.img} alt="" />
        <div class="details">

          <div class="title-price-x">
              <h5 class="title-price">
                <p>${search.name}</p>
                
              </h5>
              
          </div>

         
          <div class="precioQuitar"> 
         
         
          <p class="cart-item-price">$ ${search.price}</p>

         
          
          </div>

           <button onclick="removeItem(${id})" type="button" class="btn btn-danger">Quitar</button>

          <div class="cruzItem"> 
          

                    
          <div class="masmenosCarrito">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>

          <h3>$ ${item * search.price}</h3>
        </div>
      </div>
      </div>
      `;
      })
      .join(""));
  } else {
/**
  * !Si el carrito está vacio muesta este mensaje
  **/

    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h4 class="totalApagar">Opsss... No hay nada en el carrito!</h4>
    <a href="index.html">
      <button class="HomeBtn">Volver al inicio</button>
    </a>
    `;

   

  }
  
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));



};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
   console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
   console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));

  
};


/**
  * ! Borrar productos del carrito totales
  **/

let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));


/**
 * ! Aplicando alertas agregado exitosamente
 **/

  Swal.fire({
    title: 'Es por nuestros precios?',
    
    icon: 'question',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: 'green',
    cancelButtonColor: 'red',
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Gracias por tu opinion',
        'Trabajaremos en ello!',
        'success'
      )
    }
  }) 





 
  
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
      
   console.log(amount);
   
    label.innerHTML = `
    <div class="totalApagar">
    <h2>Total a Pagar : U$D ${amount}</h2>
    <button class="checkout">Pagar</button>
    
    <button onclick="clearCart()" class="removeAll">Borrar Carrito</button>
    </div>`;
  
  } else return;

 
};


TotalAmount();

