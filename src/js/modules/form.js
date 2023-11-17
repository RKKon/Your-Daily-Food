import { closeModal, openContactForm } from "./modal";
import { postData } from "../services/services";
import { checkIfJSONServerOn } from "../services/services";

function form(formSelector, timerOpenContactForm) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "assets/img/form/spinner.svg",
    success: "Thank you. Soon we will call you.",
    failure: "Error, something went wrong, try later.",
  };

  forms.forEach((item) => {
    // в итоге на каждую форму будет подвязан обработчик события для отправки
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img"); // здесь помещаем сообщение
      statusMessage.src = message.loading; // можно через setAttribute разницы ни какой не будет
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;`;
      //form.append(statusMessage);
      form.insertAdjacentElement("afterend", statusMessage); // для красоты после элемента добавляет

      // !передаём данные в формате Form Data
      const formData = new FormData(form); //!Внимание! В input всегда надо указывать аттрибут name. иначе formData не сможет найти этот input и не сможет взять value чтобы сформировать объект

      // ! формат JSON
      const json = JSON.stringify(Object.fromEntries(formData.entries())); //entries из объекта привращаят в массив с масивами([ [ 'a', 23 ], [ 'b', 66 ] ])

      /* действи и результат работы Form Data или формат JSON */

      //! works only if turn on json-server.
      const postDataToServer = () => {
        postData("http://localhost:3000/requests", json)
          .then((data) => {
            console.log(data); // ответ на запрос
            showThanksModal(message.success); // message
            statusMessage.remove();
          })
          .catch(() => {
            showThanksModal(message.failure); // mesage failure
          })
          .finally(() => {
            form.reset(); // альтернатива перебрать и очистить input value
          });
      };

      const noJSONServer = () => {
        const randomID = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;
        const showResult = JSON.parse(json);
        showResult.id = randomID;
        console.log(showResult);
        showThanksModal(message.success);
        statusMessage.remove();
        form.reset();
      };

      checkIfJSONServerOn(postDataToServer, noJSONServer);
    });
  }

  function showThanksModal(message) {
    const PrevModalDialog = document.querySelector(".modal__dialog");

    PrevModalDialog.classList.add("hide_display");
    openContactForm(".modal", timerOpenContactForm);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog", "show_display");
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" modal-close>×</div>
            <div class="modal__title">${message}</div>     
        </div>`;
    // не забыть поместить на страницу
    document.body.querySelector(".modal").append(thanksModal); //.modal__dialog

    // если спустя время пользаватель опять захочет открыть (нужно удалить сообщение иначе оно только будет)
    setTimeout(() => {
      thanksModal.remove();
      PrevModalDialog.classList.remove("hide_display");
      thanksModal.classList.remove("modal__dialog", "show_display");
      closeModal(".modal");
    }, 4000);
  }

  //fetch("http://localhost:3000/menu").then((data) => data.json());
  //.then(result => console.log(result));
}

export default form;
