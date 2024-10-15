function createMarkup(arr, list) {
  let markup;
  if (arr.length) {
    markup = arr
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
  } else {
    markup = `
       <li>
          <img src="https://i.pinimg.com/736x/28/6d/ee/286deefda7e108e93dda1c3f8b232e76.jpg" alt="404" width="600">
        </li>
    `;
  }

  list.innerHTML = markup;
}

export { createMarkup };
