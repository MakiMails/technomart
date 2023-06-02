// Общий код

const COUNT_PRODUCT = 18;
const DISCOUNT_AMOUNT = 15;
const RARIO_MULTIPLE_DISCOUNT = 500;
const MIN_PRICE = 2000;
const MAX_PRICE = 5000;

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
  return arr[getRandomIntNum(0, arr.length - 1)];
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

//writeInConsoleArr(productsData);

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
    priceProduct.textContent = productsData[i].price;
    if (productsData[i].discount !== 0) {
      discountProduct.textContent = productsData[i].discount;
    }
    const product = templateProduct.cloneNode(true);
    containerForProducts.appendChild(product);
  }
  catalog.appendChild(containerForProducts);
}

catalog.innerHTML = "";
fillInСatalog();
const flag = createFlag("new");
console.log(flag);
catalog.appendChild(flag);
