/* eslint-disable no-unused-vars */
import ZoibanaPhonemask from '@zoibana/phonemask';
import validator from './modules/validator/validator';
import './scss/style.scss';
import sendForm from './api/api';

const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('form');
const inputPhone = document.getElementById('phone');
const notification = document.getElementById('notification');
const modalBtn = document.getElementById('modalBtn');
const modalBg = document.getElementById('modalBg');
const modal = document.getElementById('modal');

const phoneMask = new ZoibanaPhonemask(inputPhone);

const clearErrorMessage = (htmlElem) => {
  const copyHtmlElem = htmlElem;
  copyHtmlElem.classList.remove('error');
  copyHtmlElem.nextElementSibling.innerText = '';
};

const handleValidationResult = (validationResult) => {
  Array.from(form.elements).forEach((elem) => {
    const copyElem = elem;
    if (copyElem.tagName !== 'BUTTON' && !validationResult[copyElem.name].isValid) {
      copyElem.classList.add('error');
      copyElem.nextElementSibling.innerText = validationResult[copyElem.name].message;
    } else if (copyElem.tagName !== 'BUTTON' && validationResult[copyElem.name].isValid) {
      clearErrorMessage(copyElem);
    }
  });
};

const createPayload = () => {
  const result = {};
  Array.from(form.elements).forEach((elem) => {
    const copyElem = elem;
    if (copyElem.tagName !== 'BUTTON') {
      result[copyElem.name] = copyElem.value;
    }
  });

  return result;
};

submitBtn.addEventListener('click', (event) => {
  if (!submitBtn.disabled) {
    event.preventDefault();
    const result = validator.validate(form.elements);
    handleValidationResult(result);
    if (result.isFinalValue) {
      submitBtn.disabled = true;
      sendForm(createPayload())
        .then((resp) => {
          if (resp.status === 'success') {
            notification.children[0].innerText = 'Success';
            notification.children[0].style.color = 'green';
            notification.children[1].innerText = resp.message;
            notification.classList.add('showNotification');
          } else {
            throw resp;
          }
        })
        .catch((error) => {
          console.error(error);
          notification.children[0].innerText = 'Error';
          notification.children[0].style.color = 'red';
          notification.children[1].innerText = error.message;
          notification.classList.add('showNotification');
        })
        .finally(() => {
          setTimeout(() => {
            notification.classList.remove('showNotification');
          }, 2000);
          submitBtn.disabled = false;
        });
    }
  }
  return false;
});

modalBtn.addEventListener('click', (event) => {
  modalBg.classList.add('showModal');
  modal.classList.add('showModal');
});

modal.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    modalBg.classList.remove('showModal');
    modal.classList.remove('showModal');
  }
});

modalBg.addEventListener('click', (event) => {
  modalBg.classList.remove('showModal');
  modal.classList.remove('showModal');
});
