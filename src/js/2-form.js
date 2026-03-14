import '../css/2-form.css';
import '@fontsource/montserrat';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

if (form) {
  populateForm();

  form.addEventListener('input', event => {
    const { name, value, selectionStart } = event.target;

    if (name === 'email') {
      const cleanedValue = value.replace(/\s+/g, '');

      if (value !== cleanedValue) {
        formData.email = cleanedValue;
        const currentType = event.target.type;
        event.target.type = 'text';
        event.target.value = cleanedValue;

        const pos = Math.max(0, selectionStart - 1);
        event.target.setSelectionRange(pos, pos);
      } else {
        formData.email = value;
      }
    } else if (name === 'message') {
      formData.message = value;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  });

  form.addEventListener('focusout', event => {
    if (event.target.name === 'message') {
      const trimmedValue = event.target.value.trim();

      // Оновлюємо і об'єкт, і саме поле на екрані
      formData.message = trimmedValue;
      event.target.value = trimmedValue;

      // Оновлюємо localStorage вже чистими даними
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (formData.email === '' || formData.message === '') {
      alert('Fill please all fields');
      return;
    }
    console.log('Submitted Data:', formData);
    localStorage.removeItem(STORAGE_KEY);
    formData.email = '';
    formData.message = '';
    form.reset();
  });
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    const parsedData = JSON.parse(savedData);

    Object.entries(parsedData).forEach(([key, value]) => {
      formData[key] = value;
      form.elements[key].value = value;
    });
  }
}
