import { common } from './common';
import { createMarkup } from './helpers/createMarkup';

const favoriteArr = JSON.parse(localStorage.getItem(common.KEY_FAVORITE)) ?? [];
const basketArr = JSON.parse(localStorage.getItem(common.KEY_BASKET)) ?? [];
const list = document.querySelector('.js-list');
const favorite = JSON.parse(localStorage.getItem(common.KEY_FAVORITE)) ?? [];

list.addEventListener('click', onClick);

function onClick(evt) {
  if (evt.target.classList.contains('js-close')) {
    const product = findProduct(evt.target);
    let id = product.id;
    let itemIndex = favoriteArr.findIndex(item => +item.id === +id); // Шукаємо індекс елемента в списку
    if (itemIndex === -1) return;
    favoriteArr.splice(itemIndex, 1); // Видаляємо зі списку
    localStorage.setItem(common.KEY_FAVORITE, JSON.stringify(favoriteArr));
    location.reload();
  }
}

function findProduct(elem) {
  const productId = Number(elem.closest('.js-card').dataset.id);
  return favorite.find(({ id }) => id === productId);
}

createMarkup(favorite, list);
