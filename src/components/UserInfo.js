export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._name = '';
    this._about = '';
    /*
    Можно лучше: рекомендуется удалить поля this._name и this._about,
    поскольку их наличие никак не влияет на логику кода, но память на них
    выделяется, что может оказывать негативное влияние на быстродействие
    приложения.
    */ 
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
    /*
    Можно лучше: рекомендуется удалить поля this._name и this._about,
    поскольку их значения нигде не используются
    */ 
    this._nameContainer.innerText = name;
    this._aboutContainer.innerText = about;
  }
}
