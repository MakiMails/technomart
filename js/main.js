// Общий код
const COUNT_PRODUCT = 18;
const DISCOUNT_AMOUNT = 15;
const RARIO_MULTIPLE_DISCOUNT = 500;
const MIN_PRICE = 2000;
const MAX_PRICE = 5000;
const DEBOUNCE_INTERVAL = 500;

const variantsUrlPhotoProducts = ["img/catalog/bosch-2000.jpg", "img/catalog/bosch-3000.jpg", "img/catalog/bosch-6000.jpg", "img/catalog/bosch-9000.jpg", "img/catalog/makita-td-110.jpg"];

const variantsBrandProducts = ["BOSCH", "Makita", "Vagner", "Mega", "Proline"];

const variantsTitleProducts = ["Перфоратор BOSCH BFG 2000", "Перфоратор BOSCH BFG 3000", "Перфоратор BOSCH BFG 6000", "Перфоратор BOSCH BFG 9000", "Шуруповерт Makita TD-110"];

const variantsCategoryproducts = ["Перфораторы", "Шуруповерты", "Ключи", "Отвертки"];

const variantsFlagProducts = ["new", "promo", ""];

function getRandomIntNum(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
}

function calcDiscount(price) {
  let discount = 0;
  if (getRandomIntNum(0, 2) == 1) {
    discount = price * (DISCOUNT_AMOUNT / 100);
    discount = Math.floor(discount / RARIO_MULTIPLE_DISCOUNT) * RARIO_MULTIPLE_DISCOUNT;
  }
  return discount;
}

function getRandomElemInArray(arr) {
  return arr[getRandomIntNum(0, arr.length)];
}

function writeInConsoleArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

//Создание левых данных
const productsData = [];

for (let i = 0; i < COUNT_PRODUCT; i++) {
  let productData = new Object();
  productData.urlPhoto = getRandomElemInArray(variantsUrlPhotoProducts);
  productData.brand = getRandomElemInArray(variantsBrandProducts);
  productData.title = getRandomElemInArray(variantsTitleProducts);
  productData.price = getRandomIntNum(MIN_PRICE, MAX_PRICE);
  productData.category = getRandomElemInArray(variantsCategoryproducts);
  productData.discount = calcDiscount(productData.price);
  productData.flag = getRandomElemInArray(variantsFlagProducts);
  productsData.push(productData);
}

//Заполнение каталога
const templateProduct = document.querySelector("#catalog-item").content.querySelector(".catalog-item");
const catalog = document.querySelector(".catalog-list");
const typesFlag = {
  new: "Новинка",
  promo: "Акция",
};

function createFlag(typeFlag) {
  const flag = document.createElement("div");
  flag.classList.add("flag");
  flag.classList.add("flag-" + typeFlag);
  const flagText = document.createElement("span");
  flagText.classList.add("visually-hidden");
  flagText.textContent = typesFlag[typeFlag];
  flag.appendChild(flagText);
  return flag;
}

function fillInСatalog() {
  const containerForProducts = document.createDocumentFragment();
  const imgProductBlock = templateProduct.querySelector(".image");
  const imgProduct = imgProductBlock.children[0];
  const titleProduct = templateProduct.querySelector(".item-title");
  const priceProduct = templateProduct.querySelector(".price");
  const discountProduct = templateProduct.querySelector(".discount");
  for (let i = 0; i < productsData.length; i++) {
    imgProduct.src = productsData[i].urlPhoto;
    imgProduct.alt = productsData[i].title;
    titleProduct.textContent = productsData[i].title;
    templateProduct.dataset.name = productsData[i].title;
    priceProduct.textContent = productsData[i].price;
    if (productsData[i].discount !== 0) {
      discountProduct.textContent = productsData[i].discount;
    }
    const cloneProduct = templateProduct.cloneNode(true);
    cloneProduct.addEventListener("click", onClickProductCard);
    if (productsData[i].flag !== "") {
      cloneProduct.appendChild(createFlag(productsData[i].flag));
    }
    containerForProducts.appendChild(cloneProduct);
  }
  catalog.appendChild(containerForProducts);
}

//Сортировка
const sortingMethod = "price";
const directionEnum = { UP: "up", DOWN: "down" };
let direction = directionEnum.UP;

