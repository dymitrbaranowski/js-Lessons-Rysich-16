function createMarkup(arr, list) {
  const markup = arr
    .map(
      ({ id, img, name }) => `
       <li data-id="${id}" class="js-card">
          <button class="close js-close">X</button>
       
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

export { createMarkup };
