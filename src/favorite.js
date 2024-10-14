import { common } from './common';
import { createMarkup } from './helpers/createMarkup';

const list = document.querySelector('.js-list');
const close = document.querySelector('.js-close');
console.log(close);

const favorite = JSON.parse(localStorage.getItem(common.KEY_FAVORITE)) ?? [];

createMarkup(favorite, list);

close.addEventListener('click', onClickClose);

function onClickClose(evt) {
  console.log(evt);
  localStorage.removeItem(common.KEY_FAVORITE);
}