const sortingDirection = document.querySelector(".direction");
const sortingUpBnt = sortingDirection.querySelector(".sorting-up-button");
const sortingDownBnt = sortingDirection.querySelector(".sorting-down-button");

function sortingCatalog() {
  if (direction == directionEnum.UP) {
    productsData.sort((a, b) => a.price - b.price);
  } else {
    productsData.sort((a, b) => b.price - a.price);
  }
  catalog.innerHTML = "";
  fillInСatalog();
}

function onClickSortingUpBnt(evt) {
  evt.preventDefault();
  if (direction !== directionEnum.UP) {
    sortingDownBnt.classList.remove("indicator-checked");
    sortingUpBnt.classList.add("indicator-checked");
    direction = directionEnum.UP;
    debounce(sortingCatalog);
  }
}

function onClickSortingDownBnt(evt) {
  evt.preventDefault();
  if (direction !== directionEnum.DOWN) {
    sortingUpBnt.classList.remove("indicator-checked");
    sortingDownBnt.classList.add("indicator-checked");
    direction = directionEnum.DOWN;
    debounce(sortingCatalog);
  }
}

sortingUpBnt.addEventListener("click", onClickSortingUpBnt);
sortingDownBnt.addEventListener("click", onClickSortingDownBnt);
sortingCatalog(directionEnum.UP);

//добавление в карзину
const basketProducts = [];
const bookmarkProducts = [];

const bookmark = document.querySelector(".bookmarks");
const bookmarksCounter = bookmark.querySelector("span");
const basket = document.querySelector(".basket");
const basketCounter = basket.querySelector("span");

// console.log(bookmark);
// console.log(bookmarksCounter);
// console.log(basket);
// console.log(basketCounter);

function onClickProductCard(evt) {
  evt.preventDefault();
  const target = evt.target;
  if (target.classList.contains("buy")) {
    basketProducts.push(this.dataset.name);
    UpdateBasket();
  } else if (target.classList.contains("bookmark")) {
    bookmarkProducts.push(this.dataset.name);
    UpdateBookmark();
  }
}

function SetValueCounter(wrap, counter, int) {
  counter.textContent = int;
  if (int > 0) {
    wrap.classList.add("add-product");
  } else {
    wrap.classList.remove("add-product");
  }
}

function UpdateBookmark() {
  SetValueCounter(bookmark, bookmarksCounter, bookmarkProducts.length);
}

function UpdateBasket() {
  SetValueCounter(basket, basketCounter, basketProducts.length);
}

UpdateBookmark();
UpdateBasket();

//Модальное окно
const contactsBnt = document.querySelector(".contacts-button");
const modalWrite = document.querySelector(".modal-write");
const modalWriteBntClose = modalWrite.querySelector(".modal-close");

function onClickModalWriteBntClose() {
  closeModalWrite();
}

function onDownKeyEscape(evt) {
  if (evt.key === "Escape") {
    evt.preventDefault();
    closeModalWrite();
  }
}

function setEventsModalWrite() {
  modalWriteBntClose.addEventListener("click", onClickModalWriteBntClose);
  document.addEventListener("keydown", onDownKeyEscape);
}

function removeEventsModalWrite() {
  modalWriteBntClose.removeEventListener("click", onClickModalWriteBntClose);
  document.removeEventListener("keydown", onDownKeyEscape);
}

function showModalWrite() {
  modalWrite.classList.add("modal-show");
  setEventsModalWrite();
}

function closeModalWrite() {
  modalWrite.classList.remove("modal-show");
  removeEventsModalWrite();
}

function onClickContactBnt(evt) {
  evt.preventDefault();
  showModalWrite();
}

contactsBnt.addEventListener("click", onClickContactBnt);

//task 5
const lastTimeout = null;

function debounce(callbakc) {
  if (!lastTimeout) {
    clearTimeout(lastTimeout);
    lastTimeout = setTimeout(callbakc, DEBOUNCE_INTERVAL);
  }
}

//task 6
const allBandsProduct = [];
const templateFilterOption = document.querySelector("#filter-option").content.querySelector(".filter-option");
const brandFilterOptions = document.querySelector(".brand-set .filter-list");
const selectedBrand = [];

