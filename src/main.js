import './style.scss';
import logo from './images/logo1.png';

// Створюємо елемент для зображення та додаємо його в DOM
const img = document.createElement('img');
img.src = logo;
img.alt = 'Logo';
img.classList.add('logo'); // Додаємо клас для стилізації
document.body.appendChild(img);

// Логування у консоль для перевірки
console.log('Hello, Webpack with an image!');
