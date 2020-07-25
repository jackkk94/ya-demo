import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { initialCards, defaultFormConfig } from '../scripts/constants.js';
import './index.css';

const editFormModalWindow = document.querySelector('.popup_type_edit');
const cardFormModalWindow = document.querySelector('.popup_type_new-card');
const openEditFormButton = document.querySelector('.profile__edit-button');

/*
Надо исправить: константы необходимо перенести в файл constants.js, поскольку данный файл
должен содержать только логику создания и описания взаимодействия между классами компонентов
*/ 

const profile = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__description',
});

const openCardFormButton = document.querySelector('.profile__add-button');

/*
Надо исправить: константу openCardFormButton так же необходимо перенести в файл constants.js
*/ 

openCardFormButton.addEventListener('click', () => {
  linkPopup.open();
});

const titleInputValue = editFormModalWindow.querySelector('.popup__input_type_name');
const descriptionInputValue = editFormModalWindow.querySelector('.popup__input_type_description');
const cardNameInputValue = cardFormModalWindow.querySelector('.popup__input_type_card-name');
const cardLinkInputValue = cardFormModalWindow.querySelector('.popup__input_type_url');

/*
Надо исправить: константы titleInputValue, descriptionInputValue, cardNameInputValue,
cardLinkInputValue необходимо перенести в файл constants.js
*/ 

const placesSection = new Section(
  {
    items: initialCards,
    renderer: (data, wrap) => {
      const card = new Card(data, '.card-template', (link, text) => {
        imagePopup.open(link, text);
      });
      wrap.prepend(card.getView());
    }
  },
  '.places .places__list'
);

const imagePopup = new PopupWithImage('.popup_type_image');

imagePopup.setEventListeners((event) => {
  imagePopup.close();
});

const profilePopup = new PopupWithForm('.popup_type_edit', () => ({
  name: titleInputValue.value,
  about: descriptionInputValue.value,
}));

profilePopup.setEventListeners(
  () => {
    profilePopup.close();
  },
  (formData) => {
    profile.setUserInfo(formData);
  }
);

openEditFormButton.addEventListener('click', () => {
  const userInfo = profile.getUserInfo();
  titleInputValue.value = userInfo.name;
  descriptionInputValue.value = userInfo.about;
  profilePopup.open();
});

const linkPopup = new PopupWithForm('.popup_type_new-card', () => ({
  link: cardLinkInputValue.value,
  name: cardNameInputValue.value,
}));

linkPopup.setEventListeners(
  () => {
    linkPopup.close();
  },
  (formData) => {
    placesSection.addItem(formData);
  }
);

const checkFormEditProfile = new FormValidator(defaultFormConfig, profilePopup.formContainer);
const checkFormAddPlace = new FormValidator(defaultFormConfig, linkPopup.formContainer);
checkFormEditProfile.enableValidation();
checkFormAddPlace.enableValidation();

placesSection.renderAll();

/*
Надо исправить: все утилитарные участки кода, не относящиеся к реализации классов вынесены в 
файлы utils.js, constants.js.
*/ 