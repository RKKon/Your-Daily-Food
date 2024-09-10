"use strict";

import tabs from "./modules/tabs";
import modal from "./modules/modal";
import form from "./modules/form";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calc";
import slider from "./modules/slider";
import timerOpenContactForm from "./modules/timerOpenContactForm";

window.addEventListener("DOMContentLoaded", () => {
  timerOpenContactForm();
  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  modal(".modal");
  modal('.modal__delivery');
  form("form");
  timer(".timer", "2024-12-21");
  cards();
  calc();
  slider({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner",
  });
});
