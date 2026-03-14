import '../css/2-form.css';
import '@fontsource/montserrat';

const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

populateForm();

form.addEventListener('input', event => {
  const { name, value, selectionStart } = event.target;

  if (name === 'email') {
    const cleanedValue = value.replace(/\s+/g, '');

    if (value !== cleanedValue) {
      formData.email = cleanedValue;
      event.target.value = cleanedValue;

      const newPosition = selectionStart - 1;
      event.target.setSelectionRange(newPosition, newPosition);
    } else {
      formData.email = value;
    }
  } else if (name === 'message') {
    formData.message = value.trim();
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
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
