Індивідуальний фінальний проект передбачає створення веб - застосунку. Програмний продуктом є фітнес додаток.

# Технічні вимоги до проекту
Ось оновлені технічні вимоги з акцентом на роботу з MongoDB:

### 1. Загальні вимоги
- **Мова програмування**: JavaScript (ES6+)
- **Бібліотека**: React
- **Система управління версіями**: Git
- **Тестування**: Jest, React Testing Library

### 2. Архітектура
- **Структура проекту**: Використання компонентного підходу
  - Розділення на контейнерні та презентаційні компоненти
  - Використання функціональних компонентів з хуками
- **Управління станом**: Redux або Context API
- **Маршрутизація**: React Router

### 3. Інтерфейс
- **CSS**: Можливість використання SCSS
- **Адаптивність**: Підтримка мобільних пристроїв (Media Queries)

### 4. API
- **Взаємодія з API**: Використання Axios або Fetch API
- **Формат даних**: JSON
- **Обробка помилок**: Глобальне оброблення помилок при запитах

### 5. Робота з MongoDB
- **Бібліотека для роботи з MongoDB**: Mongoose для Node.js
- **Схеми даних**: Визначення схем за допомогою Mongoose для структурованого зберігання даних
- **Підключення до MongoDB**: Використання URI для підключення до MongoDB Atlas або локальної бази даних

### 6. Тестування
- **Юніт-тести**: Написання тестів для компонентів та функцій взаємодії з MongoDB
- **Інтеграційні тести**: Перевірка взаємодії компонентів та API з MongoDB

### 7. Безпека
- **Захист даних**: Валідація на стороні клієнта та сервера
- **Сторонні бібліотеки**: Використання тільки перевірених бібліотек
- **Аутентифікація та авторизація**: Використання JWT для захисту маршрутов та даних

### 8. Виконання
- **Оптимізація**: Використання React.memo, useMemo, useCallback для оптимізації продуктивності
- **Лінтинг**: Використання ESLint та Prettier для підтримки стилю коду

### 9. Документація
- **Коментарі в коді**: Використання JSDoc для документації функцій
- **README.md**: Документація з інструкціями по налаштуванню, запуску та розгортанню проекту

### 10. Розгортання
- **Середовище**: Використання Vercel, Netlify або власного сервера
- **CI/CD**: Налаштування автоматизованого процесу розгортання (GitHub Actions, CircleCI)

## Основний функцінонал і UI

## Home: 
Головна сторінка повина виглядати як feed публікацій різних користувачів + можливість пошуку користувача, публікаціїї і тд.

## Account: 
Сторінка акаунту перебчає компонент з основною інформацією про користувача(аватар, кількість фоловерів і тд.), блок з досяненнями користувача, а також його публікації.

## Account Settings: 
Блок з налаштуваннями і основною інформацією про користувача.

## Awards: 
Сторінка досягнень, або нагород передбачає можливість сторення нової публікації в межах всього профілю, або стоврення публікації в межах конкретної ачівки.
Користувач має можливість створювати, оновлювати, видаляти свої цілі в застосунку. 

## Progress: 
Блок, який поєднаний з awards, покликаний для візуальзаціїї прогресу користувача серед поставлених цілей. Він може бути описаним по-різному і містити різні блоки в залежності від типо award.

## Folower List:
Компонент, в якому додано список фоловерів з функціоналом відписатись/підписатись

## Login / Sign up:
Сторінка реєстрації та авторизації користувача.

## Post
Компонент може використовуватись як для публцікації в межах певної award, так і для публікації новини в акаунті користувача

## Comment
Компонент реалізовує можливість залишати(змінювати) та отримувати коментарі під публікаціями користувача



