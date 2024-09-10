export function closeModal(modalSelector) {
  const modalContact = document.body.querySelector(modalSelector);
  if (modalContact) {
    modalContact.classList.remove("show_display");
    document.body.style.overflow = ""; // возврат прокрутки страницы
  }
}
export function openContactForm(modalSelector, timerOpenContactForm) {
  const modalContact = document.body.querySelector(modalSelector);
  if (modalContact) {
    modalContact.classList.add("show_display");
    document.body.style.overflow = "hidden"; // убирает прокрутку страницы
    if (timerOpenContactForm) {
      clearInterval(timerOpenContactForm);
    }
  }
}

function modal(modalSelector, timerOpenContactForm) {
  const modalContact = document.body.querySelector(modalSelector);
  const topContactBtn = document.body.querySelector(".header__right-block .btn_white");
  const middleContactBtn = document.body.querySelector(".offer__action .btn_dark");
  //const modalClose = modalContact.querySelector('[modal-close]');//deleted for use data=attribute in modalContact.addEventL .getElementsByClassName('modal__close')[0]; или querySelector('.modal .modal__close');

  if (!modalContact) {
    console.error(`No element found for selector: ${modalSelector}`);
    return
  }

  // for close Modal
  modalContact.addEventListener("click", (e) => {
    // для закрытия стр не на крестик
    if (e.target === modalContact || e.target.getAttribute("modal-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    // для закрыя модал на Esc
    if (e.code === "Escape" && modalContact.classList.contains("show_display")) {
      closeModal(modalSelector); // && и дальше использует Esc только если модал открыта
    }
  });

  // show Modal
  function showContactFormByClickBtn(btn, modalSelector = '.modal') {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openContactForm(modalSelector, timerOpenContactForm);
    });
    // if modal is not ".modal"
    const btnDelivery = document.querySelector('.btn__delivery');
    btnDelivery.addEventListener('click', (e) => {
      let input = document.querySelector('.input_delivery');
      if (input.value.length >= 7) {
        modalContact.classList.remove("show_display");
        document.body.style.overflow = ""; // возврат прокрутки страницы
      }
    })
  }

  showContactFormByClickBtn(topContactBtn);
  showContactFormByClickBtn(middleContactBtn);
  showContactFormByClickBtn(document.querySelector('.delivery__btn'), '.modal__delivery');

  function showDeliveryForm(btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openContactForm('.modal__delivery', timerOpenContactForm);
    });

    document.querySelector('.modal__delivery').addEventListener("click", (e) => {
      // для закрытия стр не на крестик
      if (e.target === modalContact || e.target.getAttribute("modal-close") == "") {
        closeModal('.modal__delivery');
      }
    });
    document.addEventListener("keydown", (e) => {
      // для закрыя модал на Esc
      if (e.code === "Escape" && document.querySelector('.modal__delivery').classList.contains("show_display")) {
        closeModal('.modal__delivery'); // && и дальше использует Esc только если модал открыта
      }
    });
  }
  showDeliveryForm(document.querySelector('.delivery__btn'))

  // show Modal at end of Page
  function showContactFormAtEndPage() {
    if (document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - (document.documentElement.clientHeight + 1)) {
      if (!document.querySelector(".modal.show_display") && !document.querySelector(".modal__delivery.show_display")) {
        openContactForm(modalSelector, timerOpenContactForm);
      }
      window.removeEventListener("scroll", showContactFormAtEndPage);
    }
  }

  window.addEventListener("scroll", showContactFormAtEndPage);

}

export default modal;