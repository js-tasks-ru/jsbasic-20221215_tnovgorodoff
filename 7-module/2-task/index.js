import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = document.createElement('div');
    this.modal.classList.add('modal');
    this.modal.insertAdjacentHTML('afterbegin', this.createModalTemplate());
    this.closeWithClick();
    this.closeWithESC();
  }
  // открываем модальное окно
  open() {
    document.body.insertAdjacentElement('afterbegin', this.modal);
    document.body.classList.add('is-modal-open');
  }
  // устанавливаем заголовок модального окна
  setTitle(modalTitle) {
    const modalTitleElem = this.modal.querySelector('.modal__title');

    modalTitleElem.textContent = modalTitle;
  }
  // тело модального окна
  setBody(node) {
    const modalBody = this.modal.querySelector('.modal__body');

    modalBody.textContent = ''
    modalBody.insertAdjacentElement('afterbegin', node)
  }
  // верстка окна
  createModalTemplate() {
    const modalTemplate = `
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>
      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>`

    return modalTemplate
  }
  // все варианты закрыть окно
  close() {
    this.modal.remove();
    document.body.classList.remove('is-modal-open');
  }

  closeWithClick() {
    const modalClose = this.modal.querySelector('.modal__close');
    modalClose.addEventListener('click', () => {
      this.modal.remove();
      document.body.classList.remove('is-modal-open');
    })
  }

  closeWithESC() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.modal.remove();
        document.body.classList.remove('is-modal-open');
      }
    })
  }
}
