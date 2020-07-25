class Card {
  constructor(data, cardSelector, handlePreviewPicture) {
    this._text = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;

    /*
    Можно лучше: выполнено верно, но чтобы не выделять память под константу
    cardElement, можно сразу возвращать необходимый dom - узел
    */
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button')
      .addEventListener('click', () => this._handleLikeIcon());

    this._element.querySelector('.card__delete-button')
      .addEventListener('click', () => this._handleDeleteCard());

    this._element.querySelector('.card__image')
      .addEventListener('click', () => this._handlePreviewPicture(this._link, this._text));
  }

  _handleLikeIcon() {
    this._element
      .querySelector('.card__like-button')
      .classList
      .toggle('card__like-button_is-active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._text;

    return this._element;
  }
}

export default Card;
