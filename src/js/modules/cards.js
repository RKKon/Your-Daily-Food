import { getResource } from "../services/services";

function cards() {
  // use classes for cards food

  const WrapperDayMenu = document.body.querySelector(".menu__field .container");

  class MenuCardFood {
    constructor(img, alt, title, descr, price, parentWrapper, ...classes) {
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentWrapper);
      this.classes = classes; // if() check нужно проверять length, тут масив
      this.transfer = 27; // курс 1$ к гривнам
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = +this.price * this.transfer;
    }
    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        // без length не получится проверить(classes это масив)
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className)); // дабавляем классы в new items
      }
      element.innerHTML += `
                <img src="${this.img}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
      this.parent.append(element); //создаёт элемент на странице
      // WrapperDayMenu.append(element); //или так создаёт элемент на странице
    }
  }

  /* creat cardsFood on page */ //!for works cards need start npx json-server db.json

  getResource().then((data) => {
    data.menu.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCardFood(img, altimg, title, descr, price, ".menu__field .container").render();
    });
  });

  /* if use library axios  for get cardsFood. This code it is all what need to write!!!*/
  // axios.get('http://localhost:3000/menu')
  //     .then(data => {
  //         data.data.forEach(({img, altimg, title, descr, price}) => {
  //             new MenuCardFood(img, altimg, title, descr, price, '.menu__field .container').render();
  //     });
  // });

  /* other way to creat cardsFood from dataBase if no classes, or need do it once  */
  // getResource('http://localhost:3000/menu')
  //     .then(data => creatCard(data));

  // function creatCard(data) {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //         const element = document.createElement('div');
  //         element.classList.add('menu__item');
  //         price *= 27; // курс
  //         element.innerHTML = `
  //             <img src="${img}" alt="${altimg}">
  //             <h3 class="menu__item-subtitle">${title}</h3>
  //             <div class="menu__item-descr">${descr}</div>
  //             <div class="menu__item-divider"></div>
  //             <div class="menu__item-price">
  //                 <div class="menu__item-cost">Цена:</div>
  //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //             </div>
  //         `;

  //         document.querySelector('.menu .container').append(element);
  //     });
  // }
}

export default cards;
