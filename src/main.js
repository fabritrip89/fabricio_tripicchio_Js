/**
 * ! Funciones pagina principal
 **/


let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id=product-id-${id} class="item">
        <img width="200" src=${img} alt="">
        <div class="details">
          <h5>${name}</h5>
          <h7>${desc}</h7>
          <div class="price-quantity">
            <h4>U$D ${price} </h4>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join(""));
};

generateShop();

/**
 * ! Funciones para incrementar elementos
 **/

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  search === undefined
    ? basket.push({ id: selectedItem.id, item: 1 })
    : (search.item += 1);

  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));

  /**
 * ! Aplicando alertas agregado exitosamente
 **/
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: ' Agregado al carrito',
    showConfirmButton: false,
    timer: 800
  })


};

/**
 * ! Funciones para disminuir elementos
 **/

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
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));

 /**
 * ! Aplicando alertas agregado exitosamente
 **/



  Swal.fire({
    position: 'center',
    icon: 'error',
    title: ' Eliminado del carrito',
    showConfirmButton: false,
    timer: 800
  })


};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
