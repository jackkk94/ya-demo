import { ESC_KEYCODE } from '../scripts/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);
    this._closePopup = (e) => {
      this._handleEscClose(e);
    };
    /*
    Можно лучше: для большей оптимизации памяти рекомендуется не создавать 
    отдельную переменную this._closePopup,
    а напрямую использовать метод  this._handleEscClose() в необходимых местах
    */ 
  }

  open() {
    document.addEventListener('keyup', this._closePopup);
    /*
    Надо исправить: обработчик события 'keyup' рекомендуется добаавить в методе setEventListeners(),
    поскольку он вызывается при открытии модального окна, и должен отвечать за добавление 
    обработчиков событий модального окна.
    Можно лучше: также рекомендуется сначала отрисовывать элемент, а уже затем добавлять функции - обработчики
    на событытия, отлавливаемые на данном элементе 
    */ 
    this._container.classList.add('popup_is-opened');
  }

  close() {
    document.removeEventListener('keyup', this._closePopup);
    this._container.classList.remove('popup_is-opened');
    /*
    Надо исправить: не добавлен метод удаления обработчика события нажатия на иконку закрытия модального окна 
    */ 
  }

  setEventListeners(closeListener) {
    this._container.querySelector('.popup__close').addEventListener('click', closeListener);
    this._container.addEventListener('click', evt => evt.target.classList.contains('popup') ? this.close() : null);
  }

  _handleEscClose(event) {
    if (event.keyCode === ESC_KEYCODE) {
      this.close();
    }
  }
}
