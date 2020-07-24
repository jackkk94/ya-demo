import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
    this._formContainer = this._container.querySelector('.popup__form');
}

  _getInputValues() {
    return this._callback(this._container)
  }

  setEventListeners(closeListener, submitListener) {
    this._container
      .querySelector('.popup__close')
      .addEventListener('click', closeListener);

    this._container.querySelector('.popup__button').addEventListener('click', event => {
      event.preventDefault();
      submitListener(this._getInputValues());
      this.close();
    });
    this._container.addEventListener('click', event => event.target.classList.contains('popup') ? this.close() : null);
  }

  close() {
    super.close();
    this._container.querySelector('.popup__form').reset();
  }

  get formContainer() {
    return this._formContainer;
  }
}
