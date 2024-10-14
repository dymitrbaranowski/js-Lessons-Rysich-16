// const basicLightbox = require('basiclightbox');

import * as basicLightbox from 'basiclightbox';
// import 'basiclightbox/dist/basiclightbox.min.css';

const instruments = [
  {
    id: 1,
    img: 'https://static.dnipro-m.ua/cache/products/6573/catalog_origin_476350.jpg',
    name: 'Шуруповерт',
    price: 150,
    description:
      'Мережевий дриль-шуруповерт TD-30 — надійний помічник для робіт по дому та в невеликій майстерні, якщо необхідно виконувати роботу переважно з закручування кріпильних елементів. Муфта регулювання крутного моменту робить інструмент універсальним вибором як для свердління, так і для роботи з кріпленнями.',
  },
  {
    id: 2,
    img: 'https://static.dnipro-m.ua/cache/products/5634/catalog_origin_323581.jpg',
    name: 'Перфоратор',
    price: 3948,
    description:
      'Перфоратор бочковий Dnipro-M ВН-20 використовується для виконання широкого спектру будівельних і ремонтних робіт: буріння та свердління отворів, розмішування будівельних сумішей, демонтажу і т.д.',
  },
  {
    id: 3,
    img: 'https://static.dnipro-m.ua/cache/products/992/catalog_origin_322784.jpg',
    name: 'Шліфмашина',
    price: 1299,
    description:
      'Кутова шліфувальна машина Dnipro-M GS-98 – модель, яка поєднує в собі оптимальне співвідношення потужності, ваги та мобільності. Конструкція шліфмашини сприяє зручній та надійній роботі, навіть однією рукою. Інструмент ідеально підходить для виконання різу на висоті та використання у важкодоступних місцях. Низький рівень шуму та вібрації, двопозиційне розташування додаткової рукоятки під кутом 100 градусів, мінімізує втому під час шліфування.',
  },
  {
    id: 4,
    img: 'https://static.dnipro-m.ua/cache/products/4406/catalog_origin_322116.jpg',
    name: 'Пила',
    price: 11049,
    description:
      'Мобільна акумуляторна ланцюгова пила DCS-200BC DUAL призначена для обрізання зайвих гілок, спилювання дерев та чагарника, заготівлі дров, покрою будматеріалів та демонтажних робіт. Її просто використовувати у будь-яких місцях: на висоті, на виїзних роботах, у лісі або саду. При цьому Вам не потрібно буде турбуватися про підключення до мережі.',
  },
  {
    id: 5,
    img: 'https://static.dnipro-m.ua/cache/products/2023/catalog_origin_323420.jpg',
    name: 'Рівень',
    price: 897,
    description:
      'Рівень серії ProVision виробництва DNIPRO-M має не тільки високу точність вимірювань і чудові захисні властивості, а й надає максимальний комфорт користувачеві в процесі експлуатації.',
  },
  {
    id: 6,
    img: 'https://static.dnipro-m.ua/cache/products/6483/catalog_origin_325859.jpg',
    name: 'Тример',
    price: 3699,
    description:
      'Тример електричний Dnipro-M 110 призначений для покосу густої трави, а також кущів з діаметром стовбура до 10 мм.',
  },
  {
    id: 7,
    img: 'https://static.dnipro-m.ua/cache/products/10189/catalog_origin_478864.jpg',
    name: 'Мотокоса',
    price: 11049,
    description:
      "Мотокоса Dnipro-M 43 призначена для покосу трави, чагарників, бур'янів, газонів, а також для заготівлі сіна в невеликих масштабах.    Використовується для польових робіт на садовій ділянці площею до 2000 м2.",
  },
  {
    id: 8,
    img: 'https://static.dnipro-m.ua/cache/products/2747/catalog_origin_319752.jpg',
    name: 'Генератор',
    price: 10890,
    description:
      'Бензиновий генератор GX-25 номінальною потужністю 2,5 кВт забезпечить автономність побутових приладів на дачі або у приватному будинку. Ви зможете одночасно підключити до нього освітлення, холодильник, зарядку телефону, ноутбук та водяний насос.',
  },
];

const KEY_FAVORITE = 'favorite';
const KEY_BASKET = 'basket';
const search = document.querySelector('.js-search');
const list = document.querySelector('.js-list');
const favoriteArr = JSON.parse(localStorage.getItem('KEY_FAVORITE')) ?? [];
const basketArr = JSON.parse(localStorage.getItem('KEY_BASKET')) ?? [];

// {
//     id: 1,
//     img: 'https://static.dnipro-m.ua/cache/products/4878/catalog_origin_269592.jpg',
//     name: 'Шуруповерт',
//     price: 150,
//     description:
//       'Мережевий дриль-шуруповерт TD-30 — надійний помічник для робіт по дому та в невеликій майстерні, якщо необхідно виконувати роботу переважно з закручування кріпильних елементів. Муфта регулювання крутного моменту робить інструмент універсальним вибором як для свердління, так і для роботи з кріпленнями.',
//   },

function createMarkup(arr) {
  const markup = arr
    .map(
      ({ id, img, name }) => `
     <li data-id="${id}" class="js-card">
        <img src="${img}" alt="${name}" width="300">
        <h2>${name}</h2>
        <p><a class="js-info" href="#">More information</a></p>
       <div>
          <button class="js-favorite">Add to favorite</button>
          <button class="js-basket">Add to basket</button>
        </div>
      </li>
  `
    )
    .join('');

  list.innerHTML = markup;
}

list.addEventListener('click', onClick);

function onClick(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains('js-info')) {
    const product = findProduct(evt.target);
    const instance = basicLightbox.create(`
       <div class="modal">
        <img src="${product.img}" alt="${product.name}" width="200" />
        <h2>${product.name}</h2>
        <h3>${product.price} grn</h3>
        <p>${product.description}</p>
        <div>
          <button class="js-favorite">Add to favorite</button>
          <button class="js-basket">Add to basket</button>
        </div>
      </div>
    `);
    instance.show();
  }

  if (evt.target.classList.contains('js-basket')) {
    const product = findProduct(evt.target);

    basketArr.push(product);
    localStorage.setItem(KEY_BASKET, JSON.stringify(basketArr));
  }

  if (evt.target.classList.contains('js-favorite')) {
    const product = findProduct(evt.target);
    const inStorage = favoriteArr.some(({ id }) => id === product.id);
    if (inStorage) {
      return;
    }
    favoriteArr.push(product);
    localStorage.setItem(KEY_FAVORITE, JSON.stringify(favoriteArr));
  }
}

createMarkup(instruments);

function findProduct(elem) {
  const productId = Number(elem.closest('.js-card').dataset.id);
  return instruments.find(({ id }) => id === productId);
}
