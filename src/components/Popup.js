import { ESC_KEYCODE } from '../scripts/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);
    this._closePopup = (e) => {
      this._handleEscClose(e);
    };
  }

  open() {
    document.addEventListener('keyup', this._closePopup);
    this._container.classList.add('popup_is-opened');
  }

  close() {
    document.removeEventListener('keyup', this._closePopup);
    this._container.classList.remove('popup_is-opened');
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
