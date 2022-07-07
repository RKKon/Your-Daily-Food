'use strict';

import tabs from './modules/tabs';
import modal from './modules/modal';
import form from './modules/form';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import slider from './modules/slider';
import {openContactForm} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    //show Modal in some time.  //стрелочная функция позваляет не вызыватся при создании
    const timerOpenContactForm = setTimeout(() => openContactForm('.modal', timerOpenContactForm), 15000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('.modal', timerOpenContactForm);
    form('form', timerOpenContactForm);
    timer('.timer', '2022-07-21');
    cards();
    calc();
    slider({
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