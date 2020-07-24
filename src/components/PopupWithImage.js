import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(path, title) {
    const image = this._container.querySelector('.popup__image');
    image.src = path;

    this._container.querySelector('.popup__caption').innerText = title;
    super.open();
  }
}
