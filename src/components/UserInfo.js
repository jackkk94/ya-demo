export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._name = '';
    this._about = '';
    this._nameContainer = document.querySelector(nameSelector);
    this._aboutContainer = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._nameContainer.textContent,
      about: this._aboutContainer.textContent
    };
  }

  setUserInfo({name, about}) {
    this._name = name;
    this._about = about;
    this._nameContainer.innerText = name;
    this._aboutContainer.innerText = about;
  }
}
