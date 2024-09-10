'use strict'
import { openContactForm } from "./modal";

const timerOpenContactForm = () => {
  let modalOpened = false;

  const checkInterval = setInterval(() => {
    if (document.querySelector(".modal.show_display") || document.querySelector(".modal__delivery.show_display")) {
      modalOpened = true;
      clearInterval(checkInterval); // Stop checking if any modal is already open
    }
  }, 1000);

  const timerOpenContactForm = setTimeout(() => {
    clearInterval(checkInterval); // Stop interval when timer triggers
    if (!modalOpened) {
      openContactForm(".modal", null);
    }
  }, 15000);
}

export default timerOpenContactForm