export function closeModal(modalSelector) {
  const modalContact = document.body.querySelector(modalSelector);

  modalContact.classList.remove("show_display");
  document.body.style.overflow = ""; // возврат прокрутки страницы
}
export function openContactForm(modalSelector, timerOpenContactForm) {
  const modalContact = document.body.querySelector(modalSelector);

  modalContact.classList.add("show_display");
  document.body.style.overflow = "hidden"; // убирает прокрутку страницы
  if (timerOpenContactForm) {
    clearInterval(timerOpenContactForm);
  }
}

function modal(modalSelector, timerOpenContactForm) {
  const modalContact = document.body.querySelector(modalSelector);
  const topContactBtn = document.body.querySelector(".header__right-block .btn_white");
  const middleContactBtn = document.body.querySelector(".offer__action .btn_dark");
  //const modalClose = modalContact.querySelector('[modal-close]');//deleted for use data=attribute in modalContact.addEventL .getElementsByClassName('modal__close')[0]; или querySelector('.modal .modal__close');

  // for close Modal

  //modalClose.addEventListener('click', closeModal);//turn off button and changed. It no need
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
  // End Close Modal

  // show Modal
  function showContactFormByClickBtn(btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openContactForm(modalSelector, timerOpenContactForm);
    });
  }

  showContactFormByClickBtn(topContactBtn);
  showContactFormByClickBtn(middleContactBtn);

  // show Modal at end of Page
  function showContactFormAtEndPage() {
    if (
      document.documentElement.scrollTop >= // баг мониторов нужно добавлять высоту клиенто а то не покажет
      document.documentElement.scrollHeight - (document.documentElement.clientHeight + 1)
    ) {
      openContactForm(modalSelector, timerOpenContactForm);
      window.removeEventListener("scroll", showContactFormAtEndPage);
    }
  }
  window.addEventListener("scroll", showContactFormAtEndPage);
}

export default modal;
// export { closeModal, openContactForm };
