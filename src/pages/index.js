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

openEditFormButton.addEventListener('click', () => {
  profilePopup.open();
});

const openCardFormButton = document.querySelector('.profile__add-button');

openCardFormButton.addEventListener('click', () => {
  linkPopup.open();
});

const titleInputValue = editFormModalWindow.querySelector('.popup__input_type_name');
const descriptionInputValue = editFormModalWindow.querySelector('.popup__input_type_description');
const cardNameInputValue = cardFormModalWindow.querySelector('.popup__input_type_card-name');
const cardLinkInputValue = cardFormModalWindow.querySelector('.popup__input_type_url');

const profile = new UserInfo({
  nameSelector: '.profile__title',
  aboutSelector: '.profile__description',
});

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
