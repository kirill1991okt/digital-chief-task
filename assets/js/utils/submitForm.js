import postData from '../services/services.js';

const submitForm = () => {
  const form = document.querySelector('#signup');
  const usernameEl = document.querySelector('#name');
  const emailEl = document.querySelector('#email');

  const isRequired = (value) => (value === '' ? false : true);

  const isBetween = (length, min, max) =>
    length < min || length > max ? false : true;

  const isEmailValid = (email) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    return regex.test(email);
  };

  const showError = (input, message) => {
    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
  };

  const showSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
  };

  const checkUsername = () => {
    let valid = false;
    const min = 3,
      max = 15;
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
      showError(usernameEl, 'Имя должно быть заполнено.');
    } else if (!isBetween(username.length, min, max)) {
      showError(
        usernameEl,
        `Имя должно содержать от ${min} до ${max} символов.`
      );
    } else {
      showSuccess(usernameEl);
      valid = true;
    }
    return valid;
  };

  const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
      showError(emailEl, 'Поле должно быть заполнено.');
    } else if (!isEmailValid(email)) {
      showError(emailEl, 'Неверный e-mail.');
    } else {
      showSuccess(emailEl);
      valid = true;
    }
    return valid;
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isUsernameValid = checkUsername(),
      isEmailValid = checkEmail();

    let isFormValid = isUsernameValid && isEmailValid;

    if (isFormValid) {
      postData('https://reqbin.com/echo/post/json', {
        id: usernameEl,
        email: emailEl,
      })
        .then((response) => console.log(JSON.stringify(response)))
        .catch((e) => console.log(e))
        .finally(() => {
          usernameEl.value = '';
          emailEl.value = '';
        });
    }
  });
};

export default submitForm;
