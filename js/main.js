// Общий код

const COUNT_PRODUCT = 18;
const DISCOUNT_AMOUNT = 15;
const RARIO_MULTIPLE_DISCOUNT = 500;
const MIN_PRICE = 2000;
const MAX_PRICE = 5000;

const variantsUrlPhotoProducts = [
  "img/catalog/bosch-2000.jpg",
  "img/catalog/bosch-3000.jpg",
  "img/catalog/bosch-6000.jpg",
  "img/catalog/bosch-9000.jpg",
  "img/catalog/makita-td-110.jpg",
];

const variantsBrandProducts = ["BOSCH", "Makita", "Vagner", "Mega", "Proline"];

const variantsTitleProducts = [
  "Перфоратор BOSCH BFG 2000",
  "Перфоратор BOSCH BFG 3000",
  "Перфоратор BOSCH BFG 6000",
  "Перфоратор BOSCH BFG 9000",
  "Шуруповерт Makita TD-110",
];

const variantsCategoryproducts = [
  "Перфораторы",
  "Шуруповерты",
  "Ключи",
  "Отвертки",
];

const variantsFlagProducts = ["new", "promo", ""];

function getRandomIntNum(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
}

function calcDiscount(price) {
  let discount = 0;
  if (getRandomIntNum(0, 2) == 1) {
    discount = price * (DISCOUNT_AMOUNT / 100);
    discount =
      Math.floor(discount / RARIO_MULTIPLE_DISCOUNT) * RARIO_MULTIPLE_DISCOUNT;
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
const products = [];

for (let i = 0; i < COUNT_PRODUCT; i++) {
  let product = new Object();
  product.urlPhoto = getRandomElemInArray(variantsUrlPhotoProducts);
  product.brand = getRandomElemInArray(variantsBrandProducts);
  product.title = getRandomElemInArray(variantsTitleProducts);
  product.price = getRandomIntNum(MIN_PRICE, MAX_PRICE);
  product.category = getRandomElemInArray(variantsCategoryproducts);
  product.discount = calcDiscount(product.price);
  product.flag = getRandomElemInArray(variantsFlagProducts);
  products.push(product);
}

writeInConsoleArr(products);
