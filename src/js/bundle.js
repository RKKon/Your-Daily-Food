/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    const resultCalculating = document.body.querySelector('.calculating__result span');
    
    let gender, height, weight, age, ratio;

    //Local storage
    if (localStorage.getItem('gender')) {
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
        localStorage.setItem('gender', 'female');
    }
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('gender')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    //Calc
    function calcTotal() {
        if (!gender || !height || !weight || !age || !ratio) {
            resultCalculating.textContent = '____';
            return;
        }

        if (gender === 'female') {
            resultCalculating.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed();
        } else if (gender === 'male') {
            resultCalculating.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed();
        }
    }
    

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector); // буду получать все елементы

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => elem.classList.remove(activeClass));
    
                e.target.classList.add(activeClass);
                
                calcTotal();
            });     
        });
       
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });

    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // use classes for cards food

    const WrapperDayMenu = document.body.querySelector('.menu__field .container');

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
            const element = document.createElement('div');
            if (this.classes.length === 0) { // без length не получится проверить(classes это масив)
                this.element = "menu__item";
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className)); // дабавляем классы в new items
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
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCardFood(img, altimg, title, descr, price, '.menu__field .container').render();
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector, timerOpenContactForm) {

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Thank you. Soon we will call you.',
        failure: 'Error, something went wrong, try later.'
    };

    forms.forEach(item => { // в итоге на каждую форму будет подвязан обработчик события для отправки
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');// здесь помещаем сообщение
            statusMessage.src = message.loading; // можно через setAttribute разницы ни какой не будет
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;`;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage); // для красоты после элемента добавляет

            // !передаём данные в формате Form Data
            const formData = new FormData(form); //!Внимание! В input всегда надо указывать аттрибут name. иначе formData не сможет найти этот input и не сможет взять value чтобы сформировать объект

            // ! формат JSON 
            const json = JSON.stringify(Object.fromEntries(formData.entries()));//entries из объекта привращаят в массив с масивами([ [ 'a', 23 ], [ 'b', 66 ] ])

            /* действи и результат работы Form Data или формат JSON */
            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then((data) => {
                console.log(data); // ответ на запрос
                showThanksModal(message.success); // message 
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure); // mesage failure
            }).finally(() => {
                form.reset(); // альтернатива перебрать и очистить input value
            });
        });
    }

    function showThanksModal(message) {
        const PrevModalDialog = document.querySelector('.modal__dialog');

        PrevModalDialog.classList.add('hide_display');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openContactForm)('.modal', timerOpenContactForm);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog', 'show_display'); 
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" modal-close>×</div>
            <div class="modal__title">${message}</div>     
        </div>`;
        // не забыть поместить на страницу
        document.body.querySelector('.modal').append(thanksModal); //.modal__dialog

        // если спустя время пользаватель опять захочет открыть (нужно удалить сообщение иначе оно только будет)
        setTimeout(() => {
            thanksModal.remove();
            PrevModalDialog.classList.remove('hide_display');
            thanksModal.classList.remove('modal__dialog', 'show_display');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
    
    fetch('http://localhost:3000/menu')
        .then(data => data.json());
        //.then(result => console.log(result));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openContactForm": () => (/* binding */ openContactForm)
/* harmony export */ });
function closeModal(modalSelector) {
    const modalContact = document.body.querySelector(modalSelector);

    modalContact.classList.remove('show_display');
    document.body.style.overflow = ''; // возврат прокрутки страницы
}
function openContactForm(modalSelector, timerOpenContactForm) {
    const modalContact = document.body.querySelector(modalSelector);

    modalContact.classList.add('show_display');
    document.body.style.overflow = 'hidden'; // убирает прокрутку страницы
    if (timerOpenContactForm) {
        clearInterval(timerOpenContactForm);
    }   
}

function modal(modalSelector, timerOpenContactForm) {
    const modalContact = document.body.querySelector(modalSelector);
    const topContactBtn = document.body.querySelector('.header__right-block .btn_white');
    const middleContactBtn = document.body.querySelector('.offer__action .btn_dark');
    //const modalClose = modalContact.querySelector('[modal-close]');//deleted for use data=attribute in modalContact.addEventL .getElementsByClassName('modal__close')[0]; или querySelector('.modal .modal__close');

    // for close Modal 

    //modalClose.addEventListener('click', closeModal);//turn off button and changed. It no need
    modalContact.addEventListener('click', (e) => {// для закрытия стр не на крестик
        if (e.target === modalContact || e.target.getAttribute('modal-close') == '') {
            closeModal(modalSelector);  
        }
    });
    document.addEventListener('keydown', e => { // для закрыя модал на Esc
        if (e.code === 'Escape' && modalContact.classList.contains('show_display')) {
            closeModal(modalSelector);  // && и дальше использует Esc только если модал открыта
        }
    });
    // End Close Modal

    // show Modal
    function showContactFormByClickBtn(btn) {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openContactForm(modalSelector, timerOpenContactForm);
        });
    }
    
    showContactFormByClickBtn(topContactBtn);
    showContactFormByClickBtn(middleContactBtn);

    // show Modal at end of Page
    function showContactFormAtEndPage() { 
        if (document.documentElement.scrollTop >= // баг мониторов нужно добавлять высоту клиенто а то не покажет
        document.documentElement.scrollHeight - (document.documentElement.clientHeight + 1)) {
            openContactForm(modalSelector, timerOpenContactForm);
            window.removeEventListener('scroll', showContactFormAtEndPage);
        }
    }
    window.addEventListener('scroll', showContactFormAtEndPage);
 
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    

    const slides = document.body.querySelectorAll(slide);
    const sliderNextArrow = document.body.querySelector(nextArrow);
    const sliderPrevArrow = document.body.querySelector(prevArrow);
    const currentNumberSlide = document.body.querySelector(currentCounter);
    const totalNumberSlide = document.body.querySelector(totalCounter);

    // вариант 2 slider from teacher. так же можно улучшить в будущем (для сенсерного перетаскивания darag and drop мишкой и тп) 
    //! in HTML Все блоки offer__slide обернуть в <div class="offer__slider-inner">
    const slider = document.body.querySelector(container);
    const slidesWrapper = document.body.querySelector(wrapper);
    const slidesField = document.body.querySelector(field);
    const widthSlide = window.getComputedStyle(slidesWrapper).width;
    let slideIndex= 1;
    let offset = 0; // отступ

    if (slides.length > 9) { // for show max amount of slides
        totalNumberSlide.innerHTML = slides.length;
    } else {totalNumberSlide.innerHTML = `0${slides.length}`;}
    

    // можно через классы из CSS делать. тут просто на скорую руку сделано
    slidesField.style.width = 100 * slides.length + "%"; //установим блоку ширину(во всю длину(тут 400%)). все слады * на 100%
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden'; // скрываем все эелементы которые не попадают в область видимости
    slides.forEach(slide => slide.style.width = widthSlide); // все слайды нужного width
    
    slider.style.position = 'relative';
    const dots = document.createElement('ol');
    const indicators = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li'); // cоздавем li
        dot.setAttribute('data-slide-to', i + 1); // уставаливаем для каждой точки аттрибут
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        indicators.push(dot);
    }

    let changeOpacityIndicators = () => {
        indicators.forEach(dot => dot.style.opacity = '.5');
        indicators[slideIndex - 1].style.opacity = 1;
    };
    let changeDotsNumber = () => {
        if (slideIndex > 9) { // for show number current slides
            currentNumberSlide.innerHTML = slideIndex;
        } else {currentNumberSlide.innerHTML = `0${slideIndex}`;}
    };
    const delLettersAndSpaces = (str) => +str.replace(/\D/g, '');// del px and return numbers. тут регулярное выражение
    
    sliderNextArrow.addEventListener('click', () => {
        if (offset == delLettersAndSpaces(widthSlide) * (slides.length - 1)) { //в обычном случае тут '650px'. slice and + превращают в число 650
            offset = 0; // вернуть слайдер в начальное положение
        } else {
            offset += delLettersAndSpaces(widthSlide); // смещает слайд на определеную величину(650)
        }
        slidesField.style.transform = `translateX(-${offset}px)`; //в CSS если сдвинуть влево то отрицательно значение, если вправо то положительное
        
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {slideIndex++;}

        changeDotsNumber();
        changeOpacityIndicators();
    });

    sliderPrevArrow.addEventListener('click', () => {
        if (offset == 0) {          
            offset = delLettersAndSpaces(widthSlide) * (slides.length - 1);
        } else {
            offset -= delLettersAndSpaces(widthSlide); // смещает слайд на определеную величину(500)
        } 
        slidesField.style.transform = `translateX(-${offset}px)`; //в CSS если сдвинуть влево то отрицательно значение, если вправо то положительное
        
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {slideIndex--;}

        changeDotsNumber();
        changeOpacityIndicators();
    });

    indicators.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo; // устанавливает индекс
            offset = delLettersAndSpaces(widthSlide) * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`; // смещение

            changeDotsNumber();     
            changeOpacityIndicators();
        });
    });


    /* // вариант 1 слайда от учителя
    let slideIndex= 1;

    function showSlides(n) {
        if(n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(slide => slide.classList.add('hide_display'));
        slides[slideIndex -1].classList.remove('hide_display');

        if (slideIndex > 9) {
            currentNumberSlide.innerHTML = slideIndex;
        } else {currentNumberSlide.innerHTML = `0${slideIndex}`;}
    }
    showSlides(slideIndex);

    if (slides.length > 9) {
        totalNumberSlide.innerHTML = slides.length;
    } else {totalNumberSlide.innerHTML = `0${slides.length}`;}

    function plusSlide(n) {
        showSlides(slideIndex = slideIndex + n);
    }

    sliderNextArrow.addEventListener('click', () => {
        plusSlide(1);
    });
    sliderPrevArrow.addEventListener('click', () => {
        plusSlide(-1);
    }); */

    /* // Моё личное решение слайдов вариант 1
    slides.forEach(slide => slide.classList.add('hide_display'));
    if (slides.length > 9) {
        totalNumberSlide.innerHTML = `${slides.length}`;
    } else {totalNumberSlide.innerHTML = `0${slides.length}`;}

    let counter = 0; // без counter не выводит в глобальную переменную которая сохраняет данные при клике на addEv
    
    const hideCurrentSlideForNext = (counter, i=1) => {
        if (counter < 9) {
            currentNumberSlide.innerHTML = `0${counter + 1}`;
        } else {currentNumberSlide.innerHTML = `${counter + 1}`;}
        slides[counter - i].classList.remove('show_display', 'fade');
        slides[counter - i].classList.add('hide_display');
    };
    const hideCurrentSlideForPrior = (counter, i=1) => {
        if (counter < 9) {
            currentNumberSlide.innerHTML = `0${counter + 1}`;
        } else {currentNumberSlide.innerHTML = `${counter + 1}`;}
        slides[counter + i].classList.remove('show_display', 'fade');
        slides[counter + i].classList.add('hide_display');
    };

    function showSlide(i = 0) { // по default ставит индекс 0 и показывает 1 img
        slides[i].classList.add('show_display', 'fade');
        slides[i].classList.remove('hide_display');
    }
    showSlide();

    sliderNextArrow.addEventListener('click', () => {
        if (counter + 1 < slides.length) {
            counter++;
            showSlide(counter);
            hideCurrentSlideForNext(counter);
        } else if (counter + 1 == slides.length) {
            hideCurrentSlideForNext(counter, 0);
            currentNumberSlide.innerHTML = `0${1}`;
            counter = 0;
            showSlide(counter);
        }
    });
    sliderPrevArrow.addEventListener('click', () => {
        if (counter + slides.length == slides.length) {
            hideCurrentSlideForNext(counter, 0);
            showSlide(counter + slides.length - 1);
            currentNumberSlide.innerHTML = `0${slides.length}`;
            counter = slides.length - 1;
        } else if (counter < slides.length) {
            counter--;
            showSlide(counter);
            hideCurrentSlideForPrior(counter);
        }
    }); */
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const foodItemInMenu = document.body.querySelectorAll(tabsSelector);
    const tabsFoodContent = document.body.querySelectorAll(tabsContentSelector);
    const typeFoodInMenuFood = document.body.querySelector(tabsParentSelector);

    const hideTabsFoodContent = function () { // прячет табы     
        tabsFoodContent.forEach(item => {
            item.classList.add('hide_display');
            item.classList.remove('show_display', 'fade');
            // tabsFoodContent[i].getElementsByClassName.display = 'none';//вместо 2 выше(не рекомендуется)
        });   

        foodItemInMenu.forEach(item => {
            item.classList.remove(activeClass); // убирает класс активности
        });
    };

    // !Крутая функция которая 1) показывает нужный таб и 2) даваляет нужный класс активности у меню.
    function showTabContent(i = 0) { // по default ставит индекс 0 и показывает 1 таб и меню активность
        tabsFoodContent[i].classList.add('show_display', 'fade');
        tabsFoodContent[i].classList.remove('hide_display');
        // tabsFoodContent[i].getElementsByClassName.display = 'block';//вместо 2 выше(не рекомендуется)
        foodItemInMenu[i].classList.add(activeClass);  
    }
    hideTabsFoodContent();
    showTabContent(); // показывае 1  пункт меню и 1 таб (active и show)

    typeFoodInMenuFood.addEventListener('click', (event) => {
        const target = event.target;
        //event.preventDefault();
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            foodItemInMenu.forEach ((item, i) => {
                if (target == item) {
                    hideTabsFoodContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) { 
   
    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());//получить кол-во миллисекунд которое будет в конечно времени
        
        if (t <= 0) { // если акция закончилась 
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60)) % 24); //% 24 делит на 24 и возвращяет остаток
            minutes = Math.floor((t / (1000 * 60)) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return { // or {t, days, hours, minutes, seconds}
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }
    getTimeRemaining(deadline);

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector); 
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id,deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => { // async делает синхронный код. Вместе с await. не блокирует код подобие синхронного кода
    const result = await fetch(url, { //! fetch it ассинхронный код он не ждёт другой код. он создаст пустую переменную и дальше сразу return, будет error
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: data
    });
    return result.json();
};

async function getResource(url) { // async делает синхронный код. Вместе с await. не блокирует код подобие синхронного кода
    const result = await fetch(url);
    // поскольку fetch не выдаёт ошибки и reject надо проверить на ошибки
    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return result.json();
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");











window.addEventListener('DOMContentLoaded', () => {
    //show Modal in some time.  //стрелочная функция позваляет не вызыватся при создании
    const timerOpenContactForm = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openContactForm)('.modal', timerOpenContactForm), 15000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', timerOpenContactForm);
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_2__["default"])('form', timerOpenContactForm);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('.timer', '2022-07-21');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev', 
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map