// Import stylesheets
import './style.css';


const form: HTMLFormElement = document.querySelector('#defineform');

//fetch('https://api.dictionaryapi.dev/api/v2/entries/en/').then(res => console.log(res))

form.onsubmit = () => {
  const formData = new FormData(form);

 // console.log(formData);
  const text = formData.get('defineword') as string;
//  console.log(text);
  return false; // prevent reload
};