export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    this._items = items;
  }

  renderAll() {
    this._items.forEach((item) => this._renderer(item, this._container))
  }

  addItem(item) {
    this._items.push(item);
    this._renderer(item, this._container);
  }
}