function getallBandsProduct() {
  const uniqueProductBrands = productsData.filter((product, index) => {
    return productsData.findIndex((obj) => obj.brand === product.brand) === index;
  });

  for (let i = 0; i < uniqueProductBrands.length; i++) {
    allBandsProduct.push(uniqueProductBrands[i].brand);
  }
}

function onClickBrandFilterOptions(evt) {
  const target = evt.target;
  if (target.tagName === "INPUT") {
    if (target.checked) {
      selectedBrand.push(target.dataset.brand);
    } else {
      const index = selectedBrand.indexOf(target.dataset.brand);
      selectedBrand.splice(index, 1);
    }
  }
}

function CreateCheckBox() {
  getallBandsProduct();
  const inputFilterOption = templateFilterOption.querySelector(".filter-input-checkbox");
  const labelFilterOption = templateFilterOption.querySelector("label");
  const containerForFilterOptions = document.createDocumentFragment();
  let id;
  for (let i = 0; i < allBandsProduct.length; i++) {
    inputFilterOption.name = allBandsProduct[i].toLowerCase();
    id = "filter-" + allBandsProduct[i].toLowerCase();
    inputFilterOption.id = id;
    inputFilterOption.dataset.brand = allBandsProduct[i];
    labelFilterOption.setAttribute("for", id);
    labelFilterOption.innerHTML = allBandsProduct[i];
    containerForFilterOptions.appendChild(templateFilterOption.cloneNode(true));
  }
  brandFilterOptions.innerHTML = "";
  brandFilterOptions.appendChild(containerForFilterOptions);
  brandFilterOptions.addEventListener("click", onClickBrandFilterOptions);
}

CreateCheckBox();

//task 7
const rangeBlock = document.querySelector(".range__block");
const scrollMin = rangeBlock.querySelector(".skroll_min");
const skrollMax = rangeBlock.querySelector(".skroll_max");
const rightEdgeScrollMax = rangeBlock.offsetWidth - skrollMax.offsetWidth;
const rangeBar = rangeBlock.querySelector(".range__bar")


let posLeftScrollMin = 0 ;
scrollMin.style.left = posLeftScrollMin + 'px';
let posLeftScrollMax = rangeBlock.offsetWidth - skrollMax.offsetWidth;
skrollMax.style.left = posLeftScrollMax + 'px';

rangeBar.style.width = "auto";
rangeBar.style.marginLeft = posLeftScrollMin + 'px';
rangeBar.style.marginRight = rangeBlock.offsetWidth - posLeftScrollMax - skrollMax.offsetWidth + 'px';

scrollMin.onmousedown = function(evt) {
  evt.preventDefault(); // предотвратить запуск выделения (действие браузера)

  let shiftX = evt.clientX - scrollMin.getBoundingClientRect().left;
  // shiftY здесь не нужен, слайдер двигается только по горизонтали

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(evt) {
    posLeftScrollMin = evt.clientX - shiftX - rangeBlock.getBoundingClientRect().left;

    // курсор вышел из слайдера => оставить бегунок в его границах.
    if (posLeftScrollMin < 0) {
      posLeftScrollMin = 0;
    }
    let rightEdge = posLeftScrollMax - scrollMin.offsetWidth;
    if (posLeftScrollMin > rightEdge) {
      posLeftScrollMin = rightEdge;
    }
    
    scrollMin.style.left = posLeftScrollMin + 'px';
    rangeBar.style.marginLeft = posLeftScrollMin + 'px';
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }

};

skrollMax.ondragstart = function() {
  return false;
};

skrollMax.onmousedown = function(evt) {
  evt.preventDefault();

  let shiftX = evt.clientX - skrollMax.getBoundingClientRect().left;

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(evt) {
    posLeftScrollMax = evt.clientX - shiftX - rangeBlock.getBoundingClientRect().left;

    if (posLeftScrollMax < posLeftScrollMin) {
      posLeftScrollMax = posLeftScrollMin + skrollMax.offsetWidth;
    }
    if (posLeftScrollMax > rightEdgeScrollMax) {
      posLeftScrollMax = rightEdgeScrollMax;
    }

    skrollMax.style.left = posLeftScrollMax + 'px';
    rangeBar.style.marginRight = rangeBlock.offsetWidth - posLeftScrollMax - skrollMax.offsetWidth + 'px';
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }

};

scrollMin.ondragstart = function() {
  return false;
};



